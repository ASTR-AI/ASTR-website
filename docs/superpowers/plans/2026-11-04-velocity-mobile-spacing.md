# Velocity Mobile Spacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the existing Velocity mobile page a clearer spacing rhythm, informed by a fresh inspection of OpenAI Business at 440×956px.

**Architecture:** Adjust mobile CSS geometry and type sizes/leading within the existing sections. Preserve the content, section order, font families, colors, cards, navigation, disclosures and animation behavior. Keep all changes inside `@media (max-width: 767px)` and scoped below `#overview`.

**Tech stack:** Existing Vite, HTML and page-scoped CSS. No new runtime or dependencies.

**Spec:** The measured reference, spacing targets and section instructions in this document. Evidence: `docs/marketing/2026-11-04-mobile-spacing-reference/`.

**Status:** Plan only. The user rolled back the earlier redesign. This proposal supersedes the 3 November clean/minimal redesign plan for the next work. No product files were changed during this review.

## Global constraints

- Primary review viewport: exactly 440×956 CSS pixels; verify `innerWidth` and `innerHeight` after setting the viewport on each tab.
- Desktop/tablet layout at 768px and wider remains unchanged, including navigation behavior and inherited custom properties.
- The previously protected hero `#overview`, its typography, previews, spacing and animations remain unchanged on mobile and desktop.
- Preserve the existing Velocity font families, weights, colors, labels, product facts, qualifications, section order and interaction patterns.
- Keep every existing section, including Medicine workflows. No content migration, consolidation, new accordion or hiding of meaningful text.
- Preview documents and screenshots retain their own internal typography. Size their containers without distorting, cropping meaningful rows or stretching assets.
- Preserve existing header/footer content and shared component source. Any footer spacing changes apply only to Velocity below 768px.
- This is a spacing pass. No new visual theme, logo treatment, glow, border-radius system or animation changes.

## Fresh reference review

Source: https://openai.com/business/ — inspected live on 4 November 2026 at 440×956. Cookie overlay dismissed before capture. Values below are rendered CSS-box measurements, rounded for readability; glyph edges can differ from box edges. Different modules intentionally have different scales.

| Reference role | Measured value |
| --- | --- |
| General horizontal gutters | 24px each; 392px usable width |
| Major content-group separation | 80px in the sampled main flex stack |
| Hero heading | Approximately 53px type / 54px leading; not a Velocity target |
| Major section heading | Approximately 33px / 38px, weight 500 |
| Smaller section heading | Approximately 24px / 32px; “Explore more” approximately 20px / 24px |
| Section introduction | 17px / 28px, approximately 1.65 line-height |
| Compact description | 14px / 23px, approximately 1.64 line-height |
| Small card title | Approximately 16px / 20px |
| Major heading → introduction | 24px in “AI for every team” |
| Introduction → primary media | 20px in that same module |
| News heading → card | 28px |
| News category → title → description | 8px between related text roles |
| Platform heading → tab wrapper | Approximately 32px |
| Platform tabs → panel description | 32px |
| Platform description → text link | 24px |
| Platform text link → product image | 48px |
| Primary media frame | 392×221px, 16:9 |
| Platform screenshot | 392×260px; its own image ratio |
| News-card image | 358×240px inside a 392px card; approximately 16px internal padding plus border |
| Explore cards | 188×188px images; 24px card-to-card gap; 16px image-to-label gap |

Interpretation: the reference uses tight relationships inside each idea and clear separation between ideas. It does not give every heading the same size, every image the same ratio, or every section a full phone screen. Its lighter sans-serif display size should not be copied literally onto Velocity's serif headings.

## Current Velocity at the same viewport

