# F1 Portfolio — Visual Overhaul Design Spec

> **Date:** 2026-07-09
> **Status:** Approved
> **Scope:** Light theme rework, visual overhaul, file cleanup, config trim, footer fix, per-section easter eggs, F1 font swap

## Goal

Transform the F1 portfolio from a flat, sterile design into a warm, layered, visually compelling experience. Ancient-script parchment light theme, Sora font family, depth through glass morphism and shadows, rhythmic layouts, clean file structure, trimmed config, and 6 purposeful interactive easter eggs.

## Constraints

- All content from `portfolioConfig.ts` — no hardcoded personal data
- WCAG AA accessibility, responsive 320px–ultra-wide
- Dark + light theme support preserved
- `prefers-reduced-motion` respected (Framer Motion `useReducedMotion()`)
- All non-easter-egg animations under 300ms, only `transform`/`opacity`
- Easter egg animations < 3s total, self-contained, click-triggered
- `npx playwright test` after each task — 40/40 must pass
- Commit after each task

---

## 1. Typography: Sora + IBM Plex Mono

### Font Stack

```css
--font-sans: "Sora", ui-sans-serif, system-ui, sans-serif;
--font-heading: "Sora", ui-sans-serif, system-ui, sans-serif;
--font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, monospace;
```

### Why Sora

- Digital, crisp, tech aesthetic — matches F1's broadcast graphics feel
- Geometric construction with warm undertones — not as cold as Titillium Web
- Google Fonts, free, self-hostable, 8 weights (100–800)
- Good at small sizes (telemetry labels, mono-adjacent text)
- Pairing: Sora (headings + body) + IBM Plex Mono (data/telemetry)

### Implementation

- Replace `Space Grotesk` with `Sora` in `layout.tsx` Google Fonts import
- Replace `Inter Variable` / `Inter` with `Sora` in `globals.css` font declarations
- Keep `IBM Plex Mono` unchanged
- Update `font-heading`, `font-display`, `font-sans` CSS custom properties

---

## 2. Light Theme: Ancient Script Parchment

### Color Palette

```css
/* Base — amber-gold vellum */
--color-bg-base: #e6d5a8;
--color-bg-surface: #f0e2c0;
--color-bg-elevated: #d8c898;
--color-bg-overlay: #ccb880;
--color-bg-inset: #e0d0a0;

/* Borders — warm brown */
--color-border-subtle: #c8b888;
--color-border-default: #b8a070;
--color-border-strong: #a08850;
--color-border-focus: #a31815;

/* Text — deep brown */
--color-text-primary: #1a0e02;
--color-text-secondary: #3a2510;
--color-text-muted: #5a4020;
--color-text-dim: #7a6040;
--color-text-inverse: #e6d5a8;

/* Accents — tuned for vellum */
--color-accent-primary: #a31815;
--color-accent-primary-hover: #c42018;
--color-accent-gold: #9a7a0a;
--color-accent-teal: #087a60;
--color-accent-blue: #2068a8;
--color-accent-green: #207a4a;
--color-accent-purple: #6a42a8;
--color-accent-orange: #b85a18;
```

### Paper Texture Overlay

CSS-only grain texture via `::before` on body — tighter grid, higher opacity for parchment feel:

```css
.light body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 0.5px 0.5px, rgba(26,14,2,0.04) 0.5px, transparent 0.5px);
  background-size: 3px 3px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;
}
```

### Body Background

Deeper amber/gold radial gradients:

```css
.light body {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,24,21,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 70% 45% at 80% 15%, rgba(180,130,10,0.12) 0%, transparent 55%),
    radial-gradient(ellipse 60% 35% at 15% 50%, rgba(184,90,24,0.06) 0%, transparent 50%),
    radial-gradient(ellipse 80% 40% at 50% 100%, rgba(154,122,10,0.08) 0%, transparent 55%),
    var(--bg-base);
  background-attachment: fixed;
}
```

---

## 3. Sticky Footer

### Problem

Footer flows after content with no flex wrapper — gap appears when section is shorter than viewport.

### Fix

