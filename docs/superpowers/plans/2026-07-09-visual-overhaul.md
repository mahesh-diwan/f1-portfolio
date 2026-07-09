# F1 Portfolio — Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the F1 portfolio with ancient-script parchment theme, Sora font, visual depth, file cleanup, config trim, and 6 interactive Framer Motion easter eggs.

**Architecture:** CSS custom properties for theming (dark unchanged, light repainted to #e6d5a8 vellum). Framer Motion for all easter egg animations. File reorganization into ui/primitives, ui/f1, ui/motion, layout, sections, providers.

**Tech Stack:** Next.js 16.2.10, Tailwind CSS v4, React 19.2.4, Framer Motion (installed), Sora + IBM Plex Mono (Google Fonts), TypeScript strict.

## Global Constraints

- All content from `portfolioConfig.ts` — no hardcoded personal data
- WCAG AA accessibility, responsive 320px–ultra-wide
- Dark + light theme support preserved
- `prefers-reduced-motion` respected via `useReducedMotion()` from Framer Motion
- All non-easter-egg animations under 300ms, only `transform`/`opacity`
- Easter egg animations < 3s total, self-contained, click-triggered
- `npx playwright test` after each task — 40/40 must pass
- Commit after each task
- Default viewport: 1280×720; dev server on port 3099

---

## File Map

### Modified Files
- `src/app/globals.css` — palette swap, font swap, texture update, new keyframes
- `src/app/layout.tsx` — Google Fonts: replace Space Grotesk/Inter with Sora
- `src/app/page.tsx` — flex column wrapper for sticky footer
- `src/components/sections/Hero.tsx` — race start lights easter egg
- `src/components/sections/Experience.tsx` — sector replay easter egg
- `src/components/sections/Projects.tsx` — pit stop easter egg, remove Data button
- `src/components/sections/TelemetrySkills.tsx` — engine mode easter egg
- `src/components/sections/Education.tsx` — trophy lift easter egg
- `src/components/sections/Contact.tsx` — team radio easter egg
- `portfolioConfig.ts` — remove verbose project fields, remove experience.current

### Deleted Files (19)
- `src/components/ui/MotionCard.tsx`
- `src/components/ui/RevCounter.tsx`
- `src/components/ui/TypingEffect.tsx`
- `src/components/ui/TireCompound.tsx`
- `src/components/ui/GlowEffect.tsx`
- `src/components/ui/RaceLights.tsx`
- `src/components/ui/F1Car.tsx`
- `src/components/ui/TelemetryStream.tsx`
- `src/components/ui/SparkEffect.tsx`
- `src/components/ui/TeamRadio.tsx`
- `src/components/ui/HeartRate.tsx`
- `src/components/ui/DigitalReadout.tsx`
- `src/components/ui/SectorTime.tsx`
- `src/components/ui/LapCounter.tsx`
- `src/components/ui/TelemetryPanel.tsx`
- `src/components/ui/RaceTimeline.tsx`
- `src/components/ui/Speedometer.tsx`
- `src/components/ui/RaceFlag.tsx`
- `src/components/ui/AnimatedNumber.tsx`

### Moved Files (11 → new paths)
- `Gauge.tsx` → `ui/primitives/Gauge.tsx`
- `TelemetryBar.tsx` → `ui/primitives/TelemetryBar.tsx`
- `StatusIndicator.tsx` → `ui/primitives/StatusIndicator.tsx`
- `EasterEgg.tsx` → `ui/primitives/EasterEgg.tsx`
- `DRSIndicator.tsx` → `ui/f1/DRSIndicator.tsx`
- `PerformanceMeter.tsx` → `ui/f1/PerformanceMeter.tsx`
- `SectionReveal.tsx` → `ui/motion/SectionReveal.tsx`
- `Navigation.tsx` → `layout/Navigation.tsx`
- `Footer.tsx` → `layout/Footer.tsx`
- `ScrollProgress.tsx` → `layout/ScrollProgress.tsx`
- `CommandPalette.tsx` → `layout/CommandPalette.tsx`
- `SectionRouter.tsx` → `layout/SectionRouter.tsx`
- `ErrorBoundary.tsx` → `providers/ErrorBoundary.tsx`
- `LoadingScreen.tsx` → `providers/LoadingScreen.tsx`
- `KonamiCodeOverlay.tsx` → `providers/KonamiCodeOverlay.tsx`

---

### Task 1: Delete Unused Components

**Files:**
- Delete: 19 files listed above

**Interfaces:**
- Consumes: nothing (first task)
- Produces: cleaner `src/components/ui/` directory

- [ ] **Step 1: Verify no imports exist for each file**

Run: `rg "MotionCard|RevCounter|TypingEffect|TireCompound|GlowEffect|RaceLights|F1Car|TelemetryStream|SparkEffect|TeamRadio|HeartRate|DigitalReadout|SectorTime|LapCounter|TelemetryPanel|RaceTimeline|Speedometer|RaceFlag|AnimatedNumber" src/ --include="*.tsx" --include="*.ts" -l`

Expected: only the files themselves (self-references). If any other file imports them, stop and investigate.

- [ ] **Step 2: Delete all 19 files**

```bash
rm src/components/ui/MotionCard.tsx src/components/ui/RevCounter.tsx src/components/ui/TypingEffect.tsx src/components/ui/TireCompound.tsx src/components/ui/GlowEffect.tsx src/components/ui/RaceLights.tsx src/components/ui/F1Car.tsx src/components/ui/TelemetryStream.tsx src/components/ui/SparkEffect.tsx src/components/ui/TeamRadio.tsx src/components/ui/HeartRate.tsx src/components/ui/DigitalReadout.tsx src/components/ui/SectorTime.tsx src/components/ui/LapCounter.tsx src/components/ui/TelemetryPanel.tsx src/components/ui/RaceTimeline.tsx src/components/ui/Speedometer.tsx src/components/ui/RaceFlag.tsx src/components/ui/AnimatedNumber.tsx
```

- [ ] **Step 3: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors (deleted files had no live imports)

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add -A src/components/ui/
git commit -m "chore: delete 19 unused UI components"
```

---

### Task 2: Reorganize Components into Subfolders

**Files:**
- Move: 11 components to new subfolder paths
- Modify: all files that import from `@/components/ui/X` — update to new paths

**Interfaces:**
- Consumes: Task 1 (clean ui/ directory)
- Produces: organized folder structure, all imports updated

- [ ] **Step 1: Create subdirectories**

```bash
mkdir -p src/components/ui/primitives src/components/ui/f1 src/components/ui/motion src/components/providers
```

- [ ] **Step 2: Move primitive components**

```bash
git mv src/components/ui/Gauge.tsx src/components/ui/primitives/Gauge.tsx
git mv src/components/ui/TelemetryBar.tsx src/components/ui/primitives/TelemetryBar.tsx
git mv src/components/ui/StatusIndicator.tsx src/components/ui/primitives/StatusIndicator.tsx
git mv src/components/ui/EasterEgg.tsx src/components/ui/primitives/EasterEgg.tsx
```

- [ ] **Step 3: Move F1-specific components**

```bash
git mv src/components/ui/DRSIndicator.tsx src/components/ui/f1/DRSIndicator.tsx
git mv src/components/ui/PerformanceMeter.tsx src/components/ui/f1/PerformanceMeter.tsx
```

- [ ] **Step 4: Move motion components**

```bash
git mv src/components/ui/SectionReveal.tsx src/components/ui/motion/SectionReveal.tsx
```

- [ ] **Step 5: Move providers**

```bash
git mv src/components/ui/ErrorBoundary.tsx src/components/providers/ErrorBoundary.tsx
git mv src/components/ui/LoadingScreen.tsx src/components/providers/LoadingScreen.tsx
git mv src/components/ui/KonamiCodeOverlay.tsx src/components/providers/KonamiCodeOverlay.tsx
```

- [ ] **Step 6: Update all imports — find affected files**

Run: `rg "@/components/ui/(Gauge|TelemetryBar|StatusIndicator|EasterEgg|DRSIndicator|PerformanceMeter|SectionReveal|ErrorBoundary|LoadingScreen|KonamiCodeOverlay)" src/ --include="*.tsx" --include="*.ts" -l`

Expected: list of files that need import path updates.

- [ ] **Step 7: Update imports in each affected file**

For each file found in Step 6, update the import paths:
- `@/components/ui/Gauge` → `@/components/ui/primitives/Gauge`
- `@/components/ui/TelemetryBar` → `@/components/ui/primitives/TelemetryBar`
- `@/components/ui/StatusIndicator` → `@/components/ui/primitives/StatusIndicator`
- `@/components/ui/EasterEgg` → `@/components/ui/primitives/EasterEgg`
- `@/components/ui/DRSIndicator` → `@/components/ui/f1/DRSIndicator`
- `@/components/ui/PerformanceMeter` → `@/components/ui/f1/PerformanceMeter`
- `@/components/ui/SectionReveal` → `@/components/ui/motion/SectionReveal`
- `@/components/ui/ErrorBoundary` → `@/components/providers/ErrorBoundary`
- `@/components/ui/LoadingScreen` → `@/components/providers/LoadingScreen`
- `@/components/ui/KonamiCodeOverlay` → `@/components/providers/KonamiCodeOverlay`

- [ ] **Step 8: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 9: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 10: Commit**

```bash
git add -A src/components/
git commit -m "refactor: reorganize components into primitives/f1/motion/providers subfolders"
```

---

### Task 3: Fix Sticky Footer

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: nothing (standalone change)
- Produces: footer sticks to bottom on all viewports

- [ ] **Step 1: Read current page.tsx**

Read `src/app/page.tsx` to understand current structure.

- [ ] **Step 2: Wrap content in flex column**

Add `<div className="min-h-screen flex flex-col">` wrapper around the page content. Move `<Navigation />` outside `<main>`, add `<Footer />` after `<main className="flex-1">`.

- [ ] **Step 3: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 4: Browser verification**

Open browser, verify footer sticks to bottom when section content is shorter than viewport. Check both dark and light modes.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: sticky footer via flex column layout"
```

---

### Task 4: Swap Fonts to Sora

**Files:**
- Modify: `src/app/layout.tsx` — Google Fonts import
- Modify: `src/app/globals.css` — font CSS custom properties

**Interfaces:**
- Consumes: nothing (standalone change)
- Produces: Sora used for all headings and body text

- [ ] **Step 1: Update Google Fonts import in layout.tsx**

Replace the Space Grotesk / Inter font imports with Sora. Keep IBM Plex Mono unchanged.

Current (approximate):
```tsx
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
```

Change to:
```tsx
import { Sora, IBM_Plex_Mono } from "next/font/google";
```

Update the font variable names and className references accordingly.

- [ ] **Step 2: Update CSS custom properties in globals.css**

In the `@theme inline` block, change:
```css
--font-sans: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
--font-heading: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
--font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
```

To:
```css
--font-sans: "Sora", ui-sans-serif, system-ui, sans-serif;
--font-heading: "Sora", ui-sans-serif, system-ui, sans-serif;
--font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
```

Keep `--font-mono` unchanged.

- [ ] **Step 3: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: swap to Sora font family for F1 aesthetic"
```

---

### Task 5: Update Light Theme to Ancient Script Parchment

**Files:**
- Modify: `src/app/globals.css` — `.light` class variables, body background, paper texture

**Interfaces:**
- Consumes: Task 4 (Sora font in place)
- Produces: warm amber-gold vellum light theme

- [ ] **Step 1: Update `.light` CSS variables**

In `src/app/globals.css`, replace the `.light` block colors:

```css
.light {
  --color-bg-base: #e6d5a8;
  --color-bg-surface: #f0e2c0;
  --color-bg-elevated: #d8c898;
  --color-bg-overlay: #ccb880;
  --color-bg-inset: #e0d0a0;

  --color-border-subtle: #c8b888;
  --color-border-default: #b8a070;
  --color-border-strong: #a08850;
  --color-border-focus: #a31815;

  --color-text-primary: #1a0e02;
  --color-text-secondary: #3a2510;
  --color-text-muted: #5a4020;
  --color-text-dim: #7a6040;
  --color-text-inverse: #e6d5a8;

  --color-accent-primary: #a31815;
  --color-accent-primary-hover: #c42018;
  --color-accent-primary-dim: #8a1210;
  --color-accent-primary-glow: rgba(163, 24, 21, 0.15);
  --color-accent-primary-muted: rgba(163, 24, 21, 0.06);

  --color-accent-gold: #9a7a0a;
  --color-accent-gold-dim: #826808;
  --color-accent-gold-muted: rgba(154, 122, 10, 0.06);

  --color-accent-teal: #087a60;
  --color-accent-teal-dim: #066850;
  --color-accent-teal-muted: rgba(8, 122, 96, 0.06);

  --color-accent-blue: #2068a8;
  --color-accent-blue-dim: #1a5890;
  --color-accent-blue-muted: rgba(32, 104, 168, 0.06);

  --color-accent-green: #207a4a;
  --color-accent-green-dim: #1a6840;
  --color-accent-green-muted: rgba(32, 122, 74, 0.06);

  --color-accent-purple: #6a42a8;
  --color-accent-purple-dim: #5a3890;
  --color-accent-purple-muted: rgba(106, 66, 168, 0.06);

  --color-accent-orange: #b85a18;
  --color-accent-orange-dim: #a04c14;
  --color-accent-orange-muted: rgba(184, 90, 24, 0.06);

  --color-display-green: #1a7a40;
  --color-display-green-dim: #14683a;
  --color-display-green-muted: rgba(26, 122, 64, 0.06);

  --color-display-amber: #8a6a00;
  --color-display-amber-dim: #785c00;
  --color-display-amber-muted: rgba(138, 106, 0, 0.06);

  --bg-nav: rgba(230, 213, 168, 0.95);

  /* ... remaining variable aliases same pattern ... */

  --shadow-glow: 0 0 24px rgba(163, 24, 21, 0.12);
  --shadow-glow-gold: 0 0 24px rgba(154, 122, 10, 0.10);
  --shadow-glow-teal: 0 0 24px rgba(8, 122, 96, 0.10);
}
```

- [ ] **Step 2: Update `.light body` background gradients**

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

- [ ] **Step 3: Update paper texture overlay**

Replace the `.light body::before` or the `body::before` light-mode override with tighter grid:

```css
.light body::before {
  background-image:
    radial-gradient(circle at 0.5px 0.5px, rgba(26,14,2,0.04) 0.5px, transparent 0.5px);
  background-size: 3px 3px;
  opacity: 0.8;
}
```

- [ ] **Step 4: Update `.light .grid-bg` for parchment**

```css
.light .grid-bg {
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(26,14,2,0.02) 40px, rgba(26,14,2,0.02) 41px),
    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(26,14,2,0.02) 40px, rgba(26,14,2,0.02) 41px);
}
```

- [ ] **Step 5: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 6: Browser verification**

Toggle to light mode. Verify:
- Background is warm amber-gold (#e6d5a8)
- Text is dark brown (#1a0e02)
- Paper grain texture visible
- All sections render correctly
- Navigation glass morphism works

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: ancient script parchment light theme — #e6d5a8 vellum base"
```

