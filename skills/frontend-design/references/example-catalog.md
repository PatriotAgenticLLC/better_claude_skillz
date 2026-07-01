# Example Design Catalog

> Condensed reference for all design examples in `examples/`. Each entry captures the vibe, palette, typography, and **reusable CSS patterns** with actual code. Read this first for inspiration, then read the full HTML file for the complete picture.

---

## creative-coder

**Vibe:** Neo-brutalist portfolio. Bold geometric shapes, hard black borders, saturated accent colors, soft organic blob backgrounds. Playful, high-energy, "serious craft with irreverent presentation."

**Palette:**
- Background: `#FFFDF5` (warm cream)
- Borders/text: `#000000`
- Yellow: `#FDE047` | Pink: `#F9A8D4` | Blue: `#2563EB`

**Fonts:** `Syne` (display, 400-800) + `Space Grotesk` (body, 300-600)

**Signature CSS:**
```css
/* Neo-brutalist shadow system */
.neo-shadow    { box-shadow: 6px 6px 0px 0px rgba(0,0,0,1); }
.neo-shadow-sm { box-shadow: 3px 3px 0px 0px rgba(0,0,0,1); }
.neo-shadow-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
}

/* Button press-down */
.btn:hover { transform: translateY(2px); box-shadow: none; }

/* Blob background */
@keyframes move-blob {
  0%   { transform: translate(0px, 0px) scale(1); }
  33%  { transform: translate(30px, -50px) scale(1.1); }
  66%  { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
/* Applied to large circles with mix-blend-multiply filter blur-3xl opacity-30 */

/* Stroke-only text */
.text-outline { -webkit-text-stroke: 1.5px black; color: transparent; }

/* Highlighted word with skewed bg */
<span class="relative inline-block px-4">
  <span class="absolute inset-0 bg-[#FDE047] -skew-y-2 border-2 border-black neo-shadow-sm -z-10"></span>
  WORD
</span>

/* Nav with auto color inversion */
nav { mix-blend-mode: difference; }

/* Custom cursor */
.cursor-dot { width: 8px; height: 8px; background: black; }
.cursor-circle { width: 40px; height: 40px; border: 1px solid rgba(0,0,0,0.5); }
body:has(a:hover) .cursor-circle {
  transform: translate(-50%, -50%) scale(2);
  background: rgba(253, 224, 71, 0.3);
}
```

**Key patterns:** Layered cards (colored bg rotated behind white card, rotation increases on hover). Marquee band rotated `rotate-1 scale-105`. Hero text at `text-[12vw]` with negative `space-y-[-3rem]`. Card hover floods with accent color.

---

## cloakclaw

**Vibe:** Dark hacker/DeFi infrastructure. Terminal aesthetics, menacing red glows, monospace labels with dramatic oversized headings. "Premium weaponized tool."

**Palette:**
- Background: `#050505` | Panel: `#0a0a0a` | Grid: `#1a1a1a`
- Accent: `#ff2a2a` | Accent deep: `#990000` | Accent light: `#ff7b7b`
- Code green: `#88ff88`
- Text: `#e5e5e5`

**Fonts:** `Space Grotesk` (display, 300-700) + `JetBrains Mono` (labels/code, 300-500)

