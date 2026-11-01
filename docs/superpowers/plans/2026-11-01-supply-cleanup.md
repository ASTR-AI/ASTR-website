# Hospital supply section cleanup

User approved the screenshot critique and explicitly removed the preview/demo-data label, counter, and Pause toolbar.

- Replace the two sideways department cards with one chronological four-step list: request, prepare, dispatch, receive. Keep department ownership as a small secondary label.
- Use explicit user selection to show the corresponding document; remove autoplay together with its Pause control. A native link fallback keeps every document reachable without JavaScript.
- Show one flat, natural-height document below the steps. Preserve example data, route/status details, and approval/return qualifications; remove decorative paper layers and repeated footer messaging.
- Keep 16px step spacing, 20–24px document padding, and 24–32px between sequence and preview. Phone steps form two chronological rows, desktop four columns. No sideways scrolling of the step sequence.
- Add focused controller tests for selection, no automatic playback, malformed markup, cleanup, and repeated initialization. Verify 320/390/430/768/1440px visually and run the full test suite, build, and diff check.

Implement in the current checkout; preserve the preceding page-wide changes. No new libraries.

Completed: implementation, seven focused controller tests, 20 responsive stage checks, full suite (105 passing), build, and diff validation. See the marketing verification note for evidence.
