import './components.js';
import './velocity-supply.css';
import './velocity-operations.css';
import './velocity-supply-mobile.css';
import './velocity-features-mobile.css';
import './velocity-risks-mobile.css';
import { initHeroTransition } from './velocity-hero.mjs';
import { inject, track } from '@vercel/analytics';
import { initInventoryCarousel } from './velocity-inventory.mjs';
import { initOperationsTabs } from './velocity-operations.mjs';
import { initWhyVelocity } from './velocity-why.mjs';
import { createVelocityTracker } from './velocity-analytics.mjs';
import { initVelocityConversion } from './velocity-conversion.mjs';
import { initComparisonDisclosure } from './velocity-comparison.mjs';
import { initSupplyBento } from './velocity-supply-bento.mjs';
import { initSupplyDemo } from './velocity-supply.mjs';
import { initVelocityDemoForm } from './velocity-demo-form.mjs';
import { createVelocityFormObserver } from './velocity-analytics.mjs';
import { initVelocityMotion } from './velocity-motion.mjs';
import { initMobileRail } from './velocity-mobile-rails.mjs';

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

preference.addEventListener('change', () => {
  updateReorderMotion();
});

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
let comparisonCleanup = null;
let motionCleanup = null;
function initMotion() {
  motionCleanup?.();
  motionCleanup = initVelocityMotion();
}
function initComparison() {
  comparisonCleanup?.();
  comparisonCleanup = initComparisonDisclosure(
    document.querySelector('#comparison')
  );
}
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

let demoFormCleanup = null;
function initDemoForm() {
  demoFormCleanup?.();
  const demoSection = document.querySelector('#demo');
  if (demoSection) {
    const observer = createVelocityFormObserver(velocityTracker);
    demoFormCleanup = initVelocityDemoForm(demoSection, { observer });
  }
}

let supplyCleanup = null;
let supplyDemoCleanup = null;
function initSupply(alignOnInit = true) {
  supplyCleanup?.();
  supplyDemoCleanup?.();
  const supplyEl = document.querySelector('#supply');
  supplyCleanup = initSupplyBento(supplyEl, {
    alignOnInit,
  });
  supplyDemoCleanup = initSupplyDemo(supplyEl);
}

let mobileRailsCleanup = null;
function initMobileRails() {
  mobileRailsCleanup?.();
  const cleanups = [];
  const purchaseRail = document.querySelector('[data-purchase-rail]');
  const purchaseControls = document.querySelector('[data-purchase-controls]');
  const purchasePrev = document.querySelector('[data-purchase-prev]');
  const purchaseNext = document.querySelector('[data-purchase-next]');
  if (purchaseRail && purchaseControls && purchasePrev && purchaseNext) {
    cleanups.push(
      initMobileRail({
        rail: purchaseRail,
        controls: purchaseControls,
        prevBtn: purchasePrev,
        nextBtn: purchaseNext,
      })
    );
  }

  const capsRail = document.querySelector('[data-capabilities-rail]');
  const capsControls = document.querySelector('[data-capabilities-controls]');
  const capsPrev = document.querySelector('[data-capabilities-prev]');
  const capsNext = document.querySelector('[data-capabilities-next]');
  if (capsRail && capsControls && capsPrev && capsNext) {
    cleanups.push(
      initMobileRail({
        rail: capsRail,
        controls: capsControls,
        prevBtn: capsPrev,
        nextBtn: capsNext,
      })
    );
  }

  mobileRailsCleanup = () => {
    cleanups.forEach((c) => c());
  };
}

window.addEventListener('pageshow', (event) => {
  initHero();
  initSupply(!event.persisted);
  updateReorderMotion();
  initCarousel();
  initMobileRails();
  initOperations();
  initWhy();
  initConversion();
  initComparison();
  initDemoForm();
  if (!motionCleanup) initMotion();
});

window.addEventListener('pagehide', () => {
  heroCleanup?.();
  supplyCleanup?.();
  supplyDemoCleanup?.();
  reorderObserver?.disconnect();
  inventoryCleanup?.();
  mobileRailsCleanup?.();
  operationsCleanup?.();
  whyCleanup?.();
  conversionCleanup?.();
  comparisonCleanup?.();
  demoFormCleanup?.();
  motionCleanup?.();
  motionCleanup = null;
});

initSupply();
updateReorderMotion();
initCarousel();
initMobileRails();
initOperations();
initWhy();
initConversion();
initComparison();
initDemoForm();

initHero();
initMotion();

if (import.meta.hot) {
  import.meta.hot.dispose(() => motionCleanup?.());
}
