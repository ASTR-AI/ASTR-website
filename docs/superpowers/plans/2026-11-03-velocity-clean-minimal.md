# Velocity Clean and Minimal Product Page — Proposed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Velocity easy to scan on a phone, preserve access to its capabilities, and express ASTR AI through a disciplined brand system.

**Architecture:** Refine the existing Vite HTML/CSS/JavaScript page and its disclosure, tab, preview and form modules. Consolidate repetitive content and competing style rules; retain stable navigation destinations, interaction semantics and form contracts. Use the same content hierarchy on desktop, with more room for side-by-side presentation.

**Tech stack:** Existing Vite, HTML, page-scoped CSS, JavaScript ES modules, native disclosures/dialogs and Node's test runner. No new UI framework.

**Spec:** The design brief, content map and visual specifications in this document; the user's supplied ASTR AI typography reference; `docs/marketing/2026-11-03-velocity-audit/audit.md`.

**Status:** Proposed plan for review. No application implementation is included. Typography reference takes priority over older repository descriptions of Lora/Geist. Content consolidation and exact token values below are recommendations, not previously approved user decisions.

## Design brief

The visitor should quickly understand what Velocity does, see believable product evidence, find relevant capabilities and request a demo. The mobile experience should avoid long explanations, repeated promises, competing labels and visual effects that delay access to information.

Minimalism means fewer simultaneous messages and clearer choices. It must not mean tiny text, barely visible controls, unexplained screenshots, or concealing qualifications. Preserve all unique capabilities and relevant package limitations; remove duplicate explanations and relocate deeper detail to clearly labeled disclosures. Do not introduce unsupported outcome claims.

### Approaches considered

| Approach | Benefit | Tradeoff |
| --- | --- | --- |
| Style cleanup only | Lowest structural risk; improves font, color and spacing consistency | Leaves repeated sections and reading burden |
| **Recommended: concise overview with optional detail** | Shortens the default reading path while retaining useful information | Needs deliberate disclosure labels and reliable anchor handling |
| Short campaign page with most detail removed | Shortest default page | Loses capability coverage and requires new destinations for detail |

Proceed with the middle approach as the proposal. Do not assume authorization to delete unique product information.

## Global constraints

- Apply the supplied brand roles: Cinzel display; Space Grotesk UI/subheadings; JetBrains Mono metadata; Caveat optional annotations.
- Proposed extension: Space Grotesk is also the marketing body font, keeping reading and controls consistent.
- Retain the existing Velocity identity/wordmark and supplied assets; do not redraw the logo or automatically retype it in Cinzel.
- Treat product screenshots as product evidence. Do not alter their embedded fonts to match the marketing page.
- Lora/Geist may remain where owned by the shared brand assets, screenshots or unrelated pages; eliminate interchangeable use in Velocity marketing copy.
- Keep meaningful package and setup qualifications close to the associated claims, including higher-tier Tally availability.
- No new dependency, backend, form-field requirement, analytics event schema or deployment is needed.
- Existing shared-footer content and other pages must continue working; scope visual overrides to `.velocity-page`.
- Retain the existing 767/768px content breakpoint and 900px navigation breakpoint unless measured wrapping requires a documented adjustment.
- All unique capabilities must remain discoverable by visible labels; do not bury core benefits behind generic “Read more” controls.

## Visual specifications

### Typography

| Role | Font | Mobile target | Desktop target | Usage |
| --- | --- | --- | --- | --- |
| Hero | Cinzel 600 | 32px / 1.2; 30px below 360px | clamp(44px, 4.2vw, 60px) / 1.15 | One short headline, no italic second headline |
| Main section title | Cinzel 600 | 26px / 1.25; 24px below 360px | clamp(32px, 3vw, 42px) / 1.2 | Same role across all main sections |
| Card/subsection title | Space Grotesk 500 | 20px / 1.35 | 22px / 1.35 | Upright, sentence case |
| Body/section introduction | Space Grotesk 400 | 16px / 1.55 | 17px / 1.6 | One body role; desktop max width 60ch |
| Controls and form labels | Space Grotesk 500 | 14px / 1.4 | 14px / 1.4 | Sentence case; normal tracking |
| Inputs/selects | Space Grotesk 400 | 16px / 1.5 | 16px / 1.5 | Explicit labels; upright placeholders |
| Captions/qualifications | Space Grotesk 400 | 13px / 1.5 | 13px / 1.5 | Readable, not dim decoration |
| Genuine IDs/metadata | JetBrains Mono 400 | 12px / 1.5 | 12px / 1.5 | Short product IDs, no prose paragraphs |
| Optional annotation | Caveat | None added by default | Existing brand signature only | Not a fourth reading system |

