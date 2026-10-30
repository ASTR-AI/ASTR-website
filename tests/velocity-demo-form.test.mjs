import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateDemoFields,
  initVelocityDemoForm,
  ALLOWED_ORG_TYPES,
} from '../velocity-demo-form.mjs';

test('validateDemoFields: validates all 5 required fields and trims whitespace', () => {
  // Empty fields
  const emptyResult = validateDemoFields({
    name: '   ',
    email: '   ',
    countryCode: '+91',
    phone: '   ',
    orgType: '',
    orgName: '   ',
  });
  assert.equal(emptyResult.isValid, false);
  assert.equal(emptyResult.errors.name, 'Please enter your name.');
  assert.equal(emptyResult.errors.email, 'Please enter your email address.');
  assert.equal(emptyResult.errors.phone, 'Please enter your phone number.');
  assert.equal(emptyResult.errors.orgType, 'Please select an organisation type.');
  assert.equal(emptyResult.errors.orgName, "Please enter your organisation's name.");

  // Invalid email formats
  const invalidEmail = validateDemoFields({
    name: 'Asha Rao',
    email: 'not-an-email',
    countryCode: '+91',
    phone: '9876543210',
    orgType: 'Hospital',
    orgName: 'City Hospital',
  });
  assert.equal(invalidEmail.isValid, false);
  assert.equal(invalidEmail.errors.email, 'Please enter a valid email address.');

  // Valid personal and work emails
  for (const email of ['user@gmail.com', 'doctor@hospital.org.in', 'test.name+tag@sub.domain.co']) {
    const res = validateDemoFields({
      name: 'Dr. Rao',
      email,
      countryCode: '+91',
      phone: '9876543210',
      orgType: 'Clinic',
      orgName: 'Apex Clinic',
    });
    assert.equal(res.isValid, true);
  }

  // India phone number validation (+91 requires 10 digits)
  const shortIndiaPhone = validateDemoFields({
    name: 'Asha Rao',
    email: 'asha@example.com',
    countryCode: '+91',
    phone: '987654321', // 9 digits
    orgType: 'Retail pharmacy',
    orgName: 'Apollo Meds',
  });
  assert.equal(shortIndiaPhone.isValid, false);
  assert.equal(shortIndiaPhone.errors.phone, 'Please enter a valid 10-digit phone number.');

  const validIndiaPhone = validateDemoFields({
    name: 'Asha Rao',
    email: 'asha@example.com',
    countryCode: '+91',
    phone: ' 98765-43210 ',
    orgType: 'Retail pharmacy',
    orgName: 'Apollo Meds',
  });
  assert.equal(validIndiaPhone.isValid, true);
  assert.equal(validIndiaPhone.cleanData.fullPhone, '+91 9876543210');

  // International phone validation (+1 US/Canada: 10 digits, +44 UK: 10-11 digits, generic 6-15 digits)
  const validUSPhone = validateDemoFields({
    name: 'John Smith',
    email: 'john@smithclinic.com',
    countryCode: '+1',
    phone: '(555) 234-5678',
    orgType: 'Clinic',
    orgName: 'Smith Clinic',
  });
  assert.equal(validUSPhone.isValid, true);
  assert.equal(validUSPhone.cleanData.fullPhone, '+1 5552345678');

  const invalidIntlPhone = validateDemoFields({
    name: 'John Smith',
    email: 'john@smithclinic.com',
    countryCode: '+44',
    phone: '123', // too short
    orgType: 'Other',
    orgName: 'UK Health Ltd',
  });
  assert.equal(invalidIntlPhone.isValid, false);
  assert.equal(invalidIntlPhone.errors.phone, 'Please enter a valid phone number.');

  // Organisation type validation against ALLOWED_ORG_TYPES
  for (const type of ALLOWED_ORG_TYPES) {
    const res = validateDemoFields({
      name: 'Jane Doe',
      email: 'jane@example.com',
      countryCode: '+91',
      phone: '9876543210',
      orgType: type,
      orgName: 'Community Center',
    });
    assert.equal(res.isValid, true);
  }

  const invalidOrgType = validateDemoFields({
    name: 'Jane Doe',
    email: 'jane@example.com',
    countryCode: '+91',
    phone: '9876543210',
    orgType: 'Wholesale distributor', // Not in allowed list
    orgName: 'Pharma Dist',
  });
  assert.equal(invalidOrgType.isValid, false);
  assert.equal(invalidOrgType.errors.orgType, 'Please select an organisation type.');
});