| Area | Current measurement / finding |
| --- | --- |
| General gutters | 20px; 400px content width |
| Main section headings | 28px / 33.6px Lora |
| Medicine workflows / Risks headings | 24px / 28.8px Lora; intentional subordinate scale |
| Section descriptions | 16px / 26.4px |
| Heading → description | 16px throughout sampled sections; already a sound relationship |
| Section padding | 24–56px top, 40–56px bottom; combined transitions can reach 80–112px before additional margins |
| Stock card | 368px outer width, 20px padding; approximately 326px usable inner width |
| Stock description | 15.2px / 23.56px |
| Stock navigation | 32px top margin; hint and controls occupy separate rows; footer adds another 48px top margin |
| Hospital supply introduction → stages | 48px introduction bottom margin |
| Operations | 24px between introduction, controls and panel; 24px panel padding; compact body 14px / 21px |
| Medicine workflows | 892px section minimum height at this viewport; `justify-content: space-between` distributes approximately 66px between child groups despite a declared 32px gap |
| Workflow preview | 280px wide, approximately 264px visual height; secondary cards intentionally peek beside it |
| Demo | 400px card, 20px padding, 16px field-group gap, 8px label/control gap; inputs 16px |
| Footer | 128px top padding, following the demo section's bottom space |

The main opportunities are the distributed empty space in Medicine workflows, redundant space around stock controls/notes, the supply introduction gap and the demo-to-footer transition. Increasing every margin or enlarging all headings would miss those problems.

## Proposed mobile spacing and type scale

These are recommendations to validate visually, not claims that OpenAI uses these exact values for every component.

| Role | Target at 440px | Rationale |
| --- | --- | --- |
| Main gutters below hero | 24px; content width 392px | Same clear alignment as the reference |
| Major chapter separation | 80px total | Separate ideas without accumulating two 80px paddings |
| Related/detail chapter separation | 64px total | Keep subordinate material visibly related |
| Main heading | Keep 28px; leading 34px | Preserve Velocity's existing serif identity and optical weight |
| Detail-section heading | Keep 24px; leading 30px | Preserve the current distinction |
| Card/workflow subheading | Keep 20px; leading 26px | Familiar hierarchy with predictable wrapping |
| Section description | Keep 16px; leading 26px | Already close to the reference's relaxed proportions |
| Compact card/body text | 15px / 24px; existing 14px Operations text uses 23px leading | Improve density through leading rather than shrinking text |
| Captions/qualifications | 13px / 20px | Readable supporting information |
| Form labels | 12px / 18px | Small but readable; preserve their existing family/style |
| Form inputs | Keep at least 16px / 24px | Preserve usable controls and existing mobile behavior |
| Heading → description | 16px | Existing good relationship; no universal increase needed |
| Card title → description | 8px | Tight grouping of related information |
| Description → visual/control group | 24px | Clear separation without a blank band |
| Control group → preview/panel | 24px | Repeatable internal rhythm |
| Preview → caption | 12px | Keep note attached to its visual |
| Hint → arrow/pagination row | 8px | Treat these as one control group |
| Controls → supporting note | 16px | Reduce the current detached footer effect |
| Text-panel padding | 24px | Retain comfortable Operations-style reading width |
| Image/document-card padding | 20px | Preserve existing useful preview space |
| Form group separation | 24px; label → input 8px | Give inputs clearer grouping without oversized labels |

Use 4/8/12/16/20/24/32/40/48/64/80px as the working scale. Values should describe a specific relationship; avoid assigning a large generic margin to every child.

### Chapter-gap ownership

For the existing stacked sections, use 40px bottom + 40px next-section top for an 80px major transition. For `#features` and `#why-velocity`, use 24px top + the previous section's 40px bottom for a 64px related transition. Their bottom padding remains 40px.

Remove conflicting *mobile* padding declarations in the section-specific styles so this rule actually wins. Do not simply add another root variable and assume it controls more-specific selectors. Intro/card/footer margins must not silently add another chapter gap.

The first section below the protected hero is an exception: retain the hero's existing bottom spacing, and give Inventory 40px top padding. Do not edit the hero to achieve an exact 80px transition. For the final form-to-footer transition, use 32px demo bottom + 32px footer top for a 64px combined gap.

### Preview sizes

