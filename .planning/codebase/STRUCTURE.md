# Codebase Structure

**Analysis Date:** 2025-03-05

## Directory Layout

```
[project-root]/
├── .planning/          # GSD planning and codebase mapping
├── node_modules/       # External dependencies (not committed)
├── Pictures/           # Static image assets
├── 01-UI-SPEC.md       # Design and scouting notes
├── 02-UI-SPEC.md       # Design and scouting notes
├── index.css           # Primary stylesheet and Tailwind entry point
├── index.html          # Main application entry point
├── main.js             # Core application logic
├── package.json        # Build and dependency configuration
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Directory Purposes

**Root Directory:**

- Purpose: Contains all source files and configuration for the web application.
- Contains: HTML, CSS, JS, and config files.
- Key files: `index.html`, `index.css`, `main.js`, `package.json`.

**.planning/:**

- Purpose: Stores GSD-related planning documents and codebase audits.
- Contains: UI reviews and architecture/structure mappings.

**Pictures/:**

- Purpose: Storage for static image assets.
- Key files: `Pictures/without bg.png`.

## Key File Locations

**Entry Points:**

- `index.html`: Main HTML entry point. Loads `index.css` and `main.js`.
- `index.css`: Primary CSS entry point. Contains Tailwind directives (`@tailwind`).
- `main.js`: Primary JavaScript entry point for all interactivity.

**Configuration:**

- `package.json`: Vite and dependency config.
- `tailwind.config.js`: Tailwind theme and content configuration.
- `postcss.config.js`: PostCSS plugins (Autoprefixer, Tailwind).

**Core Logic:**

- `main.js`: Logic for Three.js visualizations and SVG graphs.

## Naming Conventions

**Files:**

- [Lower-kebab-case]: `index.html`, `main.js`, `package.json`.

**Directories:**

- [PascalCase/Kebab-case]: `Pictures`, `node_modules`.

## Where to Add New Code

**New Feature/Section:**

- Implementation: `index.html` (for structure), `main.js` (for logic).
- Styles: `index.css` (for custom classes) or utility classes in HTML.

**New Visualization:**

- Implementation: `main.js` (add initialization function and class).

**Utilities:**

- Shared helpers: `main.js`.

## Special Directories

**Pictures/:**

- Purpose: Direct asset storage for UI.
- Committed: Yes.

**node_modules/:**

- Purpose: Managed dependencies.
- Committed: No.

## File References (index.css)

The following files explicitly reference or use `index.css`:

- `index.html`: References as a stylesheet via `<link rel="stylesheet" href="index.css">`.
- `koollkui.html`: References as a stylesheet via `<link rel="stylesheet" href="index.css">`.
- `philosophy.html`: References as a stylesheet via `<link rel="stylesheet" href="index.css">`.
- `01-UI-SPEC.md`: Mentions for scouting/bug identification.
- `02-UI-SPEC.md`: Mentions for styling audit.
- `tailwind.config.js`: Uses as the target for Tailwind's `@tailwind` directives (implicitly, as the source for processing).

---

_Structure analysis: 2025-03-05_