Proposed page tokens: `--v-font-display`, `--v-font-body`, `--v-font-meta`; `--v-type-hero`, `--v-type-section`, `--v-type-card`, `--v-type-body`, `--v-type-label`, `--v-type-caption`, `--v-type-meta`. Use normal tracking for body and controls; display tracking 0; metadata at most .06em. Do not force all headings to uppercase through CSS.

Cinzel has a different width and visual weight from Lora. Recheck actual wrapping; do not shrink every heading until long copy fits. Shorten verbose titles or allow natural wrapping first. Keep complete words and no forced clipping.

Font delivery: the current Velocity font URL requests Cinzel/Lora/Caveat/JetBrains Mono, but not Space Grotesk. Explicitly load the Space Grotesk weights actually used and verify the rendered face, rather than relying on `font-family` declarations alone. Preserve font loading required by the shared footer and other components.

### Color and surfaces

| Proposed token | Value | Role |
| --- | --- | --- |
| `--v-bg` | `#000000` | Page canvas |
| `--v-surface` | `#141414` | Main dark panel/form |
| `--v-preview-surface` | `#F3F1E9` | Existing cream document language |
| `--v-text-primary` | `#F5F3EE` | Main headings and controls |
| `--v-text-secondary` | `#C5C2BA` | Body copy |
| `--v-text-muted` | `#A8A59D` | Captions and qualifications |
| `--v-accent` | `#E6CD99` | Brand/action/selection accent |
| `--v-border` | `rgba(255,255,255,.14)` | Decorative separators |

Keep semantic stock/status colors inside product previews and validation states. Use text/icons alongside status color. Do not use gold on every label. Decorative separator color is not sufficient by itself for essential input boundaries or control states; measure those separately. Verify contrast against actual composited surfaces and overlays before accepting these proposed values.

Use a 20px card radius, 12px input radius and pill CTAs. Keep nested document previews at 12px. Remove redundant frames and glows around the same visual. Keep a restrained focus/hover accent without persistent ambient animation.

### Spacing and layout

- Shared spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80px.
- Content gutters: 20px mobile; 16px below 360px; 32px tablet; desktop centered container up to 1200px.
- Mobile content-to-content gap between major chapters: 64px. Related detail gap: 32px. Desktop equivalents: 96px and 48px.
- Implement chapter separation with one owner, such as section start spacing, rather than adding full bottom padding and full next-section top padding. Audit special backgrounds independently.
- Heading to introduction: 12px mobile / 16px desktop. Introduction to preview/control group: 24px / 32px.
- Card padding: 20px mobile / 28px desktop. Mobile form fields: 20px between groups.
- Content determines height. Remove the full-viewport minimum height and `space-between` distribution in `velocity-features-mobile.css`; check corresponding risks styles. Do not add blank height to give each module a “screen.”
- Use a 44×44px minimum target for standalone controls with adequate separation; target size is not the visible icon size.

## Proposed content map

| Current area | Clean default view | Deeper detail / consolidation |
| --- | --- | --- |
| Header | Existing Velocity identity, one demo CTA, menu | Short navigation labels; no extra mobile action bar competing with the header CTA |
| Hero | One headline, one short sentence, primary CTA, quiet explore link, one dashboard preview | Remove repeated benefit chapters and capability-summary prose; map their unique points into the relevant chapters below |
| Stock across locations | “Stock across locations”; one sentence; first useful preview | Keep discoverable Locations, Batches, Expiry, Packs & units controls; merge duplicate pack/unit content from Medicine workflows |
| Smarter reordering | Heading, one benefit sentence, one clean visual | Keep “How suggestions work” disclosure; retain “Your team reviews before ordering” near the claim |
| Purchasing and receiving | Heading, one sentence, one purchase/receipt summary | One “View purchasing steps” disclosure containing order → approval → receipt and supplier records; avoid nested disclosures |
| Hospital medicine supply | Heading, one sentence, existing Request/Prepare/Dispatch/Receive control and current-step preview | Show full example on request; keep approvals and rejected-delivery return information in the relevant detail |
| Everyday operations | Four clearly labeled workflows; concise active panel | Preserve Billing, Ward medicines, Accounts & Tally, Reports & access. Merge reporting/accounting duplication from Medicine workflows into their owning workflows |
| Medicine workflows | Remove as a repeated standalone chapter after content migration | Packs/units → Stock; order trail → Purchasing; consumption/reporting → Operations. Retain an explicit compatibility target for `#features` |
| Risks and activity | One heading and three short scenario labels; selected example | Keep low stock/expiry, adjustment history and browser reports. Remove repeated generic “all in one” prose; descriptions follow selection |
| Compare capabilities | Short prompt and existing collapsed checklist | Keep genuine decision-making detail and product/plan caveats; avoid repeating every feature as another marketing grid |
| FAQ | Existing useful questions with concise answers | Keep answers collapsed; remove copy duplicated directly above unless it answers a distinct concern |
| Demo | One invitation, explicit form labels, same required fields | Remove repeated heading/intro statements; retain email alternative, privacy information and all validation states |
| Footer | Brand, meaningful navigation/contact and readable legal links | Suppress decorative connection/version/reference readouts on Velocity; reduce repeated preambles and empty space |

