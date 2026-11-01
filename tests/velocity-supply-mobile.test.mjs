import test from 'node:test';
import assert from 'node:assert/strict';
import { initMobileSupplyDemo as initSupplyDemo } from '../velocity-supply-mobile.mjs';

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

function fixture() {
  const root = createMockElement('section');
  const demo = createMockElement('div', { 'data-supply-demo': '' });
  const deck = createMockElement('div', { 'data-supply-card': '' });
  const stages = ['request', 'pick', 'dispatch', 'receive'];
  const steps = stages.map((stage, index) =>
    createMockElement('a', {
      'data-supply-mobile-step': stage,
      href: `#supply-card-${index}`,
    })
  );
  const cards = stages.map((stage, index) => {
    const card = createMockElement('article', {
      class: 'v-supply-document',
      id: `supply-card-${index}`,
    });
    card.textContent = `${stage}: 120 strips / 40 sachets`;
    return card;
  });
  deck.children.push(...cards);
  const fullExample = createMockElement('details', {
    'data-supply-full-example': '',
  });
  fullExample.open = true;
  fullExample.children.push(deck);
  const summary = createMockElement('div', {
    'data-supply-mobile-summary': '',
    hidden: '',
  });
  const owner = createMockElement('p', { 'data-supply-summary-owner': '' });
  const title = createMockElement('h3', { 'data-supply-summary-title': '' });
  const verified = createMockElement('span', {
    'data-supply-summary-verified': '',
    hidden: '',
  });
  summary.children.push(owner, title, verified);
  demo.children.push(...steps, summary, fullExample);
  root.children.push(demo);
  return {
    root,
    demo,
    steps,
    cards,
    summary,
    owner,
    title,
    verified,
    fullExample,
  };
}

function click(element, options = {}) {
  let prevented = false;
  element.dispatchEvent({
    type: 'click',
    preventDefault() {
      prevented = true;
    },
    ...options,
  });
  return prevented;
}

test('shows the first document and marks its workflow step without browser observers', () => {
  const f = fixture();
  const cleanup = initSupplyDemo(f.root);
  assert.deepEqual(
    f.cards.map((c) => c.hidden),
    [false, true, true, true]
  );
  assert.equal(f.steps[0].getAttribute('aria-current'), 'step');
  assert.equal(f.demo.getAttribute('data-supply-state'), 'request');
  cleanup();
});

test('selecting each chronological step shows only its matching document without navigation', () => {
  const f = fixture();
  const cleanup = initSupplyDemo(f.root);
  for (const index of [1, 3, 2, 0]) {
    assert.equal(click(f.steps[index]), true);
    assert.equal(f.cards.filter((c) => !c.hidden).length, 1);
    assert.equal(f.cards[index].hidden, false);
    assert.equal(f.steps[index].getAttribute('aria-current'), 'step');
    assert.equal(
      f.steps.filter((s) => s.hasAttribute('aria-current')).length,
      1
    );
  }
  assert.equal(f.cards[3].textContent, 'receive: 120 strips / 40 sachets');
  cleanup();
});

test('does not start timers or observers when the preview is initialized', () => {
  const f = fixture();
  const forbidden = () => {
    throw new Error('automatic playback is not allowed');
  };
  const cleanup = initSupplyDemo(f.root, {
    window: {
      requestAnimationFrame: forbidden,
      setInterval: forbidden,
      IntersectionObserver: forbidden,
      matchMedia: forbidden,
    },
  });
  click(f.steps[2]);
  assert.equal(f.cards[2].hidden, false);
  cleanup();
});

test('cleanup restores all documents and native links; repeated initialization has one handler', () => {
  const f = fixture();
  initSupplyDemo(f.root);
  const cleanup = initSupplyDemo(f.root);
  click(f.steps[3]);
  assert.equal(f.cards[3].hidden, false);
  cleanup();
  cleanup();
  assert.ok(f.cards.every((c) => !c.hidden));
  assert.ok(f.steps.every((s) => !s.hasAttribute('aria-current')));
  assert.equal(f.demo.hasAttribute('data-supply-manual'), false);
  assert.equal(click(f.steps[1]), false);
});

test('modifier clicks retain native link behavior', () => {
  const f = fixture();
  const cleanup = initSupplyDemo(f.root);
  assert.equal(click(f.steps[2], { metaKey: true }), false);
  assert.equal(click(f.steps[2], { ctrlKey: true }), false);
  assert.equal(f.cards[0].hidden, false);
  cleanup();
});

test('direct document links initialize the corresponding workflow step', () => {
  const f = fixture();
  f.root.ownerDocument = {
    defaultView: { location: { hash: '#supply-card-2' } },
  };
  const cleanup = initSupplyDemo(f.root);
  assert.equal(f.cards[2].hidden, false);
  assert.equal(f.steps[2].getAttribute('aria-current'), 'step');
  assert.equal(f.cards.filter((c) => !c.hidden).length, 1);
  cleanup();
});

test('missing or unmatched documents leave the static fallback intact', () => {
  assert.doesNotThrow(() => initSupplyDemo(null)());
  const f = fixture();
  f.cards[2].setAttribute('id', 'unmatched-document');
  const cleanup = initSupplyDemo(f.root);
  assert.ok(f.cards.every((c) => !c.hidden));
  assert.equal(click(f.steps[1]), false);
  cleanup();
});

test('phone starts with a compact outcome and keeps the full example closed', () => {
  const f = fixture();
  const cleanup = initSupplyDemo(f.root);
  assert.equal(f.summary.hidden, false);
  assert.equal(f.fullExample.open, false);
  assert.equal(f.owner.textContent, 'Hospital store');
  assert.equal(f.verified.hidden, true);
  click(f.steps[3]);
  assert.equal(f.title.textContent, 'Receipt recorded');
  assert.equal(f.owner.textContent, 'Hospital store');
  assert.equal(f.verified.hidden, false);
  cleanup();
});

test('changing steps closes an expanded example; cleanup restores the desktop preview', () => {
  const f = fixture();
  const cleanup = initSupplyDemo(f.root);
  f.fullExample.open = true;
  click(f.steps[1]);
  assert.equal(f.fullExample.open, false);
  assert.equal(f.owner.textContent, 'Central pharmacy');
  cleanup();
  assert.equal(f.fullExample.open, true);
  assert.equal(f.summary.hidden, true);
  assert.ok(f.cards.every((c) => !c.hidden));
});

test('a document deep link opens its full example instead of hiding the destination', () => {
  const f = fixture();
  f.root.ownerDocument = {
    defaultView: { location: { hash: '#supply-card-3' } },
  };
  const cleanup = initSupplyDemo(f.root);
  assert.equal(f.fullExample.open, true);
  assert.equal(f.cards[3].hidden, false);
  cleanup();
});
