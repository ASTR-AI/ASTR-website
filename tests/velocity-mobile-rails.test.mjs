import test from 'node:test';
import assert from 'node:assert/strict';
import { getRailNavState, initMobileRail } from '../velocity-mobile-rails.mjs';

test('getRailNavState: disables prev at start and next at end', () => {
  // At start
  const atStart = getRailNavState(0, 300);
  assert.equal(atStart.canScrollPrev, false);
  assert.equal(atStart.canScrollNext, true);

  // In middle
  const inMiddle = getRailNavState(150, 300);
  assert.equal(inMiddle.canScrollPrev, true);
  assert.equal(inMiddle.canScrollNext, true);

  // At end
  const atEnd = getRailNavState(300, 300);
  assert.equal(atEnd.canScrollPrev, true);
  assert.equal(atEnd.canScrollNext, false);

  // No overflow
  const noOverflow = getRailNavState(0, 0);
  assert.equal(noOverflow.canScrollPrev, false);
  assert.equal(noOverflow.canScrollNext, false);
});

test('initMobileRail: handles missing or null parameters safely', () => {
  assert.doesNotThrow(() => {
    const cleanup = initMobileRail(null);
    cleanup();
  });

  assert.doesNotThrow(() => {
    const cleanup = initMobileRail({});
    cleanup();
  });
});

test('initMobileRail: independent instances do not leak state', () => {
  const createMockRail = (scrollLeft = 0, scrollWidth = 600, clientWidth = 300) => {
    const listeners = {};
    return {
      scrollLeft,
      scrollWidth,
      clientWidth,
      children: [],
      addEventListener(type, fn) {
        listeners[type] = listeners[type] || [];
        listeners[type].push(fn);
      },
      removeEventListener(type, fn) {
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter((cb) => cb !== fn);
      },
      scrollBy({ left }) {
        this.scrollLeft += left;
        (listeners['scroll'] || []).forEach((fn) => fn());
      },
    };
  };

  const createMockButton = () => {
    const listeners = {};
    return {
      disabled: false,
      addEventListener(type, fn) {
        listeners[type] = listeners[type] || [];
        listeners[type].push(fn);
      },
      removeEventListener(type, fn) {
        if (!listeners[type]) return;
        listeners[type] = listeners[type].filter((cb) => cb !== fn);
      },
      click() {
        (listeners['click'] || []).forEach((fn) => fn({ preventDefault: () => {} }));
      },
    };
  };

  const rail1 = createMockRail(0, 500, 250);
  const controls1 = { hidden: true };
  const prev1 = createMockButton();
  const next1 = createMockButton();

  const rail2 = createMockRail(250, 500, 250);
  const controls2 = { hidden: true };
  const prev2 = createMockButton();
  const next2 = createMockButton();

  const cleanup1 = initMobileRail({
    rail: rail1,
    controls: controls1,
    prevBtn: prev1,
    nextBtn: next1,
  });

  const cleanup2 = initMobileRail({
    rail: rail2,
    controls: controls2,
    prevBtn: prev2,
    nextBtn: next2,
  });

  // Check controls are unhidden
  assert.equal(controls1.hidden, false);
  assert.equal(controls2.hidden, false);

  // Rail 1 is at start: prev disabled, next enabled
  assert.equal(prev1.disabled, true);
  assert.equal(next1.disabled, false);

  // Rail 2 is at end: prev enabled, next disabled
  assert.equal(prev2.disabled, false);
  assert.equal(next2.disabled, true);

  // Cleanup should re-hide controls
  cleanup1();
  assert.equal(controls1.hidden, true);
  assert.equal(controls2.hidden, false);

  cleanup2();
  assert.equal(controls2.hidden, true);
});
