import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getOperationsIndexForHash,
  getOperationsIndexForKey,
  initOperationsTabs,
} from '../velocity-operations.mjs';

const ids = ['daily-work', 'ward-operations', 'accounts', 'visibility'];

test('legacy links select their matching workflow, including encoded hashes', () => {
  assert.equal(getOperationsIndexForHash('#accounts', ids), 2);
  assert.equal(getOperationsIndexForHash('#visibility', ids), 3);
  assert.equal(getOperationsIndexForHash('#ward-operations', ids), 1);
  assert.equal(getOperationsIndexForHash('#daily-work', ids), 0);
  assert.equal(getOperationsIndexForHash('#%61ccounts', ids), 2);
});

test('unrelated or malformed hashes do not change the active workflow', () => {
  assert.equal(getOperationsIndexForHash('#supply', ids), -1);
  assert.equal(getOperationsIndexForHash('#%broken', ids), -1);
  assert.equal(getOperationsIndexForHash('', ids), -1);
});

test('arrow keys wrap at both ends and Home/End reach the endpoints', () => {
  assert.equal(getOperationsIndexForKey('ArrowRight', 3, 4), 0);
  assert.equal(getOperationsIndexForKey('ArrowLeft', 0, 4), 3);
  assert.equal(getOperationsIndexForKey('ArrowRight', 1, 4), 2);
  assert.equal(getOperationsIndexForKey('Home', 2, 4), 0);
  assert.equal(getOperationsIndexForKey('End', 1, 4), 3);
});

test('unhandled keys and an empty tab list do not consume native keyboard behavior', () => {
  assert.equal(getOperationsIndexForKey('Tab', 0, 4), -1);
  assert.equal(getOperationsIndexForKey('ArrowDown', 0, 4), -1);
  assert.equal(getOperationsIndexForKey('ArrowRight', 0, 0), -1);
});

test('2-column grid navigation moves across rows and columns with wrapping', () => {
  // Grid layout (columns = 2):
  // [0] [1]
  // [2] [3]
  // ArrowDown moves down a row, wraps to top
  assert.equal(getOperationsIndexForKey('ArrowDown', 0, 4, 2), 2);
  assert.equal(getOperationsIndexForKey('ArrowDown', 1, 4, 2), 3);
  assert.equal(getOperationsIndexForKey('ArrowDown', 2, 4, 2), 0);
  assert.equal(getOperationsIndexForKey('ArrowDown', 3, 4, 2), 1);

  // ArrowUp moves up a row, wraps to bottom
  assert.equal(getOperationsIndexForKey('ArrowUp', 2, 4, 2), 0);
  assert.equal(getOperationsIndexForKey('ArrowUp', 3, 4, 2), 1);
  assert.equal(getOperationsIndexForKey('ArrowUp', 0, 4, 2), 2);
  assert.equal(getOperationsIndexForKey('ArrowUp', 1, 4, 2), 3);

  // ArrowRight and ArrowLeft move horizontally
  assert.equal(getOperationsIndexForKey('ArrowRight', 0, 4, 2), 1);
  assert.equal(getOperationsIndexForKey('ArrowRight', 1, 4, 2), 2);
  assert.equal(getOperationsIndexForKey('ArrowRight', 3, 4, 2), 0);
  assert.equal(getOperationsIndexForKey('ArrowLeft', 0, 4, 2), 3);
  assert.equal(getOperationsIndexForKey('ArrowLeft', 2, 4, 2), 1);

  // Home and End reach start and finish
  assert.equal(getOperationsIndexForKey('Home', 3, 4, 2), 0);
  assert.equal(getOperationsIndexForKey('End', 0, 4, 2), 3);
});

test('initOperationsTabs activates initial tab and updates slider indicator on selection', () => {
  const listeners = new Map();
  const makeElement = (tag, dataset = {}, id = '') => {
    const elListeners = new Map();
    const classList = new Set();
    const attrs = new Map();
    return {
      id,
      dataset,
      style: {},
      offsetLeft: 10,
      offsetWidth: 120,
      classList: {
        add: (c) => classList.add(c),
        remove: (c) => classList.delete(c),
        toggle: (c, val) => (val ? classList.add(c) : classList.delete(c)),
        contains: (c) => classList.has(c),
      },
      setAttribute: (k, v) => attrs.set(k, v),
      getAttribute: (k) => attrs.get(k),
      removeAttribute: (k) => attrs.delete(k),
      addEventListener: (evt, fn) => {
        if (!elListeners.has(evt)) elListeners.set(evt, []);
        elListeners.get(evt).push(fn);
      },
      removeEventListener: (evt, fn) => {
        const arr = elListeners.get(evt) || [];
        const idx = arr.indexOf(fn);
        if (idx >= 0) arr.splice(idx, 1);
      },
      dispatchEvent: (evt) => {
        (elListeners.get(evt.type) || []).forEach((fn) => fn(evt));
      },
      focus: () => {},
    };
  };

  const slider = makeElement('span');
  const tabs = ids.map((id, index) => {
    const tab = makeElement('button', { operationsTab: id }, `tab-${id}`);
    tab.offsetLeft = index * 130;
    tab.offsetWidth = 120;
    return tab;
  });
  const panels = ids.map((id) => makeElement('article', {}, id));

  const controls = makeElement('nav');
  controls.querySelector = (sel) => (sel === '.nav-highlight' ? slider : null);

  const rootClassList = new Set();
  const root = {
    id: 'operations',
    classList: {
      add: (c) => rootClassList.add(c),
      remove: (c) => rootClassList.delete(c),
    },
    ownerDocument: {
      defaultView: {
        location: { hash: '' },
        history: { replaceState: () => {} },
        addEventListener: (evt, fn) => {
          if (!listeners.has(evt)) listeners.set(evt, []);
          listeners.get(evt).push(fn);
        },
        removeEventListener: (evt, fn) => {
          const arr = listeners.get(evt) || [];
          const idx = arr.indexOf(fn);
          if (idx >= 0) arr.splice(idx, 1);
        },
      },
    },
    querySelector: (sel) =>
      sel === '[data-operations-controls]' ? controls : null,
    querySelectorAll: (sel) => {
      if (sel === '[data-operations-tab]') return tabs;
      if (sel === '[data-operations-panel]') return panels;
      return [];
    },
  };

  const cleanup = initOperationsTabs(root);

  assert.equal(controls.hidden, false);
  assert.equal(rootClassList.has('v-operations-enhanced'), true);
  assert.equal(tabs[0].getAttribute('aria-selected'), 'true');
  assert.equal(tabs[0].classList.contains('active'), true);
  assert.equal(panels[0].hidden, false);
  assert.equal(panels[1].hidden, true);
  assert.equal(slider.style.width, '120px');
  assert.equal(slider.style.left, '0px');

  // Click on the 3rd tab (accounts)
  tabs[2].dispatchEvent({ type: 'click' });
  assert.equal(tabs[2].getAttribute('aria-selected'), 'true');
  assert.equal(tabs[2].classList.contains('active'), true);
  assert.equal(tabs[0].getAttribute('aria-selected'), 'false');
  assert.equal(tabs[0].classList.contains('active'), false);
  assert.equal(panels[2].hidden, false);
  assert.equal(panels[0].hidden, true);
  assert.equal(slider.style.width, '120px');
  assert.equal(slider.style.left, '260px');

  cleanup();
  assert.equal(controls.hidden, true);
  assert.equal(rootClassList.has('v-operations-enhanced'), false);
});
