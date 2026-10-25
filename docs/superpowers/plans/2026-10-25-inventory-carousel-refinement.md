# Inventory carousel refinement implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This plan proposes a refinement; review its visual direction before implementation.

**Goal:** Refine the existing inventory carousel into an aligned, lighter, image-led row with clear scrolling controls.

**Architecture:** Keep the current four semantic cards and native-scroll controller. Correct inventory-only layout and media rules in `velocity.css`, adjust inventory markup only where necessary, and update controller geometry only as required by the new gutter/end-spacing system.

**Tech stack:** Existing HTML, CSS, vanilla JavaScript module, Vite; no new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-25-inventory-carousel-refinement-design.md`.

## Global constraints

- Change only `#inventory` and its scoped carousel implementation; keep hero, navbar, other sections, and existing user edits intact.
- Use neutral card surfaces, no gold/bronze card accents, no autoplay or looping.
- Preserve native vertical page scrolling and accessible native horizontal scrolling without JavaScript.
- Use real product images, accurate captions and alt text, and no fabricated feature screens.
- No push or deployment. This planning task does not authorise changing the website now.

## Review focus

1. Initial and final slide positions must respect the shared content gutter with no blank terminal slide (Tasks 1 and 3).
2. Resize, zoom, or wrapping must not desynchronise scroll targets or crop card copy (Tasks 1–3).
3. Lower media framing must stay correct despite global `figure`/`figcaption` styles (Task 2).
4. Pointer, keyboard, reduced motion, and JavaScript-disabled users must retain usable controls or native scrolling (Task 3).
5. Section-anchor arrival must keep the heading clear of navigation without changing the hero (Tasks 1 and 3).

## Files

- `velocity.css`: scoped gutter/card/media/control rules and corresponding existing responsive overrides.
- `velocity.html`: inventory card surface classes/media grouping/accurate image alt text only.
- `velocity-inventory.mjs`: navigation geometry, settled index, and resize handling if required.
- `docs/superpowers/plans/2026-10-25-inventory-carousel-refinement-verification.md`: new evidence record during implementation. Do not rewrite historical verification as if it were current.

## Task 1: Correct the section grid and rail geometry

**Interfaces:** Preserve `[data-inventory-carousel]`, `[data-inventory-track]`, and all four `[data-inventory-card]` hooks. Define inventory-scoped `--inventory-gutter`, `--inventory-card-width`, and `--inventory-gap` as the single CSS geometry source. The controller reads resolved DOM geometry, not duplicated breakpoint constants.

- [ ] Capture the current page at 1440px, 1920px, 768px, and 390px; record initial `scrollLeft`, heading/card left edges, and anchor landing. Distinguish a mid-scroll screenshot from the first-card state. Save a baseline of the hero and supply section.
- [ ] Replace the desktop gutter formula's extra `+ 48px` with the spec's shared gutter. Align heading/first card/controls/footer to within 2 CSS pixels at rest. Apply 32px and 20px gutters at existing tablet/mobile breakpoints.
- [ ] Apply spec card widths and 24px/16px gaps. Replace duplicated trailing-spacer formulas with end padding derived from track viewport width, gutter, and card width; remove the obsolete `::after` spacer. Ensure sufficient end space for the last card to align at the gutter without exposing an extra empty slide.
- [ ] Restore the proposed inventory top/bottom and heading-to-rail spacing. Test both normal page scroll and `#inventory` anchor entry; preserve the existing global header-offset rules unless a local adjustment is demonstrated necessary.
- [ ] Check first, middle, and last positions at each target width. Expected: readable card widths, deliberate next-card preview, consistent left alignment, no horizontal document overflow, no text clipped at 200% zoom. Document any measured adjustment to starting values.

## Task 2: Simplify card surfaces and product imagery

**Interfaces:** Keep existing article IDs and content. Scope all new card/header/media/caption declarations under `#inventory`; retain existing asset URL and accurate preview labelling.

- [ ] Replace alternating outer surfaces with the proposed single charcoal surface. Keep copy padding per spec; remove heavy card/image shadows and redundant inner borders. Reduce circular icon treatment to a quiet supporting detail without adding new assets.
- [ ] Group the lower media region so its image spans the card width while text keeps its inset. Match image start positions across cards at each breakpoint using shared header rows that can grow for wrapping; do not enforce a fixed total card height.
- [ ] Start media at 16:9, remove nested image rounding where the outer card already clips its lower corners, and explicitly reset inherited caption padding/border/font style. Maintain the caption in its own small footer and sufficient contrast.
- [ ] Inspect the actual dashboard at original resolution before choosing any detail crop. Use only real identifiable content; if a relevant crop is unavailable, keep an honest overview preview. Correct current alt text that implies the dashboard shows batch/expiry/pack screens. Record missing specialised captures as an asset limitation.
- [ ] Compare before/after screenshots side by side. Expected: lighter visual framing, aligned media, no stretched or misleading screenshots, all descriptions readable, neutral palette preserved, and no giant white outer-card focal point.

## Task 3: Make navigation reliable and verify the finished section

**Interfaces:** Preserve `initInventoryCarousel(root)` and its cleanup return function, all existing button hooks, and status announcements. Derive targets from the card and track rectangles plus current scroll position and resolved scroll padding; clamp to actual scroll limits.

- [ ] Reproduce control navigation after the geometry changes. If target calculation needs correction, adjust only the affected geometry. Verify the final card aligns correctly and each button/dot reaches its named feature.
- [ ] Give dot buttons 44×44px targets, rendering the small visible dot/dash with a pseudo-element. Centre indicators independently of differing instruction/arrow widths; use a two-row mobile layout. Keep the hidden enhancement state effective without JavaScript.
- [ ] Verify the settled visible feature drives dots, disabled arrows, and announcements after clicks, direct scrolling, rapid repeated clicks, and resize. Preserve the selected card on responsive resize when settled. Avoid announcing a requested index if actual scrolling lands elsewhere.
- [ ] Test touch/trackpad and keyboard (Left/Right/Home/End on the track, Tab through controls), reduced motion changes, JavaScript-disabled native scrolling, and back/forward restoration. Ensure keyboard focus rings remain visible and native vertical scrolling stays available.
- [ ] Capture first/middle/final cards at 1440px and 390px; inspect 1920px, 768px, 320px, and 200% zoom. Verify heading/card/control alignment, no clipping, readable imagery, correct last-card spacing, touch targets, and contrast.
- [ ] Run `npm run build` and `npx eslint velocity-inventory.mjs velocity-page.js`. Expected: successful build and no errors in changed JavaScript. Test on the production preview, not just the development server. Do not add implementation-mirroring tests or unrelated dependencies for cosmetic changes.
- [ ] Compare hero and supply-section screenshots against baseline; inspect final diff for scope. Save a fresh verification record with commands, observed browser results, screenshots, and asset limitations. Historical verification reports are not evidence for this revision.

## Completion and self-review

Tasks 1–3 cover all proposed spec decisions and the five review-focus conditions. No new public interfaces or packages are needed. A successful build is only one check: delivery requires visual comparison and working native scrolling/controls. If review accepts the alternative of retaining alternating surfaces, change Task 2's surface decision explicitly before execution; do not silently mix directions. Plan review precedes implementation; no website source was changed while preparing this document.
