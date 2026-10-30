import { createEnquirySender } from './connect-form.mjs';

export const ALLOWED_ORG_TYPES = [
  'Hospital',
  'Retail pharmacy',
  'Clinic',
  'Nursing home',
  'Other',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the five required fields for the Velocity demo enquiry.
 *
 * @param {{
 *   name?: string,
 *   email?: string,
 *   countryCode?: string,
 *   phone?: string,
 *   orgType?: string,
 *   orgName?: string
 * }} fields
 * @returns {{
 *   isValid: boolean,
 *   errors: Record<string, string>,
 *   cleanData: {
 *     name: string,
 *     email: string,
 *     countryCode: string,
 *     phoneDigits: string,
 *     fullPhone: string,
 *     orgType: string,
 *     orgName: string
 *   }
 * }}
 */
export function validateDemoFields(fields = {}) {
  const errors = {};
  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const countryCode = (fields.countryCode || '+91').trim();
  const rawPhone = (fields.phone || '').trim();
  const digits = rawPhone.replace(/\D/g, '');
  const orgType = (fields.orgType || '').trim();
  const orgName = (fields.orgName || '').trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!rawPhone || !digits) {
    errors.phone = 'Please enter your phone number.';
  } else if (countryCode === '+91') {
    // If user pasted 91 at start and total 12 digits, strip leading 91
    const nationalDigits =
      digits.length === 12 && digits.startsWith('91')
        ? digits.slice(2)
        : digits;
    if (nationalDigits.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
  } else if (digits.length < 6 || digits.length > 15) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!orgType || !ALLOWED_ORG_TYPES.includes(orgType)) {
    errors.orgType = 'Please select an organisation type.';
  }

  if (!orgName) {
    errors.orgName = "Please enter your organisation's name.";
  }

  const nationalDigits =
    countryCode === '+91' && digits.length === 12 && digits.startsWith('91')
      ? digits.slice(2)
      : digits;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleanData: {
      name,
      email,
      countryCode,
      phoneDigits: nationalDigits,
      fullPhone: `${countryCode} ${nationalDigits}`,
      orgType,
      orgName,
    },
  };
}

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (m) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[m]
  );
}

/**
 * Initializes the inline demo request form in the Velocity demo section.
 *
 * @param {HTMLElement | null} root
 * @param {{
 *   send?: (fields: Record<string, unknown>) => Promise<boolean>,
 *   sheetUrl?: string,
 *   observer?: { started: () => void, succeeded: () => void }
 * }} [options]
 * @returns {() => void} Cleanup function
 */
