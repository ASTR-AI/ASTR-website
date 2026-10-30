# Velocity Shared Footer Implementation Plan

**Goal:** Make Velocity render the existing site-wide footer with the same appearance and behavior as the homepage.

**Architecture:** Reuse `AstrFooter` in `components.js` through `<astr-footer></astr-footer>`. Keep the existing import in `velocity-page.js`; remove local fallback markup and CSS interference instead of creating another footer.

**Tech stack:** HTML, CSS, native custom elements, Vite, Tailwind.

## Findings and constraints

- Velocity already loads the shared component. Its fallback HTML is replaced when the custom element initializes.
- `velocity.css` removes the shared footer's top border and hides its decorative grid. Broad page typography rules also reach footer headings, paragraphs, and links; removing just the explicit footer overrides may not restore visual parity.
- Use the homepage footer as the reference. Preserve Velocity's navigation, content, demo form, mobile conversion bar, and existing unrelated working changes.
- No new component, dependencies, public API, or footer content changes are needed. Other main pages already use the shared element; leave the separate coming-soon placeholder outside this change.

## Implementation

- [ ] In `velocity.html`, replace the entire `<astr-footer>` block containing `.v-fallback-footer` with `<astr-footer></astr-footer>`, in its existing position after `main`.
- [ ] In `velocity.css`, remove both rules targeting `.velocity-page astr-footer > footer` and its direct `.absolute` child.
- [ ] Remove `.v-fallback-footer` from its combined CSS selector while preserving `.v-fallback-nav` styling.
- [ ] Audit broad `.velocity-page` element selectors, including responsive typography rules. Scope product-content rules to `main` where they currently affect the shared footer. Preserve navigation styling and keyboard focus rules. Do not add competing footer-specific typography overrides.
- [ ] Give the shared element the homepage's inherited presentation using `bg-[#050505] text-white text-body leading-relaxed` on `<astr-footer>` in Velocity, retaining the existing Lora font. Keep Velocity's body presentation unchanged. These are existing site utilities, not a new footer design.
- [ ] Keep `components.js` and the existing component import unchanged unless verification exposes a shared defect; report such a defect separately instead of expanding this fix.

## Verification and acceptance

- [ ] Run `npm run build` and `node --test tests/velocity-*.test.mjs`; report any pre-existing failures separately.
- [ ] Compare the rendered Velocity and homepage footers at desktop (1440px) and mobile (390px) widths after scrolling them into view and allowing reveal animations to finish.
- [ ] Confirm exactly one `astr-footer` and one rendered `#footer`, with matching content, fonts, spacing, border, grid decoration, and responsive columns.
- [ ] Check footer navigation and email links, keyboard focus visibility, reveal behavior, horizontal overflow, and clearance from Velocity's mobile conversion bar.
- [ ] Confirm fallback markup and footer-specific override selectors are absent, and review the diff for unrelated changes.

**Completion report:** Summarize the edits and verification results, including any remaining visual differences. Do not claim browser parity from a successful build alone.