---

### Task 6: Visual Overhaul — Depth

**Files:**
- Modify: `src/app/globals.css` — enhanced glass utilities, shadow tokens
- Modify: `src/components/sections/*.tsx` — apply glass + hover-lift to cards

**Interfaces:**
- Consumes: Task 5 (parchment palette in place)
- Produces: layered cards with glass morphism, multi shadows, hover states

- [ ] **Step 1: Enhance glass utilities in globals.css**

Update existing `glass`, `glass-elevated`, `glass-glow` utilities with stronger blur and border for parchment mode:

```css
.light .glass {
  background: color-mix(in srgb, var(--bg-surface) 75%, transparent);
  backdrop-filter: blur(12px) saturate(1.2);
  border: 1px solid color-mix(in srgb, var(--border-default) 70%, transparent);
  box-shadow: var(--shadow-sm), var(--shadow-inset);
}
```

- [ ] **Step 2: Add multi-layer shadow utility**

```css
@utility shadow-card {
  box-shadow:
    0 1px 2px rgba(26, 14, 2, 0.06),
    0 4px 8px rgba(26, 14, 2, 0.08),
    0 0 0 1px var(--border-default);
}
```

- [ ] **Step 3: Apply glass + shadow to section cards**

In each section component (Experience, Projects, TelemetrySkills, Education, Contact), ensure card elements use `glass shadow-card` classes.

