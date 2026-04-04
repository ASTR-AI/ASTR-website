---
phase: 6
slug: mission-control-footer
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-01
---

# Phase 6 — Mission Control Footer Redesign

> High-fidelity, 'Deep-Tech' footer redesign for ASTR AI. Moving from a standard grid to a cinematic 'Mission Control' dashboard aesthetic.

---

## Design System

| Property          | Value                          |
| ----------------- | ------------------------------ |
| Tool              | none                           |
| Preset            | not applicable                 |
| Component library | none (manual HTML/CSS/GSAP)    |
| Icon library      | Lucide / Phosphor              |
| Font              | Lora (Body), Cinzel (Display), JetBrains Mono (System) |

---

## Spacing Scale

Strict adherence to 8pt scale for layout hierarchy.

| Token | Value | Usage                                      |
|-------|-------|--------------------------------------------|
| xs    | 4px   | Telemetry character spacing                |
| sm    | 8px   | Navigation link gaps                       |
| md    | 16px  | Internal card padding                      |
| lg    | 24px  | Gutter width                               |
| xl    | 32px  | Section vertical gaps                      |
| 2xl   | 48px  | Space between Command Center & Navigation  |
| 3xl   | 64px  | **Primary Footer Top/Bottom Padding**      |

---

## Typography

| Role    | Size                     | Weight | Line Height | Font         |
| ------- | ------------------------ | ------ | ----------- | ------------ |
| Body    | 14px (0.875rem)          | 400    | 1.625       | Lora         |
| Label   | 10px (0.625rem)          | 500    | 1.0         | Mono         |
| Heading | 28px (1.75rem)           | 500    | 1.2         | Cinzel       |
| Display | clamp(4rem, 15vw, 12rem) | 700    | 1.0         | Cinzel       |

---

## Color

| Role           | Value     | Usage                            |
| -------------- | --------- | -------------------------------- |
| Dominant (60%) | #121212   | Base surface and deep shadow     |
| Secondary (30%)| #1a1a1a   | Inset 'Mission Hub' panels       |
| Accent (10%)   | #E6CD99   | Border highlights, CTA text, HUD |
| Destructive    | #ff5f56   | System warning indicators        |

**Accent reserved for:** 
- CTA labels
- Active system indicators
- Fine borders (at 20% opacity)
- Hover states for primary navigation

---

## Visual & Interaction Contract

### 1. Parallax Backdrop
- **Element**: Large "ASTR AI" text.
- **Styling**: `opacity-5`, `text-white`, `pointer-events-none`.
- **Interaction**: GSAP ScrollTrigger `yPercent: -20` to create deep parallax against foreground.

### 2. Telemetry Gutter (Fixed Column)
- **Element**: A vertical strip (approx 40px wide) on the far left.
- **Content**: Vertical text `SYSTEM_TIME // MISSION_PHASE_04 // LAT_LON_DATA`.
- **Animation**: Subtle "typing" or "data-scrolling" effect using CSS keyframes.

### 3. Command Hub (Main Content)
- **Layout**: Non-standard asymmetric layout.
  - **Top Navigation**: Horizontal row with `border-b border-gold/10`. Links separated by `|` (Gold).
  - **Center Action**: "ESTABLISH UPLINK" button centered but with a "Radar Sweep" background effect.
  - **Bottom Metadata**: Copyright and Legal links in monospaced font, aligned to the bottom-right.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | "ESTABLISH_UPLINK" |
| Status Header | "MISSION_CONTROL // ARCHIVE_v2.0" |
| Empty state | "NO_DATA_STREAM_FOUND" |
| Error state | "CONNECTION_FAILURE: RE-ESTABLISHING..." |
| Social Label | "SIGNAL_CHANNELS" |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| none     | none        | not required |

---

## Implementation Details (Tailwind/CSS)

```css
/* Unique Radial Radar Sweep for CTA */
.radar-sweep {
  background: radial-gradient(circle at center, rgba(230,205,153,0.1) 0%, transparent 70%);
  animation: sweep 4s linear infinite;
}

@keyframes sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Vertical Text Utility */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
```

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PENDING
- [ ] Dimension 2 Visuals: PENDING
- [ ] Dimension 3 Color: PENDING
- [ ] Dimension 4 Typography: PENDING
- [ ] Dimension 5 Spacing: PENDING
- [ ] Dimension 6 Registry Safety: PENDING

**Approval:** pending
