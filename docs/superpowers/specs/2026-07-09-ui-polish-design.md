# Design Spec: UI Polish — Contrast, Mobile, Animation Timing

**Date:** 2026-07-09
**Status:** Approved
**Approach:** Darken CSS variables + replace hardcoded hex with var() references

---

## Problem Statement

Three systemic issues degrade the portfolio's visual quality:

1. **Light theme contrast**: 20/26 color combinations fail WCAG AA. 5 hardcoded colors are invisible on the parchment background. Root cause: 3 components use hardcoded hex instead of CSS variables.
2. **Mobile layout**: Hero stats overflow on narrow screens, ScrollProgress overlaps content, project cards waste space, footer text below 12px minimum.
3. **Animation timing**: Section reveal + stagger overlap when scrolling. 3 components missing `prefers-reduced-motion` checks. Loading screen → Hero transition has timing gap.

---

## Phase 1: Light Theme Contrast Fix

### 1.1 Darken CSS Variables (globals.css)

**Border colors** — all three levels fail 3:1 non-text contrast:

| Variable | Current | New | Ratio |
|----------|---------|-----|-------|
| `--color-border-subtle` | `#c8b888` | `#b0a070` | 2.8:1 |
| `--color-border-default` | `#b8a070` | `#988050` | 3.4:1 |
| `--color-border-strong` | `#a08850` | `#806838` | 4.2:1 |

**Accent colors** — 7 fail 4.5:1 for normal text:

| Variable | Current | New | Ratio |
|----------|---------|-----|-------|
| `--color-accent-teal` | `#087a60` | `#065a48` | 5.0:1 |
| `--color-accent-green` | `#207a4a` | `#166838` | 5.1:1 |
| `--color-accent-blue` | `#2068a8` | `#1a5a96` | 5.2:1 |
| `--color-accent-gold` | `#9a7a0a` | `#6a5208` | 5.0:1 |
| `--color-accent-orange` | `#b85a18` | `#8a4210` | 5.0:1 |
| `--color-display-green` | `#1a7a40` | `#146030` | 5.3:1 |
| `--color-display-amber` | `#8a6a00` | `#6a5200` | 5.1:1 |

**Dim text** — fails on elevated surfaces:

| Variable | Current | New | Ratio |
|----------|---------|-----|-------|
| `--color-text-dim` | `#7a6040` | `#6a5030` | 4.5:1 |

**Mercedes silver** — used for P2 podium:

| Variable | Current | New | Ratio |
|----------|---------|-----|-------|
| `--color-mercedes-silver` | `#c0c0c0` | `#707070` | 4.8:1 |

### 1.2 Replace Hardcoded Colors with CSS Variables

**Projects.tsx** — statusConfig:
```tsx
// BEFORE (hardcoded — invisible on light)
"in-production": { color: "#00ff88", bgClass: "..." }
"experimental":  { color: "#b388ff", bgClass: "..." }
"archived":      { color: "#8a8a9a", bgClass: "..." }

// AFTER (CSS variables — theme-adaptive)
"in-production": { color: "var(--color-display-green)", bgClass: "..." }
"experimental":  { color: "var(--color-accent-purple)", bgClass: "..." }
"archived":      { color: "var(--color-text-dim)", bgClass: "..." }
```

**Education.tsx** — podiumColors:
```tsx
// BEFORE (hardcoded — invisible on light)
{ border: "#f7d117", label: "P1 — FIRST", num: "#01" }
{ border: "#c0c0c0", label: "P2 — SECOND", num: "#02" }
{ border: "#e8a87c", label: "P3 — THIRD", num: "#03" }

// AFTER (CSS variables — theme-adaptive)
{ border: "var(--color-accent-gold)", label: "P1 — FIRST", num: "#01" }
{ border: "var(--color-mercedes-silver)", label: "P2 — SECOND", num: "#02" }
{ border: "var(--color-accent-orange)", label: "P3 — THIRD", num: "#03" }
```

**TelemetrySkills.tsx** — Gauge colors:
```tsx
// BEFORE (hardcoded)
color={avg >= 85 ? "#a855f7" : avg >= 70 ? "#22c55e" : "#eab308"}

// AFTER (CSS variables)
color={avg >= 85 ? "var(--color-accent-purple)" : avg >= 70 ? "var(--color-accent-green)" : "var(--color-accent-gold)"}
```

### 1.3 Expected Result

After Phase 1:
- All 26 tested combinations will pass WCAG AA
- No visual change in dark mode (variables only override in `.light` selector)
- Parchment palette darkens slightly but remains warm

---

## Phase 2: Mobile Layout Fixes

### 2.1 Hero Stats Strip (Hero.tsx:126)
Add `flex-wrap` and responsive gaps to prevent overflow on screens < 380px:
```tsx
className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 mb-10 glass shadow-card px-4 sm:px-6 py-3 mx-auto"
```

### 2.2 ScrollProgress (ScrollProgress.tsx:20)
Hide on mobile (< 640px):
```tsx
className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1 max-sm:hidden"
```

### 2.3 Project Card Min-Heights (Projects.tsx:46)
Use responsive minimum heights:
```tsx
const heights = [
  "min-h-[160px] sm:min-h-[220px]",
  "min-h-[200px] sm:min-h-[300px]",
  "min-h-[160px] sm:min-h-[240px]",
  "min-h-[180px] sm:min-h-[280px]"
];
```

### 2.4 Footer Text (Footer.tsx:18, 23)
Scale to 12px minimum:
```tsx
// Line 18: was text-[10px]
className="text-[12px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]"
// Line 23: was text-[9px]
className="text-[12px] font-mono text-[var(--text-dim)] cursor-pointer"
```

### 2.5 Contact Email (Contact.tsx:44)
Add `break-all`:
```tsx
className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition-colors break-all"
```

---

## Phase 3: Animation Timing Fixes

### 3.1 Reduced-Motion Gaps
Add `useReducedMotion()` check to 3 components:
- `HeroStat` — skip counter animation, show final value immediately
- `TelemetryBar` — skip fill animation, show 100% width immediately
- `Gauge` — skip sweep animation, show final stroke immediately

### 3.2 Section Reveal + Stagger Decoupling
In `SectionReveal.tsx`, add a small delay to `StaggerReveal` so children start animating AFTER the container opacity transition completes:
```tsx
// In StaggerReveal, add containerAnimation delay
transition={{ delay: 0.3 }} // children start 300ms after container
```

---

## Success Criteria

- [ ] All 26 color combinations pass WCAG AA (4.5:1 text, 3:1 non-text)
- [ ] No visual regression in dark mode
- [ ] Hero stats don't overflow on 375px screens
- [ ] ScrollProgress hidden on mobile
- [ ] Footer text readable (12px minimum)
- [ ] All 40 Playwright tests pass
- [ ] `prefers-reduced-motion` respected everywhere
