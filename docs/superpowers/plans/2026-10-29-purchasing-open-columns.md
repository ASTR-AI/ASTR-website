# Purchasing Open Columns Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Execute in one session without delegation to keep this small task inexpensive.

**Goal:** Replace the three purchasing folder cards with responsive, off-white text columns.

**Architecture:** Edit the existing static HTML and dedicated CSS in place. Replace one markup block and its styles; add no components, assets, dependencies, or JavaScript.

**Tech Stack:** HTML, CSS, existing Vite build.

**Spec:** `docs/superpowers/specs/2026-10-29-purchasing-open-columns-design.md`

## Global Constraints

- Only the supporting feature block in `#purchasing` and its dedicated CSS are in scope.
- Off-white `#f2f2ed`; body grey `#b5b5b5`; divider `rgba(242, 242, 237, 0.18)`; no gold in the replacement.
- Use exact content from the spec; preserve existing serif heading and sans-serif body fonts.
- No folder shapes, cards, icons, gradients, shadows, hover effects, animation, dependencies, or JavaScript changes.
- Preserve the document previews, connector, note, footer, and all other sections. Do not fix the receipt hover or approval narrative in this task.
- Respect existing uncommitted work. Do not commit, push, or deploy as part of this handoff.

## Review Focus

- At `761px`, three columns still fit without text or dividers colliding.
- At `760px`, the layout stacks and vertical dividers become horizontal dividers.
- At `320px`, long headings wrap naturally and no horizontal scrollbar appears.
- Old folder styles, including responsive and hover rules, cannot leak into the new layout.
- The existing document previews and section footer retain their original appearance and behavior.

---

### Task 1: Replace folder markup and styles

**Files:**
- Modify: `velocity.html`, currently the `.v-purchase-folders` block around lines 840–1043, ending before `.v-purchase-footer`.
- Modify: `velocity.css`, folder rules around lines 1702–1768 and folder-specific declarations in the `1000px` and `760px` media queries.

**Interfaces:**
- Consumes: existing `#purchasing .v-container` and existing page font families.
- Produces: `.v-purchase-features` containing three `article.v-purchase-feature` elements, each with an `h3` and `p`. No script integration.

- [ ] Run `git status --short`; read the spec, target markup, and relevant CSS. Read applicable `AGENTS.md` instructions if present. Use selector anchors rather than assuming line numbers are unchanged.
- [ ] Replace the complete `.v-purchase-folders` wrapper and its three folder articles with `.v-purchase-features` and three `.v-purchase-feature` articles. Use the spec's exact copy, escaping `&` as `&amp;` in HTML. Remove the decorative folder SVGs entirely.
- [ ] Replace the old folder CSS with selectors scoped beneath `.velocity-page #purchasing`. Use three `minmax(0, 1fr)` grid columns, `gap: 0`, and `margin-top: 48px`. Give each column `padding: 0 28px`, the first no left padding, and the last no right padding. Apply a `1px` left border only to the second and third columns using the divider color. No backgrounds or fixed heights.
- [ ] Style headings with `'Lora', serif`, `font-size: 1.25rem`, `font-weight: 600`, `line-height: 1.35`, `margin: 0 0 12px`, and off-white. Style paragraphs with the existing sans-serif stack from `.v-folder-content p`, `font-size: 0.95rem`, `line-height: 1.65`, `margin: 0`, and body grey. Set `min-width: 0` on each article.
- [ ] At `max-width: 1000px`, reduce column horizontal padding to `20px`, retaining the first/last outer-padding exceptions. At `max-width: 760px`, use one column and `margin-top: 36px`; reset every article's padding to `24px 0` and left border to zero. Give articles after the first a `1px` top border. Set first top padding and last bottom padding to zero. Ensure these mobile declarations override the desktop first/last rules.
- [ ] Remove all obsolete `.v-purchase-folders`, `.v-folder-card`, `.v-folder-content`, and `.v-folder-glass-svg` rules, including their hover/media-query rules. Preserve unrelated declarations inside shared media queries. Search for references before removing any selector that has gained another use.

### Task 2: Verify and hand off

**Files:** No new test files required for this static, reversible presentation change.

**Interfaces:**
- Consumes: modified HTML and CSS from Task 1.
- Produces: verified diff and concise implementation report.

- [ ] Run `rg -n 'v-purchase-folders|v-folder-card|v-folder-content|v-folder-glass-svg|v-glass-(surface|sheen|rim)-[123]' velocity.html velocity.css`. Expected: no matches (exit status 1).
- [ ] Run `npx prettier --check velocity.html velocity.css`. If it fails due to this patch, format only those files and inspect for unrelated churn.
- [ ] Run `npm run build`. Expected: exit status 0. Report failures accurately, including pre-existing failures; do not expand scope to fix unrelated issues.
- [ ] Use the available browser tool to inspect `/velocity.html#purchasing` at widths `1440`, `761`, `760`, and `320` CSS pixels. Confirm the five Review Focus conditions, exact copy, off-white accents, and no clipping or overflow. Hover over each new column: nothing moves. No automated test framework or browser dependency is needed.
- [ ] Save and inspect desktop and mobile screenshots if the browser tool supports it. If visual verification is unavailable, state that limitation rather than claiming a visual pass.
- [ ] Inspect `git diff --check` and `git diff -- velocity.html velocity.css`. Confirm only the target block and its styles changed. Report changed files, checks run, and any verification limits. Stop without committing, pushing, or deploying.