**Signature CSS:**
```css
/* Glass panel */
.glass-panel {
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* CRT scanline sweep */
.scan-line {
  position: absolute; left: 0; width: 100%; height: 20%;
  background: linear-gradient(to bottom, transparent, rgba(255, 42, 42, 0.1), transparent);
  animation: scan 3s linear infinite;
}

/* Technical corner brackets (HUD reticle) */
.technical-border::before {
  content: ''; position: absolute; top: -1px; left: -1px;
  width: 8px; height: 8px;
  border-top: 1px solid #ff2a2a; border-left: 1px solid #ff2a2a;
}
.technical-border::after {
  content: ''; position: absolute; bottom: -1px; right: -1px;
  width: 8px; height: 8px;
  border-bottom: 1px solid #ff2a2a; border-right: 1px solid #ff2a2a;
}

/* Grid background with radial mask */
.bg-tech-grid {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: radial-gradient(circle at 50% 0%, black 60%, transparent 100%);
}

/* Glow text */ text-shadow: 0 0 30px rgba(255, 42, 42, 0.6);
/* Glow box */ box-shadow: 0 0 20px rgba(255, 42, 42, 0.3);
/* Glow dot */ box-shadow: 0 0 10px #ff2a2a;

/* Marquee with edge fade */
.marquee-container {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* Cursor blink */
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* Decorative vertical gradient line */
<div class="absolute -left-12 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#ff2a2a]/50 to-transparent"></div>

/* Status badge */
<div class="px-3 py-1 rounded-full border border-[#ff2a2a]/30 bg-[#ff2a2a]/10 text-[#ff2a2a] text-[10px] font-mono tracking-widest uppercase">
```

**Key patterns:** Bento grid with mixed col/row spans at fixed `h-[600px]`. Glow blobs at `filter: blur(80px)`. Hover border shift `border-white/10` to `border-accent/50`. Tiny `text-[10px] font-mono uppercase tracking-widest` labels contrast with massive headings. Buttons: no border-radius, mono uppercase.

---

## pony-house

**Vibe:** Cinematic SaaS with Three.js floating island hero. Premium developer tooling lineage (Linear/Vercel) with unexpected 3D centerpiece. Dark, atmospheric.

**Palette:**
- bg: `#0B0C0E` | surface: `#15171B` | surfaceHighlight: `#1E2127`
- border: `rgba(255, 255, 255, 0.08)`
- accent: `#3B82F6` | accentGlow: `#2563EB`
- text: `#EAEAEA` | textDim: `#888888`

**Fonts:** `Inter` (300-700)

**Signature CSS:**
```css
/* Blur reveal entrance */
.reveal {
  opacity: 0; filter: blur(5px); transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.active { opacity: 1; filter: blur(0); transform: translateY(0); }

/* Text gradient */
.text-gradient-blue {
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

/* Shadow curtain (covers fixed bg) */
.main-content { box-shadow: 0 -50px 100px #0b0c0e; }

/* Dot grid */
background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
background-size: 20px 20px;

/* Premium card glow */
<div class="absolute -inset-1 rounded-[28px] bg-gradient-to-b from-accent/30 via-accent/10 to-transparent blur-2xl opacity-60"></div>

/* SVG noodle beams */
.noodle-beam {
  stroke: #3b82f6; stroke-width: 3;
  stroke-dasharray: 60 420; stroke-dashoffset: 480;
  animation: beam 2.2s linear infinite;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8));
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

**Key patterns:** Fixed hero + scroll spacer `400vh` for scroll-linked 3D animations. Stacked card deck swapping on scroll. Karaoke text (words at `opacity: 0.3` illuminate to full white with glow on scroll). Tag chips: `text-[10px] border border-white/10 rounded-full`.

---

## stratum

**Vibe:** Industrial skeuomorphic control panel. Mixing consoles, analog dials, LED indicators, toggle switches. Obsessive layering of inset shadows, brushed metal textures, volumetric lighting on zinc palette with orange accent.

**Palette:**
- Scale: `#09090b` / `#121214` / `#18181b` / `#27272a` / `#3f3f46` / `#52525b` / `#71717a` / `#a1a1aa`
- Accent: `#f97316` (orange-500) | `#ea580c` | `#9a3412`
- Signal: `#22c55e` (green) | `#ef4444` (red)
- Text: `#fafafa` / `#e4e4e7` / `#d4d4d8` / `#a1a1aa` / `#71717a`

**Fonts:** `DM Sans` (display, 300-700) + system sans (body) + monospace (technical labels)

