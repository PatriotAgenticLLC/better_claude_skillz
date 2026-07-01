# Design System Template

> Reference for Phase 2 extraction. Every design system produces exactly 3 files in `{app}/design-system/`.

## File 1: `tokens.css`

CSS custom properties organized by category. This is the single source of truth for all visual values.

```css
/* ============================================
   {DESIGN_NAME} Design Tokens
   Extracted from: {SOURCE_FILE}
   ============================================ */

/* -- Colors -- */
:root {
  --base: #____;           /* Page background */
  --card: #____;           /* Card / surface background */
  --ink: #____;            /* Primary text */
  --accent: #____;         /* Primary accent color */
  --accent-light: #____;   /* Accent hover / lighter variant */
  --border: #____;         /* Default border */
  --border-hover: #____;   /* Border on hover / focus */

  /* Status */
  --green: #____;
  --red: #____;
  --amber: #____;

  /* Semantic (optional — add domain-specific tokens) */
  /* --layer-foundation: #____; */
}

/* -- Spacing Scale -- */
:root {
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 20px;
  --sp-6: 24px;
  --sp-7: 28px;
  --sp-8: 32px;
  --sp-10: 40px;
  --sp-12: 48px;
}

/* -- Radii -- */
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}

/* -- Shadows -- */
:root {
  /* If the design uses borders instead of shadows, leave empty and note in DESIGN.md */
}

/* -- Typography -- */
:root {
  --font-display: '____', sans-serif;
  --font-body: '____', sans-serif;
  --font-mono: '____', monospace;

  --text-xs: 9px;
  --text-sm: 10px;
  --text-base: 12px;
  --text-md: 14px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;
  --text-4xl: 32px;
  --text-5xl: 48px;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.04em;
  --tracking-wider: 0.12em;
  --tracking-widest: 0.18em;
}

/* -- Transitions -- */
:root {
  --ease-default: 0.15s ease;
  --ease-spring: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## File 2: `components.css`

Reusable component classes extracted from the prototype. Each class is self-contained — imports `tokens.css` variables.

```css
/* ============================================
   {DESIGN_NAME} Components
   Extracted from: {SOURCE_FILE}
   Requires: tokens.css loaded first
   ============================================ */

/* List every reusable visual pattern from the prototype as a class.
   Common patterns to extract:

   .{name}-card          — Primary card/container
   .section-header       — Section title with decorative element
   .metric-number        — Large display numbers
   .mono-label           — Small uppercase labels
   .trend-up / .trend-down — Status badges
   .stat-box             — Bordered stat container
   .nav-item             — Navigation items with active state
   .btn-primary          — Primary button
   .btn-secondary        — Secondary/ghost button
   .health-cell          — Status indicator cell
   .funnel-step          — Funnel visualization row
   .chart-bar            — Chart column

   Include hover states, active states, and transitions.
   Include any reusable pseudo-element patterns (noise overlays, decorative lines, etc.)
   Include animation keyframes and entrance classes.
*/
```

## File 3: `DESIGN.md`

Human/AI-readable specification. This is the reference document — read this first, then use the CSS files.

```markdown
# {Design Name} — Design System

> Extracted from `{source_file}` on {date}
> Base examples: {which example library entries inspired this}

## Font Stack

| Role | Family | CDN |
|------|--------|-----|
| Display | {name} | `{cdn_url}` |
| Body | {name} | `{cdn_url}` |
| Mono | {name} | `{cdn_url}` |

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--base` | #____ | Page background |
| `--card` | #____ | Card surfaces |
| ... | ... | ... |

## Typography Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 9px | Smallest labels |
| ... | ... | ... |

## Spacing System

Base unit: 4px. Scale: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48.

## Component Inventory

| Class | Description | Usage |
|-------|-------------|-------|
| `.{name}-card` | White card with border, hover accent | Metric cards, content containers |
| `.section-header` | Mono label + extending rule line | Section titles |
| ... | ... | ... |

## Design Rules

### DO
- {Rule 1}
- {Rule 2}

### DON'T
- {Rule 1}
- {Rule 2}

## Iconography

{Icon library, default size, color tokens}
```

---

## Extraction Checklist

When extracting from a prototype, verify:

- [ ] Every CSS variable from the prototype's `:root` is in `tokens.css`
- [ ] Every repeated visual pattern has a class in `components.css`
- [ ] Font CDN `<link>` or `@import` URLs are documented in `DESIGN.md`
- [ ] Color palette table is complete (no hex values used inline that aren't tokens)
- [ ] Component inventory table lists every class with a one-line description
- [ ] Do/Don't rules capture the design's distinctive constraints
- [ ] Animation keyframes are included if the prototype uses entrance animations
