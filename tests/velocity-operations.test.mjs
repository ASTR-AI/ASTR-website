import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getOperationsIndexForHash,
  getOperationsIndexForKey,
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
