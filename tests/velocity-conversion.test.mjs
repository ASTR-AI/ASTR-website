import test from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldShowConversionBar,
  initVelocityConversion,
} from '../velocity-conversion.mjs';

test('shouldShowConversionBar truth table: true only when mobile, hero passed, and no blocking flag', () => {
  // All valid case
  assert.equal(
    shouldShowConversionBar({
      isMobile: true,
      heroPassed: true,
      demoVisible: false,
      menuOpen: false,
      focusInContent: false,
    }),
    true
  );

  // Each individual false condition
  assert.equal(
    shouldShowConversionBar({
      isMobile: false,
      heroPassed: true,
      demoVisible: false,
      menuOpen: false,
      focusInContent: false,
    }),
    false
  );

  assert.equal(
    shouldShowConversionBar({
      isMobile: true,
      heroPassed: false,
      demoVisible: false,
      menuOpen: false,
      focusInContent: false,
    }),
    false
  );

  assert.equal(
    shouldShowConversionBar({
      isMobile: true,
      heroPassed: true,
      demoVisible: true,
      menuOpen: false,
      focusInContent: false,
    }),
    false
  );

  assert.equal(
    shouldShowConversionBar({
      isMobile: true,
      heroPassed: true,
      demoVisible: false,
      menuOpen: true,
      focusInContent: false,
    }),
    false
  );

  assert.equal(
    shouldShowConversionBar({
      isMobile: true,
      heroPassed: true,
      demoVisible: false,
      menuOpen: false,
      focusInContent: true,
    }),
    false
  );

  // Multiple false conditions
  assert.equal(
    shouldShowConversionBar({
      isMobile: false,
      heroPassed: false,
      demoVisible: true,
      menuOpen: true,
      focusInContent: true,
    }),
    false
  );
});

test('initVelocityConversion handles null or missing root safely', () => {
  const cleanup = initVelocityConversion(null);
  assert.equal(typeof cleanup, 'function');
  assert.doesNotThrow(() => cleanup());
  assert.doesNotThrow(() => cleanup());
});

test('delegated CTA click fires trackEvent with placement and action without altering navigation', () => {
  const events = [];
  const trackEvent = (name, props) => events.push({ name, props });

  // Minimal fake DOM root
  const listeners = {};
  const fakeElement = {
    dataset: { placement: 'hero', action: 'demo' },
    getAttribute(name) {
      if (name === 'data-placement') return 'hero';
      if (name === 'data-action') return 'demo';
      return null;
    },
    closest(selector) {
      if (selector === '[data-velocity-cta]') return this;
      return null;
    },
  };

  const fakeRoot = {
    querySelector(selector) {
      if (selector === '[data-conversion-bar]') {
        return {
          hidden: true,
          offsetHeight: 60,
          getBoundingClientRect: () => ({
            top: 800,
            bottom: 860,
            left: 0,
            right: 390,
          }),
        };
      }
      return null;
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      if (listeners[event] === fn) delete listeners[event];
    },
    style: {
      setProperty() {},
      removeProperty() {},
    },
  };

  const cleanup = initVelocityConversion(fakeRoot, { trackEvent });

  // Simulate click on CTA
  assert.equal(typeof listeners.click, 'function');
  listeners.click({ target: fakeElement });

  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    name: 'velocity_cta_click',
    props: { placement: 'hero', action: 'demo' },
  });

  // Simulate click on non-CTA
  listeners.click({
    target: {
      closest() {
        return null;
      },
    },
  });
  assert.equal(events.length, 1);

  // Cleanup removes listener
  cleanup();
  assert.equal(listeners.click, undefined);

  // Double cleanup is safe
  assert.doesNotThrow(() => cleanup());
});

test('absent IntersectionObserver leaves conversion bar hidden but preserves delegated clicks', () => {
  const events = [];
  const trackEvent = (name, props) => events.push({ name, props });

  const listeners = {};
  const bar = { hidden: true };
  const cta = {
    dataset: { placement: 'mobile', action: 'demo' },
    getAttribute: () => 'demo',
    closest: (sel) => (sel === '[data-velocity-cta]' ? cta : null),
  };

  const fakeRoot = {
    querySelector(selector) {
      if (selector === '[data-conversion-bar]') return bar;
      return null;
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      if (listeners[event] === fn) delete listeners[event];
    },
    style: { setProperty() {}, removeProperty() {} },
  };

  // Node environment does not have IntersectionObserver
  const cleanup = initVelocityConversion(fakeRoot, { trackEvent });

  assert.equal(bar.hidden, true);
  listeners.click({ target: cta });
  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    name: 'velocity_cta_click',
    props: { placement: 'mobile', action: 'demo' },
  });

  cleanup();
});

test('initVelocityConversion is idempotent and handles trackEvent exceptions safely', () => {
  const events = [];
  const throwingTrackEvent = () => {
    throw new Error('Analytics transport crashed');
  };

  const listeners = {};
  const cta = {
    dataset: { placement: 'final', action: 'demo' },
    getAttribute: () => 'demo',
    closest: (sel) => (sel === '[data-velocity-cta]' ? cta : null),
  };

  const fakeRoot = {
    querySelector() {
      return null;
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      if (listeners[event] === fn) delete listeners[event];
    },
    style: { setProperty() {}, removeProperty() {} },
  };

  // First init with error-throwing tracker
  const cleanup1 = initVelocityConversion(fakeRoot, {
    trackEvent: throwingTrackEvent,
  });
  assert.doesNotThrow(() => {
    listeners.click({ target: cta });
  });
  assert.doesNotThrow(() => cleanup1());

  // Second init on same root should cleanly replace first without duplicating clicks
  const normalTrackEvent = (name, props) => events.push({ name, props });
  const cleanup2 = initVelocityConversion(fakeRoot, {
    trackEvent: normalTrackEvent,
  });

  listeners.click({ target: cta });
  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    name: 'velocity_cta_click',
    props: { placement: 'final', action: 'demo' },
  });

  cleanup2();
  assert.equal(listeners.click, undefined);
});
