import './components.js';
import { inject } from '@vercel/analytics';
import { initInventoryCarousel } from './velocity-inventory.mjs';

inject();

const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const supplySteps = [...document.querySelectorAll('[data-supply-step]')];
let supplyObserver;

function updateSupplyMotion() {
  supplyObserver?.disconnect();
  supplySteps.forEach((el) => el.classList.remove('is-active'));

  if (preference.matches || !('IntersectionObserver' in window)) return;

  supplyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-20% 0px -30% 0px', threshold: 0.2 }
  );

  supplySteps.forEach((el) => supplyObserver.observe(el));
}

let resizeFrame;
function onResize() {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(updateSupplyMotion);
}

preference.addEventListener('change', updateSupplyMotion);
window.addEventListener('resize', onResize);

// Inventory carousel lifecycle
let inventoryCleanup = null;
function initCarousel() {
  inventoryCleanup?.();
  const carouselRoot = document.querySelector('[data-inventory-carousel]');
  if (carouselRoot) {
    inventoryCleanup = initInventoryCarousel(carouselRoot);
  }
}

window.addEventListener('pageshow', () => {
  updateSupplyMotion();
  initCarousel();
});

window.addEventListener('pagehide', () => {
  supplyObserver?.disconnect();
  cancelAnimationFrame(resizeFrame);
  inventoryCleanup?.();
});

updateSupplyMotion();
initCarousel();
