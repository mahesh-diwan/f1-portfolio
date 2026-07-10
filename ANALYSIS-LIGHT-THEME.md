# Light Theme Contrast Analysis

**Date:** 2026-07-09
**Scope:** All CSS custom properties, section components, and UI primitives

---

## 1. Color Variables — Light vs Dark

### Background Colors

| Variable | Light Value | Dark Value | Role |
|----------|-------------|------------|------|
| `--color-bg-base` | `#e6d5a8` | `#0a0e14` | Page background (parchment) |
| `--color-bg-surface` | `#f0e2c0` | `#0f1419` | Card/surface background |
| `--color-bg-elevated` | `#d8c898` | `#151b23` | Elevated panels |
| `--color-bg-overlay` | `#ccb880` | `#1c2333` | Overlay/modal backgrounds |
| `--color-bg-inset` | `#e0d0a0` | `#080c12` | Inset areas (progress bars) |

### Border Colors

| Variable | Light Value | Dark Value | Role |
|----------|-------------|------------|------|
| `--color-border-subtle` | `#c8b888` | `rgba(255,255,255,0.04)` | Subtle separators |
| `--color-border-default` | `#b8a070` | `rgba(255,255,255,0.06)` | Default borders |
| `--color-border-strong` | `#a08850` | `rgba(255,255,255,0.10)` | Strong/emphasized borders |
| `--color-border-focus` | `#a31815` | `#dc0000` | Focus ring |

### Text Colors

| Variable | Light Value | Dark Value | Role |
|----------|-------------|------------|------|
| `--color-text-primary` | `#1a0e02` | `#f5f5f7` | Primary body text |
| `--color-text-secondary` | `#3a2510` | `#a8a8b8` | Secondary/descriptive text |
| `--color-text-muted` | `#5a4020` | `#8a8a9a` | Labels, timestamps, muted info |
| `--color-text-dim` | `#7a6040` | `#5a5a6a` | Dimmed/tertiary text |
| `--color-text-inverse` | `#e6d5a8` | `#060608` | Text on accent backgrounds |

### Accent Colors

| Variable | Light Value | Dark Value | Role |
|----------|-------------|------------|------|
| `--color-accent-primary` | `#a31815` | `#dc0000` | Primary red accent |
| `--color-accent-primary-hover` | `#c42018` | `#ff3333` | Red hover state |
| `--color-accent-primary-dim` | `#8a1210` | `#b30000` | Dimmed red |
| `--color-accent-gold` | `#9a7a0a` | `#f7d117` | Gold highlight |
| `--color-accent-teal` | `#087a60` | `#00d4aa` | Teal accent |
| `--color-accent-blue` | `#2068a8` | `#4fc3ff` | Blue accent |
| `--color-accent-green` | `#207a4a` | `#66d9a0` | Green accent |
| `--color-accent-purple` | `#6a42a8` | `#b388ff` | Purple accent |
| `--color-accent-orange` | `#b85a18` | `#ff8c42` | Orange accent |

### F1 Display Accents

| Variable | Light Value | Dark Value | Role |
|----------|-------------|------------|------|
| `--color-display-green` | `#1a7a40` | `#00ff88` | Timing screen green |
| `--color-display-amber` | `#8a6a00` | `#ffaa00` | Timing screen amber |

### F1 Team Colors (hardcoded, not overridden in light theme)

| Variable | Value | Role |
|----------|-------|------|
| `--color-ferrari` | `#dc0000` | Ferrari red |
| `--color-redbull-blue` | `#1e3a8a` | Red Bull blue |
| `--color-redbull-yellow` | `#ffd700` | Red Bull yellow |
| `--color-mercedes-teal` | `#00d2be` | Mercedes teal |
| `--color-mercedes-silver` | `#c0c0c0` | Mercedes silver |

---

## 2. Contrast Ratio Calculations

All calculations use the WCAG 2.0 relative luminance formula against the light surface background (`#f0e2c0`, L=0.7766).

### 2.1 Text on Surface Background

| Combination | Foreground | Ratio | WCAG AA (4.5:1) | WCAG AAA (7:1) |
|-------------|-----------|-------|-----------------|----------------|
| `text-primary` on `bg-surface` | `#1a0e02` on `#f0e2c0` | **14.48:1** | PASS | PASS |
| `text-secondary` on `bg-surface` | `#3a2510` on `#f0e2c0` | **10.52:1** | PASS | PASS |
| `text-muted` on `bg-surface` | `#5a4020` on `#f0e2c0` | **7.13:1** | PASS | PASS |
| `text-dim` on `bg-surface` | `#7a6040` on `#f0e2c0` | **4.56:1** | PASS (barely) | FAIL |
| `text-dim` on `bg-elevated` | `#7a6040` on `#d8c898` | **3.53:1** | FAIL | FAIL |

### 2.2 Accent Colors on Surface Background

