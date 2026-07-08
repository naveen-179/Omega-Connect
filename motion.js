/**
 * motion.js — Omega Connect
 * ─────────────────────────────────────────────────────────────────────────────
 * Purposeful motion only. No ambient decoration.
 *
 *   1. CardTilt      — CSS 3D perspective tilt on vibe room cards
 *   2. CardReveal    — IntersectionObserver for showcase card entrance
 *   3. PageObserver  — MutationObserver: noop for signal canvas (removed)
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /* ──────────────────────────────────────────────────────────────────────────
     1. CARD TILT — CSS 3D perspective tilt on Vibe Room cards
     Driven by mousemove delta from card centre. Touch: skipped.
  ────────────────────────────────────────────────────────────────────────── */

  const CardTilt = (() => {
    const MAX_ROTATE_X = 7;
    const MAX_ROTATE_Y = 10;
    const LIFT = 4;

    const states = new WeakMap();

    function onMove(card, e) {
      if (prefersReducedMotion()) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      const nx = clamp((e.clientX - cx) / (rect.width * 0.5), -1, 1);
      const ny = clamp((e.clientY - cy) / (rect.height * 0.5), -1, 1);
      const state = states.get(card);
      state.targetRY = nx * MAX_ROTATE_Y;
      state.targetRX = -ny * MAX_ROTATE_X;
      state.targetZ = LIFT;
    }

    function onLeave(card) {
      const state = states.get(card);
      state.targetRX = 0;
      state.targetRY = 0;
      state.targetZ = 0;
    }

    function animateCard(card) {
      const state = states.get(card);
      if (!state) return;
      const speed = prefersReducedMotion() ? 1 : 0.12;
      state.rx = lerp(state.rx, state.targetRX, speed);
      state.ry = lerp(state.ry, state.targetRY, speed);
      state.z  = lerp(state.z,  state.targetZ,  speed);
      card.style.transform =
        `perspective(900px) rotateX(${state.rx.toFixed(2)}deg) rotateY(${state.ry.toFixed(2)}deg) translateZ(${state.z.toFixed(2)}px)`;
      requestAnimationFrame(() => animateCard(card));
    }

    function init() {
      if (window.matchMedia('(hover: none)').matches) return;
      const cards = document.querySelectorAll('.vibe-card.room-card');
      cards.forEach((card) => {
        states.set(card, { rx: 0, ry: 0, z: 0, targetRX: 0, targetRY: 0, targetZ: 0 });
        card.addEventListener('mousemove', (e) => onMove(card, e), { passive: true });
        card.addEventListener('mouseleave', () => onLeave(card), { passive: true });
        animateCard(card);
      });
    }

    return { init };
  })();


  /* ──────────────────────────────────────────────────────────────────────────
     2. CARD REVEAL — IntersectionObserver for showcase cards
  ────────────────────────────────────────────────────────────────────────── */

  const CardReveal = (() => {
    function init() {
      const cards = document.querySelectorAll('.showcase-card');
      if (!cards.length) return;

      if (prefersReducedMotion()) {
        cards.forEach((c) => c.classList.add('visible'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const card = entry.target;
              const idx = parseInt(card.dataset.revealIdx || 0, 10);
              setTimeout(() => card.classList.add('visible'), idx * 80);
              observer.unobserve(card);
            }
          });
        },
        { threshold: 0.12 }
      );

      cards.forEach((card, i) => {
        card.dataset.revealIdx = i;
        observer.observe(card);
      });
    }

    return { init };
  })();


  /* ──────────────────────────────────────────────────────────────────────────
     BOOT
  ────────────────────────────────────────────────────────────────────────── */

  function boot() {
    CardTilt.init();
    CardReveal.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
