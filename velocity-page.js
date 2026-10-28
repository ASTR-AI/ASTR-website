import './components.js';
import { initHeroTransition } from './velocity-hero.mjs';
import { inject, track } from '@vercel/analytics';
import { initInventoryCarousel } from './velocity-inventory.mjs';
import { initOperationsTabs } from './velocity-operations.mjs';
import { initWhyVelocity } from './velocity-why.mjs';
import { createVelocityTracker } from './velocity-analytics.mjs';
import { initVelocityConversion } from './velocity-conversion.mjs';

inject();
const velocityTracker = createVelocityTracker(track);

// Native disclosures keep every navigation link usable without JavaScript.
const productHeader = document.querySelector('[data-product-header]');
const productMenu = document.querySelector('[data-product-menu]');
const productFeatures = document.querySelector('[data-product-features]');
const compactNavigation = window.matchMedia('(max-width: 900px)');

if (productHeader && productMenu && productFeatures) {
  const closeNavigation = () => {
    productFeatures.open = false;
    if (compactNavigation.matches) productMenu.open = false;
  };
  const syncNavigation = () => {
    productMenu.open = !compactNavigation.matches;
    productFeatures.open = false;
  };
  syncNavigation();
  compactNavigation.addEventListener('change', syncNavigation);
  productHeader.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNavigation();
  });
  productHeader.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (productFeatures.open) {
      productFeatures.open = false;
      productFeatures.querySelector('summary').focus();
    } else if (compactNavigation.matches && productMenu.open) {
      productMenu.open = false;
      productMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!productHeader.contains(event.target)) closeNavigation();
  });
  productMenu.addEventListener('toggle', () => {
    if (!productMenu.open) productFeatures.open = false;
  });
  window.addEventListener('pageshow', syncNavigation);
}

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
let operationsCleanup = null;
let whyCleanup = null;
function initOperations() {
  operationsCleanup?.();
  operationsCleanup = initOperationsTabs(
    document.querySelector('[data-operations]')
  );
}
function initWhy() {
  whyCleanup?.();
  const whyRoot = document.querySelector('[data-why-root]');
  if (whyRoot) {
    whyCleanup = initWhyVelocity(whyRoot);
  }
}
function initCarousel() {
  inventoryCleanup?.();
  const carouselRoot = document.querySelector('[data-inventory-carousel]');
  if (carouselRoot) {
    inventoryCleanup = initInventoryCarousel(carouselRoot);
  }
}

let conversionCleanup = null;
function initConversion() {
  conversionCleanup?.();
  try {
    conversionCleanup = initVelocityConversion(document.body, {
      trackEvent: velocityTracker,
    });
  } catch {
    // An isolated conversion exception must leave other helpers running
  }
}

let heroCleanup = null;
function initHero() {
  heroCleanup?.();
  heroCleanup = initHeroTransition(
    document.querySelector('[data-hero-transition]')
  );
}

window.addEventListener('pageshow', () => {
  initHero();
  updateSupplyMotion();
  updateReorderMotion();
  initCarousel();
  initOperations();
  initWhy();
  initConversion();
});

window.addEventListener('pagehide', () => {
  heroCleanup?.();
  supplyObserver?.disconnect();
  reorderObserver?.disconnect();
  cancelAnimationFrame(resizeFrame);
  inventoryCleanup?.();
  operationsCleanup?.();
  whyCleanup?.();
  conversionCleanup?.();
});

updateSupplyMotion();
updateReorderMotion();
initCarousel();
initOperations();
initWhy();
initConversion();

initHero();