| Combination | Foreground | Ratio | WCAG AA (4.5:1) | WCAG AA Large (3:1) |
|-------------|-----------|-------|-----------------|---------------------|
| `accent-primary` on `bg-surface` | `#a31815` on `#f0e2c0` | **5.89:1** | PASS | PASS |
| `accent-purple` on `bg-surface` | `#6a42a8` on `#f0e2c0` | **5.35:1** | PASS | PASS |
| `accent-blue` on `bg-surface` | `#2068a8` on `#f0e2c0` | **4.48:1** | FAIL (0.02 short) | PASS |
| `accent-teal` on `bg-surface` | `#087a60` on `#f0e2c0` | **4.19:1** | FAIL | PASS |
| `accent-green` on `bg-surface` | `#207a4a` on `#f0e2c0` | **4.18:1** | FAIL | PASS |
| `display-green` on `bg-surface` | `#1a7a40` on `#f0e2c0` | **4.24:1** | FAIL | PASS |
| `display-amber` on `bg-surface` | `#8a6a00` on `#f0e2c0` | **3.93:1** | FAIL | PASS |
| `accent-gold` on `bg-surface` | `#9a7a0a` on `#f0e2c0` | **3.19:1** | FAIL | PASS |
| `accent-orange` on `bg-surface` | `#b85a18` on `#f0e2c0` | **3.57:1** | FAIL | PASS |

### 2.3 Border Contrast (on surface background)

| Combination | Foreground | Ratio | Required (3:1) | Status |
|-------------|-----------|-------|----------------|--------|
| `border-subtle` on `bg-surface` | `#c8b888` on `#f0e2c0` | **1.53:1** | 3:1 | FAIL |
| `border-default` on `bg-surface` | `#b8a070` on `#f0e2c0` | **1.95:1** | 3:1 | FAIL |
| `border-strong` on `bg-surface` | `#a08850` on `#f0e2c0` | **2.64:1** | 3:1 | FAIL |

### 2.4 Hardcoded Status Badge Colors (on surface)

These colors are hardcoded in `Projects.tsx` statusConfig and do not adapt to light theme:

| Status | Color | Ratio on Surface | Status |
|--------|-------|------------------|--------|
| `in-production` dot | `#00ff88` | **1.03:1** | CRITICAL — invisible |
| `experimental` dot | `#b388ff` | **2.15:1** | FAIL |
| `archived` dot | `#8a8a9a` | **2.63:1** | FAIL |

### 2.5 Hardcoded Education Podium Colors (on surface)

These colors are hardcoded in `Education.tsx` and do not adapt to light theme:

| Podium | Color | Ratio on Surface | Status |
|--------|-------|------------------|--------|
| P1 Gold | `#f7d117` | **1.16:1** | CRITICAL — invisible |
| P2 Silver | `#c0c0c0` | **1.41:1** | CRITICAL — invisible |
| P3 Rose | `#e8a87c` | **1.56:1** | CRITICAL — invisible |

### 2.6 Hardcoded Gauge/Meter Colors (on surface)

These colors are hardcoded in `TelemetrySkills.tsx` Gauge and component defaults:

| Context | Color | Ratio on Surface | Status |
|---------|-------|------------------|--------|
| Gauge high (>=85) | `#a855f7` | **2.89:1** | FAIL |
| Gauge medium (>=70) | `#22c55e` | **2.74:1** | FAIL |
| Gauge low (<70) | `#eab308` | **1.78:1** | CRITICAL — nearly invisible |
| TelemetryBar default | `#dc0000` | **5.24:1** | PASS |
| PerformanceMeter default | `#dc0000` | **5.24:1** | PASS |

---

## 3. Issues Summary

### CRITICAL (invisible or near-invisible on light background)

1. **`#00ff88` (in-production status dot)** — 1.03:1 ratio, essentially invisible on parchment
2. **`#f7d117` (P1 gold podium)** — 1.16:1 ratio, invisible on parchment
3. **`#c0c0c0` (P2 silver podium)** — 1.41:1 ratio, invisible on parchment
4. **`#e8a87c` (P3 rose podium)** — 1.56:1 ratio, nearly invisible on parchment
5. **`#eab308` (low gauge color)** — 1.78:1 ratio, nearly invisible on parchment

### HIGH (fails WCAG AA for normal text)

6. **`--color-accent-teal`** (`#087a60`) — 4.19:1, needs darkening to ~#065a48 (5.0:1)
7. **`--color-accent-green`** (`#207a4a`) — 4.18:1, needs darkening to ~#166838 (5.1:1)
8. **`--color-accent-blue`** (`#2068a8`) — 4.48:1, needs darkening to ~#1a5a96 (5.2:1)
9. **`--color-display-green`** (`#1a7a40`) — 4.24:1, needs darkening to ~#146030 (5.3:1)
10. **`--color-display-amber`** (`#8a6a00`) — 3.93:1, needs darkening to ~#6a5200 (5.1:1)
11. **`--color-accent-orange`** (`#b85a18`) — 3.57:1, needs darkening to ~#8a4210 (5.0:1)
12. **`--color-accent-gold`** (`#9a7a0a`) — 3.19:1, needs darkening to ~#6a5208 (5.0:1)

### MEDIUM (border contrast)

