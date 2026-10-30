# Follow the request: hospital supply scroll story

Status: implemented in the existing Velocity supply section following the user's motion-study review and explicit integration request. Verification and remaining test limitations are recorded in the implementation plan.

This supersedes the visual and playback direction in `2026-10-29-hospital-supply-animation-design.md`. The existing implementation was rejected because its composition stayed static while only a small status/caption changed. Existing product code and other local changes must be preserved until deliberately replaced.

## Outcome

Help a visitor understand a medicine request passing between Hospital store and Central pharmacy, through preparation, dispatch, and recorded receipt. The request itself is the visual thread. Every stage must have an obviously different composition, with visible continuity between them. A badge change does not count as a scene transition.

The user selected a detailed plan following the recommended “Follow the request” direction. This replaces the earlier timed-autoplay proposal with a scroll-controlled desktop sequence. No click is needed to discover the story; the visitor's ordinary scrolling advances it.

## Approaches considered

1. **Follow the request, recommended:** one request moves and expands through four related compositions. Best balance of clear continuity and substantial movement.
2. **Two workspaces:** pharmacy and hospital interfaces exchange rows across a split screen. Clear collaboration, but crowded on smaller screens.
3. **Four separate scenes:** large product views crossfade between stages. Readable, but continuity is weaker.

The first direction is the basis of this proposal. The prototype is a motion study of that direction, not another full visual redesign.

## Visual system

Preserve the page's black background, warm ivory surfaces, gold accents, current typefaces, and headline. Keep the composition floating directly on the page. Replace large inert location cards with compact location anchors and stage-specific workspace labels. Use flat, crisp product UI with substantial spatial transformations and carefully timed row movement.

No generated video, photorealistic medicine animation, fake cursor, typing effect, floating 3D dashboard, particles, neon trails, decorative looping motion, or large blurry glows. No new illustration assets are needed. Use existing icons for interface symbols. Avoid tiny labels as the main storytelling mechanism.

## Constant example and story truth

- Request: `SR–0024` throughout; do not invent additional order numbers.
- Source of stock: Central pharmacy. Destination: Hospital store.
- Paracetamol 500 mg: 120 strips, 10 tablets per strip.
- Oral rehydration salts: 40 single-dose sachets.
- Hospital store sends the request toward Central pharmacy; dispatched stock moves in the opposite direction. Label the two directions explicitly.
- All views are labelled “Illustrative workflow · Demo data”. They explain product concepts and do not claim to reproduce the current application pixel for pixel.
- Team action captions explain each stage. No automated approval, guaranteed delivery, unverified inventory balance changes, or fabricated live timestamps. Retain the approvals and rejected-delivery return note below the story.

## Four scene compositions

| Scene | Composition and motion | Exact primary copy |
| --- | --- | --- |
| Request | Hospital store anchor at right, Central pharmacy at left. A compact ivory request originates near Hospital store, reveals the two item rows, then moves toward the pharmacy workspace. Keep its reference visible. | **A request starts at the hospital.** / Hospital store requests medicines from Central pharmacy. |
| Prepare | The request arrives at left/centre, expands into a wide preparation sheet; its same two rows spread into a readable picking layout. A restrained check appears for each prepared row. This is the largest, most detailed view. | **The pharmacy prepares the stock.** / Central pharmacy prepares the requested medicines. |
| Dispatch | The preparation rows gather into a compact dispatch document; the workspace recedes and the document travels from pharmacy toward hospital along a clear horizontal path. The document is an abstraction of recorded supply, not a physical box of medicine. | **Prepared. Recorded. Dispatched.** / Central pharmacy records dispatch to Hospital store. |
| Receive | The document arrives and expands beside the hospital anchor into a receiving view. The two rows resolve into received quantities and a receipt confirmation. Finish with both compact location anchors and the connection visible. | **Receipt closes the loop.** / Hospital store reviews the delivery and records receipt. |

Each scene includes a large chapter title and a short actor caption. The four-step progress indicator reads Request / Prepare / Dispatch / Receive. Use Prepare as the visitor-facing name for the picking stage. The first frame is already meaningful; never show an empty pinned stage. The final frame holds before the section releases.

## Desktop scroll choreography

- Enable pinning only at viewport width >=1024 px, height >=700 px, and no reduced-motion preference.
- Keep the introduction in ordinary document flow. Pin a dedicated story viewport after the intro, beneath the actual fixed navigation height plus 16 px.
- Size the story viewport to at most the available viewport height below that offset minus 16 px, capped at 760 px. Fit its caption, scene, and indicator inside that space; if the content cannot fit readably (including zoom/font changes), use ordinary-flow scenes instead of pinning.
- Initial travel distance: two viewport heights beyond the pin start (`end` calculated from current viewport height). This is the total pinned travel, not two heights for each scene.
- One GSAP timeline, ScrollTrigger `scrub: 0.35`, default linear progress, `pinSpacing: true`, `invalidateOnRefresh: true`. Do not intercept wheel/touch input, smooth the whole page, force snapping, or lock scrolling.
- Normalized timeline: 0–0.12 request hold; 0.12–0.27 request-to-prepare transition; 0.27–0.40 prepare hold; 0.40–0.55 prepare-to-dispatch transition; 0.55–0.68 dispatch hold; 0.68–0.84 dispatch-to-receive transition; 0.84–1 final receive hold.
- Caption boundaries: request before 0.27; prepare from 0.27; dispatch from 0.55; receive from 0.84. Pre-render all copy, reveal it from the same timeline, and derive semantic current-step state from that timeline's displayed progress. Do not run a separate timer.
- Reverse scrolling reverses the visual sequence cleanly. It is browsing an illustrative narrative, not undoing a real stock transaction. Revisiting the section follows scroll position rather than a remembered autoplay counter.
- Add a keyboard-accessible “Skip animation” link immediately before the stage, pointing to a dedicated target after the pin spacer and before the approval note. Enhance it to jump beyond the trigger end with instant scrolling, including when global smooth scrolling is present. Do not trap keyboard focus.

