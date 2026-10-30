# Velocity Inline Demo Request Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the inline demo request section in `#demo` on `velocity.html`, replacing the external redirect with a restrained charcoal form card collecting 5 required fields, with validation, loading, success/retry states, analytics, and all Velocity demo buttons pointed to `#demo`.

**Architecture:**
- Create `velocity-demo-form.mjs` containing the form validation logic, phone validation, submission lifecycle, and accessible UI state transitions using `createEnquirySender` and `createVelocityFormObserver`.
- Update `velocity.html` `#demo` section to provide the 44%/56% two-column editorial + form card layout and update all demo CTAs to `#demo` with "Request a demo".
- Add scoped styles in `velocity.css` using Geist for form controls, 48px min touch targets, `#101010` card, and `#e6cd99` gold button.
- Integrate initialization and lifecycle into `velocity-page.js`.
- Add comprehensive unit and integration tests in `tests/velocity-demo-form.test.mjs`.

**Tech Stack:** Semantic HTML5, CSS3, JavaScript (ES modules), Node.js test runner, Vite.

**Spec:** `docs/superpowers/specs/2026-10-30-velocity-inline-demo-design.md`

## Global Constraints
- Velocity black background, ivory typography, and muted gold accent (`#e6cd99`).
- Five required fields: name, email, phone (with country code selector, default +91), organisation type (Hospital, Retail pharmacy, Clinic, Nursing home, Other), organisation name.
- No message or job title fields in this inline form.
- Geist font for form labels, inputs, helper copy, and button text.
- Never include names, email addresses, phone numbers, or organisation names in analytics event properties.
- Do not send live test enquiries without explicit authorization; verify with mocked responses.

---

### Task 1: Create Form Validation and Controller Module (`velocity-demo-form.mjs`)

**Files:**
- Create: `velocity-demo-form.mjs`
- Test: `tests/velocity-demo-form.test.mjs`

**Interfaces:**
- Produces: `validateDemoFields(fields)`, `initVelocityDemoForm(root, options)`
- Consumes: `createEnquirySender` from `./connect-form.mjs`, `createVelocityTracker`, `createVelocityFormObserver` from `./velocity-analytics.mjs`

- [x] **Step 1: Write tests for validation rules and form submission lifecycle**
- [x] **Step 2: Run test to verify it fails**
- [x] **Step 3: Implement `velocity-demo-form.mjs`**
- [x] **Step 4: Run tests to verify they pass**
- [x] **Step 5: Commit changes**

---

### Task 2: Update HTML Structure for `#demo` and CTAs in `velocity.html`

**Files:**
- Modify: `velocity.html`

**Interfaces:**
- Produces: `#demo` two-column layout with `#velocityDemoForm`, updated demo CTAs pointing to `#demo`.

- [x] **Step 1: Update navigation, hero, Why Velocity, and mobile conversion bar CTAs to point to `#demo` and read "Request a demo"**
- [x] **Step 2: Replace `#demo` section with two-column editorial layout and form card**
- [x] **Step 3: Verify existing tests continue to pass**
- [x] **Step 4: Commit changes**

---

### Task 3: Add Scoped CSS Styles for the Inline Demo Section

**Files:**
- Modify: `velocity.css`

**Interfaces:**
- Scoped styles for `.v-demo`, `.v-demo-grid`, `.v-demo-intro`, `.v-demo-card`, `.v-demo-form`, `.v-demo-field`, `.v-demo-row`, `.v-demo-error`, `.v-demo-success`.

- [x] **Step 1: Add desktop 44%/56% grid, vertical centering, 96px padding, and mobile stacked layout (<= 1024px)**
- [x] **Step 2: Style charcoal card (`#101010`), 20px radius, 32px padding (20px mobile), input controls with Geist font and 48px minimum height**
- [x] **Step 3: Style gold submit button (`#e6cd99`), focus outlines, error messages, and success container**
- [x] **Step 4: Run build check to verify CSS compiles cleanly**
- [x] **Step 5: Commit changes**

---

### Task 4: Integrate Form Controller in `velocity-page.js`

**Files:**
- Modify: `velocity-page.js`

**Interfaces:**
- Initializes demo form on page load and lifecycle (`pageshow`/`pagehide`).

- [x] **Step 1: Import and hook `initVelocityDemoForm` in `velocity-page.js`**
- [x] **Step 2: Run all tests to verify integration**
- [x] **Step 3: Commit changes**

---

### Task 5: End-to-End Verification and Polish

**Files:**
- Run: Full Node test suite, ESLint, Vite build, and responsive preview checks.

- [x] **Step 1: Run `node --test tests/*.test.mjs`**
- [x] **Step 2: Run `npm run build`**
- [x] **Step 3: Verify responsive layout at 320px, 390px, 768px, 1024px, and 1440px**
- [x] **Step 4: Commit and finalize**

## Verification Results
- **Node test suite:** 84/84 tests pass (including 4 new end-to-end unit and lifecycle tests in `tests/velocity-demo-form.test.mjs`).
- **ESLint & Prettier:** Passed with zero errors or warnings on `velocity-page.js`, `velocity-demo-form.mjs`, and tests.
- **Production Build:** `npm run build` compiles clean Vite distribution in ~897ms with `dist/velocity.html` and bundled JS/CSS assets.
- **Headless Chrome Responsive Verification:** Tested at 320px, 390px, 768px, 1024px, and 1440px viewports. Document scroll width exactly equals viewport width with 0px overflow across all breakpoints.
- **Screenshots:** Captured and saved to `/tmp/velocity-demo-{320,390,768,1024,1440}.png`.

