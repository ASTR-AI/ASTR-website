import test from 'node:test';
import assert from 'node:assert/strict';
import { initSupplyDemo } from '../velocity-supply.mjs';

function createMockElement(tagName = 'div', attrs = {}) {
  const attributes = { ...attrs };
  const classListSet = new Set((attrs.class || '').split(' ').filter(Boolean));
  const listeners = {};
  const children = [];

  const el = {
    tagName: tagName.toUpperCase(),
    attributes,
    children,
    dataset: {},
    hidden: 'hidden' in attrs,
    textContent: '',
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, val) {
      attributes[name] = String(val);
      if (name.startsWith('data-')) {
        const key = name
          .slice(5)
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        el.dataset[key] = String(val);
      }
    },
    removeAttribute(name) {
      delete attributes[name];
      if (name.startsWith('data-')) {
        const key = name
          .slice(5)
          .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        delete el.dataset[key];
      }
    },
    hasAttribute(name) {
      return name in attributes;
    },
    classList: {
      add(...cls) {
        cls.forEach((c) => classListSet.add(c));
      },
      remove(...cls) {
        cls.forEach((c) => classListSet.delete(c));
      },
      contains(c) {
        return classListSet.has(c);
      },
      toggle(c, force) {
        if (force === undefined) {
          if (classListSet.has(c)) {
            classListSet.delete(c);
            return false;
          }
          classListSet.add(c);
          return true;
        }
        if (force) {
          classListSet.add(c);
        } else {
          classListSet.delete(c);
        }
        return force;
      },
    },
    addEventListener(event, fn) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(fn);
    },
    removeEventListener(event, fn) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter((f) => f !== fn);
    },
    dispatchEvent(event) {
      const fns = listeners[event.type] || [];
      for (const fn of fns) {
        fn.call(el, { ...event, target: event.target || el });
      }
    },
    querySelector(selector) {
      return findInTree(el, selector);
    },
    querySelectorAll(selector) {
      return findAllInTree(el, selector);
    },
    matches(selector) {
      return matchesSelector(el, selector);
    },
  };

  // Sync data attributes
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('data-')) {
      const dKey = key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      el.dataset[dKey] = String(value);
    }
  }

  return el;
}

function matchesSelector(el, selector) {
  if (selector.startsWith('#'))
    return el.getAttribute('id') === selector.slice(1);
  if (selector.startsWith('.')) return el.classList.contains(selector.slice(1));
  if (selector.startsWith('[')) {
    const match = selector.match(/\[([a-zA-Z0-9_-]+)(?:="?([^"\]]+)"?)?\]/);
    if (!match) return false;
    const [, name, val] = match;
    if (val === undefined) return el.hasAttribute(name);
    return el.getAttribute(name) === val;
  }
  return el.tagName.toLowerCase() === selector.toLowerCase();
}

function findInTree(root, selector) {
  for (const child of root.children) {
    if (matchesSelector(child, selector)) return child;
    const found = findInTree(child, selector);
    if (found) return found;
  }
  return null;
}

function findAllInTree(root, selector) {
  const result = [];
  function search(node) {
    for (const child of node.children) {
      if (matchesSelector(child, selector)) result.push(child);
      search(child);
    }
  }
  search(root);
  return result;
}

