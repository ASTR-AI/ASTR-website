# Purchasing Workflow Clarity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Use one session without subagents for this small HTML/CSS task.

**Goal:** Resolve the remaining purchasing audit findings while preserving the completed open columns.

**Architecture:** Update the static purchasing preview in `velocity.html` and its existing styles in `velocity.css`. Add a small semantic workflow list and explicit receipt context; correct CSS motion and typography without JavaScript or new assets.

**Tech Stack:** HTML, CSS, existing Vite tooling.

**Spec:** `docs/superpowers/specs/2026-10-29-purchasing-workflow-clarity-design.md`

## Global Constraints

- Preserve current uncommitted changes, especially `.v-purchase-features` and `.v-purchase-feature`; do not rerun the folder replacement.
- Edit only purchasing markup and its styles in `velocity.html` and `velocity.css`.
- Use the exact copy, sizes, colors, and behavior in the spec; no gold accents in `#purchasing` and no changes to global color tokens.
- Keep the existing headline, introduction, document IDs/data, paper backgrounds, open columns, and adjacent sections.
- Add no dependencies, JavaScript, animation, third document, interactive controls, invented receipt data, or backend functionality.
- No commits, pushes, or deployment in this handoff. No new test framework for this reversible static change.

## Review Focus

- At the `761px`/`760px` boundary, the sequence and previews remain readable as they change layout.
- Longer receipt context and larger metadata wrap without squeezing quantities or extending beyond document edges.
- Hovering either preview never overlaps the stage note, and reduced-motion users see no movement.
- Screen-reader reading order follows create → approve → receive; the connector remains decorative.
- The completed columns and neighboring sections remain unchanged, including under 200% zoom.

---

### Task 1: Clarify workflow and receipt context

**Files:** `velocity.html`, `#purchasing`, currently around lines 660–880. Locate by selectors rather than fixed line numbers.

**Interfaces:** Consumes `.v-purchase-stage-caption` and `.v-purchase-documents`; produces `ol.v-purchase-sequence[aria-label="Purchasing steps"]` with three `li` elements, and `p.v-receipt-context` inside the receipt article.

- [ ] Read the spec, applicable `AGENTS.md` instructions, and `git diff -- velocity.html velocity.css`. Identify and preserve the completed column edits.
- [ ] Insert the ordered list immediately after `.v-purchase-stage-caption` and before `.v-purchase-documents`. Use exactly `Create order`, `Review &amp; approve`, and `Record receipt`. Keep it static and exposed to assistive technology; no buttons, tabindex, progress state, or `aria-current`.
- [ ] Change the receipt badge to `Receipt excerpt`. Insert `.v-receipt-context` after `.v-document-heading` inside `.v-purchase-receipt`, with exact text `Against PO–0024 · Showing 1 of 2 ordered medicines`. Preserve PO/GR IDs, both order rows, existing receipt medicine details, and `Pending approval`.
- [ ] Replace `.v-purchase-stage-note` text with `Illustrative stages: your team reviews and approves the order before recording a delivery.`
- [ ] Verify the markup diff contains all three steps in order, the matching PO reference, excerpt wording, and the manual handoff note. Confirm no modifications to `.v-purchase-features` or other sections.

### Task 2: Layout, motion, neutral accents, and readable text

**Files:** `velocity.css`, purchasing rules beginning near line 1377 and their responsive overrides.

**Interfaces:** Styles the classes produced in Task 1. Existing `.v-purchase-document` elements retain their layout responsibilities; the receipt stagger remains margin-based.

- [ ] Style `.v-purchase-sequence` beneath `.velocity-page #purchasing`: grid of three equal `minmax(0, 1fr)` columns, gap `24px`, width/max-width matching the `980px` documents, centered, padding `0`, margin `0 auto 28px`, and `list-style: none`. Style each item with a `1px` top rule using the spec's neutral-rule color, padding-top `12px`, existing sans-serif stack, `0.9375rem/1.5`, and off-white. Use a scoped CSS counter to render `01`, `02`, `03` before the labels; counters are decorative reinforcement of the semantic ordered list.
- [ ] At `max-width: 760px`, use one sequence column with gap `12px`, retain the existing document stacking, and ensure no forced nowrap. Give `.v-receipt-context` `margin: -8px 0 20px`, `font-size: 0.8125rem`, `line-height: 1.5`, and secondary document text color; allow natural wrapping.
- [ ] Replace receipt hover `translateY(48px)` with `translateY(-4px)`. Keep desktop receipt `margin-top: 52px` and mobile `margin-top: 0`. Add scoped reduced-motion rules that set both document transitions to `none` and hover transforms to `none`; place these after hover rules so they win.
- [ ] Audit every font declaration in the purchasing preview: topline (including first-child shorthand), kicker, ID shorthand, `dt`, `dd`, badges, table, table headers, medicine detail spans, receipt quantities, bottom paragraph, and count shorthand. Raise small text to at least `0.8125rem/1.45` and document body/table text to at least `0.875rem`; keep larger headings. Ensure shorthand declarations and mobile overrides do not undo the increases. Allow supplier/detail flex groups and document bottom metadata to wrap when needed rather than shrinking text.
- [ ] Apply the spec's secondary text and stage-note colors and sizes. Set caption to at least `0.8125rem/1.45`, reduce its letter spacing to `0.08em`, and allow wrapping. Neutralize existing purchasing-only gold colors on caption, connector/rules, document arrows, symbols, pending badge, and closing accent using the spec's palette. Retain green receiving details and existing paper backgrounds. Do not edit shared global tokens.
- [ ] Review all selectors touched for unintended reuse outside `#purchasing`; scope changes to this section when needed. Confirm no open-column declarations changed.

### Task 3: Verify the complete section

**Files:** No permanent test files required. Save optional screenshot artifacts under `docs/superpowers/plans/verification-assets/purchasing-workflow-clarity/`.

**Interfaces:** Consumes Tasks 1–2; produces verification evidence and a concise report.

- [ ] Run `npx prettier --check velocity.html velocity.css`; fix formatting only in touched files and inspect for unrelated churn.
- [ ] Run `npm run build`; expected exit status `0`. Report any pre-existing failure separately without widening scope.
- [ ] Use available browser tooling to inspect `/velocity.html#purchasing` at `1440`, `1024`, `761`, `760`, and `320` CSS pixels. Confirm the sequence is in order, receipt context readable, both order medicines present, excerpt unambiguous, no horizontal page overflow, and no document/column/footer collisions. At `320px`, verify long supplier/status and footer metadata wrap inside the cards.
- [ ] Hover both documents at desktop width and wait through the transition. Confirm each lifts only `4px` and the receipt never moves down or obscures the stage note. Check reduced-motion mode: neither card moves and transitions are disabled.
- [ ] At 200% browser zoom, confirm all text remains available with natural wrapping and no clipping. Inspect the accessibility tree: ordered list contains three items, headings remain meaningful, connector is hidden, and the receipt context is exposed as text.
- [ ] Measure small-text contrast against the rendered backgrounds using a browser contrast inspector or a local WCAG luminance calculation with actual computed foreground/background colors. Expected minimum `4.5:1`; do not infer this solely from appearance. Verify computed metadata sizes meet the spec and capture desktop/mobile screenshots if supported.
- [ ] Run `git diff --check`; inspect `git diff -- velocity.html velocity.css` against the initial diff. Confirm prior open-column work is preserved and no other sections changed. Report check results and any unverified browser/contrast/motion conditions honestly. Stop without committing, pushing, or deploying.
