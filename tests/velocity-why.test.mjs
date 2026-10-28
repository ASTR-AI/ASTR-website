import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getWhyIndexForKey,
  filterStockItems,
  getActivityEntry,
  getOwnerOverview,
  initWhyVelocity,
} from '../velocity-why.mjs';

test('getWhyIndexForKey navigates tabs correctly with wrap-around', () => {
  const count = 3;
  // ArrowRight and ArrowDown advance
  assert.equal(getWhyIndexForKey('ArrowRight', 0, count), 1);
  assert.equal(getWhyIndexForKey('ArrowRight', 1, count), 2);
  assert.equal(getWhyIndexForKey('ArrowRight', 2, count), 0); // wrap
  assert.equal(getWhyIndexForKey('ArrowDown', 2, count), 0);

  // ArrowLeft and ArrowUp go backwards
  assert.equal(getWhyIndexForKey('ArrowLeft', 2, count), 1);
  assert.equal(getWhyIndexForKey('ArrowLeft', 1, count), 0);
  assert.equal(getWhyIndexForKey('ArrowLeft', 0, count), 2); // wrap
  assert.equal(getWhyIndexForKey('ArrowUp', 0, count), 2);

  // Home and End
  assert.equal(getWhyIndexForKey('Home', 2, count), 0);
  assert.equal(getWhyIndexForKey('End', 0, count), 2);

  // Unhandled key
  assert.equal(getWhyIndexForKey('Enter', 1, count), -1);
  assert.equal(getWhyIndexForKey('Tab', 1, count), -1);
});

test('filterStockItems accurately filters medicines and separates expired from expiring soon', () => {
  const lowStock = filterStockItems('low-stock');
  assert.ok(lowStock.length > 0);
  assert.ok(lowStock.every((item) => item.category === 'low-stock'));
  assert.ok(lowStock.some((item) => item.name.includes('Amoxicillin')));

  const expiringSoon = filterStockItems('expiring-soon');
  assert.ok(expiringSoon.length > 0);
  assert.ok(expiringSoon.every((item) => item.category === 'expiring-soon'));
  assert.ok(
    expiringSoon.every((item) => item.statusText.includes('Expiring in'))
  );

  const expired = filterStockItems('expired');
  assert.ok(expired.length > 0);
  assert.ok(expired.every((item) => item.category === 'expired'));
  assert.ok(expired.every((item) => item.statusText.includes('Expired')));

  // Ensure no overlapping between expired and expiring soon
  const expiredIds = new Set(expired.map((i) => i.id));
  assert.ok(expiringSoon.every((i) => !expiredIds.has(i.id)));
});

test('getActivityEntry returns verified log fields for stock adjustments', () => {
  const entry = getActivityEntry('act-1');
  assert.equal(entry.id, 'act-1');
  assert.equal(entry.type, 'stock_adjustment');
  assert.equal(entry.details.user, 'P. Sharma');
  assert.equal(entry.details.role, 'Pharmacist');
  assert.equal(entry.details.medicine, 'Metformin 500 mg');
  assert.equal(entry.details.batch, 'BX-8941');
  assert.equal(entry.details.flow, '45 → 40 packs (Δ -5)');
  assert.ok(entry.details.reason.includes('reconciliation'));
  assert.equal(entry.details.reference, 'Adjustment #ADJ-104');
});

test('getOwnerOverview returns confirmed snapshot metrics for reporting periods', () => {
  const today = getOwnerOverview('today');
  assert.equal(today.label, 'Today');
  assert.ok(today.lastUpdated.includes('Snapshot'));
  assert.ok(today.totalMovements.includes('34 recorded'));

  const sevenDays = getOwnerOverview('7d');
  assert.equal(sevenDays.label, 'Past 7 days');
  assert.ok(sevenDays.totalMovements.includes('218 recorded'));

  const thirtyDays = getOwnerOverview('30d');
  assert.equal(thirtyDays.label, 'Past 30 days');
  assert.ok(thirtyDays.totalMovements.includes('892 recorded'));

  // Default fallback
  const fallback = getOwnerOverview('unknown');
  assert.equal(fallback.label, 'Today');
});

test('initWhyVelocity handles empty or missing root gracefully', () => {
  const cleanup = initWhyVelocity(null);
  assert.equal(typeof cleanup, 'function');
  assert.doesNotThrow(() => cleanup());
});
