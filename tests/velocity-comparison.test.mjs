import test from 'node:test';
import assert from 'node:assert/strict';
import { initComparisonDisclosure } from '../velocity-comparison.mjs';

function fixture() {
  const attributes = {};
  const listeners = new Map();
  const extra = { hidden: false };
  const label = { textContent: '' };
  const button = {
    hidden: true,
    setAttribute: (key, value) => {
      attributes[key] = value;
    },
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name) => listeners.delete(name),
    scrollIntoView() {},
  };
  const elements = {
    '[data-comparison-toggle]': button,
    '[data-comparison-extra]': extra,
    '[data-comparison-toggle-label]': label,
  };
  return {
    root: { querySelector: (selector) => elements[selector] },
    button,
    extra,
    label,
    attributes,
    click: () => listeners.get('click')?.(),
  };
}

test('comparison reveals additional rows and can collapse them again', () => {
  const f = fixture();
  initComparisonDisclosure(f.root);
  assert.equal(f.extra.hidden, true);
  assert.equal(f.button.hidden, false);
  assert.equal(f.attributes['aria-expanded'], 'false');
  assert.equal(f.label.textContent, 'Show 4 more features');
  f.click();
  assert.equal(f.extra.hidden, false);
  assert.equal(f.attributes['aria-expanded'], 'true');
  assert.equal(f.label.textContent, 'Show fewer features');
  f.click();
  assert.equal(f.extra.hidden, true);
  assert.equal(f.attributes['aria-expanded'], 'false');
});

test('cleanup restores all rows and repeated initialization does not duplicate toggles', () => {
  const f = fixture();
  initComparisonDisclosure(f.root);
  const cleanup = initComparisonDisclosure(f.root);
  f.click();
  assert.equal(f.extra.hidden, false);
  cleanup();
  assert.equal(f.extra.hidden, false);
  assert.equal(f.button.hidden, true);
  f.click();
  assert.equal(f.extra.hidden, false);
  assert.doesNotThrow(() => initComparisonDisclosure(null)());
});
