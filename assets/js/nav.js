/* ==========================================================================
   Navigation behaviour: the Assignments dropdown and the mobile menu.
   The navbar markup is written in every HTML page; the assignment links
   inside it are filled in from the data in content.js.
   ========================================================================== */

(function () {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  /* ---------------------------------------------------------------- dropdown
     Mouse: opens on hover, click pins it. Touch: tap toggles.
     Keyboard: Enter/Space toggle, arrows move through the items,
     Escape closes and returns focus to the button. */

  function initDropdown(item) {
    const button = item.querySelector('.nav__toggle');
    const panel = button && document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;

    let openedBy = null;
    let leaveTimer = 0;

    const isOpen = () => button.getAttribute('aria-expanded') === 'true';
    const items = () => Array.from(panel.querySelectorAll('a[href]'));

    function open(source) {
      clearTimeout(leaveTimer);
      if (isOpen()) {
        if (source !== 'hover') openedBy = source;
        return;
      }
      openedBy = source;
      button.setAttribute('aria-expanded', 'true');
      item.classList.add('is-open');
    }

    function close(returnFocus) {
      clearTimeout(leaveTimer);
      if (!isOpen()) return;
      openedBy = null;
      button.setAttribute('aria-expanded', 'false');
      item.classList.remove('is-open');
      if (returnFocus) button.focus();
    }

    button.addEventListener('click', () => {
      if (isOpen() && openedBy !== 'hover') close(false);
      else open('click');
    });

    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      open('keyboard');
      const list = items();
      const target = event.key === 'ArrowDown' ? list[0] : list[list.length - 1];
      if (target) target.focus();
    });

    panel.addEventListener('keydown', (event) => {
      const list = items();
      const index = list.indexOf(document.activeElement);
      let target = null;
      if (event.key === 'ArrowDown') target = list[(index + 1) % list.length];
      else if (event.key === 'ArrowUp') target = list[(index - 1 + list.length) % list.length];
      else if (event.key === 'Home') target = list[0];
      else if (event.key === 'End') target = list[list.length - 1];
      if (target) {
        event.preventDefault();
        target.focus();
      }
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        event.preventDefault();
        close(true);
      }
    });

    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) close(false);
    });

    document.addEventListener('click', (event) => {
      if (!item.contains(event.target)) close(false);
    });

    item.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') open('hover');
    });

    item.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse' && openedBy === 'hover') {
        leaveTimer = setTimeout(() => close(false), 220);
      }
    });
  }

  document.querySelectorAll('.nav__item--menu').forEach(initDropdown);

  /* ---------------------------------------------------------------- mobile menu
     Full-height sheet: locks page scroll, keeps focus inside, closes on
     Escape and gives focus back to the menu button. */

  function initSheet(openButton, sheet) {
    const closeButton = sheet.querySelector('.sheet__close');
    const outside = ['.skip-link', '.topbar', 'main', '.site-footer']
      .map((selector) => document.querySelector(selector))
      .filter(Boolean);
    const wide = window.matchMedia('(min-width: 760px)');

    const isOpen = () => sheet.classList.contains('is-open');
    const focusable = () =>
      Array.from(sheet.querySelectorAll('a[href], button:not([disabled])')).filter(
        (element) => element.getClientRects().length > 0,
      );

    function open() {
      sheet.classList.add('is-open');
      openButton.setAttribute('aria-expanded', 'true');
      root.classList.add('is-locked');
      outside.forEach((element) => element.setAttribute('inert', ''));
      closeButton.focus();
    }

    function close(returnFocus) {
      if (!isOpen()) return;
      sheet.classList.remove('is-open');
      openButton.setAttribute('aria-expanded', 'false');
      root.classList.remove('is-locked');
      outside.forEach((element) => element.removeAttribute('inert'));
      if (returnFocus) openButton.focus();
    }

    openButton.addEventListener('click', open);
    closeButton.addEventListener('click', () => close(true));

    sheet.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== 'Tab') return;
      const list = focusable();
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Links such as "#contact" stay on the page, so the sheet has to close itself.
    sheet.addEventListener('click', (event) => {
      if (event.target.closest('a[href]')) close(false);
    });

    sheet.querySelectorAll('.sheet__toggle').forEach((toggle) => {
      const group = document.getElementById(toggle.getAttribute('aria-controls'));
      if (!group) return;
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!expanded));
        group.hidden = expanded;
      });
    });

    wide.addEventListener('change', (event) => {
      if (event.matches) close(false);
    });
  }

  const menuButton = document.querySelector('.menu-btn');
  const sheet = document.getElementById('site-menu');
  if (menuButton && sheet) initSheet(menuButton, sheet);
})();