test('initVelocityDemoForm: handles null or missing root safely', () => {
  const cleanup = initVelocityDemoForm(null);
  assert.equal(typeof cleanup, 'function');
  assert.doesNotThrow(() => cleanup());
});

test('initVelocityDemoForm: validates on submit, highlights first invalid field, and clears on input', () => {
  // Mock DOM
  let focusedElement = null;
  const elements = {
    name: {
      name: 'name',
      value: '',
      focus() {
        focusedElement = this;
      },
      setAttribute(k, v) {
        this[k] = v;
      },
      removeAttribute(k) {
        delete this[k];
      },
    },
    email: {
      name: 'email',
      value: '',
      focus() {
        focusedElement = this;
      },
      setAttribute(k, v) {
        this[k] = v;
      },
      removeAttribute(k) {
        delete this[k];
      },
    },
    countryCode: { name: 'countryCode', value: '+91' },
    phone: {
      name: 'phone',
      value: '',
      focus() {
        focusedElement = this;
      },
      setAttribute(k, v) {
        this[k] = v;
      },
      removeAttribute(k) {
        delete this[k];
      },
    },
    orgType: {
      name: 'orgType',
      value: '',
      focus() {
        focusedElement = this;
      },
      setAttribute(k, v) {
        this[k] = v;
      },
      removeAttribute(k) {
        delete this[k];
      },
    },
    orgName: {
      name: 'orgName',
      value: '',
      focus() {
        focusedElement = this;
      },
      setAttribute(k, v) {
        this[k] = v;
      },
      removeAttribute(k) {
        delete this[k];
      },
    },
  };

  const errorNodes = {};
  const getOrCreateErrorNode = (field) => {
    if (!errorNodes[field]) {
      errorNodes[field] = { textContent: '' };
    }
    return errorNodes[field];
  };

  const submitButton = {
    disabled: false,
    querySelector: () => ({ textContent: 'Request a demo' }),
  };
  const statusNode = { textContent: '' };
  const cardNode = {
    innerHTML: '',
    appendChild() {},
  };

  const listeners = {};
  const formNode = {
    elements,
    querySelector(sel) {
      if (sel === '[type="submit"]') return submitButton;
      if (sel === '[data-demo-status]') return statusNode;
      const errorMatch = sel.match(/\[data-error-for="([^"]+)"\]/);
      if (errorMatch) return getOrCreateErrorNode(errorMatch[1]);
      return null;
    },
    querySelectorAll(sel) {
      if (sel === '[data-error-for]') {
        return Object.keys(elements).map((k) => getOrCreateErrorNode(k));
      }
      return [];
    },
    setAttribute(k, v) {
      this[k] = v;
    },
    removeAttribute(k) {
      delete this[k];
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      if (listeners[event] === fn) delete listeners[event];
    },
  };

  const root = {
    querySelector(sel) {
      if (sel === 'form' || sel === '#velocityDemoForm') return formNode;
      if (sel === '[data-demo-card]') return cardNode;
      return null;
    },
  };

  let sendCalled = false;
  const send = async () => {
    sendCalled = true;
    return true;
  };

  const cleanup = initVelocityDemoForm(root, { send });

  // Simulate submit with invalid/empty fields
  let defaultPrevented = false;
  listeners.submit({
    preventDefault() {
      defaultPrevented = true;
    },
  });

  assert.equal(defaultPrevented, true);
  assert.equal(sendCalled, false);
  assert.equal(focusedElement, elements.name);
  assert.equal(errorNodes.name.textContent, 'Please enter your name.');
  assert.equal(elements.name['aria-invalid'], 'true');

  // Simulate user typing into name field
  elements.name.value = 'Dr. Sharma';
  listeners.input({ target: elements.name });
  assert.equal(errorNodes.name.textContent, '');
  assert.equal(elements.name['aria-invalid'], undefined);

  cleanup();
  assert.equal(listeners.submit, undefined);
});