- [ ] **Step 4: Enhance hover-lift for light mode**

Update `.hover-lift` in globals.css to include tinted glow in light mode:

```css
.light .hover-lift:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 24px rgba(26, 14, 2, 0.12),
    0 0 0 1px var(--border-strong),
    0 0 20px color-mix(in srgb, var(--accent) 8%, transparent);
}
```

- [ ] **Step 5: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/components/sections/
git commit -m "feat: depth overhaul — glass morphism, multi-layer shadows, hover states"
```

---

### Task 7: Visual Overhaul — Rhythm

**Files:**
- Modify: `src/components/sections/*.tsx` — varied spacing, masonry heights

**Interfaces:**
- Consumes: Task 6 (depth in place)
- Produces: varied vertical rhythm across sections

- [ ] **Step 1: Vary section vertical spacing**

Update each section's `py-*` class:
- Hero: `py-20` (already min-h-screen)
- Experience: `py-28`
- Projects: `py-20`
- TelemetrySkills: `py-24`
- Education: `py-28`
- Contact: `py-20`

- [ ] **Step 2: Vary masonry card heights in Projects**

Update `heights` array in `ProjectCard`:
```tsx
const heights = ["min-h-[200px]", "min-h-[280px]", "min-h-[220px]", "min-h-[260px]"];
```

- [ ] **Step 3: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "feat: rhythm overhaul — varied spacing, masonry height variation"
```

---

### Task 8: Visual Overhaul — Color

**Files:**
- Modify: `src/app/globals.css` — glow ring utilities
- Modify: `src/components/ui/primitives/StatusIndicator.tsx` — animated glow rings

**Interfaces:**
- Consumes: Task 5 (parchment palette)
- Produces: status dots with animated glow rings, tinted card borders

- [ ] **Step 1: Add glow ring keyframe**

```css
@keyframes glow-ring {
  0%, 100% { box-shadow: 0 0 4px var(--ring-color); }
  50% { box-shadow: 0 0 12px var(--ring-color); }
}
```

- [ ] **Step 2: Update StatusIndicator for animated glow**

In `StatusIndicator.tsx`, add CSS animation to the outer ring span using the section's accent color as `--ring-color`.

- [ ] **Step 3: Add tinted border hover utility**

```css
@utility hover-tinted-border {
  transition: border-color 0.2s ease;
}
.hover-tinted-border:hover {
  border-color: color-mix(in srgb, var(--accent) 30%, var(--border-strong));
}
```

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/ui/primitives/StatusIndicator.tsx
git commit -m "feat: color overhaul — animated glow rings, tinted card borders"
```

---

### Task 9: Trim portfolioConfig

**Files:**
- Modify: `portfolioConfig.ts` — remove verbose fields
- Modify: `src/components/sections/Projects.tsx` — remove Data button, expanded content
- Modify: `src/components/sections/Experience.tsx` — remove `current` usage

**Interfaces:**
- Consumes: Tasks 1-8 (visual overhaul complete)
- Produces: cleaner config, simpler cards

- [ ] **Step 1: Read portfolioConfig.ts**

Read to identify the exact fields to remove.

- [ ] **Step 2: Remove verbose project fields**

Remove from each project: `problem`, `solution`, `challenges`, `lessons`, `metrics`, `architecture`.

- [ ] **Step 3: Remove experience.current**

Remove the `current` field from each experience entry.

- [ ] **Step 4: Update Projects.tsx — remove Data button and expanded content**

Remove the expandable "Data" button, the `expanded` state, and the expanded content section from `ProjectCard`.

- [ ] **Step 5: Update Experience.tsx — remove `current` usage**

Remove any references to `exp.current` in the component.

- [ ] **Step 6: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 8: Commit**

```bash
git add portfolioConfig.ts src/components/sections/Projects.tsx src/components/sections/Experience.tsx
git commit -m "refactor: trim portfolioConfig — remove verbose project fields, experience.current"
```

---

### Task 10: Hero Easter Egg — Race Start Lights

**Files:**
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: Framer Motion (installed), `useReducedMotion()` from `framer-motion`
- Produces: click-triggered race start lights animation on name

- [ ] **Step 1: Add race start state and handler**

```tsx
const [raceStart, setRaceStart] = useState(false);
const reducedMotion = useReducedMotion();

const handleRaceStart = () => {
  if (reducedMotion || raceStart) return;
  setRaceStart(true);
  setTimeout(() => setRaceStart(false), 2500);
};
```

- [ ] **Step 2: Wrap h1 with onClick and motion**

```tsx
<motion.h1
  onClick={handleRaceStart}
  className="cursor-pointer ..."
  animate={raceStart ? { scale: [1, 1.02, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] } : {}}
  transition={{ duration: 0.6, delay: 1.2 }}
>
```

- [ ] **Step 3: Add 5 race light dots above the name**

```tsx
{raceStart && (
  <div className="flex items-center justify-center gap-2 mb-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="w-3 h-3 rounded-full"
        initial={{ backgroundColor: 'rgba(163, 24, 21, 0.2)' }}
        animate={{ backgroundColor: i < 5 ? 'rgba(163, 24, 21, 1)' : 'rgba(32, 122, 64, 1)' }}
        transition={{ delay: i * 0.3, duration: 0.1 }}
      />
    ))}
  </div>
)}
```

- [ ] **Step 4: Add green flash after lights**

After all 5 red lights, add a final animation where all dots turn green simultaneously (delay: 1.5s).

- [ ] **Step 5: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 6: Browser verification**

Click the name in the hero section. Verify: 5 red lights illuminate → green flash → name pulses.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero easter egg — race start lights animation"
```

---

### Task 11: Experience Easter Egg — Sector Timing Replay

**Files:**
- Modify: `src/components/sections/Experience.tsx`

**Interfaces:**
- Consumes: Framer Motion, existing `sectors` data
- Produces: click-triggered sector bar animation on timeline cards

- [ ] **Step 1: Add click handler to timeline cards**

```tsx
const [replayIdx, setReplayIdx] = useState<number | null>(null);

const handleReplay = (idx: number) => {
  if (reducedMotion) return;
  setReplayIdx(idx);
  setTimeout(() => setReplayIdx(null), 2000);
};
```

- [ ] **Step 2: Animate sector bars on click**

When a card is clicked, animate the sector time bars (scaleX from 0 to 1) and tick the delta numbers from 0 to their values.

- [ ] **Step 3: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Experience.tsx
git commit -m "feat: Experience easter egg — sector timing replay"
```

---

### Task 12: Projects Easter Egg — Pit Stop Blur

**Files:**
- Modify: `src/components/sections/Projects.tsx`

**Interfaces:**
- Consumes: Framer Motion
- Produces: click-triggered pit stop blur on project cards

- [ ] **Step 1: Add click handler to ProjectCard**

```tsx
const [pitStop, setPitStop] = useState(false);

const handlePitStop = () => {
  if (reducedMotion) return;
  setPitStop(true);
  setTimeout(() => setPitStop(false), 1000);
};
```

- [ ] **Step 2: Animate blur on card click**

```tsx
<motion.div
  className={`glass p-4 ${cardHeight} flex flex-col`}
  animate={pitStop ? {
    filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'],
    scale: [1, 0.98, 1],
  } : {}}
  transition={{ duration: 0.8 }}
  onClick={handlePitStop}
>
```

- [ ] **Step 3: Spin status dot during pit stop**

When `pitStop` is true, add `animate-spin` to the status dot's outer ring.

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: Projects easter egg — pit stop blur animation"
```

---

### Task 13: Skills Easter Egg — Engine Mode Shift

**Files:**
- Modify: `src/components/sections/TelemetrySkills.tsx`

**Interfaces:**
- Consumes: Framer Motion, existing `engineModes` array
- Produces: click-triggered engine mode cycle with telemetry bar shifts

- [ ] **Step 1: Add engine mode state**

```tsx
const [modeIdx, setModeIdx] = useState(0);

const handleModeShift = () => {
  if (reducedMotion) return;
  setModeIdx((prev) => (prev + 1) % engineModes.length);
};
```

- [ ] **Step 2: Animate telemetry bar width shifts**

When mode changes, animate each TelemetryBar's width ±10% based on the new mode.

- [ ] **Step 3: Animate mode label transition**

```tsx
<AnimatePresence mode="wait">
  <motion.span
    key={modeIdx}
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
  >
    MODE: {engineModes[modeIdx]}
  </motion.span>
</AnimatePresence>
```

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/TelemetrySkills.tsx
git commit -m "feat: Skills easter egg — engine mode shift animation"
```

---

### Task 14: Education Easter Egg — Trophy Lift

**Files:**
- Modify: `src/components/sections/Education.tsx`

**Interfaces:**
- Consumes: Framer Motion
- Produces: click-triggered trophy lift with golden glow ring

- [ ] **Step 1: Add click handler to podium cards**

```tsx
const [liftIdx, setLiftIdx] = useState<number | null>(null);

const handleLift = (idx: number) => {
  if (reducedMotion) return;
  setLiftIdx(idx);
  setTimeout(() => setLiftIdx(null), 1500);
};
```

- [ ] **Step 2: Animate card rise and glow**

```tsx
<motion.div
  className="glass p-5 h-full"
  style={{ borderTop: `3px solid ${podium.border}` }}
  animate={liftIdx === idx ? {
    y: [0, -8, 0],
    boxShadow: [
      '0 0 0 rgba(154, 122, 10, 0)',
      '0 0 24px rgba(154, 122, 10, 0.3)',
      '0 0 0 rgba(154, 122, 10, 0)',
    ],
  } : {}}
  transition={{ duration: 1.2 }}
  onClick={() => handleLift(idx)}
>
```

- [ ] **Step 3: Add confetti particles**

When `liftIdx === idx`, render 5 small `motion.div` particles that animate upward and fade out.

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Education.tsx
git commit -m "feat: Education easter egg — trophy lift with golden glow"
```

---

### Task 15: Contact Easter Egg — Team Radio Burst

**Files:**
- Modify: `src/components/sections/Contact.tsx`

**Interfaces:**
- Consumes: Framer Motion
- Produces: click-triggered radio static scan lines + "ROGER THAT" text

- [ ] **Step 1: Add click handler to channel cards**

```tsx
const [radioBurst, setRadioBurst] = useState<number | null>(null);

const handleRadio = (idx: number) => {
  if (reducedMotion) return;
  setRadioBurst(idx);
  setTimeout(() => setRadioBurst(null), 1800);
};
```

- [ ] **Step 2: Animate scan lines on card**

When `radioBurst === idx`, overlay horizontal scan lines using `clipPath` animation:

```tsx
animate={radioBurst === idx ? {
  clipPath: [
    'inset(0 0 100% 0)',
    'inset(0 0 0% 0)',
    'inset(100% 0 0 0)',
  ],
} : {}}
```

- [ ] **Step 3: Add "ROGER THAT" text flicker**

After scan lines complete, show "ROGER THAT" text that flickers in with opacity animation.

- [ ] **Step 4: Run Playwright tests**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: Contact easter egg — team radio burst animation"
```

---

### Task 16: Final Verification

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: Tasks 1-15 (all implemented)
- Produces: confirmed working, committed, pushed

- [ ] **Step 1: Run full Playwright test suite**

Run: `npx playwright test`
Expected: 40/40 pass

- [ ] **Step 2: Run TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Browser audit — dark mode**

Verify all sections render correctly in dark mode. Check glass morphism, shadows, hover states.

- [ ] **Step 4: Browser audit — light mode**

Verify ancient script parchment theme. Check paper texture, warm colors, font rendering.

- [ ] **Step 5: Browser audit — mobile viewport**

Resize to 375px width. Verify responsive layout, navigation, cards.

- [ ] **Step 6: Test all 6 easter eggs**

Click each trigger element, verify animation plays and resets cleanly.

- [ ] **Step 7: Verify prefers-reduced-motion**

Enable reduced motion in browser DevTools. Verify all animations are disabled.

- [ ] **Step 8: Verify sticky footer**

Navigate to sections with short content. Verify footer sticks to viewport bottom.

- [ ] **Step 9: Push to main**

```bash
git push origin main
```

- [ ] **Step 10: Verify deployment**

Check `mahesh-diwan.github.io/f1-portfolio` deploys successfully.
