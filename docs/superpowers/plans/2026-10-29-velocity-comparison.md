# Velocity Comparison Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the adoption section with a readable comparison of pharmacy evaluation criteria and Velocity's supported capabilities, explicitly marking GST return filing as coming soon.

**Architecture:** Render the comparison directly in `velocity.html` and scope styles in `velocity.css`. Reuse the delegated demo CTA handler; extend its analytics placement allowlist rather than introducing a new controller. The proposed comparison uses evaluation questions instead of unverified competitor claims.

**Tech Stack:** Vite 8, semantic HTML, existing CSS tokens, ES modules, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-29-velocity-comparison-design.md` (proposed; review before implementation).

## Global Constraints

- No application features, integrations, tax-filing backend, or deployment are part of this website change.
- Keep the current dark/gold identity, readable product copy, native document scrolling, and existing demo destination.
- All rows remain visible without JavaScript.
- Location means stock availability at pharmacy locations, not staff GPS tracking.
- GST return filing must visibly say “Coming soon”; never give it an available/checkmark treatment or a delivery date.
- Do not add “only”, “exclusive”, competitor crosses, competitor logos, or an unsupported market-superiority badge.
- No tabs, filters, new animation, runtime dependencies, or new product imagery are needed.
- Preserve existing uncommitted edits in `velocity.html` and `velocity.css`; inspect the current diff before editing and stage only this work if committing.

## Review Focus

- At 320px and 390px, long cell text remains readable; overflow stays inside the comparison, not the document.
- Keyboard and 200% zoom users can reach all table content and the demo link without sticky elements covering focus.
- GST filing remains visibly future functionality, including without CSS or JavaScript.
- The new CTA reaches the existing enquiry destination and its analytics event survives the placement allowlist.
- Existing `#adoption` links still reach the replacement, and surrounding Why Velocity / FAQ content and interactions remain intact.

## File map

| File | Responsibility |
| --- | --- |
| `velocity.html` | Replace the adoption markup around lines 2697–2750 with the comparison; preserve an adoption anchor alias. |
| `velocity.css` | Replace the adoption-only rules around lines 4598–4669 and their 900px grid override with scoped comparison styles. |
| `velocity-analytics.mjs` | Accept `comparison` as a CTA placement while retaining `adoption` for compatibility. |
| `tests/velocity-analytics.test.mjs` | Test the new placement and existing privacy boundary. |
| `docs/marketing/velocity-comparison-verification.md` | Record checks, screenshots, claim-source review and remaining release limitations. |

No `velocity-page.js` or `velocity-conversion.mjs` change is expected: delegated click handling already reads `data-placement` from the CTA.

### Task 1: Implement the static comparison and responsive presentation

**Files:** Modify `velocity.html`, `velocity.css`.

**Interfaces:** Consumes the exact heading, introduction, column names, 14 rows and qualification from the spec. Produces `section#comparison.v-comparison-section`, heading `#v-comparison-title`, table `#v-comparison-table`, and CTA attributes `data-velocity-cta`, `data-placement="comparison"`, `data-action="demo"` with `href="/connect?product=velocity"`.

- [ ] Inspect `git diff -- velocity.html velocity.css` and re-read the live adoption block, CSS and proposed spec. Confirm the columns and rows have been reviewed before implementation.
- [ ] Replace only the adoption section. Retain `id="adoption"` on a noninteractive anchor element at the start of the new section; use `id="comparison"` on the section and `aria-labelledby="v-comparison-title"`.
- [ ] Add the spec's heading, intro, semantic table with `scope="col"` and `scope="row"`, caption “Pharmacy software evaluation checklist and Velocity capabilities”, qualification, and demo CTA. Give GST filing a textual Coming soon badge without a checkmark; do not add an “Available” badge to every other cell.
- [ ] Wrap the table in `.v-comparison-scroll` with `tabindex="0"`, `role="region"`, and `aria-label="Pharmacy software comparison"`. Add visible helper text “Scroll sideways to compare all columns.” on narrow screens.
- [ ] Replace unused adoption CSS with `.velocity-page .v-comparison-*` styles. Use existing serif headings, sans-serif body copy, gold accent and dark surfaces. Use approximately 22% / 34% / 44% column widths, top-aligned wrapping text, a 760px table minimum width, and container-only horizontal overflow. Apply an opaque sticky first column only at widths up to 900px; use visible focus outlines and no new motion.
- [ ] Run `npm run build`; expected exit 0. Visually inspect at 1440px, 900px, 390px and 320px. Confirm all 14 rows, readable prose, no clipped sticky cells or document overflow, and no adoption grid rules affecting other sections.
- [ ] Verify `#adoption` and `#comparison` reach the replacement, and inspect Why Velocity / FAQ boundaries for layout regressions. This is a static content/style change: visual and semantic checks are the primary verification; do not add tests that merely duplicate the table copy.

