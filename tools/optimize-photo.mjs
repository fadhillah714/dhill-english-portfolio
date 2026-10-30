#!/usr/bin/env node
/**
 * optimize-photo.mjs
 * Makes lighter WebP copies of the profile photo for the About section.
 * The original (personal_image.jpeg in the project root) is only read, never changed.
 *
 *   node tools/optimize-photo.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(ROOT, 'personal_image.jpeg');
const OUT_DIR = path.join(ROOT, 'assets', 'img');
const WIDTHS = [640, 1080];

await mkdir(OUT_DIR, { recursive: true });

for (const width of WIDTHS) {
  const name = `profile-${width}.webp`;
  const info = await sharp(SOURCE)
    .rotate() // respect EXIF orientation
    .resize({ width })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(OUT_DIR, name));
  console.log(`${name}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