function buildMockSupplyFixture() {
  const root = createMockElement('section', { id: 'supply' });
  const demo = createMockElement('figure', {
    'data-supply-demo': '',
    'data-supply-state': 'receive',
  });
  root.children.push(demo);

  const card = createMockElement('article', { 'data-supply-card': '' });
  const status = createMockElement('span', { 'data-supply-status': '' });
  status.textContent = 'Receipt recorded';
  const caption = createMockElement('p', { 'data-supply-caption': '' });
  caption.textContent =
    'Hospital store reviews the delivery and records receipt.';
  card.children.push(status, caption);

  // Table with medicines to ensure quantities don't change
  const table = createMockElement('table');
  table.textContent = '120 strips / 40 sachets';
  card.children.push(table);

  demo.children.push(card);

  const stepRequest = createMockElement('li', {
    'data-supply-step': 'request',
  });
  const stepPick = createMockElement('li', { 'data-supply-step': 'pick' });
  const stepDispatch = createMockElement('li', {
    'data-supply-step': 'dispatch',
  });
  const stepReceive = createMockElement('li', {
    'data-supply-step': 'receive',
    'aria-current': 'step',
  });
  stepReceive.classList.add('is-active');

  const journey = createMockElement('ol', { class: 'v-hospital-journey' });
  journey.children.push(stepRequest, stepPick, stepDispatch, stepReceive);
  demo.children.push(journey);

  const controls = createMockElement('div', {
    'data-supply-controls': '',
    hidden: '',
  });
  const playbackBtn = createMockElement('button', {
    'data-supply-playback': '',
    'aria-label': 'Pause workflow animation',
  });
  playbackBtn.textContent = 'Pause';
  const completeBtn = createMockElement('button', {
    'data-supply-complete': '',
  });
  completeBtn.textContent = 'Show all steps';
  controls.children.push(playbackBtn, completeBtn);
  demo.children.push(controls);

  return {
    root,
    demo,
    card,
    status,
    caption,
    table,
    steps: [stepRequest, stepPick, stepDispatch, stepReceive],
    controls,
    playbackBtn,
    completeBtn,
  };
}

class FakeClock {
  constructor() {
    this.time = 0;
    this.callbacks = new Map();
    this.nextId = 1;
  }
  now = () => this.time;
  requestAnimationFrame = (fn) => {
    const id = this.nextId++;
    this.callbacks.set(id, fn);
    return id;
  };
  cancelAnimationFrame = (id) => {
    this.callbacks.delete(id);
  };
  tick(ms) {
    this.time += ms;
    const queued = [...this.callbacks.entries()];
    this.callbacks.clear();
    for (const [, fn] of queued) {
      fn(this.time);
    }
  }
}

class FakeIntersectionObserver {
  static instances = [];
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = options;
    this.targets = new Set();
    FakeIntersectionObserver.instances.push(this);
  }
  observe(el) {
    this.targets.add(el);
  }
  unobserve(el) {
    this.targets.delete(el);
  }
  disconnect() {
    this.targets.clear();
  }
  trigger(entry) {
    this.callback([entry], this);
  }
}

class FakeMediaQueryList {
  constructor(matches = false) {
    this.matches = matches;
    this.listeners = new Set();
  }
  addEventListener(event, fn) {
    if (event === 'change') this.listeners.add(fn);
  }
  removeEventListener(event, fn) {
    if (event === 'change') this.listeners.delete(fn);
  }
  setMatches(value) {
    this.matches = value;
    for (const fn of this.listeners) {
      fn({ matches: value });
    }
  }
}

function createEnvironment(options = {}) {
  const clock = new FakeClock();
  FakeIntersectionObserver.instances = [];

  const mediaQuery = new FakeMediaQueryList(options.reducedMotion ?? false);
  const docListeners = {};

  const fakeDocument = {
    hidden: options.hidden ?? false,
    addEventListener(event, fn) {
      if (!docListeners[event]) docListeners[event] = [];
      docListeners[event].push(fn);
    },
    removeEventListener(event, fn) {
      if (!docListeners[event]) return;
      docListeners[event] = docListeners[event].filter((f) => f !== fn);
    },
    setHidden(val) {
      this.hidden = val;
      const fns = docListeners.visibilitychange || [];
      for (const fn of fns) fn();
    },
  };

  const fakeWindow = {
    matchMedia: (query) => {
      if (query.includes('prefers-reduced-motion')) return mediaQuery;
      return new FakeMediaQueryList(false);
    },
    IntersectionObserver:
      options.hasObserver !== false ? FakeIntersectionObserver : undefined,
    requestAnimationFrame: clock.requestAnimationFrame,
    cancelAnimationFrame: clock.cancelAnimationFrame,
  };

  return {
    clock,
    fakeWindow,
    fakeDocument,
    mediaQuery,
    getObserver: () => FakeIntersectionObserver.instances[0],
  };
}