- Primary standalone media: 392px outer width at 440px; preserve native ratio. A genuine 16:9 image is about 221px high; a 1430:760 image is about 208px high. Captions and controls are additional height.
- Stock rail: 360px card target with 20px internal padding and a 16px rail gap. At a 24px start inset, the next card starts near x=400, leaving about 40px visible at the viewport edge. Keep the enlarge affordance and existing horizontal behavior.
- Medicine workflow rail: retain the existing 280px card width and approximately 264px document visual in the first spacing pass. Its current density is mainly caused by vertical distribution, so avoid enlarging all its diagrams simultaneously.
- Reordering: preserve the existing composed preview/overlay and roughly 300px minimum stage until the longest overlay content is checked. Do not force this composition into a 221px video box.
- Hospital supply: 392px outer preview, 24px horizontal and 24px vertical padding. Content determines height. Keep all rows, stage labels and full-example controls.
- Risks: retain document proportions, allow all scenarios to fit, and keep 24px between preview and scenario controls. Do not rescale tiny UI labels as if they were marketing headings.
- At 390px use 20px gutters; below 360px use 16px. Use fluid card widths capped at the 440px targets; no element may be wider than the available viewport or prevent the existing next-card cue.

## Section-by-section adjustments

| Section | Planned spacing adjustment |
| --- | --- |
| Hero | Protected; no changes |
| Stock | 24px introduction-to-rail; 8px title-to-description; 16px description-to-preview inside card. Keep the hint/control group close to the rail and reduce the footer's 48px margin to 16px. Include track padding when measuring the actual gap. |
| Reordering | Retain heading and overlay composition. Use 24px intro-to-visual and 24px visual-to-explanation control. Match body/caption leading to the proposed roles. |
| Purchasing | Keep the existing focused preview and both disclosure entry points. Use 24px between intro, preview and detail groups; 16px between related detail rows. Check expanded documents without altering their content. |
| Hospital supply | Reduce intro bottom margin from 48px to 24px. Use 24px stages-to-preview and 24px preview-to-qualification. Reduce summary heading-to-first-content spacing from 32px to 24px; preserve 16px row padding. |
| Operations | Retain the existing good 24px intro → tabs → panel rhythm and 24px card padding. Align panel content toward the top; eyebrow-to-heading 16px, heading-to-body 12px, body-to-bullets 16px. Preserve the existing tab-height/stability behavior, without adding viewport-height requirements. |
| Medicine workflows | Remove the viewport minimum height and `space-between` distribution only on mobile. Use normal content flow: intro → controls 24px, controls → rail 24px, rail → footnotes 16px. Keep the section, every card and its current secondary-preview scale. |
| Risks and activity | Retain 24px intro-to-preview and preview-to-scenarios. Use 16px between scenario title and its explanation; 16px after the scenario group before qualifications. Preserve every scenario and existing selection behavior. |
| Comparison | Keep the current collapsed checklist. Use 24px between introduction and control, and 16px control-to-note. No expanded-table redesign. |
| FAQ | Intro-to-list 24px. Question rows use 16px vertical padding; answer text has 12px top space and 16px bottom space. Keep the plus controls and long-question wrapping intact. |
| Demo | Heading-to-intro 16px; intro-to-email 16px; invitation-to-form 32px. Keep 20px form padding, use 24px field-group separation, 8px label-to-input, and 24px before the submit group. Preserve all fields, instructions, validation and privacy content. |
| Footer | Mobile top padding 32px after 32px demo bottom space; 32px between existing footer groups; 24px before the legal row. Retain all content and shared component behavior. |

## Implementation sequence

### Task 1 — Record guardrails and build the two representative sections

**Files:** `velocity.css`, `velocity-features-mobile.css`; read `velocity-captures.css` for preview sizing rules. No hero or desktop source rules are to be edited.

- [ ] Record baseline screenshots and computed layout at 440×956, plus desktop at 1440×900. Save the hero DOM and its CSS/controller hashes as protected baselines.
- [ ] Add/adjust only mobile declarations, scoped to lower sections. Keep gutter variables local to those sections so they cannot change the hero/header through inheritance.
- [ ] Apply the Stock spacing adjustments and the natural-flow Medicine workflows changes first.
- [ ] Capture those two sections and their neighboring transitions at 440×956. Compare actual box-to-box gaps with the targets; do not judge only from stylesheet values.
- [ ] Review this small visual slice before rolling the same spacing pattern through the remaining sections. Do not restart the previous redesign.

