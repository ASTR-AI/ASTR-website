# Inventory carousel refinement — proposed design

## Goal and evidence

Make the existing horizontal inventory carousel feel deliberately aligned, lighter, and easier to browse. The user requests a fix plan, not implementation in this turn. Keep the hero and all other sections unchanged; preserve existing uncommitted work.

Evidence: the user's screenshot `Screenshot 2026-10-25 at 6.48.41 PM.png` and current `velocity.html`, `velocity.css`, and `velocity-inventory.mjs`. This is a screenshot/source review; current live browser behaviour has not been verified in this planning turn. The supplied screenshot may show an intermediate horizontal/vertical scroll position, so its clipping alone is not proof of a broken initial position.

## Findings

| Issue | Evidence | Impact |
| --- | --- | --- |
| Rail and heading use different alignment rules | Heading uses the 1200px `.v-container`; desktop rail gutter adds an extra 48px to the calculated container margin | Major: no consistent start line even before manual padding edits |
| Tall cards repeat the same full dashboard | Four HTML images use the same source; screenshot shows full dashboard images with tiny interface details | Major: visual repetition with little additional explanation |
| Alternating large dark/white surfaces compete | Supplied screenshot | Moderate: white card takes attention away from the active feature and section heading |
| Product appears inside multiple frames | Card, padded image wrapper, image shadow and caption treatment in CSS | Moderate: heavy framing and wasted vertical space |
| Heading can feel crowded beneath navigation | Screenshot; section top padding is 10px/5px/0 at desktop/tablet/mobile | Moderate: check anchor arrival and normal scroll separately before deciding exact correction |
| Dot targets are only 6px high | `.v-inventory-dot` CSS | Major for pointer/touch usability, independent of the visible dot size |
| Media captions inherit shared figure styles | Global `figcaption` styles and local card styles coexist | Moderate: captions gain extra framing/padding unless explicitly reset |

## Alternatives

1. **Aligned dark card rail — recommended.** Preserve the approved carousel and browsing controls, unify surfaces, simplify media framing, and use one shared content gutter. Smallest change that addresses the screenshot's visual problems.
2. **Retain alternating surfaces with corrected geometry.** Closest to the prior mockup, but the white panel remains a competing focal point.
3. **One large showcase with compact feature navigation.** Improves screenshot readability, but changes the user's chosen card interaction and requires broader redesign.

The recommendation is a proposal for review, not a newly approved visual direction.

## Proposed appearance

- Keep the existing section headline and four feature titles/descriptions.
- Use one neutral charcoal card surface `#17181b`, a subtle neutral border, white titles, and grey descriptions. No gold/bronze card accents, no heavy shadow, no alternating bright white outer cards.
- Use one shared gutter for heading, initial card, controls, and footer: `max(48px, (viewport width - 1200px) / 2)` on desktop; 32px tablet; 20px mobile. The scrolling rail can extend toward the right viewport edge while its initial card respects the content grid.
- Start desktop card width at `clamp(480px, 40vw, 560px)`, gap 24px. At 1440px this fits two cards with a clear next-card preview. Tablet card width: `min(560px, available content width - 48px)`; mobile: viewport minus two 20px gutters minus a 28px preview allowance, gap 16px. Use 20px card corner radius.
- Keep text padding: 28px desktop, 24px tablet, 20px mobile. Removing all padding is not the proposed remedy. Use 24–28px card titles, 15–16px descriptions, and consistent gaps. Allow cards to grow for wrapping and zoom; no fixed-height clipping.
- Place imagery in a single lower media area that reaches the card's side and bottom edges. Separate it from copy with 24px breathing room and a light divider; remove the nested shadow/frame. Reserve consistent media proportions (start at 16:9) and align image starts across cards at the same breakpoint.
- Show honest dashboard detail crops rather than four scaled-down full dashboards where useful details can be identified. Keep the source aspect ratio undistorted. If a feature has no relevant visual, show the actual dashboard overview labelled **Dashboard preview**; never claim it demonstrates a missing feature-specific screen. Final specialised captures remain separate asset work.
- Use a small non-italic **Dashboard preview** caption with reset margins/padding/borders inside a restrained media footer. Do not expose development-process notes to customers.
- Start section spacing at 64px top, 32px heading-to-rail, 24px rail-to-controls, and 64px bottom on desktop; 40px/24px/20px/48px on mobile. Tune from full-page and anchor screenshots, without modifying navigation or the hero.

## Scrolling and controls

Keep native horizontal scrolling, snap alignment, four cards, manually controlled navigation, and no looping/autoplay. Retain a visible next-card edge and instruction. Arrange instruction left, position indicator centre, arrows right on desktop; on mobile use an instruction row and compact controls row.

Every dot button gets a 44×44px hit area containing its small circle/dash, so the indicator group stays compact but is easy to use. Arrows remain 44×44px. Visible keyboard focus must not be clipped. Preserve disabled end states, accurate current position, reduced motion, and native fallback without JavaScript.

Use the same gutter and card-size values for scroll padding, navigation targets, and end spacing. Last-card alignment must leave only intentional trailing space, never an additional blank slide. Recompute geometry after resize/zoom; preserve the settled active feature when practical.

## Boundaries

No new packages, navigation changes, other section redesign, fictional UI, autoplay, deployment, or unrelated refactoring. Existing HTML hooks and controller architecture remain the starting point. Implementation must be visually verified, not declared successful from a build alone.
