/* ==========================================================================
   About portrait: analog signal failure. Now and then the photo plays like
   a portrait on a CRT fed by a worn VHS tape, in two moments that never run
   together:
   - interactive (bold): once each time the mouse enters the photo, and on a
     click while an ambient run is playing;
   - ambient (light): a small hiccup every 10 seconds without interaction
     on the photo, a little different each time.
   This script only decides when, hands the effect the photo's current
   source and varies the ambient run; the look is in components.css
   (5. Home: about). Mouse devices only, never with reduced motion, and no
   countdown while the tab is hidden.
   ========================================================================== */

(function () {
  'use strict';

  const figure = document.querySelector('.about__figure');
  const frame = figure && figure.querySelector('.photo__frame');
  const img = frame && frame.querySelector('img');
  if (!img) return;

  const AMBIENT_EVERY = 10000;       // ms of calm before an ambient run
  const AMBIENT_TIME = [1000, 1500]; // ms, picked anew each run
  const AMBIENT_ROLL = [0.05, 0.08]; // how far the picture slips up, as a share of its height
  const AMBIENT_SHIFT = [2, 5];      // px the tracking band tears sideways, either way
  const BOLD_TIME = 2300;            // ms; the slip itself (a quarter, slow up, smooth quick drop, fade) is in the CSS keyframes
  // Where the ambient tracking band may run, in % of the photo's height
  const ZONES = [[10, 26], [40, 56], [66, 82]]; // top, middle, bottom

  // The roll on the frame lasts the whole run: its end is the run's end
  const KINDS = {
    bold: { className: 'is-vhs-bold', animation: 'vhs-roll-bold' },
    ambient: { className: 'is-vhs-ambient', animation: 'vhs-roll-ambient' },
  };

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const enabled = () => finePointer.matches && !reducedMotion.matches;

  let timer = 0;        // the one ambient countdown
  let playing = null;   // 'bold', 'ambient' or null: one run at a time
  let inside = false;   // mouse over the photo
  let lastZone = -1;

  const between = ([min, max]) => min + Math.random() * (max - min);
  const pick = (count) => Math.floor(Math.random() * count);
  const set = (name, value) => figure.style.setProperty(name, value);
  const loaded = () => img.complete && img.naturalWidth > 0;

  function clearCountdown() {
    clearTimeout(timer);
    timer = 0;
  }

  function stop() {
    figure.classList.remove(KINDS.bold.className, KINDS.ambient.className);
    playing = null;
  }

  // A fresh hop, band and length for each ambient run. The band never runs
  // in the same third of the photo twice in a row.
  function vary() {
    let zone = pick(3);
    if (zone === lastZone) zone = (zone + 1 + pick(2)) % 3;
    lastZone = zone;
    set('--vhs-roll-amp', between(AMBIENT_ROLL).toFixed(3));
    set('--vhs-band-top', `${between(ZONES[zone]).toFixed(1)}%`);
    set('--vhs-band-size', `${between([3, 6]).toFixed(1)}%`);
    set('--vhs-band-shift', `${(between(AMBIENT_SHIFT) * (pick(2) ? 1 : -1)).toFixed(1)}px`);
    return Math.round(between(AMBIENT_TIME));
  }

  function play(kind) {
    clearCountdown();
    stop(); // an interactive run cuts an ambient one off, leaving nothing behind
    if (!loaded()) {
      countdown();
      return;
    }
    // The rolled copies use exactly the file the <img> shows
    set('--vhs-photo', `url(${JSON.stringify(img.currentSrc || img.src)})`);
    set('--vhs-time', `${kind === 'ambient' ? vary() : BOLD_TIME}ms`);
    void figure.offsetWidth; // start from the first frame
    figure.classList.add(KINDS[kind].className);
    playing = kind;
    // Without the stylesheet the animation would never end
    if (getComputedStyle(frame).animationName !== KINDS[kind].animation) finish();
  }

  function finish() {
    stop();
    countdown();
  }

  // (Re)start the 10 seconds, only once everything is calm again
  function countdown() {
    clearCountdown();
    if (inside || playing || !enabled() || document.visibilityState !== 'visible') return;
    timer = setTimeout(() => {
      timer = 0;
      // Nobody would see it off screen: just count again
      const box = frame.getBoundingClientRect();
      if (box.bottom > 0 && box.top < window.innerHeight) play('ambient');
      else countdown();
    }, AMBIENT_EVERY);
  }

  frame.addEventListener('animationend', (event) => {
    if (playing && event.target === frame && !event.pseudoElement && event.animationName === KINDS[playing].animation) finish();
  });

  frame.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch' || !enabled()) return;
    inside = true;
    clearCountdown();
    if (playing !== 'bold') play('bold');
  });

  frame.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'touch') return;
    inside = false;
    countdown(); // waits for a running run: finish() counts down after it
  });

  // A click is interaction too: it takes over an ambient run, otherwise it
  // restarts the countdown.
  frame.addEventListener('click', () => {
    if (playing === 'ambient' && enabled()) play('bold');
    else countdown();
  });

  // Hidden tab: no countdown and nothing left playing; back: 10 seconds anew.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      countdown();
    } else {
      clearCountdown();
      stop();
    }
  });

  function settingsChanged() {
    if (enabled()) {
      countdown();
    } else {
      clearCountdown();
      stop();
    }
  }
  reducedMotion.addEventListener('change', settingsChanged);
  finePointer.addEventListener('change', settingsChanged);

  countdown();
})();
