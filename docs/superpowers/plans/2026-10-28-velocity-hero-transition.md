# Velocity Hero Transition Implementation Plan

**Goal:** Animate the existing hero dashboard into a side-by-side benefit view without changing lower sections.
**Spec:** `docs/superpowers/specs/2026-10-28-velocity-hero-transition-design.md`.
**Architecture:** Progressive enhancement with a sticky stage, scroll-driven transform/opacity, and static fallback. New CSS/module are hero scoped; reuse existing page lifecycle.

- [x] Test clamped scroll progress, smooth endpoints, reverse scrolling, and degenerate ranges in `tests/velocity-hero.test.mjs`; confirm missing module fails.
- [x] Implement `getHeroTransition(scrollY,start,end)` and `initHeroTransition(root)` in `velocity-hero.mjs`; run focused tests.
- [x] Wrap only the hero figure in a stage; add approved benefit text; link `velocity-hero.css`. Leave inventory onward byte-identical.
- [x] Add desktop sticky/transform styles behind enhancement class; static mobile/reduced-motion fallback. Measure stage and image, use a passive scroll listener with coalesced requestAnimationFrame, and cleanup on pagehide.
- [x] Integrate with existing initial-load/pageshow lifecycle, preserving other controllers.
- [x] Verify beginning/middle/end/reverse/release in the browser, mobile fallback, navigation, overflow, and reduced-motion policy. Run full Node tests, build and diff checks; compare lower HTML and existing CSS with restored baseline.