### Task 2 — Apply the rhythm to the remaining product sections

**Files:** `velocity.css`, the mobile blocks in `velocity-operations.css`, `velocity-supply-mobile.css`, `velocity-risks-mobile.css`, and mobile blocks in `velocity-captures.css` only where needed.

- [ ] Apply the section-specific table above, retaining all markup, text, assets, families, colors and interactions.
- [ ] Resolve conflicting mobile `padding`, `gap`, `min-height`, margin and leading rules at their owning locations. Preserve unwrapped desktop declarations byte-for-byte where practical.
- [ ] Inspect collapsed and expanded purchasing/reordering/comparison/FAQ states, all Operations tabs, and all supply/risk scenarios for clipping or unintended extra height.
- [ ] Apply footer spacing through a Velocity-only mobile selector; leave `components.js` and other pages unchanged.

### Task 3 — Verify mobile geometry and desktop isolation

- [ ] Inspect at 440×956, 390×844 and 320×740, plus the 767/768px boundary. Check both short and long text states.
- [ ] At 768×1024, 1024×768 and 1440×900, compare baseline screenshots and computed position/size/type values. The mobile stylesheet must introduce no desktop change.
- [ ] Compare protected hero markup/assets/controllers and check its mobile/desktop visual state; ensure global gutter/typography variables have not leaked into it.
- [ ] Verify no page-wide horizontal overflow, no meaningful image crop, and usable rail arrows, dialogs, forms and fixed-header anchor clearance.
- [ ] Run the existing Velocity behavior suite and production build after implementation. Do not add unit tests that merely mirror CSS values; use rendered geometry and screenshot comparison for this spacing work.
- [ ] Save a short verification record with measured gaps and before/after screenshots. Report any deliberate exceptions rather than claiming every section follows one uniform height.

## Acceptance criteria

1. The page keeps the same product content, sections, font families, colors and interactions.
2. Main content aligns consistently at 24px from each edge on the 440px reference viewport, excluding intentional rails and the protected hero/header.
3. Major transitions are approximately 80px and related transitions approximately 64px, measured from the final content box to the next heading box; document any necessary boundary exceptions.
4. Medicine workflows grows with its content rather than filling 892px because of the phone height.
5. Text remains readable at the proposed role sizes/leading, without clipping, line clamping or shrinking to force a screen fit.
6. Preview dimensions reflect their role and native ratio; images are not all forced to one height.
7. Desktop/tablet layouts and the entire protected hero are unchanged.

## Evidence and limits

1. OpenAI hero: `01-openai-hero-440.jpg` — large headline, generous hero composition; observed, not proposed for Velocity.
2. OpenAI news: `02-openai-news-440.jpg` — compact text spacing within a larger card.
3. OpenAI teams: `03-openai-teams-440.jpg` — 24px title/description relationship, 20px description/media relationship, 392×221 frame.
4. OpenAI platform: `04-openai-platform-440.jpg` — 32px control grouping, 24px and 48px secondary relationships.
5. OpenAI Explore: `05-openai-explore-440.jpg` — smaller heading and square secondary images.
6. Velocity Stock: `06-velocity-stock-current-440.jpg` — usable type hierarchy, detached controls/footnote spacing.
7. Velocity workflows: `07-velocity-workflows-current-440.jpg` — artificial distributed empty space at the requested phone height.
8. Velocity Operations: `08-velocity-operations-current-440.jpg` — useful 24px grouping; compact text leading can improve.
9. Velocity Supply: `09-velocity-supply-current-440.jpg` — oversized intro-to-stage gap and generous summary-card internals.
10. Velocity Demo: `10-velocity-demo-current-440.jpg` — original content/style retained; field spacing is the proposed change.

The reference includes carousels, hidden panels and live media. Measurements here use the selected rendered states rather than treating every offscreen DOM node as visible content. This is a visual-spacing study, not a conversion test or full accessibility audit. No implementation has been performed.
