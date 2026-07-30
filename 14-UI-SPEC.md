---
status: draft
phase: 14
title: Connection Portal - High-Fidelity Editorial Interface
date: 2026-06-01
---

# UI Specification: Connection Portal (connect.html)

This document defines the visual and interaction contract for the redesigned ASTR AI Connection Portal. The goal is a **"High-Fidelity Editorial Interface"** that feels **"Luxury Tech"**—alive yet quiet, architectural, and ethereal.

## 1. Vision & Theme

- **Theme Name**: The Grand Protocol
- **Visual Metaphor**: A high-end technical journal meets a secure architectural terminal. It represents the ultimate gateway for elite technical collaboration.
- **Aesthetic**: Architectural Minimalism with ethereal lighting. Large whitespace, precise lines, and soft, moving gradients.
- **Key Emotions**: Exclusive, Precise, Serene, Intelligent.

## 2. Layout & Spacing

- **Grid System**: Centered single-column form with fixed viewport-aligned HUD elements.
- **Container**: `max-w-[750px]` for main content; `px-8` horizontal safe zone.
- **Section Spacing**:
  - `Hero Top`: `pt-[clamp(120px,15vh,200px)]`
  - `Field Gap`: `space-y-12` (48px) between logical groups.
  - `Field-to-Label`: `8px` gap.
- **HUD Positioning**: Fixed in the four corners of the viewport, `24px` inset.

## 3. Typography

| Usage          | Font Family        | Size            | Weight | Line Height | Tracking |
| -------------- | ------------------ | --------------- | ------ | ----------- | -------- |
| Hero Title     | `Cinzel`           | `h1` (3.5rem)   | 700    | 1.1         | 0.05em   |
| Section Labels | `Space Grotesk`    | `xs` (0.75rem)  | 500    | 1.0         | 0.2em    |
| Input Text     | `Lora`             | `lg` (1.125rem) | 400    | 1.5         | normal   |
| Metadata (HUD) | `Mono` (JetBrains) | `10px`          | 400    | 1.0         | 0.15em   |
| Primary CTA    | `Space Grotesk`    | `xs` (0.75rem)  | 700    | 1.0         | 0.4em    |

## 4. Color Palette (Deep Tech)

| Token           | Hex/Value                   | Usage                                             |
| --------------- | --------------------------- | ------------------------------------------------- |
| Dominant (60%)  | `#050505`                   | Main Background (Deep Space Black)                |
| Secondary (30%) | `#121212`                   | Form Surface / Subtle Glass Panels                |
| Accent (10%)    | `#E6CD99`                   | ASTR Gold (Focus, Highlights, CTA)                |
| System          | `#1A1A1A`                   | Borders, Dividers, Neutral UI                     |
| Ethereal Glow   | `rgba(230, 205, 153, 0.08)` | Background radial gradients and field focus glows |

## 5. Component Inventory

### 5.1 Telemetry HUD (Fixed)

- **Style**: Monospace terminal text in `JetBrains Mono`. High tracking, low opacity (`40%`).
- **Top Left**: `// PROTOCOL: ASTR_V4_CONNECT`
- **Top Right**: `// NODE: OLYMPUS [37.77 N, 122.41 W]`
- **Bottom Left**: `// ENCRYPTION: 2048_RSA_ACTIVE`
- **Bottom Right**: `// SYSTEM_STATUS: STABLE`
- **Interaction**: Subtle "syncing" pulse every 5 seconds on the Status dot.

### 5.2 Architectural Form Fields

- **Base Style**: Bottom border only (`1px solid #1A1A1A`). Transparent background.
- **Labels**: `Space Grotesk` uppercase labels positioned above the field.
- **Micro-Animations (Focus)**:
  - Bottom border expands from the center to 100% width using `gold` color.
  - A faint radial glow (`gold/8`) appears behind the active input.
  - Label shifts `2px` upward and changes color to `gold`.
- **Placeholder**: Italicized `Lora` at low opacity (`20%`).

### 5.3 High-Fidelity CTA: [ESTABLISH_CONNECTION]

- **Style**: `liquid-glass-button` (as defined in existing system) with enhanced gold rim.
- **Hover**:
  - `backdrop-blur` increases from `12px` to `24px`.
  - A horizontal "data streak" (gold/20) sweeps across the button from left to right.
  - Text tracking expands slightly (`0.4em` to `0.5em`).

### 5.4 Ethereal Background

- **Visual**: A slow-moving, large radial gradient (`gold/5` to `transparent`) that follows the cursor with high damping (lagging behind).
- **Background Texture**: Subtle "Grain" or "Noise" overlay at 2% opacity to give a cinematic film feel.

## 6. Copywriting & Content

| Element             | Copy Contract                                                      |
| ------------------- | ------------------------------------------------------------------ |
| Hero Title          | "Connect With The Architecture."                                   |
| Subtitle            | "Initiate a technical consultation with our principal architects." |
| Field 1 Label       | "IDENTIFIER"                                                       |
| Field 1 Placeholder | "e.g. Director of Engineering"                                     |
| Field 2 Label       | "CHANNEL"                                                          |
| Field 2 Placeholder | "email@org.com"                                                    |
| Field 3 Label       | "ENTITY"                                                           |
| Field 3 Placeholder | "Organization Name"                                                |
| Field 4 Label       | "MISSION PARAMETERS"                                               |
| Field 4 Placeholder | "Briefly describe the technical challenge..."                      |
| CTA Label           | "[ESTABLISH_CONNECTION]"                                           |
| Success State       | "UPLINK ESTABLISHED. ARCHITECTS NOTIFIED."                         |
| Error State         | "// CONNECTION_INTERRUPTED: RETRY_UPLINK"                          |

## 7. Accessibility & Interaction

- **Labels**: Every input has a `for` attribute and a clear `<label>`.
- **Focus**: Keyboard focus triggers the same "expand border + glow" animation as mouse focus.
- **States**:
  - `Hover`: Subtle border brightening.
  - `Active`: Slight background darkening.
  - `Disabled`: Opacity reduced to 30%, `cursor: not-allowed`.
- **Transitions**: Global transition of `400ms cubic-bezier(0.16, 1, 0.3, 1)` for all state changes.

## 8. Registry & Safety Gate

- **Registry**: None (Custom implementation using Tailwind and GSAP).
- **Safety Gate**: No third-party components or blocks required. Implementation derived from existing project patterns in `solutions.html` and `components.js`.

## 9. Visual Accents

- **Corner Brackets**: Small `L-shaped` gold brackets around the form container corners (10px size).
- **Scan Lines**: Fixed overlay of horizontal lines (1px height, 4px apart) at 1% opacity to mimic a high-end CRT/Technical monitor.