### Task 2: Preserve demo CTA telemetry

**Files:** Modify `velocity-analytics.mjs`, `tests/velocity-analytics.test.mjs`.

**Interfaces:** Existing `createVelocityTracker(sendEvent)` and `velocity_cta_click` event remain unchanged. Add `comparison` to accepted placement strings; preserve all existing values and action/property allowlists.

- [ ] Add `comparison` to the valid placements test array and add a focused regression test named `comparison CTA strips extra properties`:

```js
test('comparison CTA strips extra properties', () => {
  const events = [];
  const tracker = createVelocityTracker((name, props) => events.push({ name, props }));
  tracker('velocity_cta_click', {
    placement: 'comparison', action: 'demo', email: 'private@example.test',
  });
  assert.deepEqual(events, [{
    name: 'velocity_cta_click', props: { placement: 'comparison', action: 'demo' },
  }]);
});
```

- [ ] Run `node --test tests/velocity-analytics.test.mjs`; expected new cases fail because `comparison` is currently rejected.
- [ ] Add `comparison` to `VALID_CTA_PLACEMENTS` in `velocity-analytics.mjs`; leave the legacy `adoption` placement accepted.
- [ ] Run `node --test tests/velocity-analytics.test.mjs tests/velocity-conversion.test.mjs`; expected all pass. Run `npx eslint velocity-analytics.mjs tests/velocity-analytics.test.mjs`; expected no errors.
- [ ] In the browser confirm the new CTA navigates to `/connect?product=velocity`; use local observation of the delegated tracker if available, without submitting a live enquiry. Do not claim production analytics ingestion has been verified.

### Task 3: Verify claims, accessibility, and integration

**Files:** Create `docs/marketing/velocity-comparison-verification.md`; correct Task 1/2 files only if checks expose issues.

**Interfaces:** Consumes the completed section and analytics change. Produces a concise evidence record with command results, viewport captures and any unresolved release claims.

- [ ] Check every comparison cell against the spec. Record user confirmation as provenance for newly supplied features. Check the live app or authoritative product evidence for one-click Tally sync because older local notes describe exports; if unavailable, retain the requested draft wording and clearly record the unresolved release check. Do not silently substitute a different feature or claim this check passed.
- [ ] Verify no competitor capabilities or exclusivity claims were invented; no safe-substitution, narcotics-compliance guarantee, autonomous-ordering, universal payment-method or all-reports-live claims were added.
- [ ] At 320px and 390px, keyboard-focus the scroll region, scroll to the final column and tab to the CTA. Confirm visible focus and no overlap with the mobile conversion bar. At 200% browser zoom, verify full text access and no document-wide horizontal overflow.
- [ ] Check table caption and header associations in the accessibility tree; verify the Coming soon text is exposed. Test with JavaScript disabled and reduced motion enabled: all rows and the native demo link remain usable.
- [ ] Run `node --test tests/*.test.mjs` and `npm run build`; expected exit 0. Record pre-existing failures separately if encountered; do not expand this change to unrelated repairs.
- [ ] Capture desktop and mobile screenshots, record the actual viewport sizes and results in the verification file, and review `git diff --check` plus the scoped diff. Confirm unrelated existing edits are preserved.
- [ ] If the user requests a commit, stage only intended hunks and the new documentation; use `feat: replace Velocity adoption section with capability comparison`. Otherwise leave the implementation reviewable in the working tree.

## Completion criteria and handoff

The adoption cards are replaced; all agreed capabilities appear; GST return filing is unmistakably coming soon; comparison language stays grounded; the mobile table is navigable; both anchors work; demo navigation and telemetry work; required checks have recorded evidence. Report unverified product details explicitly instead of treating the website build as proof of application behavior.

Planning self-review: all feature rows live in the linked spec; Tasks 1–3 cover the five review conditions. The plan adds one small analytics change and a static section, with no new UI controller or dependency. Recommended execution is native in this session because the work is small and closely coupled. Implementation awaits review of this proposal.