```tsx
// page.tsx
<div className="min-h-screen flex flex-col">
  <Navigation />
  <main id="main-content" className="flex-1">
    <SectionRouter />
  </main>
  <Footer />
</div>
```

`flex-1` on `<main>` ensures footer sticks to bottom when content is short.

---

## 4. Visual Overhaul

### 4a. Depth (Layering)

- Cards get glass morphism: `backdrop-blur(12px)` + semi-transparent bg + subtle border
- Multi-layer shadows: ambient (`shadow-sm`) + directional (`shadow-md`)
- Hover states: `translateY(-2px)` + glow border + deeper shadow
- Section headers get colored accent bars (3px, matches section theme)

### 4b. Rhythm (Layout)

- Sections get varied vertical spacing (`py-20` to `py-28`, not all `py-24`)
- Cards get height variation in masonry (Projects section)
- Asymmetric grids (Experience: 280px sidebar + flexible content)
- Visual hierarchy: small labels → medium titles → large hero text

### 4c. Color (Contrast)

- Status dots with animated glow rings using `color-mix()`
- Section headers get colored accent bars that match their theme
- Glass cards get subtle tinted borders on hover

---

## 5. File Structure Cleanup

### Delete (17 dead + 2 transitively unused)

**Dead (not imported anywhere):**
- `MotionCard.tsx`
- `RevCounter.tsx`
- `TypingEffect.tsx`
- `TireCompound.tsx`
- `GlowEffect.tsx`
- `RaceLights.tsx`
- `F1Car.tsx`
- `TelemetryStream.tsx`
- `SparkEffect.tsx`
- `TeamRadio.tsx`
- `HeartRate.tsx`
- `DigitalReadout.tsx`
- `SectorTime.tsx`
- `LapCounter.tsx`
- `TelemetryPanel.tsx`
- `RaceTimeline.tsx`
- `Speedometer.tsx`

**Transitively unused (only imported by dead components):**
- `RaceFlag.tsx` (only by RaceTimeline)
- `AnimatedNumber.tsx` (only by DigitalReadout)

### Reorganize (remaining 11 components)

```
src/components/
├── ui/
│   ├── primitives/     ← Gauge, TelemetryBar, StatusIndicator, EasterEgg
│   ├── f1/             ← DRSIndicator, PerformanceMeter
│   └── motion/         ← SectionReveal
├── layout/             ← Navigation, Footer, ScrollProgress, CommandPalette, SectionRouter
├── sections/           ← Hero, Experience, Education, Projects, TelemetrySkills, Contact
└── providers/          ← ErrorBoundary, LoadingScreen, KonamiCodeOverlay
```

### Update All Imports

Every file that imports from `@/components/ui/X` must be updated to the new path.

---

## 6. portfolioConfig Trim

### Projects — Remove Verbose Fields

Remove: `problem`, `solution`, `challenges`, `lessons`, `metrics`, `architecture`

Keep: `id`, `name`, `desc`, `type`, `tags`, `link`, `demo`, `accent`, `icon`, `status`

**UI Impact:** Remove expandable "Data" button from ProjectCard. Cards become cleaner single-height.

### Experience — Remove Derived Field

Remove: `current` (can derive from date string)

Keep: `id`, `company`, `role`, `date`, `desc`, `tags`

### Education — Already Clean

Keep as-is: `id`, `institution`, `degree`, `minor`, `period`, `gpa`, `details`

### Skills — Already Clean

Keep as-is: `group`, `items[]` with `{ name, pct, color }`

---

## 7. Per-Section Easter Eggs

### Approach: Triggered Spectacle

Each section gets **1 click-triggered interactive moment**. Framer Motion for all animations. Self-contained (< 3s), respects `useReducedMotion()`.

### Easter Egg Catalog