function setup(options = {}) {
  const fixture = buildMockSupplyFixture();
  const env = createEnvironment(options);
  const cleanup = initSupplyDemo(fixture.root, {
    window: env.fakeWindow,
    document: env.fakeDocument,
    now: env.clock.now,
  });
  const intersect = (visible) =>
    env.getObserver()?.trigger({
      target: fixture.card,
      isIntersecting: visible,
      intersectionRatio: visible ? 1 : 0,
    });
  return { fixture, env, cleanup, intersect };
}

test('loops all four stages automatically at five-second intervals', () => {
  const { fixture: f, env, cleanup, intersect } = setup();
  env.clock.tick(10000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'receive');
  intersect(true);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  for (const stage of ['pick', 'dispatch', 'receive', 'request', 'pick']) {
    env.clock.tick(5000);
    assert.equal(f.demo.getAttribute('data-supply-state'), stage);
    assert.equal(f.playbackBtn.textContent, 'Pause');
  }
  assert.equal(f.table.textContent, '120 strips / 40 sachets');
  cleanup();
  assert.equal(env.clock.callbacks.size, 0);
});

test('pause and resume preserve remaining reading time across cycles', () => {
  const { fixture: f, env, cleanup, intersect } = setup();
  intersect(true);
  env.clock.tick(2500);
  f.playbackBtn.dispatchEvent({ type: 'click' });
  assert.equal(f.playbackBtn.textContent, 'Resume');
  env.clock.tick(20000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  f.playbackBtn.dispatchEvent({ type: 'click' });
  env.clock.tick(2500);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'pick');
  env.clock.tick(15000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  cleanup();
});

test('steps and former forwarding controls do not navigate or stop autoplay', () => {
  const { fixture: f, env, cleanup, intersect } = setup();
  intersect(true);
  f.steps[3].dispatchEvent({ type: 'click' });
  f.completeBtn.dispatchEvent({ type: 'click' });
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  env.clock.tick(5000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'pick');
  cleanup();
});

test('offscreen and hidden tabs suspend elapsed time without overriding pause', () => {
  const { fixture: f, env, cleanup, intersect } = setup();
  intersect(true);
  env.clock.tick(1000);
  intersect(false);
  env.clock.tick(10000);
  intersect(true);
  env.clock.tick(4000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'pick');
  env.fakeDocument.setHidden(true);
  env.clock.tick(10000);
  env.fakeDocument.setHidden(false);
  env.clock.tick(5000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'dispatch');
  f.playbackBtn.dispatchEvent({ type: 'click' });
  env.fakeDocument.setHidden(true);
  env.fakeDocument.setHidden(false);
  env.clock.tick(10000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'dispatch');
  cleanup();
});

test('reduced motion is static initially and when enabled during playback', () => {
  const first = setup({ reducedMotion: true });
  assert.equal(first.fixture.controls.hidden, true);
  assert.equal(first.env.clock.callbacks.size, 0);
  assert.equal(first.fixture.demo.getAttribute('data-supply-state'), 'receive');
  first.cleanup();
  const { fixture: f, env, cleanup, intersect } = setup();
  intersect(true);
  env.mediaQuery.setMatches(true);
  assert.equal(f.controls.hidden, true);
  assert.equal(env.clock.callbacks.size, 0);
  env.mediaQuery.setMatches(false);
  intersect(false);
  intersect(true);
  env.clock.tick(20000);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'receive');
  assert.equal(env.clock.callbacks.size, 0);
  cleanup();
});

test('missing markup and missing observer fail safely; cleanup is idempotent', () => {
  assert.doesNotThrow(() => initSupplyDemo(null)());
  assert.doesNotThrow(() => initSupplyDemo(createMockElement())());
  const { fixture: f, env, cleanup } = setup({ hasObserver: false });
  assert.equal(f.controls.hidden, true);
  assert.equal(env.clock.callbacks.size, 0);
  cleanup();
  cleanup();
});