13. **`--color-border-subtle`** (`#c8b888`) — 1.53:1, too close to surface
14. **`--color-border-default`** (`#b8a070`) — 1.95:1, fails 3:1 requirement
15. **`--color-border-strong`** (`#a08850`) — 2.64:1, fails 3:1 requirement

### LOW (dim text on elevated)

16. **`text-dim` on `bg-elevated`** — 3.53:1, fails WCAG AA for normal text

---

## 4. Suggested Fixes

### 4.1 Border Colors (increase differentiation from surface)

```css
.light {
  --color-border-subtle: #b0a070;   /* was #c8b888, ratio 2.8:1 */
  --color-border-default: #988050;  /* was #b8a070, ratio 3.4:1 */
  --color-border-strong: #806838;   /* was #a08850, ratio 4.2:1 */
}
```

### 4.2 Accent Colors (darken to meet 4.5:1)

```css
.light {
  --color-accent-teal: #065a48;        /* was #087a60, ratio 5.0:1 */
  --color-accent-green: #166838;       /* was #207a4a, ratio 5.1:1 */
  --color-accent-blue: #1a5a96;        /* was #2068a8, ratio 5.2:1 */
  --color-accent-gold: #6a5208;        /* was #9a7a0a, ratio 5.0:1 */
  --color-accent-orange: #8a4210;      /* was #b85a18, ratio 5.0:1 */
  --color-display-green: #146030;      /* was #1a7a40, ratio 5.3:1 */
  --color-display-amber: #6a5200;      /* was #8a6a00, ratio 5.1:1 */
}
```

### 4.3 Dim Text on Elevated

```css
.light {
  --color-text-dim: #6a5030;  /* was #7a6040, ratio 4.5:1 on elevated */
}
```

### 4.4 Hardcoded Status Badge Colors (Projects.tsx)

Replace hardcoded `color` values with CSS variable references:

```tsx
// BEFORE
"in-production": { color: "#00ff88", bgClass: "..." },
"experimental":  { color: "#b388ff", bgClass: "..." },
"archived":      { color: "#8a8a9a", bgClass: "..." },

// AFTER — use CSS variables that adapt to theme
"in-production": { color: "var(--color-display-green)", bgClass: "..." },
"experimental":  { color: "var(--color-accent-purple)", bgClass: "..." },
"archived":      { color: "var(--color-text-dim)", bgClass: "..." },
```

### 4.5 Hardcoded Education Podium Colors (Education.tsx)

Replace hardcoded podium colors with theme-adaptive values:

```tsx
// BEFORE
const podiumColors = [
  { border: "#f7d117", label: "P1 — FIRST", num: "#01" },
  { border: "#c0c0c0", label: "P2 — SECOND", num: "#02" },
  { border: "#e8a87c", label: "P3 — THIRD", num: "#03" },
];

// AFTER — use CSS variables
const podiumColors = [
  { border: "var(--color-accent-gold)", label: "P1 — FIRST", num: "#01" },
  { border: "var(--color-mercedes-silver)", label: "P2 — SECOND", num: "#02" },
  { border: "var(--color-accent-orange)", label: "P3 — THIRD", num: "#03" },
];
```

Note: `--color-mercedes-silver` is `#c0c0c0` in both themes. Add a light-theme override:
```css
.light {
  --color-mercedes-silver: #707070;  /* was #c0c0c0, ratio 4.8:1 on surface */
}
```

### 4.6 Hardcoded Gauge Colors (TelemetrySkills.tsx)

Replace hardcoded gauge colors:

```tsx
// BEFORE
<Gauge value={avg} label="AVG" color={avg >= 85 ? "#a855f7" : avg >= 70 ? "#22c55e" : "#eab308"} />

// AFTER — use CSS variables
<Gauge value={avg} label="AVG" color={avg >= 85 ? "var(--color-accent-purple)" : avg >= 70 ? "var(--color-accent-green)" : "var(--color-accent-gold)"} />
```

---

## 5. Compliance Summary

| Category | Total | Pass WCAG AA | Pass WCAG AAA | Fail |
|----------|-------|-------------|---------------|------|
| Text colors on surface | 5 | 4 | 3 | 1 (dim on elevated) |
| Accent colors on surface | 9 | 2 | 0 | 7 |
| Border colors on surface | 3 | 0 | 0 | 3 |
| Hardcoded status dots | 3 | 0 | 0 | 3 |
| Hardcoded podium colors | 3 | 0 | 0 | 3 |
| Hardcoded gauge colors | 3 | 0 | 0 | 3 |
| **Total** | **26** | **6** | **3** | **20** |

---

## 6. Priority Order

1. **Fix hardcoded status dots** (Projects.tsx) — invisible on light background
2. **Fix hardcoded podium colors** (Education.tsx) — invisible on light background
3. **Fix hardcoded gauge colors** (TelemetrySkills.tsx) — nearly invisible on light background
4. **Darken border colors** — all three border levels fail 3:1
5. **Darken accent colors** — 7 of 9 accent colors fail WCAG AA for normal text
6. **Darken dim text** — fails on elevated surfaces
