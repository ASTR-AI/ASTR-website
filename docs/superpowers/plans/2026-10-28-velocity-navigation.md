# Velocity Navigation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan. Execution is authorised by the user's “okay, then do that”.

**Goal:** Give Velocity a dedicated product header with a liquid glass demo button and gold hover/focus accents.

**Architecture:** Replace the shared navbar instance on Velocity with semantic, page-local HTML. Use native disclosure elements for Features and the mobile menu; keep the global navbar component unchanged. Add scoped styles and a small responsive disclosure controller to the existing page module.

**Tech Stack:** Static HTML, CSS, JavaScript, Vite; no dependencies.

**Spec:** Conversation: dedicated Velocity header; Overview, Features, Why Velocity, FAQ; Features links to existing sections; “by ASTR AI” returns to the company; demo links to `/connect?product=velocity`; liquid glass button with warm gold hover and keyboard focus.

## Constraints and review focus

- Preserve existing uncommitted product-page work and company navigation.
- Keep one compact header with no mobile overflow at 320px.
- Disclosure links work with keyboard, Escape, touch, and without JavaScript.
- Anchor headings remain visible below the fixed header.
- Honour reduced motion; provide an opaque-enough glass fallback and visible focus.

## Task 1: Implement and verify the product header

- [x] Replace `astr-navbar` in `velocity.html` with the dedicated header and working section links.
- [x] Add scoped header, dropdown, responsive layout, glass CTA, hover/focus and reduced-motion rules to `velocity.css`.
- [x] Add disclosure closing, Escape focus return, outside-click closing and breakpoint handling to `velocity-page.js`.
- [x] Run the existing Node tests, build, and scoped lint/format checks.
- [x] Inspect desktop and mobile screenshots; exercise Features, Escape, section links and demo destination. Inspect a company page for regression.

Decision: keep the existing checkout to preserve the user's active product changes. This is a reversible visual change; browser checks cover the native disclosure interaction rather than adding implementation-mirroring unit tests.

## Verification

- All 22 existing Node tests pass; production build and scoped ESLint pass. Build reports existing shared CSS `@theme`/`@utility` warnings and an outdated Browserslist database.
- Browser checked at desktop, 390px, and 320px. No horizontal overflow at 320px. Features opens, Escape closes with focus return, mobile section links close both disclosures, supply anchor clears the desktop header. Demo destination is `/connect?product=velocity`.
- Company Philosophy page still renders its shared navigation. Static independent review found no actionable issues.
- Scoped existing disclosure styling to the FAQ to avoid applying FAQ spacing and borders to navigation.
- Preview screenshot: `/private/tmp/velocity-navigation-preview.png`. Changes remain uncommitted with the user’s existing product edits.

## Compact-header revision

User supplied a ChatGPT header screenshot and requested a subtle, compact bar. Replaced the floating capsule with an edge-to-edge 60px desktop / 56px mobile header, centred desktop links, lighter sans-serif navigation, inline desktop attribution, and a 36px glass demo button. Kept gold hover/focus and existing menu behavior. Browser measured 56px height and no horizontal overflow at 320px; production build passes. Screenshot: `/private/tmp/velocity-compact-navigation.png`.