export function initVelocityDemoForm(root, { send, observer, sheetUrl } = {}) {
  if (!root || typeof root !== 'object') {
    return () => {};
  }

  const form =
    (root.id === 'velocityDemoForm' ? root : null) ||
    (root.querySelector ? root.querySelector('#velocityDemoForm') : null) ||
    (root.querySelector ? root.querySelector('form') : null);

  if (!form) {
    return () => {};
  }

  const card =
    (root.querySelector ? root.querySelector('[data-demo-card]') : null) ||
    (form.closest ? form.closest('.v-demo-card') : null);

  const sender =
    send ||
    (typeof window !== 'undefined' && typeof window.fetch === 'function'
      ? createEnquirySender(window.fetch.bind(window), {
          endpoint: '/api/enquiry',
          sheetUrl: sheetUrl || '',
        })
      : async () => true);

  const submitButton = form.querySelector('[type="submit"]');
  const buttonLabel = submitButton?.querySelector('span') || submitButton;
  const statusContainer = form.querySelector('[data-demo-status]');

  const fieldKeys = ['name', 'email', 'phone', 'orgType', 'orgName'];

  const clearFieldError = (key) => {
    const errorNode = form.querySelector(`[data-error-for="${key}"]`);
    if (errorNode) {
      errorNode.textContent = '';
    }
    const input = form.elements?.[key];
    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  };

  const showFieldError = (key, message) => {
    const errorNode = form.querySelector(`[data-error-for="${key}"]`);
    if (errorNode) {
      errorNode.textContent = message;
    }
    const input = form.elements?.[key];
    if (input) {
      input.setAttribute('aria-invalid', 'true');
      const errId = `${key}-error`;
      input.setAttribute('aria-describedby', errId);
    }
  };

  const onInputOrChange = (event) => {
    const target = event?.target;
    if (!target || !target.name) return;
    clearFieldError(target.name);
    if (statusContainer) {
      statusContainer.textContent = '';
    }
  };

  const onSubmit = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    if (submitButton?.disabled) return;

    // Clear previous errors
    for (const key of fieldKeys) {
      clearFieldError(key);
    }
    if (statusContainer) {
      statusContainer.textContent = '';
    }

    const formData = {
      name: form.elements?.name?.value || '',
      email: form.elements?.email?.value || '',
      countryCode: form.elements?.countryCode?.value || '+91',
      phone: form.elements?.phone?.value || '',
      orgType: form.elements?.orgType?.value || '',
      orgName: form.elements?.orgName?.value || '',
    };

    const validation = validateDemoFields(formData);

    if (!validation.isValid) {
      let firstInvalidInput = null;
      for (const [key, msg] of Object.entries(validation.errors)) {
        showFieldError(key, msg);
        if (!firstInvalidInput && form.elements?.[key]) {
          firstInvalidInput = form.elements[key];
        }
      }
      if (firstInvalidInput && typeof firstInvalidInput.focus === 'function') {
        firstInvalidInput.focus();
      }
      return;
    }

    // Prepare UI for sending
    if (submitButton) submitButton.disabled = true;
    if (buttonLabel) buttonLabel.textContent = 'Sending…';
    if (form.setAttribute) form.setAttribute('aria-busy', 'true');
    if (statusContainer) {
      statusContainer.textContent = 'Sending your demo request…';
    }

    if (observer && typeof observer.started === 'function') {
      try {
        observer.started();
      } catch {
        // Fail safely
      }
    }

    const payload = {
      name: validation.cleanData.name,
      email: validation.cleanData.email,
      phone: validation.cleanData.fullPhone,
      organizationType: validation.cleanData.orgType,
      organizationName: validation.cleanData.orgName,
      product: 'Velocity',
      _subject: 'Velocity demo request — ASTR AI',
    };

    try {
      const accepted = await sender(payload);
      if (!accepted) {
        throw new Error('Request not accepted');
      }

      if (observer && typeof observer.succeeded === 'function') {
        try {
          observer.succeeded();
        } catch {
          // Fail safely
        }
      }

      const escapedName = escapeHtml(validation.cleanData.name);
      const successHtml = `
        <div class="v-demo-success" role="status" aria-live="polite">
          <div class="v-demo-success-icon" aria-hidden="true">✓</div>
          <h3 class="v-demo-card-title">Thanks, ${escapedName}.</h3>
          <p class="v-demo-card-intro">We've received your request. Our team will contact you to arrange your Velocity demo.</p>
        </div>
      `.trim();

      if (card) {
        card.innerHTML = successHtml;
      } else {
        form.innerHTML = successHtml;
      }
    } catch {
      if (statusContainer) {
        statusContainer.textContent =
          "We couldn't confirm your request. Please try again or email hello@astrai.in.";
      }
      if (submitButton) submitButton.disabled = false;
      if (buttonLabel) buttonLabel.textContent = 'Try again';
    } finally {
      if (form.removeAttribute) form.removeAttribute('aria-busy');
    }
  };

  form.addEventListener('submit', onSubmit);
  form.addEventListener('input', onInputOrChange);
  form.addEventListener('change', onInputOrChange);

  return () => {
    form.removeEventListener('submit', onSubmit);
    form.removeEventListener('input', onInputOrChange);
    form.removeEventListener('change', onInputOrChange);
  };
}
