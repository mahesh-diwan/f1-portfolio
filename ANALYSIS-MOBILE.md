# Mobile / Responsive Layout Analysis

**Date:** Thu Jul 09 2026
**Project:** F1-Themed Portfolio (`/home/mahesh-diwan/SPECTRE/Projects/F1`)

---

## Table of Contents

1. [Breakpoint Usage Summary](#breakpoint-usage-summary)
2. [Per-File Analysis](#per-file-analysis)
3. [Identified Issues](#identified-issues)
4. [Overlap Risk Assessment](#overlap-risk-assessment)
5. [Recommended Fixes](#recommended-fixes)

---

## 1. Breakpoint Usage Summary

### Tailwind Responsive Prefixes Used

| Prefix | Breakpoint | Where Used |
|--------|-----------|------------|
| `sm:` | 640px | Hero.tsx, Experience.tsx, Education.tsx, TelemetrySkills.tsx, Contact.tsx, Navigation.tsx |
| `md:` | 768px | Hero.tsx, Experience.tsx, Projects.tsx, TelemetrySkills.tsx, Education.tsx, Contact.tsx, Navigation.tsx, Footer.tsx |
| `lg:` | 1024px | Hero.tsx, Experience.tsx, TelemetrySkills.tsx, Education.tsx |
| `xl:` | 1280px | **NOT USED** — no component handles the xl breakpoint |

### CSS Media Queries

| Location | Query | Purpose |
|----------|-------|---------|
| `globals.css:382` | `@media (prefers-reduced-motion: reduce)` | Accessibility — disables animations |
| `globals.css:48` | `@media (prefers-reduced-motion: reduce)` | LoadingScreen — disables light animations |
| `Navigation.tsx:55` | `hidden md:flex` (Tailwind) | Desktop nav shown at md+ |
| `Navigation.tsx:129` | `flex md:hidden` (Tailwind) | Mobile hamburger shown below md |

**No custom `@media (max-width)` or `@media (min-width)` queries exist in component files. All responsive behavior is Tailwind-only.**

---

## 2. Per-File Analysis

### 2.1 `src/components/layout/Navigation.tsx` (206 lines)

**Responsive prefixes:**
- Line 55: `hidden md:flex` — Desktop nav hidden below 768px
- Line 129: `flex md:hidden` — Mobile menu toggle hidden at 768px+
- Line 174: `md:hidden` — Mobile dropdown nav panel

**Layout:**
- Fixed header at top, z-50, glass-elevated
- Desktop: horizontal nav items (line 55-127)
- Mobile: hamburger menu + dropdown (lines 129-195)
- Full-screen backdrop overlay when mobile menu open (line 197-203)

**Potential issues:**
- **Line 40:** `px-5` (20px padding) is constant — adequate on mobile
- **Line 63:** Desktop nav items use `text-[11px]` — hidden on mobile, fine
- **Line 183:** Mobile nav items use `text-sm` (14px) — adequate
- **Line 199:** Backdrop overlay `bg-black/50` is fine

**Assessment: MOBILE-SAFE.** Clean hamburger-to-dropdown pattern with backdrop.

---

### 2.2 `src/components/sections/Hero.tsx` (193 lines)

**Responsive prefixes:**
- Line 101: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl` — Name heading scales across 4 breakpoints
- Line 126: `gap-6 sm:gap-8` — Telemetry strip gap

**Layout:**
- `min-h-screen flex flex-col justify-center` — fills viewport, centers vertically
- `max-w-4xl mx-auto px-4` — content constrained, padded
- Telemetry strip: `flex items-center justify-center gap-6 sm:gap-8` with `w-fit`

**Potential issues:**

1. **Line 126-139: Telemetry Stats Strip overflow on small screens.**
   - The strip is `flex items-center justify-center gap-6 sm:gap-8` with `w-fit`
   - It contains 4 stat groups each with a label + value + divider
   - On screens < 380px, the 4 stats with dividers may overflow horizontally
   - The parent div has `px-4` (line 82) but no `overflow-x-auto` or wrapping
   - **Risk: MEDIUM** — content could overflow on very small phones (< 360px)

2. **Line 77: StatusIndicator absolute positioned `top-6 right-6`**
   - Fixed position relative to section, not viewport
   - Overlaps nothing on mobile since content is centered
   - **Risk: NONE**

3. **Line 175: Scroll indicator `absolute bottom-8 left-1/2 -translate-x-1/2`**
   - Positioned at bottom of hero section
   - Could overlap content on very short viewports (e.g., landscape phones)
   - **Risk: LOW** — `min-h-screen` ensures enough space

4. **Line 29: Stats label `text-[12px]` and Line 32: Value `text-2xl`**
   - These are fixed sizes, not responsive
   - On very small screens, `text-2xl` (24px) is fine
   - **Risk: NONE**

**Assessment: MOSTLY SAFE.** Telemetry strip is the main concern on very narrow screens.

---

### 2.3 `src/components/sections/Experience.tsx` (114 lines)

**Responsive prefixes:**
- Line 25: `text-3xl sm:text-4xl` — Section heading
- Line 29: `grid grid-cols-1 lg:grid-cols-[280px_1fr]` — Two-column layout at lg+
- Line 78: `grid grid-cols-1 md:grid-cols-2` — Work history cards

**Layout:**
- `py-28 px-4` — generous vertical padding, standard horizontal
- `max-w-[1400px] mx-auto` — wide container
- Left sidebar: Driver Standings (280px wide at lg+)
- Right: Work history cards in 2-col grid at md+

**Potential issues:**

1. **Line 29: `grid-cols-[280px_1fr]` at lg**
   - Below 1024px, collapses to single column — GOOD
   - At lg+, left column is fixed 280px — adequate
   - **Risk: NONE** — proper responsive collapse

2. **Line 78: `grid-cols-1 md:grid-cols-2`**
   - Below 768px, single column — GOOD
   - At md+, 2 columns — GOOD
   - Cards have `h-full` and `flex flex-col` — will stretch evenly
   - **Risk: NONE**

3. **Lines 36-43: Stats grid `grid-cols-2` with fixed sizing**
   - `text-2xl` values, `text-[12px]` labels
   - In 280px sidebar, these fit well
   - On mobile (single column), full width — fine
   - **Risk: NONE**

4. **Line 31: `h-fit` on sidebar**
   - Prevents sidebar from stretching to match right column height
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.** Clean responsive grid collapse.

---

### 2.4 `src/components/sections/Projects.tsx` (172 lines)

**Responsive prefixes:**
- Line 159: `text-3xl sm:text-4xl` — Section heading
- Line 163: `columns-1 md:columns-2` — Masonry column layout

**Layout:**
- `py-20 px-4` — standard padding
- `max-w-[1400px] mx-auto` — wide container
- Uses CSS `columns` (not grid) for masonry layout
- Cards have `break-inside-avoid mb-4` to prevent splitting

**Potential issues:**

1. **Line 163: `columns-1 md:columns-2` — CSS columns layout**
   - CSS `columns` is not the same as CSS Grid — items flow top-to-bottom then left-to-right
   - At md+, items may reorder unexpectedly (column-first fill)
   - Cards have `min-h-[220px]` to `min-h-[300px]` (line 46) — fixed minimum heights
   - **Risk: LOW** — content reorders but doesn't break. Minimum heights may waste space on short content.

2. **Line 46: Fixed minimum card heights**
   ```tsx
   const heights = ["min-h-[220px]", "min-h-[300px]", "min-h-[240px]", "min-h-[280px]"];
   ```
   - These are responsive-agnostic — same on all screen sizes
   - On mobile (single column), these minimums are fine
   - On desktop (2 columns), they may create uneven spacing
   - **Risk: NONE** — min-height, not fixed height

3. **Line 130: Expanded architecture `<pre>` block**
   ```tsx
   <pre className="... overflow-x-auto whitespace-pre ...">
   ```
   - `overflow-x-auto` handles horizontal overflow — GOOD
   - **Risk: NONE** — properly handled

4. **Line 51: Card padding `p-5`**
   - Fixed 20px padding — adequate on mobile
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.** CSS columns work well for single-column mobile.

---

### 2.5 `src/components/sections/TelemetrySkills.tsx` (121 lines)

**Responsive prefixes:**
- Line 40: `text-3xl sm:text-4xl` — Section heading
- Line 61: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — 3-column grid

**Layout:**
- `py-24 px-4` — generous padding
- `max-w-[1400px] mx-auto` — wide container
- 3-col grid at lg+, 2-col at md+, 1-col on mobile
- Skill cards contain Gauge (SVG) + TelemetryBar list

**Potential issues:**

1. **Line 61: 3-column grid at lg (1024px+)**
   - At lg+, each card gets ~440px — adequate for Gauge + bars
   - At md (768-1023px), 2 columns — ~680px each — fine
   - Below md, single column — full width — fine
   - **Risk: NONE** — proper responsive cascade

2. **Line 69: Gauge `size={56}` — fixed SVG size**
   - 56px SVG is small but adequate on all screen sizes
   - The Gauge component uses absolute positioning for the value label (line 102 of Gauge.tsx)
   - **Risk: NONE** — small and contained

3. **Line 72: TelemetryBar `size="xs"` — 2px height bars**
   - Very thin bars — visible but subtle
   - On mobile, touch targets for the parent card are adequate (p-5 padding)
   - **Risk: NONE**

4. **Line 108: Additional skills tags `flex flex-wrap`**
   - Wraps naturally on all screen sizes
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.** Clean 3→2→1 column cascade.

---

### 2.6 `src/components/sections/Education.tsx` (68 lines)

**Responsive prefixes:**
- Line 24: `text-3xl sm:text-4xl` — Section heading
- Line 29: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — 3-column grid

**Layout:**
- `py-28 px-4` — generous padding
- `max-w-[1400px] mx-auto` — wide container
- Cards with colored top border (podium style)

**Potential issues:**

1. **Line 29: Same 3→2→1 cascade as TelemetrySkills**
   - Proper responsive behavior
   - **Risk: NONE**

2. **Line 36: `borderTop: \`3px solid ${podium.border}\``**
   - Inline style — works fine
   - **Risk: NONE**

3. **Lines 44-46: Education text `text-[13px]`, `text-[12px]`, `text-[12px]`**
   - Small but readable font sizes
   - Adequate on mobile with proper line-height
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.** Simple grid cascade.

---

### 2.7 `src/components/sections/Contact.tsx` (106 lines)

**Responsive prefixes:**
- Line 35: `text-3xl sm:text-4xl` — Section heading
- Line 51: `grid grid-cols-1 sm:grid-cols-2` — Channel cards

**Layout:**
- `py-20 px-4` — standard padding
- `max-w-[1400px] mx-auto` — wide container
- Direct Line card (full width)
- Channel grid: 2-col at sm+, 1-col below

**Potential issues:**

1. **Line 42-47: Direct Line email link**
   ```tsx
   <a href={`mailto:${portfolio.email}`} className="text-sm ... font-mono ...">
     {portfolio.email}
   </a>
   ```
   - Email text is `text-sm` (14px) — may overflow on very long emails on narrow screens
   - No `truncate` or `break-all` class
   - **Risk: LOW** — email is typically short enough, but very long addresses could wrap awkwardly

2. **Line 56: Channel card `p-5` with `relative overflow-hidden`**
   - `overflow-hidden` clips the radio burst animation — intentional
   - **Risk: NONE**

3. **Lines 66-97: Radio burst animation uses `absolute inset-0`**
   - Absolutely positioned within the card — contained
   - **Risk: NONE**

**Assessment: MOSTLY SAFE.** Email text overflow is the only minor concern.

---

### 2.8 `src/components/layout/Footer.tsx` (31 lines)

**Responsive prefixes:**
- Line 13: `flex-col sm:flex-row` — Stacks vertically on mobile, horizontal at sm+

**Layout:**
- `py-10 px-4` — standard padding
- `max-w-7xl mx-auto` — container
- Gradient bar at top (3px, full width)
- Content: name/role + copyright

**Potential issues:**

1. **Line 18: Footer name `text-[10px]`**
   - Very small text — but it's footer metadata, acceptable
   - **Risk: NONE**

2. **Line 23: Copyright `text-[9px]`**
   - Extremely small — accessibility concern (WCAG requires minimum 12px for readability)
   - But this is decorative/attribution text, not critical content
   - **Risk: LOW** — readability, not layout

**Assessment: MOBILE-SAFE.** Clean flex-col to flex-row collapse.

---

### 2.9 `src/components/layout/ScrollProgress.tsx` (41 lines)

**Responsive prefixes:** NONE

**Layout:**
- `fixed bottom-4 right-4 z-40` — Fixed position, bottom-right corner
- Vertical bar + percentage text

**Potential issues:**

1. **Line 20: `fixed bottom-4 right-4`**
   - Overlaps page content on mobile — the progress indicator sits on top of content
   - No responsive adjustment to hide or reposition on small screens
   - On mobile, `right-4` (16px) is fine, but the indicator may overlap text in Contact section
   - **Risk: MEDIUM** — may overlap content on mobile, especially in bottom sections

2. **Line 30: `h-20` progress bar**
   - Fixed 80px height — adequate on all screens
   - **Risk: NONE**

**Assessment: MINOR ISSUE.** Fixed position indicator may overlap content on mobile.

---

### 2.10 `src/app/globals.css` (1384 lines)

**Responsive utilities:**
- `@utility container-page` — max-width 1280px (line 394)
- `@utility container-wide` — max-width 1440px (line 400)
- `@utility container-narrow` — max-width 960px (line 406)
- `@media (prefers-reduced-motion: reduce)` — line 382
- No `@media (max-width)` or `@media (min-width)` queries

**Potential issues:**

1. **Lines 394-410: Container utilities have fixed max-widths but no mobile padding**
   - `padding-inline: var(--spacing-6)` (24px) is applied at all sizes
   - On very small screens (< 360px), 24px padding on each side = 48px consumed, leaving ~312px for content
   - **Risk: LOW** — adequate for most content

2. **Lines 340-369: `body::before` — Fixed carbon-fiber texture**
   - `position: fixed; inset: 0;` — covers viewport
   - `pointer-events: none` — no interaction impact
   - Background pattern sizes: `8px 8px`, `64px 64px` — fine on all screens
   - **Risk: NONE**

3. **Lines 1336-1349: `.section-carbon::before` — Fixed texture**
   - Same as body::before — `position: absolute; inset: 0;`
   - Covers section area, pointer-events none
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.** No responsive-specific issues in CSS.

---

### 2.11 `src/app/layout.tsx` (106 lines)

**Responsive prefixes:** NONE (layout file)

**Layout:**
- `min-h-screen` on body
- `flex-1` on main content
- Skip-to-content link with `sr-only` / `focus:not-sr-only`

**Potential issues:**

1. **Line 88: `min-h-screen bg-[var(--bg-base)]`**
   - Standard — no issues
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.**

---

### 2.12 `src/app/page.tsx` (21 lines)

**Layout:**
- `min-h-screen flex flex-col` — Full height flex column
- Navigation (fixed header)
- Main content (flex-1)
- Footer

**Potential issues:**

1. **Line 10: `min-h-screen flex flex-col`**
   - Standard page layout — no issues
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.**

---

### 2.13 `src/components/ui/primitives/Gauge.tsx` (116 lines)

**Responsive prefixes:** NONE

**Layout:**
- SVG gauge with fixed `size` prop (default 80, used as 56 in TelemetrySkills)
- Absolute-positioned value label inside SVG container

**Potential issues:**

1. **Line 102: `className="absolute flex flex-col items-center justify-center"`**
   - Absolutely positioned value overlay on the SVG
   - Uses `style={{ width: size, height: size }}` — matches SVG dimensions
   - No responsive scaling — same size on all screens
   - **Risk: NONE** — contained within parent

**Assessment: MOBILE-SAFE.**

---

### 2.14 `src/components/ui/primitives/TelemetryBar.tsx` (103 lines)

**Responsive prefixes:** NONE

**Layout:**
- Flex column with label + bar
- Bar has 4 sizes: xs (2px), sm (4px), md (6px), lg (8px)

**Potential issues:** NONE

**Assessment: MOBILE-SAFE.**

---

### 2.15 `src/components/layout/CommandPalette.tsx` (139 lines)

**Responsive prefixes:** NONE

**Layout:**
- Fixed overlay with `pt-[15vh]`
- `max-w-lg mx-4` — constrained width with margin
- `max-h-60 overflow-y-auto` — scrollable list

**Potential issues:**

1. **Line 78: `pt-[15vh]`**
   - On short viewports (landscape phones), 15vh may push palette too low
   - **Risk: LOW** — still accessible

2. **Line 84: `max-w-lg mx-4`**
   - On mobile, `mx-4` (16px) margins ensure content doesn't touch edges
   - **Risk: NONE**

**Assessment: MOBILE-SAFE.**

---

## 3. Identified Issues

### ISSUE 1: Hero Telemetry Strip Overflow on Narrow Screens

**Severity:** MEDIUM
**Files:** `src/components/sections/Hero.tsx`
**Lines:** 126-139

```tsx
// Line 126
<motion.div
  className="flex items-center justify-center gap-6 sm:gap-8 mb-10 glass shadow-card px-6 py-3 mx-auto w-fit"
>
  {stats.map((stat, i) => (
    <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
      <HeroStat label={stat.label} value={stat.value} accent={stat.accent} />
      {i < stats.length - 1 && (
        <div className="w-px h-8 bg-[var(--border-default)]" />
      )}
    </div>
  ))}
</motion.div>
```

**Problem:** The stats strip contains 4 stat groups (each ~80-100px wide) with gaps and dividers. On screens < 380px, the total width exceeds the viewport. The parent has `w-fit` and no `overflow-x-auto` or wrapping.

**Impact:** Horizontal overflow or content clipping on very small phones (iPhone SE, etc.)

**Fix:**
```tsx
// Add overflow handling or make stats wrap
className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-10 glass shadow-card px-4 sm:px-6 py-3 mx-auto max-w-full overflow-x-auto"
```
Or make stats wrap:
```tsx
className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-10 glass shadow-card px-4 sm:px-6 py-3 mx-auto"
```

---

### ISSUE 2: ScrollProgress Indicator Overlaps Content on Mobile

**Severity:** LOW-MEDIUM
**Files:** `src/components/layout/ScrollProgress.tsx`
**Lines:** 19-40

```tsx
// Line 20
<div
  className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1"
>
```

**Problem:** The scroll progress indicator is fixed at bottom-right with z-40. On mobile, it overlaps the Contact section's channel cards and the Footer content. No responsive repositioning or hiding.

**Impact:** Visual overlap with interactive elements in the bottom portion of the page.

**Fix:**
```tsx
// Hide on very small screens, or reposition
className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1 max-sm:hidden"
// Or reduce size on mobile
className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1 sm:bottom-4 sm:right-4 bottom-2 right-2"
```

---

### ISSUE 3: Footer Text Readability on Mobile

**Severity:** LOW
**Files:** `src/components/layout/Footer.tsx`
**Lines:** 18, 23

```tsx
// Line 18
<span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]">
  {portfolio.name} — {portfolio.role}
</span>
// Line 23
<p className="text-[9px] font-mono text-[var(--text-dim)] cursor-pointer">
  &copy; {year} ALL RIGHTS RESERVED
</p>
```

**Problem:** `text-[9px]` is below WCAG recommended minimum of 12px for body text. While this is decorative/attribution text, it may be unreadable on mobile devices with standard DPI.

**Impact:** Accessibility concern — text may be too small to read.

**Fix:**
```tsx
// Increase to at least 10px, or use responsive sizing
className="text-[10px] sm:text-[9px] font-mono text-[var(--text-dim)]"
```

---

### ISSUE 4: Contact Email Text May Overflow

**Severity:** LOW
**Files:** `src/components/sections/Contact.tsx`
**Lines:** 44-46

```tsx
<a href={`mailto:${portfolio.email}`}
   className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition-colors">
  {portfolio.email}
</a>
```

**Problem:** Long email addresses may overflow or wrap awkwardly on narrow screens. No `truncate`, `break-all`, or `text-ellipsis` class.

**Impact:** Minor visual issue — email wrapping may look unpolished.

**Fix:**
```tsx
className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition-colors break-all"
```

---

### ISSUE 5: Navigation Mobile Menu Backdrop Z-Index Layering

**Severity:** LOW
**Files:** `src/components/layout/Navigation.tsx`
**Lines:** 174, 197-203

```tsx
// Line 174 - Mobile nav dropdown
<div className="md:hidden border-b border-[var(--border-default)] animate-fade-in glass-overlay">
// Line 197-203 - Backdrop
<div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
```

**Problem:** The mobile nav dropdown (line 174) is inside the header (z-50), but the backdrop (line 197) is z-40. This means the backdrop sits BEHIND the header but the nav dropdown is IN the header. If the dropdown content is long enough to scroll, the backdrop may not cover the header properly.

**Impact:** Minimal — the header is only 56px tall (`h-14`), and the backdrop covers everything below it.

**Assessment:** Technically correct but worth noting for future maintenance.

---

### ISSUE 6: Project Cards Minimum Heights Waste Space on Mobile

**Severity:** LOW
**Files:** `src/components/sections/Projects.tsx`
**Lines:** 46-47

```tsx
const heights = ["min-h-[220px]", "min-h-[300px]", "min-h-[240px]", "min-h-[280px]"];
const cardHeight = heights[index % 4];
```

**Problem:** Fixed minimum heights (220-300px) are applied regardless of screen size. On mobile in single-column layout, these minimums may create excessive whitespace for cards with short content.

**Impact:** Visual — cards may appear taller than necessary on mobile.

**Fix:**
```tsx
// Use responsive minimum heights
const heights = [
  "min-h-[180px] sm:min-h-[220px]",
  "min-h-[220px] sm:min-h-[300px]",
  "min-h-[180px] sm:min-h-[240px]",
  "min-h-[200px] sm:min-h-[280px]"
];
```

---

## 4. Overlap Risk Assessment

### Critical Overlaps: NONE

### Minor Overlaps:

| Component | Issue | Risk |
|-----------|-------|------|
| ScrollProgress + Contact/Footer | Fixed indicator overlaps bottom content on mobile | LOW-MEDIUM |
| Hero scroll indicator + content | Absolute positioned at bottom-8 may overlap on very short viewports | LOW |
| Navigation backdrop + header | Z-index layering is technically correct but fragile | LOW |

### No Overlap Issues:

| Component | Why Safe |
|-----------|----------|
| Hero StatusIndicator (top-6 right-6) | Content is centered, no overlap with absolute indicator |
| Contact radio burst animation | Contained within card via `absolute inset-0` + `overflow-hidden` |
| Gauge absolute value label | Contained within fixed-size SVG container |
| Command palette backdrop | Properly covers full viewport with z-100 |

---

## 5. Recommended Fixes

### Priority 1 (Should Fix)

1. **Hero Telemetry Strip** (Hero.tsx:126) — Add `max-w-full overflow-x-auto` or `flex-wrap` to prevent overflow on screens < 380px.

2. **ScrollProgress Mobile** (ScrollProgress.tsx:20) — Consider hiding on screens < 640px or reducing size on mobile.

### Priority 2 (Nice to Have)

3. **Project Card Min Heights** (Projects.tsx:46) — Use responsive minimum heights to reduce wasted space on mobile.

4. **Contact Email Overflow** (Contact.tsx:44) — Add `break-all` to prevent awkward email wrapping.

5. **Footer Text Size** (Footer.tsx:23) — Increase copyright text from 9px to at least 10px for readability.

### Priority 3 (Future Enhancement)

6. **Add xl breakpoint handling** — No component currently uses `xl:` prefix. If the layout needs adjustments for ultra-wide screens (1280px+), consider adding xl variants.

7. **Touch target sizes** — Some interactive elements (nav items at 11px text, DRS indicators) may be below the 44x44px WCAG touch target minimum on mobile. Consider increasing padding on mobile.

---

## Appendix: File-by-File Responsive Prefix Inventory

### Hero.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 101 | `text-5xl` | base |
| 101 | `sm:text-6xl` | 640px+ |
| 101 | `md:text-7xl` | 768px+ |
| 101 | `lg:text-8xl` | 1024px+ |
| 126 | `gap-6 sm:gap-8` | 640px+ |

### Experience.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 25 | `text-3xl sm:text-4xl` | 640px+ |
| 29 | `grid-cols-1 lg:grid-cols-[280px_1fr]` | 1024px+ |
| 78 | `grid-cols-1 md:grid-cols-2` | 768px+ |

### Projects.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 159 | `text-3xl sm:text-4xl` | 640px+ |
| 163 | `columns-1 md:columns-2` | 768px+ |

### TelemetrySkills.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 40 | `text-3xl sm:text-4xl` | 640px+ |
| 61 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 768px+ / 1024px+ |

### Education.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 24 | `text-3xl sm:text-4xl` | 640px+ |
| 29 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` | 768px+ / 1024px+ |

### Contact.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 35 | `text-3xl sm:text-4xl` | 640px+ |
| 51 | `grid-cols-1 sm:grid-cols-2` | 640px+ |

### Navigation.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 55 | `hidden md:flex` | 768px+ |
| 129 | `flex md:hidden` | < 768px |
| 174 | `md:hidden` | < 768px |
| 199 | `md:hidden` | < 768px |

### Footer.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| 13 | `flex-col sm:flex-row` | 640px+ |

### ScrollProgress.tsx
| Line | Class | Breakpoint |
|------|-------|------------|
| — | NONE | No responsive handling |

### globals.css
| Line | Query | Purpose |
|------|-------|---------|
| 382 | `@media (prefers-reduced-motion: reduce)` | Accessibility |
