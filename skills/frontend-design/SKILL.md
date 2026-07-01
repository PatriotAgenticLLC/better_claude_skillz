---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics. Has a library of 9 curated design examples (including one multi-page SaaS site) that can be referenced, blended, or adapted to any brand or context. Trigger words include design, build, style, beautify, UI, frontend, landing page, dashboard, website, component, mockup, prototype.
---

## What This Skill Does

Create distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Build real working code with exceptional attention to aesthetic details and creative choices.

## Design Example Library

This skill includes 8 curated HTML design examples in `examples/`. **Always consult these before designing.**

### Step 1: Read the Catalog

Read `references/example-catalog.md` — condensed design systems with actual CSS code snippets for each example.

### Step 2: Match or Blend

| Example | Aesthetic | Best For |
|---------|-----------|----------|
| **creative-coder** | Neo-brutalist, playful, bold borders | Fun brands, creative portfolios, agencies |
| **cloakclaw** | Dark hacker, red glows, terminal | Developer tools, DeFi, security, infra |
| **pony-house** | Cinematic SaaS, 3D hero, atmospheric | Premium SaaS, developer platforms |
| **stratum** | Industrial skeuomorphic, metal textures | Hardware, audio, premium dark products |
| **ux-jonny** | Swiss minimal, monochrome, editorial | Clean portfolios, design agencies |
| **jalapao** | Earthy brutalist, gritty, rust-orange | Adventure brands, raw/organic products |
| **sunplanet** | Editorial luxury, warm cream, restrained | Luxury brands, editorial, travel |
| **rinkuu-gopalani** | Dark luxury, forest-green + rose | Fashion, artisan brands, galleries |
| **nexus** (multi-page) | Cinematic dark SaaS, glass panels, film grain | SaaS products, dashboards, multi-page sites |

**Blend approaches:**
- Take color palette from one, component patterns from another, typography from a third
- Adapt a dark example to light mode (or vice versa) by inverting the palette logic
- Use one example's signature CSS patterns (shadows, textures, animations) on a different layout structure

### Step 3: Read Full Example Sources

**IMPORTANT:** The catalog gives you the distilled patterns, but to produce truly high-quality output you MUST read the full source files for your chosen reference examples. The catalog is a map — the HTML files are the territory.

**Always read at minimum 2-3 full example files** before building. Pick the examples closest to the target aesthetic and read them end-to-end. This gives you:
- Complete CSS variable systems and how they're applied across components
- Real component HTML structure (not just class names)
- How animations, hover effects, and transitions are actually wired
- The spatial relationships, padding, and rhythm that make the design work

**For multi-page sites** like `nexus/`, read at least the index page plus the page most relevant to what you're building (e.g., `Polar Pricing.html` if building pricing cards, `Polar Features.html` for feature grids).

**Reading order:**
1. `references/example-catalog.md` — scan all entries, identify 2-3 closest matches
2. Full HTML source for those 2-3 examples — absorb the complete design system
3. Build with those patterns deeply internalized, adapting to the user's brand/content

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: What aesthetic direction? Use the example library for grounded inspiration rather than inventing from scratch.
- **Differentiation**: What's the ONE thing someone will remember about this design?
- **Example base**: Which 1-2 examples are closest to what we need? What CSS patterns will we pull?

**CRITICAL**: Choose a clear conceptual direction and execute with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

## How to Use Examples

**Close copy (same vibe, different content):**
1. Read the full HTML source
2. Restructure for the new content/purpose
3. Keep the color system, typography, shadow/texture patterns, and component styles
4. Swap content, adjust layout grid to fit

**Derivative (inspired by, adapted):**
1. Read the catalog entry for CSS patterns
2. Pull specific techniques: shadow system, texture overlays, animation patterns, component structures
3. Apply to a new color palette and font stack
4. Keep the signature moves that make the example distinctive

**Blend (combine 2-3 examples):**
1. Define which aspects come from which example:
   - Color + typography from Example A
   - Component patterns + layout from Example B
   - Texture/animation details from Example C
