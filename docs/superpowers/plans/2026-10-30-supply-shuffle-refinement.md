# Supply Shuffle Refinement Implementation Plan

> Execute inline using superpowers:executing-plans, preserving the current working tree.

**Goal:** Deliver the approved opaque automatic shuffle with one section heading.
**Architecture:** Keep the existing four document articles and progressively enhance their shared grid stage. Use RAF elapsed time for looping and CSS keyframes for the outgoing card; use normal document flow for reduced motion and no-JS fallback.
**Tech Stack:** HTML, CSS, native JavaScript, Node test runner, Vite.
**Spec:** docs/superpowers/specs/2026-10-30-supply-shuffle-refinement.md

## Constraints
Preserve unrelated edits. No new dependencies. Keep pause/resume. Five-second reading interval; automatic receipt-to-request wrap. Remove manual navigation. Keep existing medicine examples.

## Review Focus
Tall cards must remain contained. Small screens must not overflow. Inactive card text must not bleed through. Reduced motion must expose all steps. Offscreen suspension must preserve elapsed reading time.

## Task 1: Loop and simplify playback
- [x] Update controller tests to expect five-second automatic cycling, pause/resume across cycles, and inert step clicks. Run and confirm failures.
- [x] Simplify velocity-supply.mjs: remove manual navigation, loop stages, synchronize card tiers, mark outgoing card for CSS animation, clean up animation state, retain visibility suspension.
- [x] Run node --test tests/velocity-supply.test.mjs.

## Task 2: Refine section and stage
- [x] Remove duplicate heading and navigation markup in velocity.html; keep one heading and pause control.
- [x] Replace absolute fixed-height translucent stack with opaque, subtly staggered grid cards and lift/return keyframes in velocity-supply.css. Show all cards in normal flow without JS or with reduced motion.
- [x] Run full Node suite and npm run build. Visually inspect desktop and mobile and verify receipt-to-request wrap.

## Verification and review
- Controller tests exercised RED→GREEN for looping, removal of navigation, initial deck semantics, and reduced-motion restoration.
- Full suite: 89/89 passing via node --test tests/*.test.mjs.
- Targeted ESLint: passing. Production Vite build: passing; reports existing CSS utility/browser-data warnings.
- Browser checks: desktop 1440×900, mobile 390×844 and 320×700; all four document bounds contained at 320px; no horizontal page overflow.
- Independent review completed. Moved pause/counter to the visual and made the mobile control sticky. Allowed narrow status rows to wrap.
- Preserved unrelated working-tree changes; no commit or deployment requested.
