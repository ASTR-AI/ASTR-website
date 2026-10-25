import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getInventoryScrollTargets,
  getInventoryActiveIndex,
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