test('initVelocityDemoForm: handles sending, success, and error retry lifecycle with observer', async () => {
  const events = [];
  const observer = {
    started() {
      events.push('started');
    },
    succeeded() {
      events.push('succeeded');
    },
  };

  const elements = {
    name: { name: 'name', value: 'Ananya Roy', setAttribute() {}, removeAttribute() {} },
    email: { name: 'email', value: 'ananya@hospital.org', setAttribute() {}, removeAttribute() {} },
    countryCode: { name: 'countryCode', value: '+91' },
    phone: { name: 'phone', value: '9876543210', setAttribute() {}, removeAttribute() {} },
    orgType: { name: 'orgType', value: 'Hospital', setAttribute() {}, removeAttribute() {} },
    orgName: { name: 'orgName', value: 'City Care Hospital', setAttribute() {}, removeAttribute() {} },
  };

  const btnLabel = { textContent: 'Request a demo' };
  const submitButton = {
    disabled: false,
    querySelector: () => btnLabel,
  };
  const statusNode = { textContent: '' };
  let cardContent = '';
  const cardNode = {
    set innerHTML(html) {
      cardContent = html;
    },
    get innerHTML() {
      return cardContent;
    },
  };

  const listeners = {};
  const formNode = {
    elements,
    querySelector(sel) {
      if (sel === '[type="submit"]') return submitButton;
      if (sel === '[data-demo-status]') return statusNode;
      return null;
    },
    querySelectorAll() {
      return [];
    },
    setAttribute(k, v) {
      this[k] = v;
    },
    removeAttribute(k) {
      delete this[k];
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      if (listeners[event] === fn) delete listeners[event];
    },
  };

  const root = {
    querySelector(sel) {
      if (sel === 'form' || sel === '#velocityDemoForm') return formNode;
      if (sel === '[data-demo-card]') return cardNode;
      return null;
    },
  };

  // Test 1: Service failure
  let attempt = 0;
  let sentPayload = null;
  const send = async (payload) => {
    attempt++;
    sentPayload = payload;
    if (attempt === 1) {
      throw new Error('Service unavailable');
    }
    return true;
  };

  initVelocityDemoForm(root, { send, observer });

  // First submit: fails
  await listeners.submit({ preventDefault() {} });

  assert.equal(events.includes('started'), true);
  assert.equal(events.includes('succeeded'), false);
  assert.equal(submitButton.disabled, false);
  assert.equal(btnLabel.textContent, 'Try again');
  assert.match(statusNode.textContent, /couldn't confirm your request/);
  assert.equal(elements.name.value, 'Ananya Roy'); // Values preserved!

  // Second submit: succeeds
  await listeners.submit({ preventDefault() {} });

  assert.equal(events.filter((e) => e === 'succeeded').length, 1);
  assert.deepEqual(sentPayload, {
    name: 'Ananya Roy',
    email: 'ananya@hospital.org',
    phone: '+91 9876543210',
    organizationType: 'Hospital',
    organizationName: 'City Care Hospital',
    product: 'Velocity',
    _subject: 'Velocity demo request — ASTR AI',
  });
  // Check success message content
  assert.match(cardContent, /Thanks, Ananya Roy\./);
  assert.match(cardContent, /We've received your request\. Our team will contact you to arrange your Velocity demo\./);
});