**Signature CSS:**
```css
/* Master card/panel */
background: linear-gradient(135deg, #2a2a2e 0%, #121214 100%);
box-shadow:
  -16px -16px 40px rgba(63,63,70,0.04),
  32px 32px 80px rgba(0,0,0,0.9),
  inset 1px 1px 2px rgba(255,255,255,0.1),
  inset -1px -1px 4px rgba(0,0,0,0.8);
border: 1px solid #3f3f46;

/* Brushed metal texture */
background-image: repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 4px);
opacity: 0.03; mix-blend-mode: screen;

/* LED indicator */
box-shadow: 0 0 16px 2px #f97316, inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.6);
/* Inner core: absolute inset-[2px] rounded-full bg-white opacity-60 blur-[0.5px] */

/* Conic gradient knob */
background: conic-gradient(from 180deg, #2a2a2e, #4b4b52 90deg, #18181b 180deg, #4b4b52 270deg, #2a2a2e);
/* Rotates on hover: group-hover:rotate-[140deg] transition-transform duration-700 */

/* Recessed screen (CRT display) */
/* Scan lines: */ background: linear-gradient(rgba(255,255,255,0.03) 50%, transparent 50%); background-size: 100% 4px;
/* Orange grid: */ background-image: linear-gradient(rgba(249,115,22,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.4) 1px, transparent 1px); background-size: 10px 10px;

/* Etched divider */
height: 1px; background: #09090b; box-shadow: 0 1px 0 rgba(255,255,255,0.06);

/* Engraved text */
text-shadow: 0px 1px 1px rgba(255,255,255,0.1), 0px -1px 1px rgba(0,0,0,0.8);

/* Volumetric light glint */
background: radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.06) 0%, transparent 50%);

/* Card breathing */
@keyframes card-breath {
  0%, 100% { filter: brightness(1) saturate(1); }
  50% { filter: brightness(1.08) saturate(1.08); }
}

/* Hover sweep light */
<div class="absolute w-16 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent -translate-x-full group-hover:translate-x-[400px] transition-transform duration-[2000ms]"></div>
```

**Key patterns:** Fastener screws at card corners (gradient circles with rotated lines). Telemetry status bars full-width. Section headers with "MOD. 01 // CORE" mono labels + LED status. Body bg: `radial-gradient(circle at 30% -20%, #27272a 0%, #09090b 100%)`.

---

## ux-jonny

**Vibe:** Swiss minimal portfolio. Monochromatic neutrals, generous whitespace, wireframe 3D hero. "Designer who codes" identity. Clean, editorial.

**Palette:**
- Background: `white` / `#fafafa` alternating
- Text: `#171717` / `#525252` / `#737373` / `#a3a3a3` / `#d4d4d4`
- Cards: `#f5f5f5` subtle bg
- Accents (badges only): blue-50/600, purple-50/600, emerald-50/600
- Availability: green-500

**Fonts:** `Geist` (display/body, 300-700) + `Geist Mono` (labels/descriptions)

**Signature CSS:**
```css
/* Section header motif (used everywhere) */
<div class="flex items-center gap-3 mb-6">
  <span class="text-xs font-bold text-neutral-400 uppercase tracking-widest font-geist-mono">Label</span>
  <div class="h-px flex-1 bg-neutral-200"></div>
</div>

/* Hero: ultra-tight leading */
.hero-title { leading-[0.85]; tracking-tighter; }

/* Grayscale-to-color portrait */
img { filter: grayscale(1); } img:hover { filter: grayscale(0); transition: 700ms; }

/* Pill button */
<a class="px-6 py-3 rounded-lg bg-neutral-900 text-white font-geist-mono text-sm hover:bg-neutral-800">Primary</a>
<a class="px-6 py-3 rounded-lg border border-neutral-200 font-geist-mono text-sm hover:bg-neutral-50">Secondary</a>

/* Tech tag pill */
<span class="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">React</span>

/* Fixed side rail nav (vertical pill) */
position: fixed; left: 1.5rem; top: 50%; transform: translateY(-50%);

/* Card hover with shadow escalation */
hover:shadow-xl transition-all duration-300

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #f5f5f5; }
::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 4px; }
```

