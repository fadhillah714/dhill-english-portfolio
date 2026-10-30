#!/usr/bin/env node
/**
 * build-textures.mjs
 * Renders the organic, grainy "psychedelic poster" artwork used as page backgrounds.
 *
 *   node tools/build-textures.mjs                    all variants → assets/img/
 *   node tools/build-textures.mjs --only=hero        a single variant (hero | skills | assign)
 *   node tools/build-textures.mjs --out=tmp --png    write elsewhere and keep lossless PNG copies
 *
 * Recipe (mockup revision 2.0)
 *   1. Two low-frequency fractal-noise fields (seed A and seed B).
 *   2. Field A is displaced by field B (feDisplacementMap) → melting, organic shapes.
 *   3. Fine grain is mixed into the field *before* colour mapping, so every colour
 *      boundary dissolves into a stippled, printed texture.
 *   4. The field is mapped onto the palette with feComponentTransfer.
 *
 * Chromium (through Playwright) rasterises the SVG filter, Sharp encodes WebP.
 * The output is committed to the repository; the website never runs this script.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* The six-colour palette (mirrors assets/css/tokens.css). */
const PALETTE = {
  ink: '#14101F',
  midnight: '#1B1A4B',
  purple: '#5B2A8C',
  magenta: '#C2336B',
  orange: '#E8602C',
  cream: '#FFF6EA',
};

/* Colour ramp, from the lowest to the highest value of the field (equal-width steps).
   The ink/midnight alternation at the bottom keeps a faint printed speckle in the dark areas. */
const RAMP = [
  'ink', 'midnight', 'ink', 'midnight', 'midnight', 'purple',
  'purple', 'magenta', 'orange', 'orange', 'orange', 'orange',
];

/* tone shifts the normalised field along the ramp: + warmer and brighter, - darker. */
const VARIANTS = [
  { name: 'hero', file: 'bg-hero', seeds: [3, 11], displacement: 230, tone: 0.05 },
  { name: 'skills', file: 'bg-skills', seeds: [21, 8], displacement: 200, tone: 0 },
  { name: 'assign', file: 'bg-assign', seeds: [40, 2], displacement: 200, tone: -0.02 },
];

const SIZES = [
  { name: 'desktop', suffix: '', width: 1920, height: 1080, frequencyScale: 1 },
  { name: 'mobile', suffix: '-mobile', width: 828, height: 1600, frequencyScale: 1.35 },
];

const LOOK = {
  fieldFrequency: 0.0018, // shapes of roughly 550px
  fieldOctaves: 4,
  warpFrequency: 0.0028, // the field that bends the shapes
  warpContrast: 2.2, // stretches the bending field so the displacement really melts the shapes
  center: 0.37, // mean of the normalised field on the ramp (below 0.5 keeps the artwork mostly dark)
  spread: 0.33, // standard deviation of the normalised field: how far it runs through the ramp
  grainFrequency: 0.62, // kept well below 1 to avoid moiré rings
  grainOctaves: 1,
  grain: 0.62, // grain amplitude mixed into the field
};

const TARGET_BYTES = 250 * 1024;

/* ---------------------------------------------------------------- helpers */

function hexToUnit(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => +(v / 255).toFixed(4));
}

function rampTables(ramp) {
  const rgb = ramp.map((key) => hexToUnit(PALETTE[key]));
  return [0, 1, 2].map((channel) => rgb.map((c) => c[channel]).join(' '));
}

/**
 * stage "measure": the raw warped field in grey, used to read its mean and spread.
 * stage "art":     the finished artwork; `levels` normalises the field before colour mapping,
 *                  so every seed lands on the same balance of colours.
 */
