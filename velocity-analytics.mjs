/**
 * Velocity Analytics Adapter
 *
 * Provides a minimal, safe analytics layer for Velocity conversion events.
 * Strict property allowlisting ensures no form values, PII, query strings,
 * or extraneous data reach telemetry. All transport exceptions are safely caught.
 */

const VALID_CTA_PLACEMENTS = new Set([
  'nav',
  'hero',
  'adoption',
  'comparison',
  'final',
  'mobile',
]);
const VALID_CTA_ACTIONS = new Set(['demo', 'email']);

/**
 * Creates a safe Velocity tracker wrapping the provided sendEvent transport.
 *
 * @param {(name: string, properties: Record<string, unknown>) => void | Promise<void>} sendEvent
 * @returns {(eventName: string, properties?: Record<string, unknown>) => void}
 */
export function createVelocityTracker(sendEvent) {
  if (typeof sendEvent !== 'function') {
    return () => {};
  }

  return function trackVelocityEvent(eventName, properties) {
    if (typeof eventName !== 'string') return;

    let payload;

    if (eventName === 'velocity_cta_click') {
      if (!properties || typeof properties !== 'object') return;
      const placement = properties.placement;
      const action = properties.action;
      if (
        !VALID_CTA_PLACEMENTS.has(placement) ||
        !VALID_CTA_ACTIONS.has(action)
      ) {
        return;
      }
      payload = { placement, action };
    } else if (eventName === 'velocity_form_start') {
      payload = { product: 'velocity' };
    } else if (eventName === 'velocity_form_success') {
      payload = { product: 'velocity' };
    } else {
      // Unknown event, drop
      return;
    }

    try {
      const result = sendEvent(eventName, payload);
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    } catch {
      // Fail safely without escaping or breaking page interactions
    }
  };
}

/**
 * Creates an idempotent observer for the Velocity enquiry form.
 * Ensures start and success events fire at most once per submission session.
 *
 * @param {(name: string, properties?: Record<string, unknown>) => void} trackEvent
 * @returns {{ started: () => void, succeeded: () => void }}
 */
export function createVelocityFormObserver(trackEvent) {
  let hasStarted = false;
  let hasSucceeded = false;

  return {
    started() {
      if (hasStarted) return;
      hasStarted = true;
      try {
        if (typeof trackEvent === 'function') {
          trackEvent('velocity_form_start', { product: 'velocity' });
        }
      } catch {
        // Fail safely
      }
    },
    succeeded() {
      if (hasSucceeded) return;
      hasSucceeded = true;
      try {
        if (typeof trackEvent === 'function') {
          trackEvent('velocity_form_success', { product: 'velocity' });
        }
      } catch {
        // Fail safely
      }
    },
  };
}
