import test from 'node:test';
import assert from 'node:assert/strict';
import { getHeroTransition } from '../velocity-hero.mjs';

test('hero stays at its initial state before pinning and lands after the range', () => {
  assert.deepEqual(getHeroTransition(50, 100, 500), {
    progress: 0,
    eased: 0,
    copyOpacity: 0,
  });
  assert.deepEqual(getHeroTransition(700, 100, 500), {
    progress: 1,
    eased: 1,
    copyOpacity: 1,
  });
});
test('mid-scroll produces a real intermediate position and readable incoming copy', () => {
  const state = getHeroTransition(300, 100, 500);
  assert.equal(state.progress, 0.5);
  assert.equal(state.eased, 0.5);
  assert.ok(state.copyOpacity > 0 && state.copyOpacity < 1);
});
test('reverse scrolling restores the same geometry without retained playback state', () => {
  const earlier = getHeroTransition(200, 100, 500);
  getHeroTransition(500, 100, 500);
  assert.deepEqual(getHeroTransition(200, 100, 500), earlier);
});
test('invalid or collapsed ranges leave the screen in its static initial state', () => {
  for (const args of [
    [100, 100, 100],
    [100, 500, 100],
    [NaN, 100, 500],
  ]) {
    assert.deepEqual(getHeroTransition(...args), {
      progress: 0,
      eased: 0,
      copyOpacity: 0,
    });
  }
});
test('easing approaches both ends gently and does not overshoot', () => {
  assert.ok(getHeroTransition(101, 100, 500).eased < 0.001);
  assert.ok(getHeroTransition(499, 100, 500).eased > 0.999);
  for (let y = 0; y <= 600; y += 10) {
    const state = getHeroTransition(y, 100, 500);
    assert.ok(state.eased >= 0 && state.eased <= 1);
    assert.ok(state.copyOpacity >= 0 && state.copyOpacity <= 1);
  }
});

import { initHeroTransition } from '../velocity-hero.mjs';

function createHeroFixture() {
  const styles = new Map();
  const classes = new Set();
  const listeners = new Map();
  const attributes = new Map();
  const mediaQueries = new Map();
  const image = {
    getAttribute: (name) => (name === 'height' ? '1842' : '2940'),
    addEventListener() {},
    removeEventListener() {},
  };
  const scene = {
    clientWidth: 1184,
    getBoundingClientRect: () => ({ top: 500 }),
    style: { setProperty: (key, value) => styles.set(key, value) },
    removeAttribute: () => styles.clear(),
  };
  const copy = {
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: (key) => attributes.delete(key),
  };
  const win = {
    innerHeight: 900,
    scrollY: 0,
    matchMedia(query) {
      if (!mediaQueries.has(query))
        mediaQueries.set(query, {
          matches: !query.includes('reduce'),
          callbacks: new Set(),
          addEventListener(_, callback) {
            this.callbacks.add(callback);
          },
          removeEventListener(_, callback) {
            this.callbacks.delete(callback);
          },
        });
      return mediaQueries.get(query);
    },
    getComputedStyle: () => ({ getPropertyValue: () => '88' }),
    addEventListener: (key, value) => listeners.set(key, value),
    removeEventListener: (key) => listeners.delete(key),
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
  };
  const nodes = {
    '[data-hero-scene]': scene,
    '[data-hero-pin]': {},
    '.v-hero-media': { querySelector: () => image },
    '[data-hero-copy]': copy,
  };
  const root = {
    ownerDocument: { defaultView: win },
    querySelector: (key) => nodes[key],
    classList: {
      toggle(key, on) {
        if (on) classes.add(key);
        else classes.delete(key);
      },
      remove: (key) => classes.delete(key),
    },
  };
  return { root, styles, classes, listeners, attributes, mediaQueries };
}

test('benefit remains available to assistive technology before visual reveal', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);
  assert.notEqual(fixture.attributes.get('aria-hidden'), 'true');
  cleanup();
});

test('motion preference changes restore static layout and cleanup removes listeners', () => {
  const fixture = createHeroFixture();
  const cleanup = initHeroTransition(fixture.root);
  assert.equal(fixture.classes.has('v-hero-motion'), true);
  const reduced = fixture.mediaQueries.get('(prefers-reduced-motion: reduce)');
  reduced.matches = true;
  for (const callback of reduced.callbacks) callback();
  assert.equal(fixture.classes.has('v-hero-motion'), false);
  assert.equal(fixture.styles.size, 0);
  reduced.matches = false;
  for (const callback of reduced.callbacks) callback();
  assert.equal(fixture.classes.has('v-hero-motion'), true);
  cleanup();
  assert.equal(fixture.listeners.size, 0);
  assert.equal(fixture.styles.size, 0);
  assert.equal(fixture.classes.size, 0);
  for (const query of fixture.mediaQueries.values())
    assert.equal(query.callbacks.size, 0);
});