2. Read catalog entries for all referenced examples
3. Build a unified CSS variable system that merges the palettes
4. Test that patterns from different examples don't conflict visually

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial, Inter, Roboto, and system fonts. Opt for distinctive choices — the examples use fonts like Syne, Space Grotesk, DM Sans, Cabinet Grotesk, Instrument Serif, Cormorant Garamond, Anton, Manrope, Geist. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive palette. Use CSS variables. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Study how the examples use restraint — sunplanet uses only 4 colors, ux-jonny uses only neutrals with rare colored badges.
- **Motion**: Prioritize high-impact moments: one well-orchestrated page load with staggered reveals (like rinkuu-gopalani's `reveal-text` + `reveal-img` system) creates more delight than scattered micro-interactions. Key patterns from examples: blur-in reveals, clip-path wipes, hover shadow escalation, count-up metrics, card breathing.
- **Textures & Depth**: Create atmosphere. Key patterns from examples: noise grain overlays (jalapao), brushed metal (stratum), dot grids (pony-house, sunplanet), tech grids with radial masks (cloakclaw), blob backgrounds (creative-coder), ambient glow blobs (rinkuu-gopalani).
- **Spatial Composition**: Unexpected layouts. Study: 12-col asymmetric splits (sunplanet 9/3), bento grids with mixed spans (cloakclaw), staggered masonry offsets (rinkuu-gopalani `lg:mt-12`), negative space between text lines (creative-coder `space-y-[-3rem]`).

**NEVER** use: overused fonts (Inter, Roboto, Arial, system fonts), purple gradients on white, predictable card grids, generic dark mode (#1a1a2e backgrounds), cookie-cutter shadows. If it looks like every AI-generated dashboard, start over.

## Implementation

Implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail — spacing, shadows, transitions, hover states

Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code. Minimalist designs need restraint, precision, and careful attention to subtle details.

## Output

Default to single-file HTML with Tailwind v4 CDN + Google Fonts unless the user specifies a framework. Include all CSS in a `<style>` block and JS in a `<script>` block. The file should open in a browser and look exactly as designed.

---

## Phase 2: Extract Design System

After the user selects a winning prototype ("let's use this", "this is the one", "lock this in", "extract the design system"), convert it into a structured, reusable design system.

### When to Trigger

- User picks a winning prototype from the exploration phase
- User asks to extract, lock, or codify a design from an existing HTML file
- User wants to create a design system for an app from a reference file

### Process

1. **Read the winning HTML file** end-to-end. Identify every CSS variable, font import, reusable component pattern, color value, spacing value, and animation.

2. **Ask which app this is for** if not obvious from context. The design system lives at `{app-root}/design-system/`.

3. **Read the template:** `references/design-system-template.md` — follow this exact structure for all 3 output files.

4. **Extract into 3 files:**

   | File | Contents |
   |------|----------|
   | `tokens.css` | All CSS custom properties: colors, spacing scale, radii, shadows, typography (families, sizes, weights, tracking), transitions. Organized by category with comments. |
   | `components.css` | Every reusable visual pattern as a self-contained class. Include hover/active states, pseudo-elements (noise overlays, decorative lines), and animation keyframes. |
   | `DESIGN.md` | Human/AI-readable spec: font CDN links, color palette table, typography scale, component inventory, do/don't design rules, iconography. |

5. **Validate:** After extraction, verify:
   - Every hex color from the prototype maps to a token
   - Every repeated visual pattern has a component class
   - Font CDN URLs are documented and correct
   - The do/don't rules capture what makes this design distinctive
   - A new page importing `tokens.css` + `components.css` could use the classes directly

### Output Location

```
{app-root}/design-system/
  tokens.css
  components.css
  DESIGN.md
```

### After Extraction

Tell the user: "Design system extracted. Future sessions working on this app will automatically discover and enforce these tokens and components via the `app-design-system` context skill."

---

## Maintenance

> **Self-improvement rule:** If you used this skill and discovered something not documented here — a gotcha, API quirk, new pattern, or better approach — add it below before finishing your task. Keep entries concise (one line each). If this section grows beyond 10 items, refactor learnings into the main body above.

### Known Gotchas

(none yet)