**Key patterns:** Sans for headings, mono for body/descriptions (inverted convention). Service cards with CSS-only illustration mockups. Zigzag project grid via `order` classes. Ping-animated availability dot. No saturated color in the layout — all neutral with colored badges as rare punctuation.

---

## jalapao

**Vibe:** Raw, earthy adventure-tourism brutalism. Dark soil tones with rust-orange. Gritty textures, heavy type, desaturated imagery that pops to color on hover.

**Palette:**
```css
:root {
  --color-rust: #a63c06;
  --color-dirt: #2c2a26;
  --color-sand: #e8e6e1;
  --color-green: #3a4032;
}
```

**Fonts:** `Anton` (display, uppercase, `leading-[0.85]`) + `Manrope` (body, 300-800) + `Permanent Marker` (handwritten accents)

**Signature CSS:**
```css
/* Noise texture overlay (fixed, full-screen) */
.noise-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Brutalist box shadow on hover */
hover:shadow-[8px_8px_0px_0px_rgba(166,60,6,1)]

/* Grayscale-to-color images */
filter: grayscale(1); hover: grayscale(0); transition: 500ms;

/* Clip-path diagonal section */
clip-path: polygon(0 0, 100% 0, 100% 10%, 0 100%)

/* Gradient text */
text-transparent bg-clip-text bg-gradient-to-r from-[#A63C06] to-[#D97706]

/* Glassmorphism tag */
bg-white/10 backdrop-blur-sm border border-white/20

/* Dashed border separator */
border-t border-dashed border-[#2C2A26]/30

/* Left-border accent block */
border-l-4 border-[#A63C06] pl-6
```

**Key patterns:** Hero at `text-[10rem]`. Horizontal snap-scroll gallery. Sticky CTA bar `fixed bottom-6`. Rotated testimonial image `rotate-3 hover:rotate-0`. Reverse image zoom `scale-110 group-hover:scale-100`. Handwritten labels with `rotate-2`.

---

## sunplanet

**Vibe:** Refined editorial luxury. Kinfolk magazine meets Aesop. Enormous whitespace, desaturated imagery, warm cream-and-yellow palette. Quiet confidence through restraint.

**Palette:**
- Background: `#FBF7EF` (warm cream) | Accent: `#FFE459` (yellow)
- Text: `#141414` (near-black) | Card bg: `#F2EDE4` (warm stone)
- Selection: `bg-[#141414] text-[#FFE459]`

**Fonts:** `Instrument Serif` (display, italic + regular) + `Manrope` (body, 200-400)

**Signature CSS:**
```css
/* Desaturated-to-color with slow zoom */
img { filter: saturate(0); }
img:hover { filter: saturate(0.5); transform: scale(1.05); transition: 1000ms ease-out; }

/* Opacity as the ONLY modulation tool */
/* Labels: opacity-40 | Body: opacity-80 | Dividers: opacity-20 */
/* All text is #141414 at varying opacities — depth from one color */

/* 1px hairline dividers */
<div class="w-full h-[1px] bg-[#141414] opacity-20"></div>

/* Floating nav with blend mode */
nav { mix-blend-mode: multiply; pointer-events: none; }
nav > div { pointer-events: auto; }

/* Dot grid texture */
background-image: radial-gradient(#141414 1px, transparent 1px);
background-size: 40px 40px; opacity: 0.1;

/* Ghost button → fill on hover (pill) */
<button class="px-8 py-4 border border-[#141414] hover:bg-[#141414] hover:text-[#FBF7EF] rounded-full transition-colors duration-300">

/* Section label pattern */
<span class="text-xs uppercase tracking-widest opacity-40 mb-8">Label</span>
```

