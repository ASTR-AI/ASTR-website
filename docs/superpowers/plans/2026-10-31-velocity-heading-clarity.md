# Velocity Heading Clarity Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to apply the approved copy in this session.

**Goal:** Replace abstract Velocity headings with the plain pharmacy task and benefit language approved in chat on 31 October 2026.

**Architecture:** Update heading text in `velocity.html`, keeping existing markup hooks and emphasis. Add a small hero category label using a scoped rule in `velocity.css`. Align social preview copy with the hero.

**Tech Stack:** HTML, CSS, Vite, existing Node tests.

**Spec:** The section, feature, workflow and FAQ replacement tables approved by the user in this chat.

## Global Constraints
- Preserve section IDs, interaction attributes, demo links and product qualifications.
- Keep existing unrelated working changes intact.
- Use the approved hero label, heading and introduction.
- Do not add savings, speed or availability promises.

## Review Focus
- Longer headings fit mobile cards and desktop layouts.
- Existing italic emphasis and line breaks remain readable.
- Script updates do not restore old headings.
- Social description no longer contains the old tagline.
- Demo form remains a request rather than a confirmed booking.

### Task 1: Apply and verify approved copy
- [x] Replace all approved section, feature, workflow and FAQ headings.
- [x] Add hero category label and approved supporting copy; update Open Graph description.
- [x] Review diff for scope and preserve all interaction hooks.
- [x] Run production build and existing tests; inspect heading layouts at mobile and desktop sizes.

No new tests are needed for a reversible copy change. Existing tests and browser inspection cover integration and layout.

## Verification
- `npm run build`: passed (existing CSS at-rule and Browserslist warnings).
- `node --test tests/*.test.mjs`: 101 passed, 0 failed.
- Browser checked at 320, 390, 768 and 1440px: no heading horizontal overflow. Desktop/mobile screenshots reviewed for hero, reordering, operations, features, Why Velocity and FAQ.
- Interaction-hook comparison against HEAD: all IDs, links, form attributes, data and ARIA attributes preserved.
- `git diff --check`: passed.
- Existing unrelated dependency and motion work left intact.
