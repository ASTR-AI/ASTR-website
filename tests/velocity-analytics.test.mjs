import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createVelocityTracker,
  createVelocityFormObserver,
} from '../velocity-analytics.mjs';

test('createVelocityTracker forwards allowlisted velocity_cta_click event and strips extra properties', () => {
  const events = [];
  const tracker = createVelocityTracker((name, props) => {
    events.push({ name, props });
  });

  tracker('velocity_cta_click', {
    placement: 'hero',
    action: 'demo',
    email: 'doctor@hospital.in',
    message: 'interested',
    url: 'https://astrai.in/velocity',
    patient: 'John Doe',
  });

  assert.equal(events.length, 1);
  assert.equal(events[0].name, 'velocity_cta_click');
  assert.deepEqual(events[0].props, {
    placement: 'hero',
    action: 'demo',
  });
});

test('createVelocityTracker accepts valid placements and actions', () => {
  const validPlacements = [
    'nav',
    'hero',
    'adoption',
    'comparison',
    'final',
    'mobile',
  ];
  const validActions = ['demo', 'email'];

  for (const placement of validPlacements) {
    for (const action of validActions) {
      const events = [];
      const tracker = createVelocityTracker((name, props) => {
        events.push({ name, props });
      });
      tracker('velocity_cta_click', { placement, action });
      assert.equal(events.length, 1);
      assert.deepEqual(events[0].props, { placement, action });
    }
  }
});

test('comparison CTA strips extra properties', () => {
  const events = [];
  const tracker = createVelocityTracker((name, props) =>
    events.push({ name, props })
  );
  tracker('velocity_cta_click', {
    placement: 'comparison',
    action: 'demo',
    email: 'private@example.test',
  });
  assert.deepEqual(events, [
    {
      name: 'velocity_cta_click',
      props: { placement: 'comparison', action: 'demo' },
    },
  ]);
});

test('createVelocityTracker drops invalid cta click values or unknown events', () => {
  const events = [];
  const tracker = createVelocityTracker((name, props) => {
    events.push({ name, props });
  });

  // Unknown event name
  tracker('unknown_event', { placement: 'hero', action: 'demo' });
  tracker('page_view', {});
  tracker('click', {});

  // Invalid placement or action
  tracker('velocity_cta_click', {
    placement: 'invalid_placement',
    action: 'demo',
  });
  tracker('velocity_cta_click', {
    placement: 'hero',
    action: 'invalid_action',
  });
  tracker('velocity_cta_click', { placement: 'hero' });
  tracker('velocity_cta_click', {});
  tracker('velocity_cta_click', null);

  assert.equal(events.length, 0);
});

test('createVelocityTracker forwards velocity_form_start and velocity_form_success with product: velocity', () => {
  const events = [];
  const tracker = createVelocityTracker((name, props) => {
    events.push({ name, props });
  });

  tracker('velocity_form_start', { product: 'velocity', extraField: 'test' });
  tracker('velocity_form_success', { product: 'Velocity', anotherExtra: 123 });

  assert.equal(events.length, 2);
  assert.deepEqual(events[0], {
    name: 'velocity_form_start',
    props: { product: 'velocity' },
  });
  assert.deepEqual(events[1], {
    name: 'velocity_form_success',
    props: { product: 'velocity' },
  });
});

test('createVelocityTracker fails safely when sendEvent throws or rejects', async () => {
  const throwingTracker = createVelocityTracker(() => {
    throw new Error('Analytics offline');
  });

  assert.doesNotThrow(() => {
    throwingTracker('velocity_cta_click', {
      placement: 'hero',
      action: 'demo',
    });
  });

  const rejectingTracker = createVelocityTracker(async () => {
    throw new Error('Async network failure');
  });

  assert.doesNotThrow(() => {
    rejectingTracker('velocity_form_start', { product: 'velocity' });
  });
});

test('createVelocityFormObserver emits started and succeeded at most once each', () => {
  const events = [];
  const trackEvent = (name, props) => {
    events.push({ name, props });
  };

  const observer = createVelocityFormObserver(trackEvent);

  observer.started();
  observer.started(); // second call should be ignored
  assert.equal(events.length, 1);
  assert.deepEqual(events[0], {
    name: 'velocity_form_start',
    props: { product: 'velocity' },
  });

  observer.succeeded();
  observer.succeeded(); // second call should be ignored
  assert.equal(events.length, 2);
  assert.deepEqual(events[1], {
    name: 'velocity_form_success',
    props: { product: 'velocity' },
  });
});

test('createVelocityFormObserver handles start -> retry -> success cycle', () => {
  const events = [];
  const trackEvent = (name, props) => {
    events.push({ name, props });
  };

  const observer = createVelocityFormObserver(trackEvent);

  observer.started(); // first attempt
  // Simulated failure in submit (no call to succeeded)
  observer.started(); // retry submission attempt
  observer.succeeded(); // succeeded after retry

  assert.equal(events.length, 2);
  assert.equal(events[0].name, 'velocity_form_start');
  assert.equal(events[1].name, 'velocity_form_success');
});

test('createVelocityFormObserver fails safely if trackEvent throws', () => {
  const observer = createVelocityFormObserver(() => {
    throw new Error('Observer transport failure');
  });

  assert.doesNotThrow(() => {
    observer.started();
    observer.succeeded();
  });
});
