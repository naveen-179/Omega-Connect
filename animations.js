/**
 * Omega Connect — Premium Animation Controller
 * Lightweight vanilla JS: parallax, scroll reveals, ripples
 * Zero dependencies, ~3KB, 60fps
 */

(function () {
    'use strict';

    // ─── CONFIG ───────────────────────────────────────────
    const IS_MOBILE = window.matchMedia('(max-width: 768px)').matches;
    const PREFERS_REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── MOUSE PARALLAX (Desktop only) ───────────────────
    if (!IS_MOBILE && !PREFERS_REDUCED) {
        const parallaxLayers = [];
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        const LERP = 0.06; // Smooth interpolation speed

        function initParallax() {
            const landing = document.getElementById('landing-page');
            if (!landing) return;

            // Collect layers with parallax speeds
            const layers = [
                { el: landing.querySelector('.bg-blobs'), speed: 0.02 },
                { el: landing.querySelector('.bg-icons'), speed: 0.015 },
                { el: landing.querySelector('.bg-gradient-animated'), speed: 0.008 },
                { el: landing.querySelector('.hero'), speed: -0.01 },
            ];

            layers.forEach(l => {
                if (l.el) parallaxLayers.push(l);
            });

            if (parallaxLayers.length === 0) return;

            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX - window.innerWidth / 2);
                mouseY = (e.clientY - window.innerHeight / 2);
            }, { passive: true });

            requestAnimationFrame(updateParallax);
        }

        function updateParallax() {
            // Lerp for silk-smooth movement
            currentX += (mouseX - currentX) * LERP;
            currentY += (mouseY - currentY) * LERP;

            parallaxLayers.forEach(({ el, speed }) => {
                const x = currentX * speed;
                const y = currentY * speed;
                el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });

            requestAnimationFrame(updateParallax);
        }

        // Init when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initParallax);
        } else {
            initParallax();
        }
    }


    // ─── SCROLL REVEAL (IntersectionObserver) ─────────────
    function initScrollReveal() {
        if (PREFERS_REDUCED) return;

        const reveals = document.querySelectorAll('.reveal');
        if (reveals.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Stagger children if they have .reveal-child
                    const children = el.querySelectorAll('.reveal-child');
                    if (children.length > 0) {
                        children.forEach((child, i) => {
                            child.style.transitionDelay = `${i * 0.08}s`;
                            child.classList.add('revealed');
                        });
                    }

                    el.classList.add('revealed');
                    observer.unobserve(el); // Trigger once
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }


    // ─── BUTTON RIPPLE EFFECT ─────────────────────────────
    function initRipple() {
        if (PREFERS_REDUCED) return;

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-primary, .btn-secondary, .interest-chip, .gender-pill, .gender-identity-pill');
            if (!btn) return;

            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';

            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);

            ripple.addEventListener('animationend', () => ripple.remove());
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRipple);
    } else {
        initRipple();
    }


    // ─── 3D CARD TILT (Desktop only) ─────────────────────
    if (!IS_MOBILE && !PREFERS_REDUCED) {
        function initCardTilt() {
            const cards = document.querySelectorAll('.hero-card, .interests-section');

            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -3; // Max 3deg
                    const rotateY = ((x - centerX) / centerX) * 3;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

                    // Move light reflection
                    const reflection = card.querySelector('.card-reflection');
                    if (reflection) {
                        reflection.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, transparent 60%)`;
                    }
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

                    setTimeout(() => {
                        card.style.transition = '';
                    }, 500);
                });

                card.addEventListener('mouseenter', () => {
                    card.style.transition = 'none';
                });
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCardTilt);
        } else {
            initCardTilt();
        }
    }


    // ─── STAGGERED INTEREST CHIPS ENTRANCE ───────────────
    function initChipStagger() {
        if (PREFERS_REDUCED) return;

        const chips = document.querySelectorAll('.interest-chip');
        chips.forEach((chip, i) => {
            chip.style.animationDelay = `${0.6 + i * 0.04}s`;
            chip.classList.add('chip-entrance');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChipStagger);
    } else {
        initChipStagger();
    }

})();
