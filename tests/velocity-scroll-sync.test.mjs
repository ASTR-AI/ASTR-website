import test from 'node:test';
import assert from 'node:assert/strict';
import { initScrollSync } from '../velocity-scroll-sync.mjs';

function createMockEnvironment(initialHash = '', initialStorage = {}) {
  const listeners = new Map();
  let nextRafId = 1;
  const rafCallbacks = new Map();
  const storageData = new Map(Object.entries(initialStorage));

  const win = {
    location: {
      hash: initialHash,
      pathname: '/velocity.html',
    },
    history: {
      replaceStateCalls: [],
      replaceState(state, title, url) {
        this.replaceStateCalls.push({ state, title, url });
        if (typeof url === 'string') {
          if (url.startsWith('#')) {
            win.location.hash = url;
          } else if (url.includes('#')) {
            win.location.hash = '#' + url.split('#')[1];
          } else {
            win.location.hash = '';
          }
        }
      },
    },
    addEventListener(event, fn) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(fn);
    },
    removeEventListener(event, fn) {
      listeners.get(event)?.delete(fn);
    },
    requestAnimationFrame(cb) {
      const id = nextRafId++;
      rafCallbacks.set(id, cb);
      return id;
    },
    cancelAnimationFrame(id) {
      rafCallbacks.delete(id);
    },
  };

  const storage = {
    getItem(key) {
      return storageData.get(key) ?? null;
    },
    setItem(key, val) {
      storageData.set(key, String(val));
    },
    removeItem(key) {
      storageData.delete(key);
    },
  };

  const sections = [
    {
      id: 'overview',
      alignments: [],
      scrollIntoView(options) {
        this.alignments.push(options);
      },
    },
    {
      id: 'inventory',
      alignments: [],
      scrollIntoView(options) {
        this.alignments.push(options);
      },
    },
    {
      id: 'supply',
      alignments: [],
      scrollIntoView(options) {
        this.alignments.push(options);
      },
    },
    {
      id: 'demo',
      alignments: [],
      scrollIntoView(options) {
        this.alignments.push(options);
      },
    },
  ];

  const doc = {
    fonts: { ready: Promise.resolve() },
    getElementById(id) {
      return sections.find((s) => s.id === id) || null;
    },
    querySelectorAll(selector) {
      if (selector.includes('section') || selector.includes('#overview')) {
        return sections;
      }
      return [];
    },
  };

  let observerCallback = null;
  const observedTargets = [];
  class MockIntersectionObserver {
    constructor(cb) {
      observerCallback = cb;
    }
    observe(target) {
      observedTargets.push(target);
    }
    unobserve(target) {
      const idx = observedTargets.indexOf(target);
      if (idx !== -1) observedTargets.splice(idx, 1);
    }
    disconnect() {
      observedTargets.length = 0;
    }
  }

  return {
    win,
    doc,
    storage,
    sections,
    MockIntersectionObserver,
    flushRaf() {
      const pending = Array.from(rafCallbacks.values());
      rafCallbacks.clear();
      pending.forEach((cb) => cb());
    },
    triggerIntersection(entries) {
      observerCallback?.(entries);
    },
  };
}

test('initScrollSync restores scroll from initial hash on reload', async () => {
  const env = createMockEnvironment('#supply');
  const cleanup = initScrollSync({
    window: env.win,
    document: env.doc,
    sessionStorage: env.storage,
    IntersectionObserverClass: env.MockIntersectionObserver,
  });

  await env.doc.fonts.ready;
  env.flushRaf();

  const supplySec = env.sections.find((s) => s.id === 'supply');
  assert.equal(supplySec.alignments.length, 1);
  assert.equal(supplySec.alignments[0].block, 'start');
  cleanup();
});

test('initScrollSync falls back to sessionStorage if hash is empty', async () => {
  const env = createMockEnvironment('', { velocity_last_section: 'inventory' });
  const cleanup = initScrollSync({
    window: env.win,
    document: env.doc,
    sessionStorage: env.storage,
    IntersectionObserverClass: env.MockIntersectionObserver,
  });

  await env.doc.fonts.ready;
  env.flushRaf();

  const invSec = env.sections.find((s) => s.id === 'inventory');
  assert.equal(invSec.alignments.length, 1);
  assert.equal(env.win.location.hash, '#inventory');
  cleanup();
});

test('initScrollSync updates hash and storage when section becomes active in viewport', () => {
  const env = createMockEnvironment('');
  const cleanup = initScrollSync({
    window: env.win,
    document: env.doc,
    sessionStorage: env.storage,
    IntersectionObserverClass: env.MockIntersectionObserver,
  });

  const invSec = env.sections.find((s) => s.id === 'inventory');
  env.triggerIntersection([{ target: invSec, isIntersecting: true }]);

  assert.equal(env.storage.getItem('velocity_last_section'), 'inventory');
  assert.equal(env.win.location.hash, '#inventory');

  const overviewSec = env.sections.find((s) => s.id === 'overview');
  env.triggerIntersection([{ target: overviewSec, isIntersecting: true }]);
  assert.equal(env.storage.getItem('velocity_last_section'), 'overview');
  assert.equal(env.win.location.hash, '');

  cleanup();
});

test('initScrollSync saves and restores demo form drafts', () => {
  const env = createMockEnvironment('');
  const formListeners = new Map();
  const inputElements = {
    name: { value: '' },
    email: { value: '' },
    phone: { value: '' },
  };

  const mockForm = {
    elements: inputElements,
    querySelector(sel) {
      if (sel.includes('[name="name"]')) return inputElements.name;
      if (sel.includes('[name="email"]')) return inputElements.email;
      if (sel.includes('[name="phone"]')) return inputElements.phone;
      return null;
    },
    addEventListener(evt, handler) {
      if (!formListeners.has(evt)) formListeners.set(evt, new Set());
      formListeners.get(evt).add(handler);
    },
    removeEventListener(evt, handler) {
      formListeners.get(evt)?.delete(handler);
    },
  };

  // 1. Initial run: typing in form saves to draft
  let cleanup = initScrollSync({
    window: env.win,
    document: env.doc,
    sessionStorage: env.storage,
    demoForm: mockForm,
    IntersectionObserverClass: env.MockIntersectionObserver,
  });

  inputElements.name.value = 'Dr. Sharma';
  inputElements.email.value = 'sharma@hospital.org';
  for (const fn of formListeners.get('input') || []) {
    fn();
  }

  const savedDraft = JSON.parse(
    env.storage.getItem('velocity_demo_draft') || '{}'
  );
  assert.equal(savedDraft.name, 'Dr. Sharma');
  assert.equal(savedDraft.email, 'sharma@hospital.org');
  cleanup();

  // 2. Refresh scenario: fields start empty, init restores them
  inputElements.name.value = '';
  inputElements.email.value = '';
  cleanup = initScrollSync({
    window: env.win,
    document: env.doc,
    sessionStorage: env.storage,
    demoForm: mockForm,
    IntersectionObserverClass: env.MockIntersectionObserver,
  });

  assert.equal(inputElements.name.value, 'Dr. Sharma');
  assert.equal(inputElements.email.value, 'sharma@hospital.org');

  // 3. Submitting the form clears the draft
  for (const fn of formListeners.get('submit') || []) {
    fn();
  }
  assert.equal(env.storage.getItem('velocity_demo_draft'), null);
  cleanup();
});