test('real deck hides inactive documents and cleans up outgoing animation state', () => {
  const f = buildMockSupplyFixture();
  const cards = Array.from({ length: 4 }, (_, i) =>
    createMockElement('article', {
      class: `v-supply-shuffle-card tier-${i}`,
    })
  );
  f.card.children.push(...cards);
  const env = createEnvironment();
  const cleanup = initSupplyDemo(f.root, {
    window: env.fakeWindow,
    document: env.fakeDocument,
    now: env.clock.now,
  });
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  assert.deepEqual(
    cards.map((c) => c.getAttribute('aria-hidden')),
    ['false', 'true', 'true', 'true']
  );
  env
    .getObserver()
    .trigger({ target: f.card, isIntersecting: true, intersectionRatio: 1 });
  env.clock.tick(5000);
  assert.equal(cards[0].hasAttribute('data-shuffling'), true);
  assert.equal(cards[1].getAttribute('aria-hidden'), 'false');
  assert.equal(
    f.status.textContent,
    'Receipt recorded',
    'individual document content is not rewritten'
  );
  f.card.dispatchEvent({ type: 'animationend', target: cards[0] });
  assert.equal(cards[0].hasAttribute('data-shuffling'), false);
  cleanup();
  assert.equal(f.demo.hasAttribute('data-supply-enhanced'), false);
  assert.ok(cards.every((c) => !c.hasAttribute('aria-hidden')));
});

test('resizing switches between desktop autoplay and manual phone selection without stale state', () => {
  const f = buildMockSupplyFixture();
  const cards = Array.from({ length: 4 }, (_, i) =>
    createMockElement('article', {
      class: `v-supply-document v-supply-shuffle-card tier-${i}`,
      id: `supply-card-${i}`,
    })
  );
  const mobileSteps = ['request', 'pick', 'dispatch', 'receive'].map((id, i) =>
    createMockElement('a', {
      'data-supply-mobile-step': id,
      href: `#supply-card-${i}`,
    })
  );
  f.card.children.push(...cards);
  f.demo.children.push(...mobileSteps);
  const fullExample = createMockElement('details', { 'data-supply-full-example': '' });
  fullExample.open = true;
  const compactSummary = createMockElement('div', { 'data-supply-mobile-summary': '', hidden: '' });
  f.demo.children.push(fullExample, compactSummary);
  const env = createEnvironment();
  const phone = new FakeMediaQueryList(false);
  const originalMatchMedia = env.fakeWindow.matchMedia;
  env.fakeWindow.matchMedia = (query) =>
    query.includes('max-width: 767px') ? phone : originalMatchMedia(query);
  const cleanup = initSupplyDemo(f.root, {
    window: env.fakeWindow,
    document: env.fakeDocument,
    now: env.clock.now,
  });
  env
    .getObserver()
    .trigger({ target: f.card, isIntersecting: true, intersectionRatio: 1 });
  assert.equal(env.clock.callbacks.size, 1);
  phone.setMatches(true);
  assert.equal(env.clock.callbacks.size, 0);
  assert.equal(fullExample.open, false);
  assert.equal(compactSummary.hidden, false);
  assert.equal(f.controls.hidden, true);
  assert.equal(f.demo.hasAttribute('data-supply-enhanced'), false);
  mobileSteps[3].dispatchEvent({ type: 'click', preventDefault() {} });
  assert.deepEqual(
    cards.map((c) => c.hidden),
    [true, true, true, false]
  );
  phone.setMatches(false);
  assert.equal(fullExample.open, true);
  assert.equal(compactSummary.hidden, true);
  assert.ok(cards.every((c) => !c.hidden));
  assert.equal(f.controls.hidden, false);
  assert.equal(f.demo.hasAttribute('data-supply-enhanced'), true);
  assert.equal(f.demo.hasAttribute('data-supply-manual'), false);
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  phone.setMatches(true);
  mobileSteps[1].dispatchEvent({ type: 'click', preventDefault() {} });
  assert.deepEqual(
    cards.map((c) => c.hidden),
    [true, false, true, true]
  );
  cleanup();
  assert.ok(cards.every((c) => !c.hidden));
  assert.equal(env.clock.callbacks.size, 0);
});
