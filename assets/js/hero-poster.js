/* ==========================================================================
   Home hero: the living poster. Brings the hero's own lettering, stars and
   curves to life; the entrance, the twinkle, the travelling light, the hover
   on "Portfolio" and the parallax are drawn in components.css (4. Home: hero,
   "living poster"). This script:
   - splits "Welcome" and "Portfolio" into letters (same kerning, same width);
   - Welcome: its letters wobble one after another on hover (tap on touch);
   - Portfolio: a click or tap sets off a starburst;
   - the name: hover or tap redraws the ruled line beside it;
   - the orbit: fits the path of the point of light to the main curve and now
     and then lights a small sparkle beside it;
   - the cursor (mouse only): a light trail of sparkles and the parallax;
   - easter egg: three clicks on the star beside "to my".
   With reduced motion nothing moves (the easter egg note only fades in and
   out). Nothing runs while the hero is off screen or the tab hidden, and
   every spark is removed as soon as its animation ends.
   ========================================================================== */

(function () {
  'use strict';

  const hero = document.querySelector('.hero');
  if (!hero || typeof hero.animate !== 'function') return;

  const welcome = hero.querySelector('.poster-title__line--1 > .solid');
  const portfolio = hero.querySelector('.poster-title__line--3 > .solid');
  const titleStar = hero.querySelector('.poster-title__star');
  const ownerName = hero.querySelector('.hero__owner-name');
  const ownerRule = hero.querySelector('.hero__owner-rule');
  const sparks = Array.from(hero.querySelectorAll('.hero__spark'));

  const MAX_SPARKS = 90;              // in the effects layer at once
  const TRAIL = { every: 80, step: 36, max: 8 }; // ms and px between trail sparks, and how many at once
  const ORBIT_EVERY = [2600, 5200];   // ms between orbit sparkles
  const ORBIT_SAMPLES = 160;          // points along the curve for the light's path
  const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const moving = () => !reducedMotion.matches;
  const withMouse = () => moving() && finePointer.matches;

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const either = () => (Math.random() < 0.5 ? -1 : 1);
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const fontSize = (element) => parseFloat(getComputedStyle(element).fontSize) || 16;

  /* ---------------------------------------------------------------- sparks */

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function symbol(id, className) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', `#${id}`);
    svg.append(use);
    return svg;
  }

  // The site's six-point star and its four-point sparkle (the shape of the close icon)
  const SHAPES = { star: symbol('star', 'hero-fx'), sparkle: symbol('close', 'hero-fx') };

  const fx = document.createElement('div');
  fx.className = 'hero__fx';
  fx.setAttribute('aria-hidden', 'true');
  hero.append(fx);

  // kind: 'star', 'sparkle', 'dot' or 'ring'
  function spark(kind, size, color, layer) {
    let element;
    if (SHAPES[kind]) {
      element = SHAPES[kind].cloneNode(true);
    } else {
      element = document.createElement('span');
      element.className = `hero-fx hero-fx--${kind}`;
    }
    element.style.setProperty('--size', `${size.toFixed(1)}px`);
    if (color) element.style.color = `var(--${color})`;
    (layer || fx).append(element);
    return element;
  }

  // Plays the keyframes once, then removes the element
  function play(element, keyframes, options, done) {
    const animation = element.animate(keyframes, { fill: 'backwards', ...options });
    animation.onfinish = animation.oncancel = () => {
      element.remove();
      if (done) done();
    };
    return animation;
  }

  // Hero coordinates of a point on screen, and of an element's centre
  function at(clientX, clientY) {
    const box = hero.getBoundingClientRect();
    return [clientX - box.left, clientY - box.top];
  }

  function centre(element) {
    const box = element.getBoundingClientRect();
    return at(box.left + box.width / 2, box.top + box.height / 2);
  }

  // Cream most often: it reads on every part of the artwork
  const BURST_COLORS = ['cream', 'cream', 'cream', 'sunset-orange', 'sunset-orange', 'magenta', 'magenta', 'purple'];

  // Two rings, then stars, sparkles and dots flying out from (x, y) in every direction
  function burst(x, y, { count, reach, size }) {
    const room = MAX_SPARKS - fx.childElementCount - 2;
    const total = Math.min(count, room);
    if (total <= 0) return;

    [['cream', 1.1, 0], ['sunset-orange', 0.8, 90]].forEach(([color, scale, delay]) => {
      const ring = spark('ring', reach * scale);
      ring.style.borderColor = `var(--${color})`;
      play(ring, [
        { transform: `translate(${x}px, ${y}px) scale(0.1)`, opacity: 0.95 },
        { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 0 },
      ], { duration: 650, delay, easing: 'cubic-bezier(0.15, 0.7, 0.3, 1)' });
    });

    const turn = rand(0, Math.PI * 2);
    for (let i = 0; i < total; i += 1) {
      const kind = Math.random() < 0.22 ? 'dot' : i % 2 ? 'sparkle' : 'star';
      const element = spark(kind, size * (kind === 'dot' ? rand(0.2, 0.32) : rand(0.7, 1.25)), pick(BURST_COLORS));
      const angle = turn + (i / total) * Math.PI * 2 + rand(-0.3, 0.3);
      const distance = reach * rand(0.5, 1.05);
      const x0 = x + rand(-6, 6);
      const y0 = y + rand(-6, 6);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const spin = rand(120, 320) * either();
      const drop = reach * 0.18;
      // Out fast, drift on at full strength, then fade while sinking a little
      play(element, [
        { transform: `translate(${x0}px, ${y0}px) scale(0.4) rotate(0deg)`, opacity: 1, easing: 'cubic-bezier(0.15, 0.85, 0.3, 1)' },
        { transform: `translate(${x0 + dx * 0.8}px, ${y0 + dy * 0.8}px) scale(1.15) rotate(${spin * 0.6}deg)`, opacity: 1, offset: 0.4 },
        { transform: `translate(${x0 + dx * 0.93}px, ${y0 + dy * 0.93 + drop * 0.5}px) scale(0.95) rotate(${spin * 0.85}deg)`, opacity: 1, offset: 0.7, easing: 'ease-in' },
        { transform: `translate(${x0 + dx}px, ${y0 + dy + drop}px) scale(0.4) rotate(${spin}deg)`, opacity: 0 },
      ], { duration: rand(900, 1300), delay: rand(0, 70) });
    }
  }

  /* ---------------------------------------------------------------- letters
     Each letter becomes an inline-block, which loses the kerning between
     letters; a margin in em puts it back (measured on a canvas in the same
     font), so the word keeps its width. Screen readers get the word whole.
     Should the width still differ, the word goes back to plain text. */

  function splitWord(word) {
    if (!word || word.querySelector('.hero-char')) return;
    const text = word.textContent;
    const style = getComputedStyle(word);
    const shown = style.textTransform === 'uppercase' ? text.toUpperCase() : text;
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return;
    context.font = `${style.fontStyle} ${style.fontWeight} 100px ${style.fontFamily}`;
    const width = (string) => context.measureText(string).width;
    const before = word.getBoundingClientRect().width;

    const label = document.createElement('span');
    label.className = 'visually-hidden';
    label.textContent = text;
    const letters = Array.from(text, (character, i) => {
      const letter = document.createElement('span');
      letter.className = 'hero-char';
      letter.setAttribute('aria-hidden', 'true');
      letter.style.setProperty('--i', i);
      letter.textContent = character;
      if (i < text.length - 1) {
        const kern = (width(shown[i] + shown[i + 1]) - width(shown[i]) - width(shown[i + 1])) / 100;
        if (Math.abs(kern) > 0.0005) letter.style.marginInlineEnd = `${kern.toFixed(4)}em`;
      }
      return letter;
    });
    word.replaceChildren(label, ...letters);

    if (Math.abs(word.getBoundingClientRect().width - before) > 1) word.replaceChildren(text);
  }

  let splitting = false;
  function splitWhenReady() {
    if (splitting || !moving() || !portfolio) return;
    splitting = true;
    const fonts = document.fonts;
    const ready = fonts ? fonts.load(`100px ${getComputedStyle(portfolio).fontFamily}`).then(() => fonts.ready) : Promise.resolve();
    ready.catch(() => {}).then(() => {
      splitWord(welcome);
      splitWord(portfolio);
    });
  }

  /* ---------------------------------------------------------------- hover or tap */

  // Mouse and pen: on entering; touch (and any click): on tap
  function onHoverOrTap(element, action) {
    if (!element) return;
    element.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'touch') action();
    });
    element.addEventListener('click', action);
  }

  // Double and triple clicks would select the heading
  function keepSelection(event) {
    if (event.detail > 1) event.preventDefault();
  }

  const WOBBLE = [
    { transform: 'none' },
    { transform: 'translateY(-0.06em) rotate(-6deg)', offset: 0.26 },
    { transform: 'translateY(0.015em) rotate(4deg)', offset: 0.55 },
    { transform: 'translateY(-0.01em) rotate(-1.5deg)', offset: 0.8 },
    { transform: 'none' },
  ];

  let wobbling = false;
  function wobble() {
    const letters = welcome.querySelectorAll('.hero-char');
    if (!moving() || wobbling || !letters.length) return;
    wobbling = true;
    let last = null;
    letters.forEach((letter, i) => {
      last = letter.animate(WOBBLE, { duration: 640, delay: i * 55, easing: 'ease-in-out' });
    });
    last.onfinish = last.oncancel = () => {
      wobbling = false;
    };
  }

  // The rule runs off to the right, then is drawn again from the left
  let redrawing = false;
  function redraw() {
    if (!moving() || redrawing || !ownerRule) return;
    redrawing = true;
    const animation = ownerRule.animate([
      { clipPath: 'inset(0 0 0 0)', easing: 'cubic-bezier(0.55, 0, 0.8, 0.4)' },
      { clipPath: 'inset(0 0 0 100%)', offset: 0.38 },
      { clipPath: 'inset(0 100% 0 0)', offset: 0.38, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
      { clipPath: 'inset(0 0 0 0)' },
    ], { duration: 1000 });
    animation.onfinish = animation.oncancel = () => {
      redrawing = false;
    };
  }

  let pop = null;
  function portfolioBurst(event) {
    if (!moving()) return;
    const size = fontSize(portfolio);
    const [x, y] = event.detail === 0 ? centre(portfolio) : at(event.clientX, event.clientY);
    if (pop) pop.cancel();
    pop = portfolio.animate([
      { transform: 'none' },
      { transform: 'scale(0.93, 0.97)', offset: 0.25 },
      { transform: 'scale(1.05, 1.02)', offset: 0.6 },
      { transform: 'none' },
    ], { duration: 480, easing: 'ease-out' });
    burst(x, y, { count: 20, reach: Math.max(120, size * 1.6), size: clamp(size * 0.32, 22, 40) });
  }

  onHoverOrTap(welcome, wobble);
  onHoverOrTap(ownerName, redraw);
  if (portfolio) {
    portfolio.addEventListener('click', portfolioBurst);
    portfolio.addEventListener('mousedown', keepSelection);
  }

  /* ---------------------------------------------------------------- easter egg
     Three clicks on the star beside "to my", each within 1.4 s of the last:
     the star spins up with each one, then a bigger burst and a note. */

  let clicks = 0;
  let clickTimer = 0;
  let magicUntil = 0;

  // To the right of the star where it fits, else centred below it
  function note(star) {
    const label = document.createElement('p');
    label.className = 'status-tag hero-magic';
    label.append(symbol('star', 'star'), 'You found a little magic!');
    fx.append(label);
    const width = label.offsetWidth;
    const height = label.offsetHeight;
    const heroBox = hero.getBoundingClientRect();
    const box = star.getBoundingClientRect();
    let left = box.right - heroBox.left + 12;
    let top = box.top - heroBox.top + box.height / 2 - height / 2;
    if (left + width > hero.clientWidth - 12) {
      left = box.left - heroBox.left + box.width / 2 - width / 2;
      top = box.bottom - heroBox.top + 12;
    }
    label.style.left = `${clamp(left, 12, hero.clientWidth - width - 12)}px`;
    label.style.top = `${clamp(top, 12, hero.clientHeight - height - 12)}px`;
    const settled = 'translateY(0) scale(1) rotate(-3deg)';
    play(label, moving() ? [
      { opacity: 0, transform: 'translateY(0.6rem) scale(0.6) rotate(-8deg)' },
      { opacity: 1, transform: 'translateY(0) scale(1.06) rotate(-3deg)', offset: 0.12 },
      { opacity: 1, transform: settled, offset: 0.2 },
      { opacity: 1, transform: settled, offset: 0.86 },
      { opacity: 0, transform: 'translateY(-0.4rem) scale(0.96) rotate(-3deg)' },
    ] : [
      { opacity: 0 },
      { opacity: 1, offset: 0.08 },
      { opacity: 1, offset: 0.9 },
      { opacity: 0 },
    ], { duration: 2700 });
  }

  function magic() {
    magicUntil = performance.now() + 2800;
    const [x, y] = centre(titleStar);
    if (moving()) {
      const size = fontSize(portfolio || titleStar);
      const reach = Math.max(150, size * 2.1);
      titleStar.animate({ rotate: ['0deg', '360deg'], scale: [1, 1.6, 1] }, { duration: 1000, easing: SPRING });
      burst(x, y, { count: 30, reach, size: clamp(size * 0.34, 24, 44) });
      setTimeout(() => {
        if (moving()) burst(x, y, { count: 16, reach: reach * 0.6, size: clamp(size * 0.22, 16, 28) });
      }, 200);
      sparks.forEach((star, i) => {
        star.animate({ rotate: ['0deg', '120deg'], scale: [1, 1.7, 1] }, { duration: 800, delay: 150 + i * 110, easing: SPRING });
      });
    }
    note(titleStar);
  }

  function starClick() {
    if (performance.now() < magicUntil) return;
    clearTimeout(clickTimer);
    clicks += 1;
    if (clicks >= 3) {
      clicks = 0;
      magic();
      return;
    }
    clickTimer = setTimeout(() => {
      clicks = 0;
    }, 1400);
    // 60deg: the six-point star ends where it started
    if (moving()) titleStar.animate({ rotate: ['0deg', '60deg'], scale: [1, 1 + clicks * 0.12, 1] }, { duration: 560, easing: SPRING });
  }

  if (titleStar) {
    titleStar.addEventListener('click', starClick);
    titleStar.addEventListener('mousedown', keepSelection);
  }

  /* ---------------------------------------------------------------- orbit
     A layer beside each curves SVG takes its classes, so it shares its box and
     shows at the same widths. The light's path is the SVG's main curve,
     scaled to that box (the SVG stretches, preserveAspectRatio none). */

  const orbits = [];

  function fitOrbit(orbit) {
    const width = orbit.layer.clientWidth;
    const height = orbit.layer.clientHeight;
    if (!width || !height) return;
    if (!orbit.points) {
      const length = orbit.path.getTotalLength();
      orbit.points = Array.from({ length: ORBIT_SAMPLES + 1 }, (_, i) => orbit.path.getPointAtLength((length * i) / ORBIT_SAMPLES));
    }
    const sx = width / orbit.box.width;
    const sy = height / orbit.box.height;
    orbit.px = orbit.points.map((point) => [(point.x - orbit.box.x) * sx, (point.y - orbit.box.y) * sy]);
    orbit.dot.style.offsetPath = `path("M${orbit.px.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')}")`;
    orbit.layer.classList.add('is-ready');
  }

  if (window.CSS && CSS.supports('offset-path', 'path("M0 0")') && 'ResizeObserver' in window) {
    hero.querySelectorAll('svg.curves').forEach((svg) => {
      const path = svg.querySelector('path:not(.is-faint)');
      const box = svg.viewBox && svg.viewBox.baseVal;
      if (!path || !box || !box.width || !box.height) return;
      const layer = document.createElement('span');
      layer.className = `${svg.getAttribute('class')} hero__orbit`;
      layer.setAttribute('aria-hidden', 'true');
      const dot = document.createElement('span');
      dot.className = 'hero__orbit-dot';
      layer.append(dot);
      svg.after(layer);
      orbits.push({ path, box, layer, dot, points: null, px: [] });
    });
    const resized = new ResizeObserver(() => orbits.forEach(fitOrbit));
    orbits.forEach((orbit) => resized.observe(orbit.layer));
  }

  function orbitSparkle() {
    const orbit = orbits.find((item) => item.px.length && item.layer.clientWidth);
    if (!orbit) return;
    const [x, y] = orbit.px[Math.floor(rand(0.1, 0.9) * (orbit.px.length - 1))];
    const px = x + rand(-14, 14);
    const py = y + rand(-14, 14);
    const turn = rand(45, 120) * either();
    play(spark(Math.random() < 0.65 ? 'sparkle' : 'star', rand(8, 14), Math.random() < 0.7 ? 'cream' : 'sunset-orange', orbit.layer), [
      { transform: `translate(${px}px, ${py}px) scale(0) rotate(0deg)`, opacity: 0 },
      { transform: `translate(${px}px, ${py}px) scale(1) rotate(${turn * 0.5}deg)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${px}px, ${py - 6}px) scale(0) rotate(${turn}deg)`, opacity: 0 },
    ], { duration: rand(1200, 1700), easing: 'ease-in-out' });
  }

  let orbitTimer = 0;
  function orbitCountdown() {
    orbitTimer = setTimeout(() => {
      orbitSparkle();
      if (Math.random() < 0.3) setTimeout(orbitSparkle, 380);
      orbitCountdown();
    }, rand(ORBIT_EVERY[0], ORBIT_EVERY[1]));
  }

  /* ---------------------------------------------------------------- cursor
     Mouse only. The hero's box is read once per scroll position. */

  let heroBox = null;
  let hx = 0;
  let hy = 0;
  let driftFrame = 0;
  const trail = { at: -Infinity, x: -999, y: -999, alive: 0 };

  function applyDrift() {
    driftFrame = 0;
    hero.style.setProperty('--hx', hx.toFixed(3));
    hero.style.setProperty('--hy', hy.toFixed(3));
  }

  function drift(x, y) {
    hx = x;
    hy = y;
    if (!driftFrame) driftFrame = requestAnimationFrame(applyDrift);
  }

  function trailSpark(event, x, y) {
    if (event.timeStamp - trail.at < TRAIL.every || trail.alive >= TRAIL.max || fx.childElementCount >= MAX_SPARKS) return;
    if (Math.hypot(x - trail.x, y - trail.y) < TRAIL.step) return;
    trail.x = x;
    trail.y = y;
    if (event.target.closest('a, button, .hero__index')) return; // links stay clear
    trail.at = event.timeStamp;
    trail.alive += 1;
    const px = x + rand(-6, 6);
    const py = y + rand(-6, 6);
    const turn = rand(60, 140) * either();
    play(spark(Math.random() < 0.6 ? 'sparkle' : 'star', rand(7, 13), Math.random() < 0.72 ? 'cream' : 'sunset-orange'), [
      { transform: `translate(${px}px, ${py}px) scale(1) rotate(0deg)`, opacity: 0.95 },
      { transform: `translate(${px + rand(-10, 10)}px, ${py + rand(10, 22)}px) scale(0.2) rotate(${turn}deg)`, opacity: 0 },
    ], { duration: rand(650, 900), easing: 'cubic-bezier(0.25, 0.6, 0.35, 1)' }, () => {
      trail.alive -= 1;
    });
  }

  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !withMouse()) return;
    if (!heroBox) heroBox = hero.getBoundingClientRect();
    const x = event.clientX - heroBox.left;
    const y = event.clientY - heroBox.top;
    drift(clamp((x / heroBox.width) * 2 - 1, -1, 1), clamp((y / heroBox.height) * 2 - 1, -1, 1));
    trailSpark(event, x, y);
  });

  hero.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') drift(0, 0);
  });

  const forgetBox = () => {
    heroBox = null;
  };
  window.addEventListener('scroll', forgetBox, { passive: true });
  window.addEventListener('resize', forgetBox);

  /* ---------------------------------------------------------------- state */

  let onScreen = true;

  function refresh() {
    const live = moving() && onScreen && document.visibilityState === 'visible';
    hero.classList.toggle('is-live', moving());
    hero.classList.toggle('is-idle', !onScreen);
    if (live && orbits.length) {
      if (!orbitTimer) orbitCountdown();
    } else {
      clearTimeout(orbitTimer);
      orbitTimer = 0;
    }
    if (!withMouse()) drift(0, 0);
    if (!moving()) {
      fx.replaceChildren();
      orbits.forEach((orbit) => orbit.layer.querySelectorAll('.hero-fx').forEach((element) => element.remove()));
    }
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting;
      refresh();
    }).observe(hero);
  }

  document.addEventListener('visibilitychange', refresh);
  reducedMotion.addEventListener('change', () => {
    splitWhenReady();
    refresh();
  });
  finePointer.addEventListener('change', refresh);

  splitWhenReady();
  refresh();
})();
