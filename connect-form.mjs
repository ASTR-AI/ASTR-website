import { track } from '@vercel/analytics';
import {
  createVelocityTracker,
  createVelocityFormObserver,
} from './velocity-analytics.mjs';

export function getEnquiryContext(search) {
  const params = new URLSearchParams(search);
  if (
    params.get('product') === 'velocity' ||
    params.get('subject') === 'Velocity_ERP_Demo'
  ) {
    return {
      product: 'Velocity',
      emailHref: 'mailto:hello@astrai.in?subject=Velocity%20demo%20request',
      subject: 'Velocity demo request — ASTR AI',
      message:
        'I would like to book a Velocity demo for our hospital or pharmacy. Please contact me to arrange a suitable time.',
    };
  }
  return null;
}

export function createEnquirySender(fetchImpl) {
  let pending = false;
  return async (fields) => {
    if (pending) return false;
    pending = true;
    try {
      const response = await fetchImpl(
        'https://formsubmit.co/ajax/hello@astrai.in',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(fields),
          signal: AbortSignal.timeout(20000),
        }
      );
      const data = await response.json();
      if (
        !response.ok ||
        (data?.success !== true && data?.success !== 'true')
      ) {
        throw new Error(
          'Your enquiry was not accepted. Please try again or email hello@astrai.in.'
        );
      }
      return true;
    } finally {
      pending = false;
    }
  };
}

export async function submitEnquiryForm({ send, fields, context, observer }) {
  if (context && observer) {
    try {
      observer.started();
    } catch {
      // Fail safely
    }
  }
  const accepted = await send(fields);
  if (accepted && context && observer) {
    try {
      observer.succeeded();
    } catch {
      // Fail safely
    }
  }
  return accepted;
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('connectForm');
  if (form) {
    const context = getEnquiryContext(window.location.search);
    const button = form.querySelector('[type="submit"]');
    const label = button.querySelector('span');
    const status = document.getElementById('formStatus');
    let observer = null;
    if (context) {
      const tracker = createVelocityTracker(track);
      observer = createVelocityFormObserver(tracker);
      document.getElementById('enquiryHeading').textContent =
        'See Velocity in action.';
      document.getElementById('enquiryIntro').textContent =
        'Tell us a little about your hospital or pharmacy. We will explore stock, purchasing, billing, and supply around your team’s needs.';
      const labels = {
        name: 'Name',
        email: 'Work email',
        org: 'Hospital or pharmacy name',
        message: 'What would you like to explore?',
      };
      for (const [field, text] of Object.entries(labels)) {
        form.querySelector(`label[for="${field}"]`).textContent = text;
      }
      form.elements.name.placeholder = 'Your name';
      form.elements.org.placeholder = 'Hospital or pharmacy name';
      document.getElementById('enquiryEmail').href = context.emailHref;
      form.elements._subject.value = context.subject;
      form.elements.message.value = context.message;
      const product = document.createElement('input');
      product.type = 'hidden';
      product.name = 'product';
      product.value = context.product;
      form.append(product);
      document.getElementById('enquiryContext').textContent =
        'Book a Velocity demo';
      label.textContent = 'Request a demo';
    }
    const send = createEnquirySender(window.fetch.bind(window));
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (button.disabled || !form.reportValidity()) return;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      label.textContent = 'Sending…';
      status.textContent = 'Sending your enquiry…';
      try {
        const accepted = await submitEnquiryForm({
          send,
          fields: Object.fromEntries(new FormData(form)),
          context,
          observer,
        });
        if (!accepted) return;
        status.textContent =
          'Your enquiry has been accepted. Thank you — we will be in touch.';
        label.textContent = 'Enquiry accepted';
        // Keep submitted values visible; a page refresh starts a new enquiry.
      } catch {
        status.textContent =
          'We could not confirm your enquiry. Your details are still here. Please retry or email hello@astrai.in.';
        button.disabled = false;
        label.textContent = 'Try again';
      } finally {
        form.removeAttribute('aria-busy');
      }
    });
  }
}