## Animation construction

Use actual HTML text, rows, dividers, and existing interface icons. Separate a single canonical semantic summary from decorative animated layers. The canonical summary contains the example table and all four actor explanations. It is visibly laid out without JS; after successful enhancement it remains available to assistive technology. Animated copies are `aria-hidden`, contain no focusable elements, and are shown only after successful setup. This prevents duplicate screen-reader announcements and keeps no-JS content useful.

Stage-specific sheets use shared reference and medicine data. Corresponding row/document layers crossfade at matched positions during handoffs. Their travel, scale, opacity, row stagger, and reveal are visibly continuous. Use a stable viewport with measured anchors and functional transform values calculated during setup/refresh. Animate transforms and opacity; do not repeatedly read layout on scroll or animate document height/width every frame. Clip reveals inside the local sheet when useful. Scaling text is limited to transitions; stable reading poses use scale 1.

Initial visual targets: request travel >=20% of stage width; dispatch travel >=30%; compact document ~360 px wide versus preparation sheet ~620 px where room permits. These are visual acceptance targets to fit responsively, not permission for overflow. Paired layers can use equivalent transform scaling during travel while distinct layouts provide readable settled poses. At most two scene layers overlap during handoff. Use `will-change` only on moving layers and remove it on teardown.

## Mobile, short screens, zoom, and reduced motion

At width <1024 px or height <700 px, use four compact scenes in ordinary vertical flow. Each has a visible title, actor explanation, and a cropped/simplified UI excerpt using the same data. No pinning and no long artificial spacer. Optional one-time entry motion is limited to 24 px translation and opacity over 450 ms; rows can stagger over 60 ms. Leaving and reentering does not repeatedly replay each mobile entry animation.

At reduced motion, disable all motion and pinning and show the four scenes as a readable static sequence. Without JS or if loading/setup fails, show the canonical summary and example table. A failed enhancement must never leave invisible content or a giant blank spacer. At 320 px and 200% zoom, wrap labels and keep named quantity units visible without horizontal scrolling. Text readability takes priority over fitting the stage into a desktop pin.

## Lifecycle, performance, and boundaries

Use GSAP core and ScrollTrigger only, installed through npm and bundled by Vite; do not use a runtime CDN. GSAP is not currently a dependency. Load its module only for this section, observing the section with a 600 px root margin and also loading on initial `#supply` navigation. The existing static summary stays visible during loading. Handle failed dynamic imports.

Build under a scoped GSAP matchMedia/context; revert owned resources on breakpoint/preference changes and pagehide. Preserve the existing `initSupplyDemo(root)` cleanup interface to keep page integration small. Initialization is idempotent. Guard unresolved asynchronous imports so they cannot create an animation after cleanup. On pageshow/restoration, calculate the correct scene from actual scroll position. Refresh after fonts settle and on relevant layout changes; never refresh every scroll frame or kill unrelated triggers.

Scope production changes to `#supply`, its module, and its page lifecycle. Existing hero, reorder, inventory, operations, conversion, comparison, navigation, and analytics behavior must remain intact. Do not reset or discard current working-tree changes.

## Acceptance and prototype checkpoint

First build a local, disposable motion study using the existing page runtime and a separate dev-only route. Show the four scenes in motion before integrating production markup. Verify animation by scrolling forward and backward; four still images alone do not establish that the transitions work. Ask the user to assess movement and pacing at this concrete checkpoint.

The prototype passes only when: scenes have clearly different silhouettes; request and dispatch travel are unmistakable; medicine rows visibly reorganize; captions can be read during holds; forward/backward scrolling is smooth; and the final stage releases naturally. A badge-only or caption-only change fails regardless of passing tests.

Then integrate and check desktop, tablet, narrow mobile, short landscape, runtime reduced motion, keyboard skip, hash entry, fast scrolling, resize, failed loading, and browser restoration. Review screenshots at holds and mid-transition plus the running sequence. Record build/tests and measured bundle impact; make no performance claims without observation.

## References

- User-supplied screenshot from 29 October 2026: failure evidence for the large static card and small changing tag.
- [Apple reference](https://www.apple.com/in/macbook-pro/liquid-retina-xdr-display/): visual inspiration for focused composition and larger transformations; no claim about Apple's implementation technology.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): pinning and scrubbed timelines.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): responsive contexts and reversion.
- [ScrollTrigger refresh](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.refresh()/): layout recalculation.