function artworkSvg(size, variant, stage, levels) {
  const { width, height, frequencyScale } = size;
  const { seeds: [seedA, seedB], displacement, tone } = variant;
  const pad = Math.ceil(displacement * 0.75); // bleed: displaced samples never leave the noise
  const field = (LOOK.fieldFrequency * frequencyScale).toFixed(5);
  const warp = (LOOK.warpFrequency * frequencyScale).toFixed(5);
  const w = LOOK.warpContrast;
  const wo = (0.5 - 0.5 * w).toFixed(4);
  const keepAlpha = '0 0 0 0 1';

  // mean → LOOK.center (shifted by tone), standard deviation → LOOK.spread
  const k = stage === 'art' ? (LOOK.spread / levels.stdev).toFixed(4) : 1;
  const o = stage === 'art' ? (LOOK.center + tone - k * levels.mean).toFixed(4) : 0;
  const [tr, tg, tb] = rampTables(RAMP);

  const colour =
    stage === 'art'
      ? `
    <feTurbulence type="fractalNoise" baseFrequency="${LOOK.grainFrequency}" numOctaves="${LOOK.grainOctaves}" seed="${seedA + seedB}" result="noiseGrain"/>
    <feColorMatrix in="noiseGrain" type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  ${keepAlpha}" result="grain"/>
    <feComposite in="field" in2="grain" operator="arithmetic" k1="0" k2="1" k3="${LOOK.grain}" k4="${-LOOK.grain / 2}" result="dithered"/>
    <feComponentTransfer in="dithered">
      <feFuncR type="discrete" tableValues="${tr}"/>
      <feFuncG type="discrete" tableValues="${tg}"/>
      <feFuncB type="discrete" tableValues="${tb}"/>
    </feComponentTransfer>`
      : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <filter id="art" filterUnits="userSpaceOnUse" x="${-pad}" y="${-pad}" width="${width + pad * 2}" height="${height + pad * 2}" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${field}" numOctaves="${LOOK.fieldOctaves}" seed="${seedA}" result="noiseA"/>
    <feColorMatrix in="noiseA" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${keepAlpha}" result="fieldA"/>
    <feTurbulence type="fractalNoise" baseFrequency="${warp}" numOctaves="2" seed="${seedB}" result="noiseB"/>
    <feColorMatrix in="noiseB" type="matrix" values="${w} 0 0 0 ${wo}  0 ${w} 0 0 ${wo}  0 0 ${w} 0 ${wo}  ${keepAlpha}" result="fieldB"/>
    <feDisplacementMap in="fieldA" in2="fieldB" scale="${displacement}" xChannelSelector="R" yChannelSelector="G" result="warped"/>
    <feColorMatrix in="warped" type="matrix" values="${k} 0 0 0 ${o}  ${k} 0 0 0 ${o}  ${k} 0 0 0 ${o}  ${keepAlpha}" result="field"/>${colour}
  </filter>
  <rect x="${-pad}" y="${-pad}" width="${width + pad * 2}" height="${height + pad * 2}" filter="url(#art)"/>
</svg>`;
}

async function launchBrowser() {
  // Bundled Chromium first, then the Chrome or Edge already installed on the machine.
  const attempts = [{}, { channel: 'chrome' }, { channel: 'msedge' }];
  let lastError;
  for (const options of attempts) {
    try {
      return await chromium.launch(options);
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(
    `No Chromium browser available. Run "npx playwright install chromium" or install Chrome/Edge.\n${lastError}`,
  );
}

async function render(page, size, svg) {
  await page.setViewportSize({ width: size.width, height: size.height });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:${PALETTE.midnight}">${svg}</body></html>`);
  await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
  return page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: size.width, height: size.height } });
}

async function measure(page, size, variant) {
  const png = await render(page, size, artworkSvg(size, variant, 'measure'));
  const { channels } = await sharp(png).stats();
  return { mean: channels[0].mean / 255, stdev: channels[0].stdev / 255 };
}

async function encodeWebp(png) {
  // Highest quality that lands near the size budget; grain is the expensive part.
  let result;
  for (let quality = 84; quality >= 36; quality -= 4) {
    const buffer = await sharp(png).removeAlpha().webp({ quality, effort: 6, smartSubsample: true }).toBuffer();
    result = { buffer, quality };
    if (buffer.length <= TARGET_BYTES) break;
  }
  return result;
}

/* ---------------------------------------------------------------- main */

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = true] = arg.replace(/^--/, '').split('=');
    return [key, value];
  }),
);
const only = typeof args.only === 'string' ? args.only.split(',') : null;
const outDir = path.resolve(ROOT, typeof args.out === 'string' ? args.out : 'assets/img');

await mkdir(outDir, { recursive: true });
const browser = await launchBrowser();
const page = await browser.newPage({ deviceScaleFactor: 1 });

try {
  for (const variant of VARIANTS.filter((v) => !only || only.includes(v.name))) {
    for (const size of SIZES) {
      const levels = await measure(page, size, variant);
      const png = await render(page, size, artworkSvg(size, variant, 'art', levels));
      const { buffer, quality } = await encodeWebp(png);
      const base = `${variant.file}${size.suffix}`;
      await writeFile(path.join(outDir, `${base}.webp`), buffer);
      if (args.png) await writeFile(path.join(outDir, `${base}.png`), png);
      console.log(
        `${base}.webp  ${size.width}x${size.height}  q${quality}  ${(buffer.length / 1024).toFixed(0)} KB` +
          `  (field mean ${levels.mean.toFixed(3)}, sd ${levels.stdev.toFixed(3)})`,
      );
    }
  }
} finally {
  await browser.close();
}