Proposed hero copy: **“Manage your pharmacy.”** followed by **“Stock, purchases and billing in one workspace.”** Keep the product/audience meaning available in the next relevant sentence or section; verify the final wording does not broaden the product's actual scope. One H1 only.

Copy guidelines: one supporting sentence per default section, ideally 12–22 words; at most two short benefit bullets in an active workflow panel. Treat these as editing budgets, not line-clamp rules. Product caveats can exceed the budget when needed for accuracy. Do not hide arbitrary overflow or shrink text to satisfy a word count.

Preview clarity: keep a legible focal area of each screenshot with its original aspect ratio. Do not expect a full desktop dashboard to be readable at phone width. Existing enlarge-preview dialogs remain available, with a clear label. Consolidate repeated demo-data badges into one visible note per example group, retaining individual accessible descriptions where needed.

## Interaction and responsive rules

- Mobile: one dominant preview/idea per chapter, normal document flow and no scroll-driven hero pinning or automatic panel rotation.
- Desktop: same concise content, side-by-side copy/preview where useful; replace the long hero chapter choreography with a normal-flow hero. Preserve manual preview browsing where it adds useful evidence.
- Inventory: preserve the existing carousel and enlarge dialog, with one compact control row. Do not add another carousel for migrated pack/unit text.
- Operations: retain the existing accessible mobile 2×2 and desktop horizontal tab models. Use one active description; no repeated promotional text below the panel.
- Supply: manual stage selection on phones; keep an explicit pause control if desktop auto-animation remains. Reduced-motion mode is static and fully informative.
- Disclosures: meaningful labels, visible focus, native semantics where possible, no nested “more” hierarchy. Hidden content must not remain focusable or duplicate announcements.
- Anchor navigation into collapsed details opens the owning disclosure before positioning content below the fixed header. Ordinary loading must not unexpectedly open every detail. Use the hash as the source of truth and verify back/forward behavior.
- Legacy `#features`: maintain a visible destination/explanation in the stock detail group or a small hash-to-destination map. Do not leave a dead anchor or create duplicate IDs. Update internal navigation to the final owner.
- Preserve existing section IDs used by links wherever practical, plus analytics attributes and names. A removed presentation section does not imply deletion of its capability.
- Keep the header demo action. Audit the existing conversion-bar module so it does not introduce an extra persistent mobile CTA after this cleanup.
- No-JavaScript visitors must still see the core benefits, open native disclosures and reach the demo form. Do not use opacity-zero as the unenhanced default.

## Review focus

1. Cinzel and actual Space Grotesk loading at 320px: complete words, readable line breaks and no silent fallback masquerading as the intended design.
2. Old anchors and browser history after content migration: reach and reveal the correct capability without obscured headings or lost focus.
3. Opening disclosures and changing tabs: no large empty viewport-height containers, overlap, clipping or duplicated focusable panels.
4. Demo form with long organisation names, country codes, errors and the phone keyboard: no zoom-inducing text sizes or covered submit/error content.
5. Shared footer and existing analytics: Velocity overrides do not affect other pages; cleaned CTAs still track allowed placements without transmitting form values.

## Implementation sequence

### Task 1 — Establish brand typography and shared visual roles