| Section | Trigger Element | Animation | Duration |
|---------|----------------|-----------|----------|
| **Hero** | Click name `h1` | 5 red lights illuminate sequentially → green flash → name scale+glow "launch" | 2s |
| **Experience** | Click any timeline card | Sector timing bars animate (scaleX 0→1), delta numbers tick up from 0 | 1.5s |
| **Projects** | Click project card | Quick pit-stop blur (filter: blur(4px)) → card settles, status dot spins 360° | 0.8s |
| **Skills** | Click DRS indicator | Telemetry bars shift widths ±10%, engine mode label cycles QUALIFYING→RACE→SAFETY CAR | 1s |
| **Education** | Click podium card | Card rises (y: -8px), golden glow ring expands (boxShadow 0→24px), 5 confetti particles | 1.2s |
| **Contact** | Click channel card | Radio static scan lines (clipPath animation) + "ROGER THAT" text flickers in | 1.5s |

### Implementation Pattern

```tsx
// Reusable easter egg wrapper
function useEasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const reducedMotion = useReducedMotion();
  
  const trigger = () => {
    if (reducedMotion) return;
    setTriggered(true);
    setTimeout(() => setTriggered(false), 3000);
  };
  
  return { triggered, trigger };
}
```

### Existing EasterEgg Component

The existing `EasterEgg.tsx` component wraps children with a click handler and shows a toast-like message. For the new easter eggs, we'll extend this pattern or create section-specific wrappers that use Framer Motion `<motion.div>` for the animation sequences.

---

## 8. Animation Catalog

### Non-Easter-Egg Transitions (< 300ms)

| Animation | Duration | CSS/Framer | Property |
|-----------|----------|------------|----------|
| Section reveal | 500ms | Framer | opacity, translateY |
| Card hover lift | 200ms | CSS | transform, box-shadow |
| Nav glass morphism | 200ms | CSS | backdrop-filter, background |
| Theme toggle | 300ms | CSS | color-scheme, background-color |
| Tab wipe transition | 600ms enter + 500ms exit | CSS keyframes | clip-path |

### Easter Egg Animations (< 3s)

| Animation | Duration | Framer Motion Props |
|-----------|----------|---------------------|
| Race start lights | 2s | `staggerChildren: 0.3`, opacity 0→1, boxShadow animate |
| Sector replay | 1.5s | `scaleX: [0, 1]`, opacity stagger |
| Pit stop blur | 0.8s | `filter: ['blur(0)', 'blur(4px)', 'blur(0)']` |
| Engine mode shift | 1s | `width` animate, color transition |
| Trophy lift | 1.2s | `y: [0, -8, 0]`, boxShadow expand |
| Team radio burst | 1.5s | `clipPath` animate, opacity flicker |

### Ambient Loops (CSS keyframes, already exist)

- `scan-line-fast` — hero scan line
- `pulse-dim` — status dots
- `telemetry-scroll` — telemetry strip
- `race-lights` — race start sequence (reuse for Hero easter egg)

---

## Task Order

1. **Delete unused components** — remove 19 files, verify tests pass
2. **Reorganize remaining components** — move to subfolders, update all imports
3. **Fix sticky footer** — wrap page in flex column layout
4. **Swap fonts to Sora** — update Google Fonts import, CSS custom properties
5. **Update light theme** — ancient script parchment colors, paper texture, warm gradients
6. **Visual overhaul: depth** — glass morphism, shadows, hover states on cards
7. **Visual overhaul: rhythm** — varied spacing, asymmetric grids, masonry heights
8. **Visual overhaul: color** — accent contrast, glow rings, tinted borders
9. **Trim portfolioConfig** — remove verbose fields, update component data usage
10. **Implement Hero easter egg** — race start lights animation
11. **Implement Experience easter egg** — sector timing replay
12. **Implement Projects easter egg** — pit stop blur
13. **Implement Skills easter egg** — engine mode shift
14. **Implement Education easter egg** — trophy lift + confetti
15. **Implement Contact easter egg** — team radio burst
16. **Final verification** — Playwright tests, TypeScript check, visual audit

---

## Verification

- `npx playwright test` — 40/40 after each task
- `npx tsc --noEmit` — no TypeScript errors
- Browser audit: dark mode, light mode, mobile, desktop
- Footer sticks to bottom on all viewports
- Each easter egg triggers on click, animates < 3s, resets cleanly
- `prefers-reduced-motion` disables all animations
