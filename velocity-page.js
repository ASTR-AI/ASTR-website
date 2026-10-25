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

preference.addEventListener('change', () => {
  updateSupplyMotion();
  updateReorderMotion();
});
window.addEventListener('resize', onResize);

// Reorder showcase entrance animation
const reorderPanel = document.querySelector('[data-reorder-panel]');
const reorderCard = document.querySelector('[data-reorder-card]');
let reorderObserver;
let reorderTriggered = false;

function updateReorderMotion() {
  reorderObserver?.disconnect();
  if (!reorderPanel || !reorderCard) return;

  if (preference.matches || !('IntersectionObserver' in window)) {
    reorderPanel.classList.remove('v-has-reorder-motion');
    reorderCard.classList.add('is-revealed');
    return;
  }

  if (reorderTriggered) {
    reorderCard.classList.add('is-revealed');
    return;
  }

  reorderPanel.classList.add('v-has-reorder-motion');

  reorderObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reorderTriggered = true;
          reorderCard.classList.add('is-revealed');
          reorderObserver?.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  reorderObserver.observe(reorderPanel);
}

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
  updateReorderMotion();
  initCarousel();
});

window.addEventListener('pagehide', () => {
  supplyObserver?.disconnect();
  reorderObserver?.disconnect();
  cancelAnimationFrame(resizeFrame);
  inventoryCleanup?.();
});

updateSupplyMotion();
updateReorderMotion();
initCarousel();
