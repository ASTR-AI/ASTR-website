# Hospital supply card shuffle refinement

## Requested result
Refine only the hospital supply section in velocity.html. Use the provided Stack Shuffle reference for the card movement, cycle automatically, remove manual card navigation, and retain one section heading.

## Proposed design
Keep “Keep your pharmacy and hospital store connected.” as the sole heading. It explicitly names the two teams and the coordination problem; this is an editorial judgment, not a claim backed by audience research. Remove “Transfer medicines without blind spots.” and consolidate the introductory copy around requests, batch selection, dispatch and receipt.

Use opaque cream document cards with restrained, staggered edges and small rotations. Avoid translucent layers and excessive downward offsets that expose overlapping body copy. Size the stage to contain the tallest card and its footer on desktop and mobile.

Animate each front card lifting sideways clear of the deck, moving behind it, and settling into the back position while the next card moves forward. Keep all four documents and their existing illustrative medicine data. Synchronize the department step highlight and step count with the front card.

Loop request → picking → dispatch → receipt → request, allowing about five seconds per card for reading. Remove previous/next, show-all, and clickable step navigation. Keep a small pause/resume control for reading; pause when offscreen or the browser tab is hidden. Reduced-motion users receive a static, readable presentation with access to all four steps.

## Approaches considered
1. Recommended: opaque, subtly staggered deck with a lift-and-return shuffle. Closest to the supplied direction while retaining the current document design.
2. Single-card crossfade. Simpler and compact, but loses the reference's physical shuffle character.
3. Wide fan of cards. Makes the deck obvious, but consumes more space and competes with the dense document content.

## Implementation scope and verification
Edit velocity.html, velocity-supply.css and velocity-supply.mjs; preserve existing unrelated working-tree edits. Check whether the existing supply loader activates this controller before changing it. Verify a full automatic cycle including receipt-to-request, removal of manual navigation, pause/resume, cleanup, reduced motion, and readable card bounds at desktop and narrow mobile widths. Run relevant existing tests and the production build; update tests only where the requested playback behavior changes.

## Approval
Approved by the user and implemented. See the matching implementation plan for verification.