**Key patterns:** 12-col grid with 9/3 asymmetric hero split. Two max-width tiers (`screen-2xl` wide, `screen-md` narrow) for rhythm. `min-h-screen flex flex-col justify-end` pushes content to viewport bottom. Only 4 colors total. Slow `animation-duration: 10s` spinning icon.

---

## rinkuu-gopalani

**Vibe:** Dark luxury editorial. High-end fashion magazine meets gallery website. Deep forest-green backdrop with dusty rose accents. Quiet sophistication through restraint and whitespace.

**Palette:**
- Background: `#2A332C` (forest green) | Dark: `#252C26` | Card: `#3A453C`
- Light section: `#F3F0EB` (parchment)
- Accent: `#D4A5A5` (dusty rose) | Accent dark: `#8B5E5E`
- Text on dark: `#F3F0EB` | Text on light: `#2A332C`

**Fonts:** `Cormorant Garamond` (headings, serif) + `Inter` (body, sans)

**Signature CSS:**
```css
/* Custom cursor system */
.cursor-dot { width: 8px; height: 8px; background: #d4a5a5; }
.cursor-outline {
  width: 40px; height: 40px;
  border: 1px solid rgba(212, 165, 165, 0.5);
  transition: width 0.2s, height 0.2s;
}
body.hovering .cursor-outline {
  width: 60px; height: 60px;
  background: rgba(212, 165, 165, 0.1);
  backdrop-filter: blur(2px);
}

/* Clip-path image wipe reveal */
.reveal-img { clip-path: inset(0 0 100% 0); transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1); }
.reveal-img.active { clip-path: inset(0 0 0 0); }

/* Slide-up text reveal */
.reveal-text { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal-text.active { opacity: 1; transform: translateY(0); }

/* Ambient glow blob */
<div class="absolute w-[500px] h-[500px] bg-[#D4A5A5] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>

/* Glass navbar */
backdrop-blur-md bg-[#2A332C]/80 border-b border-[#F3F0EB]/5

/* Status badge with pulse */
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A5A5]/5 border border-[#D4A5A5]/10 text-[#D4A5A5] text-xs uppercase tracking-widest">
  <span class="w-1.5 h-1.5 rounded-full bg-[#D4A5A5] animate-pulse"></span>
  Label
</div>

/* Product card with expanding description */
.description { height: 0; overflow: hidden; transition: height 0.5s; }
.group:hover .description { height: auto; }

/* Pill CTA */
<a class="px-5 py-2 border border-[#F3F0EB]/20 rounded-full text-xs uppercase tracking-widest hover:bg-[#F3F0EB] hover:text-[#2A332C]">
```

**Key patterns:** Sticky sidebar scroll (`sticky top-32` in 2-col grid). Staggered masonry via `lg:mt-12` offset. Decorative giant numbers at `text-6xl opacity-10`. Animated line divider (`w-0` expands to `96px` via IntersectionObserver). 8+ opacity levels for depth from single colors. Serif headings at `leading-[0.9]` with `font-light`.

---

## nexus (multi-page)

**Vibe:** Cinematic dark-mode SaaS mission control. Obsessively detailed glass surfaces over near-black backgrounds, film grain, particle networks, mouse-tracking spotlights. "Technical yet editorial" — geometric sans headings with italic serif accent words. A full multi-page site (Index, Features, Solutions, Pricing, Company, Workflow, Careers, Sign In).

**Palette:**
- Body: `#050505` | Cards: `#0a0a0a` | Mid-dark: `#1f1f1f`
- Border: `rgba(255, 255, 255, 0.08)` (the ONE border color used everywhere)
- Glass fill: `rgba(255, 255, 255, 0.03)`
- Accent: `#3b82f6` (blue-500) | `#60a5fa` (blue-400)
- Text: `#e5e5e5` body | `rgba(255,255,255,0.9)` headings | `rgba(255,255,255,0.40)` labels | `rgba(255,255,255,0.35)` mono labels
- Signal: green-400/500 (status), purple-400 (secondary)

