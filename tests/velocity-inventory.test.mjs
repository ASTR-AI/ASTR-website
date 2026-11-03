import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getInventoryScrollTargets,
  getInventoryActiveIndex,
  initInventoryPreviewDialog,
} from '../velocity-inventory.mjs';

test('desktop navigation stops at the right-aligned final card', () => {
  const targets = getInventoryScrollTargets([0, 584, 1168, 1752], 1232);
  assert.deepEqual(targets, [0, 584, 1168, 1232]);
  assert.equal(getInventoryActiveIndex(targets, 1232), 3);
});

test('wide layouts select the last card when several targets share the end', () => {
  const targets = getInventoryScrollTargets([0, 584, 1168, 1752], 1000);
  assert.deepEqual(targets, [0, 584, 1000, 1000]);
  assert.equal(getInventoryActiveIndex(targets, 1000), 3);
  assert.equal(getInventoryActiveIndex(targets, 584), 1);
});

test('mobile keeps distinct intermediate positions and tolerates fractional ends', () => {
  const targets = getInventoryScrollTargets([0, 324.5, 649, 973.5], 934.5);
  assert.equal(getInventoryActiveIndex(targets, 648.8), 2);
  assert.equal(getInventoryActiveIndex(targets, 934), 3);
  assert.equal(getInventoryActiveIndex(targets, 0), 0);
});

test('a track without overflow stays on the first feature', () => {
  const targets = getInventoryScrollTargets([0, 100, 200, 300], 0);
  assert.deepEqual(targets, [0, 0, 0, 0]);
  assert.equal(getInventoryActiveIndex(targets, 0), 0);
});

function createMockElement(tag, attrs = {}) {
  const listeners = new Map();
  const attributes = new Map(Object.entries(attrs));
  const children = [];

  const el = {
    tagName: tag.toUpperCase(),
    style: {},
    children,
    get textContent() {
      return this._textContent || '';
    },
    set textContent(val) {
      this._textContent = val;
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
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.has(name) ? attributes.get(name) : null;
    },
    removeAttribute(name) {
      attributes.delete(name);
    },
    hasAttribute(name) {
      return attributes.has(name);
    },
    focus() {
      if (this.ownerDocument) {
        this.ownerDocument.activeElement = this;
      }
    },
    closest(selector) {
      let cur = this;
      while (cur) {
        if (cur.matches && cur.matches(selector)) return cur;
        cur = cur.parentElement;
      }
      return null;
    },
    matches(selector) {
      if (selector === '[data-inventory-card]' && attributes.has('data-inventory-card')) return true;
      if (selector === 'article, figure' && (tag === 'article' || tag === 'figure')) return true;
      return false;
    },
    querySelector(selector) {
      return this.querySelectorAll(selector)[0] || null;
    },
    querySelectorAll(selector) {
      const result = [];
      function traverse(node) {
        for (const child of node.children) {
          if (selector === '[data-enlarge-preview]' && child.hasAttribute('data-enlarge-preview')) {
            result.push(child);
          } else if (selector === '[data-dialog-close]' && child.hasAttribute('data-dialog-close')) {
            result.push(child);
          } else if (selector === '[data-dialog-backdrop]' && child.hasAttribute('data-dialog-backdrop')) {
            result.push(child);
          } else if (selector === '[data-dialog-img]' && child.hasAttribute('data-dialog-img')) {
            result.push(child);
          } else if (selector === '#inventory-preview-title' && child.id === 'inventory-preview-title') {
            result.push(child);
          } else if (selector === '.v-preview-dialog-body' && child.className === 'v-preview-dialog-body') {
            result.push(child);
          } else if (selector === '.v-card-img' && child.className === 'v-card-img') {
            result.push(child);
          } else if (selector === 'h3' && child.tagName === 'H3') {
            result.push(child);
          } else if (selector.includes('button') && child.tagName === 'BUTTON') {
            result.push(child);
          }
          traverse(child);
        }
      }
      traverse(this);
      return result;
    },
  };
  return el;
}

test('initInventoryPreviewDialog handles open, close, Escape, and focus restoration', () => {
  const doc = { activeElement: null };

  const trigger = createMockElement('button', { 'data-enlarge-preview': '' });
  trigger.ownerDocument = doc;

  const cardImg = createMockElement('img', {
    src: '/Pictures/test-dashboard.png',
    alt: 'Test dashboard preview',
  });
  cardImg.className = 'v-card-img';

  const cardH3 = createMockElement('h3');
  cardH3.textContent = 'Track batch inventory';

  const card = createMockElement('article', { 'data-inventory-card': '' });
  card.children.push(cardH3, cardImg, trigger);
  trigger.parentElement = card;
  cardH3.parentElement = card;
  cardImg.parentElement = card;

  const root = createMockElement('div');
  root.children.push(card);
  card.parentElement = root;

  const dialog = createMockElement('dialog', { hidden: '' });
  dialog.ownerDocument = doc;

  const backdrop = createMockElement('div', { 'data-dialog-backdrop': '' });
  const closeBtn = createMockElement('button', { 'data-dialog-close': '' });
  closeBtn.ownerDocument = doc;
  const dialogTitle = createMockElement('h3', {});
  dialogTitle.id = 'inventory-preview-title';
  const dialogImg = createMockElement('img', { 'data-dialog-img': '' });
  const dialogBody = createMockElement('div', {});
  dialogBody.className = 'v-preview-dialog-body';

  dialog.children.push(backdrop, closeBtn, dialogTitle, dialogBody, dialogImg);

  const cleanup = initInventoryPreviewDialog(dialog, root);

  // Trigger preview open
  trigger.focus();
  assert.equal(doc.activeElement, trigger);

  trigger.dispatchEvent({ type: 'click', preventDefault() {} });

  assert.equal(dialog.hasAttribute('hidden'), false);
  assert.equal(dialog.hasAttribute('open'), true);
  assert.equal(dialogImg.src, '/Pictures/test-dashboard.png');
  assert.equal(dialogImg.alt, 'Test dashboard preview');
  assert.equal(dialogTitle.textContent, 'Track batch inventory');
  assert.equal(doc.activeElement, closeBtn);

  // Press Escape to dismiss
  dialog.dispatchEvent({
    type: 'keydown',
    key: 'Escape',
    preventDefault() {},
  });

  assert.equal(dialog.hasAttribute('open'), false);
  assert.equal(dialog.hasAttribute('hidden'), true);
  // Focus returns to initiating trigger
  assert.equal(doc.activeElement, trigger);

  // Open again and test close button
  trigger.dispatchEvent({ type: 'click', preventDefault() {} });
  assert.equal(dialog.hasAttribute('open'), true);

  closeBtn.dispatchEvent({ type: 'click', preventDefault() {} });
  assert.equal(dialog.hasAttribute('open'), false);
  assert.equal(doc.activeElement, trigger);

  cleanup();
});
