import test from 'node:test';
import assert from 'node:assert/strict';
import { initCardSpotlight } from '../velocity-motion.mjs';

function createMockElement(tag, className = '') {
  const listeners = new Map();
  const classes = new Set(className.split(' ').filter(Boolean));
  const styleProps = new Map();

  return {
    tagName: tag.toUpperCase(),
    classList: {
      add(...names) {
        names.forEach((n) => classes.add(n));
      },
      remove(...names) {
        names.forEach((n) => classes.delete(n));
      },
      contains(name) {
        return classes.has(name);
      },
    },
    style: {
      setProperty(prop, val) {
        styleProps.set(prop, String(val));
      },
      removeProperty(prop) {
        styleProps.delete(prop);
      },
      getPropertyValue(prop) {
        return styleProps.get(prop) || '';
      },
    },
    getBoundingClientRect() {
      return { left: 100, top: 200, width: 300, height: 200 };
    },
    addEventListener(event, fn) {
      if (!listeners.has(event)) listeners.set(event, []);
      listeners.get(event).push(fn);
    },
    removeEventListener(event, fn) {
      const arr = listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(fn);
        if (idx !== -1) arr.splice(idx, 1);
      }
    },
    dispatchEvent(event) {
      const arr = listeners.get(event.type) || [];
      for (const fn of arr) {
        fn(event);
      }
    },
  };
}

function setupMockWindow({ reducedMotion = false, finePointer = true } = {}) {
  const originalWindow = globalThis.window;
  globalThis.window = {
    matchMedia(query) {
      if (query.includes('prefers-reduced-motion: reduce')) {
        return {
          matches: reducedMotion,
          addEventListener: () => {},
          removeEventListener: () => {},
        };
      }
      if (query.includes('pointer: fine') || query.includes('hover: hover')) {
        return {
          matches: finePointer,
          addEventListener: () => {},
          removeEventListener: () => {},
        };
      }
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      };
    },
  };
  return () => {
    globalThis.window = originalWindow;
  };
}

test('initCardSpotlight handles missing or empty root safely', () => {
  const restore = setupMockWindow();
  try {
    const cleanupNull = initCardSpotlight(null);
    assert.equal(typeof cleanupNull, 'function');
    cleanupNull();

    const emptyRoot = { querySelectorAll: () => [] };
    const cleanupEmpty = initCardSpotlight(emptyRoot);
    assert.equal(typeof cleanupEmpty, 'function');
    cleanupEmpty();
  } finally {
    restore();
  }
});

test('initCardSpotlight attaches ambient spotlight to cards on desktop and cleans up cleanly', () => {
  const restore = setupMockWindow({ reducedMotion: false, finePointer: true });
  try {
    const card1 = createMockElement('article', 'v-inventory-card');
    const card2 = createMockElement('div', 'v-reorder-panel');
    const mockRoot = {
      querySelectorAll: (sel) => {
        if (sel.includes('v-inventory-card')) return [card1, card2];
        return [];
      },
    };

    const cleanup = initCardSpotlight(mockRoot);

    assert.ok(card1.classList.contains('v-ambient-card'));
    assert.ok(card2.classList.contains('v-ambient-card'));

    // Pointer enter adds spotlight
    card1.dispatchEvent({ type: 'pointerenter' });
    assert.ok(card1.classList.contains('has-spotlight'));

    // Pointer move sets CSS variables relative to bounding rect (clientX: 150 - left: 100 = 50px)
    card1.dispatchEvent({ type: 'pointermove', clientX: 150, clientY: 260 });
    assert.equal(card1.style.getPropertyValue('--spotlight-x'), '50px');
    assert.equal(card1.style.getPropertyValue('--spotlight-y'), '60px');

    // Pointer leave removes spotlight
    card1.dispatchEvent({ type: 'pointerleave' });
    assert.equal(card1.classList.contains('has-spotlight'), false);

    // Cleanup removes classes and variables
    cleanup();
    assert.equal(card1.classList.contains('v-ambient-card'), false);
    assert.equal(card2.classList.contains('v-ambient-card'), false);
    assert.equal(card1.style.getPropertyValue('--spotlight-x'), '');
    assert.equal(card1.style.getPropertyValue('--spotlight-y'), '');
  } finally {
    restore();
  }
});

test('initCardSpotlight respects prefers-reduced-motion and touch-only devices', () => {
  // Test reduced motion
  const restoreReduced = setupMockWindow({
    reducedMotion: true,
    finePointer: true,
  });
  try {
    const card = createMockElement('article', 'v-inventory-card');
    const mockRoot = { querySelectorAll: () => [card] };
    const cleanup = initCardSpotlight(mockRoot);
    assert.equal(card.classList.contains('v-ambient-card'), false);
    cleanup();
  } finally {
    restoreReduced();
  }

  // Test touch device (finePointer = false)
  const restoreTouch = setupMockWindow({
    reducedMotion: false,
    finePointer: false,
  });
  try {
    const card = createMockElement('article', 'v-inventory-card');
    const mockRoot = { querySelectorAll: () => [card] };
    const cleanup = initCardSpotlight(mockRoot);
    assert.equal(card.classList.contains('v-ambient-card'), false);
    cleanup();
  } finally {
    restoreTouch();
  }
});
