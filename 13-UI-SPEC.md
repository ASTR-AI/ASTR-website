---
status: draft
phase: 13
title: R&D - The Living Laboratory
date: 2026-05-15
---

# UI Specification: R&D Page (rd.html)

This document defines the visual and interaction contract for the ASTR AI Research & Development page, themed as **"The Living Laboratory"**. It bridges the gap between ancient precision (Philosophy) and modern execution (Solutions) using an **Architectural Blueprint** aesthetic.

## 1. Vision & Theme

- **Theme Name**: The Living Laboratory
- **Visual Metaphor**: An active researcher's digital blueprint. It should feel like a "live" document—part terminal, part architectural drawing, part laboratory log.
- **Key Emotions**: Precise, experimental, visionary, transparent.

## 2. Layout & Spacing

- **Grid System**: 12-column grid with `max-w-[1300px]` container.
- **Section Spacing**:
  - `section-y`: `clamp(48px, 6vw, 80px)` (Standard)
  - `section-y-large`: `clamp(80px, 10vw, 120px)` (Hero & Transitions)
- **Safe Zones**: `px-12` for desktop containers, `px-6` for mobile.

## 3. Typography

| Usage             | Font Family         | Size                   | Weight         | Line Height |
| ----------------- | ------------------- | ---------------------- | -------------- | ----------- |
| Hero Title        | `Cinzel`            | `hero` (3rem-5.5rem)   | 700 (Bold)     | 1.1         |
| Section Headings  | `Lora`              | `h2` (1.5rem-2.5rem)   | 700 (Bold)     | 1.2         |
| Subheadings       | `Lora`              | `h3` (1.2rem-1.6rem)   | 600 (Semibold) | 1.3         |
| Body Text         | `Lora`              | `body` (1rem-1.125rem) | 400 (Regular)  | 1.6         |
| Metadata/Terminal | `Mono` (UI default) | `xs` (0.75rem)         | 400/700        | 1.0         |
| Researcher Notes  | `Caveat`            | `1.4rem - 1.6rem`      | 400            | 1.2         |

## 4. Color Palette

| Token           | Hex/Value                   | Usage                                      |
| --------------- | --------------------------- | ------------------------------------------ |
| Dominant (60%)  | `#121212`                   | Main Background (Black)                    |
| Secondary (30%) | `#1a1a1a` / `#181818`       | Cards, Sidebar, Navigation (Rich Black)    |
| Accent (10%)    | `#E6CD99`                   | CTAs, Markers, High-end Metadata (Gold)    |
| System          | `rgba(230, 205, 153, 0.25)` | Blueprint grid lines, dimension markers    |
| Feedback        | `rgba(0, 122, 255, 0.3)`    | "Live" data pulse, active terminal signals |

## 5. Component Inventory

### 5.1 Hero: Lab_Environment_01

- **Background**: Radial blueprint grid (`60px x 60px`) with a subtle "scanning" line animation (horizontal sweep).
- **Metadata Bar**: Top-aligned log bar with `Ref: RD_LAB_01`, `Status: LIVE_FEED`, and `Server: OLYMPUS_NODE`.
- **Primary Visual**: Central high-fidelity schematic of an abstract neural node (SVG or Three.js).
- **Live Data Feed**: Small scrolling columns of hexadecimal values or logs on the left/right periphery.

### 5.2 Research Verticals (The Tracks)

Three-column card layout with hover-triggered "blueprint expansion" effect.

1. **Neural Foundations**: Iconography related to LLM nodes. Metadata: `v4.2-alpha`.
2. **Autonomous Networks**: Iconography related to drone swarms/vectors. Metadata: `FLIGHT_SYNC_ENABLED`.
3. **Unified Infrastructure**: Iconography related to smart city grids. Metadata: `STRUCT_INT_99.8%`.

### 5.3 Interactive Roadmap: 5-Year Blueprint

- **Style**: Horizontal scrolling timeline or vertical "blueprint roll" (like an unwrapped scroll).
- **2026-2030**: Each year is a "phase" with technical schematic drawings.
- **Interaction**: Clicking a year expands a "technical detail" overlay with `Caveat` font handwritten notes (e.g., _"Push for sub-10ms latency here"_).

### 5.4 Strategic Ecosystem (Talent Pipeline)

- **Layout**: Two-column split.
  - Left: "Academic & Government Partners" (Logo wall in 10% opacity gold).
  - Right: "The Talent Pipeline" (A visual funnel representing ASTR's recruitment from elite CoEs).
- **Interaction**: Subtle glow on hover for partner logos.

## 6. Copywriting & Content

| Element            | Copy Contract                                                     |
| ------------------ | ----------------------------------------------------------------- |
| Hero Title         | "The Living Laboratory: Architecting the Future of Intelligence." |
| Hero CTA           | `[INITIATE_COLLABORATION]`                                        |
| Empty State        | "// NO_DATA_FOUND: ACCESSING_RESERVE_ARCHIVES"                    |
| Error State        | "// CRITICAL_FAILURE: RE-STABILIZING_BLUEPRINT"                   |
| Roadmap Title      | "The 5-Year Blueprint (2026–2030)"                                |
| Destructive Action | "Confirm Archive? [This action cannot be undone]"                 |

## 7. Registry & Safety Gate

- **Registry**: None (Custom Tailwind + Vanilla JS).
- **Safety Gate**: No third-party blocks declared. All UI patterns derived from existing internal standards in `philosophy.html` and `solutions.html`.

## 8. Visual Accents

- **Handwritten Notes**: Use `font-caveat` for notes rotated at `-4deg` to `-6deg`.
- **Terminal Metadata**: Every section must have a small `Ref: [CODE]` block in gold mono text.
- **Dimension Lines**: Vertical and horizontal lines with measurement markers (e.g., `|--- 420mm ---|`) in `white/5` opacity.
