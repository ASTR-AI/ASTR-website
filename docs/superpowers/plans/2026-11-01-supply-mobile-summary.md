# Mobile supply summary

Implement the user's approved compact-summary proposal only below 768px. Preserve the desktop department cards, document stack, autoplay, and toolbar.

- Replace the 2x2 phone step cards with a single four-column text selector and underline selection. Keep full department ownership within the active summary.
- Show a compact card with one stage-specific outcome and the two existing medicine quantities. Keep document IDs, batch/ledger/status detail in the full example.
- Wrap the shared document preview in an initially open native disclosure. Mobile enhancement closes it by default; desktop and no-JS retain the original full preview. A mobile-only summary trigger opens the complete selected document.
- Selecting another phone step returns to the compact summary. Document deep links open the requested full example. Switching back to desktop restores the disclosure and removes phone-only content.
- Add focused behavior tests before implementation, verify all four stages and disclosure/resize behavior at phone and desktop widths, run the full suite/build/diff checks, and save evidence.

Completed: compact mobile summary and disclosure implemented. New behavior tests failed before implementation; all 116 tests now pass. Production build and diff checks pass. Browser verification covers all four stages at 320/390/430/767px, keyboard disclosure, and restoration of the original 1440px desktop layout. Evidence is recorded in docs/marketing/2026-11-01-supply-mobile-summary-verification.md.
