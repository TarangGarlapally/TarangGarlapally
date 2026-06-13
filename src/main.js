import './style.css';
import { initUniverse } from './universe.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────────
   Lenis Smooth Scroll
   ──────────────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Connect Lenis → GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ────────────────────────────────────────────────
   Navigation
   ──────────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ────────────────────────────────────────────────
   Section Reveal Animations
   ──────────────────────────────────────────────── */
document.querySelectorAll('.section-inner').forEach((inner) => {
  ScrollTrigger.create({
    trigger: inner,
    start: 'top 85%',
    onEnter: () => inner.classList.add('revealed'),
  });
});

/* ────────────────────────────────────────────────
   Wormhole Overlay Effect
   ──────────────────────────────────────────────── */
const wormholeOverlay = document.getElementById('wormhole-overlay');
const speedLines = document.getElementById('speed-lines');

ScrollTrigger.create({
  trigger: '#scroll-container',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    const progress = self.progress;
    // Wormhole zone: 0.55 - 0.7 of total scroll
    if (progress >= 0.45 && progress <= 0.65) {
      const wormholeProgress = (progress - 0.45) / 0.2; // 0 → 1
      const intensity = Math.sin(wormholeProgress * Math.PI); // bell curve
      wormholeOverlay.style.opacity = intensity * 0.8;
      speedLines.style.opacity = intensity * 0.6;
    } else {
      wormholeOverlay.style.opacity = 0;
      speedLines.style.opacity = 0;
    }
  },
});

/* ────────────────────────────────────────────────
   Initialize Three.js Universe
   ──────────────────────────────────────────────── */
const cleanup = initUniverse();

/* ────────────────────────────────────────────────
   Remove Loader
   ──────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 800);
});
