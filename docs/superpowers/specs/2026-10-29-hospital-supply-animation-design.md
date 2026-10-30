# Hospital supply workflow animation

Status: proposed for review. Planning only; implementation has not been authorized by this document.

## Intent

Explain how two teams coordinate a medicine request, using a short automatic demonstration inside the existing “Keep your pharmacy and hospital store connected” section. Visitors should understand who acts, what changes, and when receipt is recorded.

## Direction and alternatives

The conversation established native interface animation using the existing design language, avoiding the appearance of generated video. Recommended execution: a fixed, readable request card with changing workflow status and a four-step indicator. A visitor-driven scenario explorer requires interaction before communicating value; generated video or live AI generation adds visual inconsistency and unnecessary runtime complexity. These alternatives are excluded from this proposal.

Retain the black page background, floating composition, ivory document, serif headings, existing sans-serif and monospace fonts, and restrained gold. Use the existing icon assets. No enclosing section panel, video, audio, new dependencies, simulated cursor, typing effect, particle effects, exaggerated glow, or continuous loop.

## Story and exact example

One request, `SR–0024`, remains visible throughout. Central pharmacy supplies Hospital store. The hospital store initiates the request in the opposite direction to the subsequent physical stock movement; copy must make that distinction clear. Keep the existing two items and quantities: Paracetamol 500 mg, 120 strips (10 tablets per strip); Oral rehydration salts, 40 single-dose sachets. Do not change quantities between stages or invent live timestamps, delivery estimates, automatic approvals, or additional product capabilities.

| Time | Stage/status | Actor and visible caption |
| --- | --- | --- |
| 0–3.5 s | Request / Request raised | Hospital store requests medicines from Central pharmacy. |
| 3.5–7 s | Pick / Stock prepared | Central pharmacy prepares the requested medicines. |
| 7–10.5 s | Dispatch / Dispatched | Central pharmacy records dispatch to Hospital store. |
| 10.5–14 s | Receive / Receipt recorded | Hospital store reviews the delivery and records receipt. |

The final state remains visible after 14 seconds. Treat timings as initial art direction to validate for reading comfort, not a performance target. Keep “Illustrative workflow · Demo data” and the existing approvals/returns note visible. This is an illustrative successful request, not a claim that every delivery is accepted.

## Composition and motion

Compact the location cards into clear endpoints. Keep the request reference, two medicines, quantities, source, destination, and document title stable. Change only the status badge, short actor caption, current timeline step, and subtle endpoint emphasis. Place the four-step indicator next to the card rather than as a distant explanation below the large location panels.

Use 180–240 ms opacity/color transitions and at most 4 px of translation on changing explanatory text. No card-wide movement, zoom, layout reflow, or animation of medicine quantities. Status text remains legible throughout. Reserve sufficient caption height for every stage. Identify the current step with text and `aria-current="step"`, not gold alone.

At desktop widths, retain the left endpoint / document / right endpoint composition. At 850 px and below, place compact endpoint labels above the document, wrapping as needed; remove the current tall three-card stack. Keep the four-stage indicator compact, allowing a two-by-two arrangement at 380 px and below. Controls sit immediately beside/below the demonstration, with no horizontal scrolling or automatic page scrolling.

## Playback and accessibility

- Start once when at least 50% of the request card is visible and the document is visible. Observe the card, not the potentially tall section.
- A visible Pause button becomes Resume when explicitly paused, then Replay when complete. Provide a separate “Show all steps” button while the sequence is incomplete; it settles immediately on the final state. All four step explanations remain available as static readable text.
- Pause elapsed time when the card leaves view or the tab is hidden. Resume on return only if the visitor has not explicitly paused. Resize must not reset the sequence. Replay restarts only through explicit activation.
- With reduced motion enabled, show the complete static workflow and final receipt state; suppress autoplay and motion controls. Apply preference changes immediately and do not unexpectedly restart when the preference is disabled again.
- Without JavaScript, IntersectionObserver, or required animation markup, preserve a readable static workflow. Controls remain hidden until successful initialization.
- Use native buttons, visible focus, and minimum 44 px control targets. Do not move focus or announce every autoplay update through a live region. Essential information remains in semantic HTML; decorative motion is hidden from assistive technology.
- Preserve progress across pagehide/pageshow restoration and prevent duplicate timers/listeners during reinitialization. Cleanup releases observers, listeners, and pending work without clearing the static content.

## Scope and acceptance

Only section `#supply` and its lifecycle integration change. No adjacent-section redesign, new CTA, backend, publication, or commit is requested. Build with existing HTML/CSS and a small ES module. Verify the full sequence, pause/resume/replay, visibility handling, reduced motion, static fallback, browser restoration, responsive layout, and adjacent-section regressions before calling implementation complete.
