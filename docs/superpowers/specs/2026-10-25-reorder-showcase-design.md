# Reorder recommendations — proposed section design

Status: proposed for review. This document defines the design; it does not authorise implementation by itself.

## Intent and scope

Redesign section 02 of the Velocity page as a single, spacious product showcase. Help pharmacy teams understand what informs a reorder suggestion, what the suggestion contains, and how their team stays in control. The user requested an explicit “AI-enabled reorder recommendations” label and references to Cluely and Apple's MacBook Pro page.

Use the product-showcase direction recommended in the conversation as the working assumption for this plan. Take inspiration from the references' visual hierarchy, generous spacing and prominent product demonstrations; retain ASTR's identity and create an original composition.

Only `#reordering` changes. Preserve the inventory carousel, hero, purchasing section, navigation and existing unrelated edits. Keep the existing section anchor and page structure. No new dependencies or site-wide typography changes.

## Current state

The section in `velocity.html` uses `.v-container.v-split`: several text paragraphs beside a framed “Product capture pending” placeholder. The page background is `#080808`; existing typography includes Lora, Space Grotesk and JetBrains Mono. Current assets contain a dashboard image but no dedicated reorder capture.

## Approaches considered

1. **Single product showcase — proposed.** One headline, one readable product image and three short explanatory points. Creates a change of pace after the inventory carousel and keeps the story visible without interaction.
2. **Scroll-led story.** Hold a product view while revealing stock, suggestion and review stages. More cinematic, but needs additional visual states and more mobile and motion handling.
3. **Selectable explainer.** Three controls change the highlighted product detail. Useful for deeper exploration, but some content is hidden until visitors interact.

The showcase is the proposed direction; the user has requested this design plan but has not yet approved the written design.

## Proposed copy

Section label: **02 / AI-enabled reorder recommendations**

Headline, two deliberate lines on desktop:

> Know what to reorder.
> And when.

Supporting sentence:

> Turn stock levels and consumption history into suggested reorder quantities—ready for your team to review.

Three explanatory points beneath the visual:

- **See what needs attention.** Review medicines that may need replenishment.
- **Review suggested quantities.** Use current stock and past consumption to plan your next order.
- **Prepare your next order.** Your team reviews the suggestions before preparing a purchase order.

Closing line: **AI recommends. Your team decides.**

The AI wording is the user's requested positioning, not an independently verified implementation claim. Verify it against the actual reorder feature before publication. If it is rules-based forecasting rather than an AI capability, resolve the wording with the user before publishing. Do not invent confidence scores, live analysis, automatic purchasing, guaranteed availability or performance claims. Treat “when” as an item needing reorder attention unless the product supports an explicit suggested date; do not fabricate dates.

## Desktop composition

1. **Introduction:** left-aligned section label, large headline and a short paragraph. Use the existing 1200px content grid, with 48px minimum side gutters. Keep the text measure around 760px and the paragraph around 620px.
2. **Product stage:** a single wide, readable reorder view below the introduction, occupying the content width. Allow 40–48px between the paragraph and image. Use one charcoal surface with a fine border and 20–24px corner radius. Avoid nested frames, fake browser chrome, heavy shadows and decorative floating cards. A light product interface may sit naturally within the dark section; preserve the actual product's appearance.
3. **Explanation:** three equal columns below the image, 32px gaps, aligned with the shared grid. Each has a small 01/02/03 marker, a title and one sentence. Keep these unboxed so they support the product rather than compete with it. Allow 32px above this row.
4. **Close:** the control statement below the explanations, separated by 24–32px. No additional sales CTA in this section; the existing page conversion path remains sufficient.

Start with 96px top and bottom padding. Exact spacing can be tuned against the preceding carousel and following purchasing section during visual verification. Do not force the entire section into one viewport.

## Product visual and asset requirements

Use a real reorder screen captured with demo data. Choose a focused crop showing medicine identity, available stock, suggested quantity and the actual review or purchase-order preparation control, where present. Keep field names and workflow faithful to the product. Avoid scaling a full dashboard until its labels become illegible.

The preferred visual treatment is one subtle emphasis on a real recommendation row. Any callout must explain a field actually shown by the product. Do not add fictional controls or alter values to imply a capability.

If a dedicated product capture is unavailable, a separately labelled **Illustrative preview · Demo data** may be designed for review after confirming the supported fields. Do not ship the unrelated dashboard image under a reorder label. The current “capture pending” placeholder is not the target customer-facing design. A final visual asset remains a publication dependency.

Use concise alternative text describing the screen's purpose; explain the key benefit in adjacent HTML so the screenshot is not the only source of information. Use real image dimensions and preserve aspect ratio to prevent layout shifts and distortion.

## Style

- Background: existing `#080808`; product stage: approximately `#17181b`; border: `#303034`.
- Primary text: `#ffffff`; supporting text: `#b5b5b5`. Use the existing gold `#e6cd99` sparingly for the label or a single detail, not an oversized gradient treatment.
- Headline: existing Lora, bold and upright, proposed `clamp(36px, 4.5vw, 64px)` with approximately 1.1 line height. Preserve the site's serif identity; Apple informs hierarchy and spacing, not a wholesale font replacement.
- Explanation titles: existing Space Grotesk, 20–22px; paragraph text: 16–18px, around 1.6 line height; label: JetBrains Mono, 11–12px, with modest tracking and wrapping.
- Use an 8px spacing rhythm. Do not introduce new fonts or packages.

These are design starting values, not verified contrast or rendered layout results.

## Responsive behaviour

At tablet widths, reduce gutters to 32px and vertical section padding to 72px. Keep the product wide and use a stacked explanation list if three columns become cramped.

Below approximately 640px, use 20px gutters, 56px vertical padding, a 36–40px headline and a naturally wrapping label. Stack the explanation points with 24px gaps. Let text determine height; no fixed-height clipping. Use a dedicated mobile crop showing one complete recommendation with medicine identity, stock and suggested quantity. If such a crop cannot preserve the meaning, present the full image with the important fields explained in HTML rather than clipping critical context. No horizontal page scrolling or miniature three-column layout.

At 200% zoom, text and the illustration must reflow without losing content or controls. Keep any future interactive targets at least 44px; this proposed section itself does not require new controls.

## Motion and accessibility

Optional enhancement: one 400–500ms entrance using a small vertical translation and opacity when the stage enters view. Reveal the complete visual once, with no looping, parallax, pinned scrolling or stagger that delays reading. All content remains visible if JavaScript fails. Respect `prefers-reduced-motion` by showing the final static state immediately.

Maintain a semantic section heading and a figure with a useful caption when needed. Do not rely on colour alone to indicate the highlighted row. Check text contrast against actual rendered backgrounds. No information should depend on hover or animation.

## Implementation boundary and review criteria

After design approval, create an implementation plan for scoped changes to `velocity.html` and `velocity.css`, using the current page architecture. Add JavaScript only if the existing reveal behaviour cannot supply the optional entrance effect. Preserve unrelated working-tree changes.

Verify the final result at desktop, tablet and 390px mobile widths, plus 200% zoom and reduced motion. Confirm the image is readable, the section has no overflow, the anchor clears the sticky header, and adjacent sections remain visually intact. Check the no-JavaScript state and run the existing production build. No new interaction tests are needed for a static showcase; visual verification and claim/asset accuracy are the main checks.

Acceptance: a visitor can identify the feature as AI-enabled reorder recommendations, understand what the suggestion uses, see a meaningful product example, and understand that the team reviews the order. Publication additionally requires a faithful product visual and confirmation of the AI claim.