**Fonts:** `Space Grotesk` (display, 300-700) + `Inter` (body, 300-600) + `Instrument Serif` (italic accent words within headings, 400)

**The triple-font heading formula:**
```html
<h2 class="text-4xl md:text-6xl font-display font-semibold tracking-tighter leading-[0.95]">
  Infrastructure that
  <span class="font-serif italic font-light tracking-normal text-white/60">scales</span>
</h2>
```

**Signature CSS:**
```css
/* Glass panel (the universal building block) */
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Spotlight card (mouse-following radial highlight) */
.spotlight-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.08), transparent 40%);
  opacity: 0; transition: opacity 0.5s; pointer-events: none; z-index: 2;
}
.spotlight-card:hover::before { opacity: 1; }

/* Film grain overlay */
.bg-grain::after {
  content: ""; position: fixed; inset: -100%; width: 300%; height: 300%;
  background-image: url("https://upload.wikimedia.org/wikipedia/commons/7/76/Noise.png");
  opacity: 0.04; animation: grain 8s steps(10) infinite;
  pointer-events: none; z-index: 9998;
}

/* Section aura (ambient light) */
.section-aura {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.9;
  background: radial-gradient(80% 70% at 20% 30%, rgba(255,255,255,0.06), transparent 55%),
    radial-gradient(70% 70% at 75% 70%, rgba(255,255,255,0.04), transparent 60%);
}

/* Section grid (hairline grid with radial mask) */
.section-grid {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.22;
  background: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at 50% 30%, #000 35%, transparent 72%);
}

/* Gradient border (mask-based) */
[style*="--border-gradient"]::before {
  content: ""; position: absolute; inset: 0; padding: 1px;
  border-radius: var(--border-radius-before, inherit);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude; background: var(--border-gradient);
}

/* Specular sweep (pricing highlight) */
@keyframes specular {
  0% { transform: translateX(-150%) skewX(-20deg); }
  15% { transform: translateX(150%) skewX(-20deg); }
  100% { transform: translateX(150%) skewX(-20deg); }
}

/* Section bottom glow divider */
.section-divider {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 60%; height: 8px; opacity: 0.25;
  background: radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.35) 0%, transparent 70%);
}

/* Scroll reveal */
@keyframes tFadeUp {
  from { opacity: 0; transform: translateY(22px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Hairline shimmer */
.hairline { height: 1px; background: rgba(255,255,255,0.10); overflow: hidden; }
.hairline::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
  transform: translateX(-120%);
}

/* Soft card hover (simpler alternative to spotlight) */
.soft-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); }
.soft-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

/* Marquee with edge fade */
.marquee-mask { mask-image: linear-gradient(90deg, transparent, white 18%, white 82%, transparent); }
```

**The mono-label convention (used EVERYWHERE):**
```html
<span class="text-[10px] font-mono uppercase tracking-[0.22em] text-white/35">Step 01</span>
```

**Key patterns:** Multi-page consistent design system. Scroll-driven "door" hero (two panels slide apart revealing bg). Canvas particle networks. 3D blueprint card stack with parallax tilt (`perspective(900px)`). Cursor lens effect (`mask-image: radial-gradient`). Pricing with sliding beam indicator + specular sweep. Timeline with alternating sides + blur reveal. Team cards in horizontal snap scroll at `aspect-[4/5]`. Sections alternate `bg-black` / `bg-neutral-950` with `border-t border-white/5`. GSAP everywhere: `cubic-bezier(0.16, 1, 0.3, 1)` is the signature easing.

**Component inventory:** Glass panels, spotlight cards, soft cards, pricing tiers, team cards, timeline milestones, workflow steps, feature grids (12-col with mixed spans), case study lens preview, FAQ accordion, billing toggle, status badges with ping dots, CTA button pairs (solid white primary + ghost secondary), fixed side rail nav with scroll spy, mobile nav via CSS checkbox toggle.

**Read the full source files in `examples/nexus/` for the complete multi-page implementation.**