**Files:** `velocity.html`, `velocity.css`, `velocity-hero.css`, `velocity-operations.css`, `velocity-supply.css`, `velocity-captures.css` and the three mobile section stylesheets as needed. Read `tailwind.config.js`/`index.css`; avoid changing global font mappings.

**Interface:** Consume `.velocity-page` and existing heading/control classes; produce the page tokens specified above and a single authoritative style for each marketing role.

- [ ] Record a fresh baseline at 390×844 and 1440×900 before implementation; the audit screenshots are a comparison aid, not a substitute for a current baseline.
- [ ] Load the required Space Grotesk faces and map Cinzel/Space/JetBrains roles. Remove italic marketing instructions and redundant heading accents; preserve the wordmark and product screenshots.
- [ ] Replace competing sizes/colors at their owning rules. Remove superseded declarations rather than appending another blanket override layer to the end of the 6000+ line stylesheet.
- [ ] Apply common radius, text and spacing roles. Keep preview-specific styles separate from marketing roles.
- [ ] Verify actual loaded fonts and computed styles, wrapping at 320/390px, and contrast on dark/cream surfaces. No unit tests that merely repeat CSS declarations.

### Task 2 — Simplify the hero and reading rhythm

**Files:** `velocity.html`, `velocity-hero.css`, `velocity-hero.mjs`, `velocity-page.js`, `velocity-motion.css`, `velocity-motion.mjs`, `tests/velocity-hero.test.mjs`.

**Interface:** Preserve `#overview`, demo/explore destinations and supported manual preview controls; remove the requirement to scroll through three benefit chapters before stock content.

- [ ] Map unique hero claims to their destination chapters before deleting repeated promotional markup.
- [ ] Implement the proposed single-message hero, context sentence and normal-flow preview. Remove obsolete pinning geometry and chapter listeners; keep cleanup safe when markup is absent.
- [ ] Remove scroll-only behavior tests that no longer describe the desired experience; retain or replace meaningful tests for manual selection, inactive-panel focusability and cleanup if those behaviors remain.
- [ ] Verify content is visible with JS disabled and reduced motion enabled. Confirm the next section follows content height and fixed-header anchors land correctly.

### Task 3 — Consolidate duplicated capability content

**Files:** `velocity.html`, `velocity.css`, `velocity-features-mobile.css`, `velocity-risks-mobile.css`, `velocity-operations.css`, `velocity-page.js`, `velocity-mobile-rails.mjs` only where lifecycle wiring changes; relevant existing inventory/operations/mobile-rail tests.

**Interface:** Preserve inventory carousel and operations tab roots/data attributes; migrate all unique `#features` information to its owner and provide the legacy hash behavior described above.

- [ ] Create a before/after capability checklist covering locations, batches, expiry, packs/units, reorder suggestions, purchasing/receiving, supplier records, hospital supply, billing/payments, ward stock, accounting/Tally, reports/access and adjustment history.
- [ ] Move packs/units into Stock, order trail into Purchasing, and consumption/accounting detail into the relevant Operations panel. Remove the duplicated standalone Medicine workflows chapter only after that checklist is complete.
- [ ] Simplify default section introductions and selected-panel copy to the editing budgets. Preserve all qualifying statements and unique functionality.
- [ ] Remove unused rail initialization/imports/styles only if their last consumer disappears. Keep generic rail utilities used elsewhere.
- [ ] For any new hash-reveal helper, add behavioral tests for direct load, hash change, absent destination, disclosure reveal, repeated calls and cleanup; browser-check back/forward and header clearance.
- [ ] Verify default and expanded panels at mobile/tablet widths. Confirm no hidden panel can receive focus and no content migration produces duplicate IDs.

### Task 4 — Unify detail interactions and simplify previews

**Files:** `velocity.html`, `velocity.css`, `velocity-supply.css`, `velocity-supply-mobile.css`, `velocity-supply-mobile.mjs`, `velocity-supply.mjs`, `velocity-supply-bento.mjs`, `velocity-operations.mjs`, `velocity-why.mjs`, `velocity-comparison.mjs`; corresponding existing tests where behavior changes.

**Interface:** Keep existing selection, dialog and disclosure semantics; use one labeled detail entry point per chapter where possible.

