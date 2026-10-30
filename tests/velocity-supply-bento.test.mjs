import test from 'node:test';
import assert from 'node:assert/strict';
import { initSupplyBento } from '../velocity-supply-bento.mjs';

function createMockEnvironment(initialHash = '') {
  const listeners = new Map();
  let nextRafId = 1;
  const rafCallbacks = new Map();

  const win = {
    location: { hash: initialHash },
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

  const root = {
    alignments: [],
    scrollIntoView(options) {
      this.alignments.push(options);
    },
  };

  return {
    win,
    root,
    listeners,
    rafCallbacks,
    triggerHashChange(newHash) {
      win.location.hash = newHash;
      for (const fn of listeners.get('hashchange') ?? []) {
        fn();
      }
    },
    flushRaf() {
      const pending = Array.from(rafCallbacks.values());
      rafCallbacks.clear();
      for (const cb of pending) {
        cb();
      }
    },
  };
}

const flush = () => new Promise((resolve) => setImmediate(resolve));

test('missing root is harmless', () => {
  assert.doesNotThrow(() => initSupplyBento(null)());
  assert.doesNotThrow(() => initSupplyBento(undefined)());
});

test('initial #supply alignment waits for fonts', async () => {
  const env = createMockEnvironment('#supply');
  let resolveFonts;
  const ready = new Promise((resolve) => {
    resolveFonts = resolve;
  });

  const stop = initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready } },
  });

  await flush();
  assert.equal(env.root.alignments.length, 0);

  resolveFonts();
  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 1);
  assert.deepEqual(env.root.alignments[0], {
    block: 'start',
    behavior: 'instant',
  });

  stop();
});

test('other initial hashes do not trigger alignment', async () => {
  const env = createMockEnvironment('#operations');
  let resolveFonts;
  const ready = new Promise((resolve) => {
    resolveFonts = resolve;
  });

  const stop = initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready } },
  });

  resolveFonts();
  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 0);
  stop();
});

test('later #supply navigation aligns the section', async () => {
  const env = createMockEnvironment('');
  const stop = initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready: Promise.resolve() } },
  });

  await flush();
  env.flushRaf();
  assert.equal(env.root.alignments.length, 0);

  env.triggerHashChange('#supply');
  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 1);
  assert.deepEqual(env.root.alignments[0], {
    block: 'start',
    behavior: 'instant',
  });

  stop();
});

test('cleanup prevents pending alignment', async () => {
  const env = createMockEnvironment('#supply');
  let resolveFonts;
  const ready = new Promise((resolve) => {
    resolveFonts = resolve;
  });

  const stop = initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready } },
  });

  await flush();
  stop();

  resolveFonts();
  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 0);
});

test('repeated initialization does not duplicate listeners', async () => {
  const env = createMockEnvironment('');

  initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready: Promise.resolve() } },
  });
  initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready: Promise.resolve() } },
  });

  assert.equal(env.listeners.get('hashchange')?.size, 1);

  env.triggerHashChange('#supply');
  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 1);
});

test('alignOnInit: false preserves restored scroll position', async () => {
  const env = createMockEnvironment('#supply');

  const stop = initSupplyBento(env.root, {
    window: env.win,
    document: { fonts: { ready: Promise.resolve() } },
    alignOnInit: false,
  });

  await flush();
  env.flushRaf();

  assert.equal(env.root.alignments.length, 0);
  stop();
});
