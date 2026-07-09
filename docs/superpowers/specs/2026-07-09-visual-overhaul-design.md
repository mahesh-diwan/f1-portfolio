# F1 Portfolio — Visual Overhaul Design Spec

> **Date:** 2026-07-09
> **Status:** Approved
> **Scope:** Light theme rework, visual overhaul, file cleanup, config trim, footer fix

## Goal

Transform the F1 portfolio from a flat, sterile design into a warm, layered, visually compelling experience. Aged parchment light theme, depth through glass morphism and shadows, rhythmic layouts, clean file structure, trimmed config.

## Constraints

- All content from `portfolioConfig.ts` — no hardcoded personal data
- WCAG AA accessibility, responsive 320px–ultra-wide
- Dark + light theme support preserved
- `prefers-reduced-motion` respected
- All animations under 300ms, only `transform`/`opacity`
- `npx playwright test` after each task — 40/40 must pass
- Commit after each task

---

## 1. Light Theme: Aged Parchment

### Color Palette

```css
/* Base — aged parchment */
--color-bg-base: #f0e4c8;
--color-bg-surface: #f7edd4;
--color-bg-elevated: #e8dab8;
--color-bg-overlay: #ddd0a8;
--color-bg-inset: #ede0c4;

/* Borders — warm amber-brown */
--color-border-subtle: #d4c498;
--color-border-default: #c4b080;
--color-border-strong: #a89460;
--color-border-focus: #c9302c;

/* Text — rich dark brown */
--color-text-primary: #1e1005;
--color-text-secondary: #3a2810;
--color-text-muted: #4d3a1c;
--color-text-dim: #6b5530;
--color-text-inverse: #f0e4c8;

/* Accents — tuned for parchment */
--color-accent-primary: #b8201c;
--color-accent-primary-hover: #d42820;
--color-accent-gold: #b5850a;
--color-accent-teal: #0a8a6e;
--color-accent-blue: #2878c8;
--color-accent-green: #2a8a5a;
--color-accent-purple: #7a4ec0;
--color-accent-orange: #d06a20;
```

### Paper Texture Overlay

CSS-only noise texture via `::before` on body — no images:

```css
.light body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(30,16,5,0.03) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}
```

### Body Background

Warm amber/gold radial gradients:

```css
.light body {
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(184,32,28,0.04) 0%, transparent 60%),
    radial-gradient(ellipse 70% 45% at 80% 15%, rgba(200,150,12,0.15) 0%, transparent 55%),
    radial-gradient(ellipse 60% 35% at 15% 50%, rgba(208,106,32,0.08) 0%, transparent 50%),
    radial-gradient(ellipse 80% 40% at 50% 100%, rgba(181,133,10,0.1) 0%, transparent 55%),
    var(--bg-base);
  background-attachment: fixed;
}
```

---

## 2. Sticky Footer

### Problem

Footer flows after content with no flex wrapper — gap appears when section is shorter than viewport.

### Fix

Wrap page content in flex column layout:

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

## 3. Visual Overhaul

### 3a. Depth (Layering)

- Cards get glass morphism: `backdrop-blur(12px)` + semi-transparent bg + subtle border
- Multi-layer shadows: ambient (`shadow-sm`) + directional (`shadow-md`)
- Hover states: `translateY(-2px)` + glow border + deeper shadow
- Section headers get colored accent bars (3px, matches section theme)

### 3b. Rhythm (Layout)

- Sections get varied vertical spacing (py-20 to py-28, not all py-24)
- Cards get height variation in masonry (Projects section)
- Asymmetric grids (Experience: 280px sidebar + flexible content)
- Visual hierarchy: small labels → medium titles → large hero text

### 3c. Color (Contrast)

- Light mode accents less muted — warmer red (#b8201c), richer gold (#b5850a)
- Status dots with animated glow rings using `color-mix()`
- Section headers get colored accent bars that match their theme
- Glass cards get subtle tinted borders on hover

---

## 4. File Structure Cleanup

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

## 5. portfolioConfig Trim

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

## Task Order

1. **Delete unused components** — remove 19 files, verify tests pass
2. **Reorganize remaining components** — move to subfolders, update all imports
3. **Fix sticky footer** — wrap page in flex column layout
4. **Update light theme** — aged parchment colors, paper texture, warm gradients
5. **Visual overhaul: depth** — glass morphism, shadows, hover states on cards
6. **Visual overhaul: rhythm** — varied spacing, asymmetric grids, masonry heights
7. **Visual overhaul: color** — accent contrast, glow rings, tinted borders
8. **Trim portfolioConfig** — remove verbose fields, update component data usage
9. **Final verification** — Playwright tests, TypeScript check, visual audit

---

## Verification

- `npx playwright test` — 40/40 after each task
- `npx tsc --noEmit` — no TypeScript errors
- Browser audit: dark mode, light mode, mobile, desktop
- Footer sticks to bottom on all viewports