- [ ] Consolidate purchasing disclosure labels/content and replace stacked repeated instructions with a single clear prompt.
- [ ] Retain visible supply steps and operation labels; standardize active/focus treatment and caption placement.
- [ ] Remove mobile full-viewport minimum heights and space distribution that manufactures blank bands. Check long text and expanded states before reducing any padding.
- [ ] Ensure each preview group clearly identifies demo data once; preserve inspect/enlarge affordances without covering key information.
- [ ] Run the affected supply, operations, inventory, comparison and risks behavior tests. Browser-check touch selection, keyboard navigation, dialog Escape/return focus and static reduced-motion behavior.

### Task 5 — Clean the demo form, CTA system and footer

**Files:** `velocity.html`, `velocity.css`, `velocity-conversion.mjs`, `velocity-demo-form.mjs` only if needed, `tests/velocity-conversion.test.mjs`, `tests/velocity-demo-form.test.mjs`, `tests/velocity-analytics.test.mjs`. Inspect `components.js`; prefer page-scoped footer styles rather than editing the shared template.

**Interface:** Preserve form IDs/names, required fields, validation/submission contracts, privacy links and analytics allowlists.

- [ ] Use one demo invitation, upright instructions, 14px labels, 16px controls and consistent field spacing. Keep labels independent of placeholders.
- [ ] Normalize primary/secondary CTA styling and sentence case. Remove letter spacing that makes submit text difficult to scan.
- [ ] Ensure no additional floating mobile conversion bar competes with the fixed-header action; preserve its safe behavior if the module remains for other uses.
- [ ] Increase footer link/legal contrast and useful type sizes. Hide only decorative readouts on Velocity and reduce the footer's blank preamble. Retain meaningful navigation/contact/legal content.
- [ ] Test form empty/invalid, submitting, success, server-error and retry states through existing fixtures; do not send real test leads. Verify country-code controls at 320px, long values, focus and keyboard clearance in browser.
- [ ] Run conversion/demo/analytics tests; spot-check another page using the same footer to confirm isolation.

### Task 6 — Verify the complete experience and update documentation

**Files:** Add `docs/marketing/2026-11-03-velocity-clean-minimal-verification.md` and new implementation screenshots. Update `Design-Guidelines/Velocity_Design_Guideline.md` and `design-system/astr-ai/pages/velocity.md` only after checking and preserving the user's in-progress edits.

- [ ] Run `node --test tests/velocity-*.test.mjs`; expect all retained behavior tests to pass.
- [ ] Run `npm run build`; expect a successful production build. Run `npm run lint` and distinguish existing failures from introduced failures.
- [ ] Capture and inspect 320×740, 390×844, 440×956, 768×1024, 1024×768 and 1440×900. Also check 767/768px and 900/901px transitions where navigation/layout changes.
- [ ] Check all default sections, each disclosure open, each operation tab, supply steps, carousel ends, modal, comparison, FAQ and all form feedback states.
- [ ] Verify text at 200% zoom, visible focus, screen-reader names for changed controls, touch-target separation, no horizontal document overflow and no controls obscured by sticky UI.
- [ ] Check relevant foreground/background pairs for normal text, large text, controls and focus. Target at least 4.5:1 normal text and 3:1 large text/essential UI graphics; do not reuse unverified contrast claims from old guidelines.
- [ ] Compare fresh before/after screenshots at equal viewports and record section heights, default-visible word counts and capability coverage. A reduction in default-visible copy must not come from smaller type or deletion of unique capabilities.
- [ ] Update the Velocity-specific font/content/spacing guidelines to match the shipped result; note any intentional exceptions for screenshots and the wordmark. Do not rewrite the global ASTR guideline as a side effect.

## Acceptance criteria

- The visible mobile hero communicates the product, one benefit and the next action without requiring tiny dashboard text to explain it.
- Marketing text consistently uses the defined Cinzel/Space Grotesk/JetBrains roles; no new Caveat annotations are needed to establish identity.
- Every unique current capability has a named owner and remains discoverable; obsolete feature hashes still reach a meaningful destination.
- Each default chapter contains one main message and a useful visual or control group. Extra detail is accessible with a descriptive action.
- Mobile has content-driven heights, consistent chapter separation and no persistent competing bottom CTA.
- Default mobile reading load is materially lower than the baseline, with the reduction measured and documented rather than claimed from appearance alone.
- Footer and form are readable; core actions do not depend on hover, animation or JavaScript-only visibility.
- Behavior tests and production build pass; all specified viewport/state evidence has been inspected.

## Handoff

Deliver the revised local page, viewport screenshots, the capability migration checklist and the verification record. Report actual changes and limitations. Do not publish or deploy as part of this cleanup plan.
