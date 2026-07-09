# F1 Portfolio Full Rebuild — Design Spec

**Date:** 2026-07-08
**Status:** Approved
**Approach:** Phased Rebuild (Design System → Section Rebuilds → Polish)

## Goal

Full rebuild of the F1-themed developer portfolio to elevate it from prototype to production-quality. Deeper F1 immersion, visual polish (glass morphism, refined typography), new F1 metaphors, and zero decoration.

## Constraints

- All content from `portfolioConfig.ts` — no hardcoded data
- WCAG AA accessibility, Lighthouse 95+
- Responsive: 320px → ultra-wide
- Dark + light theme support
- `prefers-reduced-motion` respected
- All animations under 300ms, only `transform`/`opacity`
- Playwright tests after each phase

## Design System Foundation

### Color Palette

**Dark Mode (default):**
| Token | Old Value | New Value | Purpose |
|-------|-----------|-----------|---------|
| `--bg-base` | `#060608` | `#0a0e14` | Deep cockpit background (blue-grey shift) |
| `--bg-surface` | `#0c0c12` | `#0f1419` | Card surfaces |
| `--bg-elevated` | `#12121a` | `#151b23` | Elevated panels |
| `--bg-overlay` | `#1a1a24` | `#1c2333` | Overlays |
| `--border-subtle` | `#1e1e28` | `rgba(255,255,255,0.04)` | Subtle borders |
| `--border-default` | `#2a2a38` | `rgba(255,255,255,0.06)` | Default borders |
| `--border-strong` | `#3a3a48` | `rgba(255,255,255,0.10)` | Strong borders |

**Accent Colors (new additions):**
| Token | Value | Purpose |
|-------|-------|---------|
| `--accent-primary` | `#dc0000` | Ferrari red (unchanged) |
| `--accent-primary-hover` | `#ff3333` | Bright red for hover/active |
| `--display-green` | `#00ff88` | F1 timing screen green (positive telemetry) |
| `--display-amber` | `#ffaa00` | Warning/caution amber |
| `--accent-teal` | `#00d4aa` | Teal (unchanged) |
| `--accent-blue` | `#4fc3ff` | Blue (unchanged) |
| `--accent-purple` | `#b388ff` | Purple (unchanged) |
| `--accent-gold` | `#f7d117` | Gold (unchanged) |

**Light Mode:**
- Shift from parchment (`#f0e4c8`) to cleaner warm white with blue-grey undertones
- `--bg-base`: `#f5f3ef` (warm white)
- `--bg-surface`: `#eeeae4` (slightly darker warm)
- `--bg-elevated`: `#e8e3dc` (elevated warm)
- `--text-primary`: `#1a1a2e` (deep blue-grey)
- `--text-secondary`: `#4a4a5e`
- `--text-muted`: `#7a7a8e`
- `--border-subtle`: `rgba(0,0,0,0.04)`
- `--border-default`: `rgba(0,0,0,0.08)`
- `--border-strong`: `rgba(0,0,0,0.12)`
- `--accent-primary`: `#c41a1a` (slightly desaturated red for light bg contrast)
- Body gradient: subtle warm radial overlays (keep existing pattern, adjust colors)

### Typography

- **Headings:** Space Grotesk (keep)
- **Body:** Inter Variable with `font-feature-settings: "tnum"` for tabular numbers
- **Mono:** IBM Plex Mono (keep)
- **Labels:** `letter-spacing: 0.15em` at small sizes (tighter than current `0.2em`)
- **Display numbers:** `font-weight: 700` with tabular nums

### Glass Morphism

Every card/panel uses:
```css
background: rgba(255, 255, 255, 0.02);
border: 1px solid rgba(255, 255, 255, 0.06);
backdrop-filter: blur(8px);
```

Depth hierarchy:
1. `bg-surface` — base level
2. `bg-elevated` — hover/active states
3. `bg-overlay` — modals, overlays

### Grid Background

Every section gets a subtle parallax grid pattern:
```css
background-image: repeating-linear-gradient(
  0deg, transparent, transparent 40px,
  rgba(255, 255, 255, 0.03) 40px, rgba(255, 255, 255, 0.03) 41px
), repeating-linear-gradient(
  90deg, transparent, transparent 40px,
  rgba(255, 255, 255, 0.03) 40px, rgba(255, 255, 255, 0.03) 41px
);
```

### Animation Primitives

- **Scan line:** Thin red line that sweeps across text periodically (CSS keyframe)
- **Telemetry pulse:** Periodic glow on live data elements (2s infinite)
- **Scroll reveal:** `IntersectionObserver` + Framer Motion spring physics
- **Number counters:** 0→value with cubic easing (1200ms)
- **Hover:** Subtle scale (1.02) + glow shadow

### Layout

- Max-width: `max-w-[1400px]` (was `max-w-7xl`)
- Section padding: `py-24 px-4` desktop, `py-16 px-4` mobile
- Consistent 8px grid system

## Section Designs

### Hero — "Race Start"

**Layout:** Full viewport height (`100vh`)

**Elements (top to bottom):**
1. Status indicator — top-right corner, always visible
2. Role label — small mono text: "DEVOPS & CLOUD ENGINEER"
3. Name — large display: "MAHESH DIWAN" with scan line effect
4. F1 subtitle — "—— RACE ENGINEER ——"
5. Telemetry strip — horizontal row with separators: Projects | Experience | Skills | Confidence
6. Social links — icon-only bottom row with tooltip on hover
7. Scroll indicator — "SCROLL ↓" at bottom center

**Removed:** Bio paragraphs (→ Experience), View Projects button (redundant with nav)

### Experience — "Race Standings"

**Layout:** Asymmetric grid — 280px left sidebar + flexible right

**Left sidebar "Driver Standings":**
- Glass panel with: Positions count, Seasons count
- "Best Sectors" — 3 sector times with green/amber/gold coloring
- Tech tags list

**Right "Work History":**
- Each job = glass card
- F1 race label (FORMATION LAP / GREEN FLAG)
- Date range, role, company, description
- Tech tag pills

### Projects — "Pit Wall Monitors"

**Layout:** CSS columns (masonry) — 2 columns desktop, 1 column mobile

**Each card:**
- Glass morphism panel
- Category label (top-left)
- Pulsing status dot (green/purple/grey) + status text
- Project name, description
- Tech tag pills
- Footer: Repo / Demo / Data links

**Height variation:** Cards cycle through min-heights (220px/260px/240px) for masonry effect

### Skills — "Telemetry Dashboard"

**Layout:** 3-column grid (1 column mobile)

**Each panel:**
- Glass morphism
- Category label
- Circular SVG gauge (category average) — 56px
- Thin 2px progress bars per skill (sector-colored)
- DRS indicator + engine mode

**Additional Capabilities:** Below the 3 panels, wrapped tag pills in glass panel

### Education — "Championship Standings"

**Layout:** 3-column grid (1 column mobile)

**Each card:**
- Glass morphism
- Top border: gold (#1), silver (#2), bronze (#3)
- Position label (P1/P2/P3)
- Degree, institution, period, score
- Details text

### Contact — "Pit Wall Communication"

**Layout:** 2-column grid for channels

**Elements:**
- Direct Line panel — AVAILABLE status with pulsing dot + email
- Channel cards — GitHub, LinkedIn, Instagram, X
- Each channel: label + platform name + handle

### Navigation

- Fixed top bar, full width
- Glass morphism: `backdrop-filter: blur(12px)` + semi-transparent bg
- Left: "PIT WALL" branding with red dot (keep existing)
- Center: section nav links (PROFILE, EXPERIENCE, EDUCATION, PROJECTS, SKILLS, CONTACT)
- Right: theme toggle + command palette trigger (⌘K)
- Active section: red underline + red text
- Mobile: hamburger menu → slide-down glass panel with all nav links
- Border-bottom: 1px subtle border

### Footer

- Full width, glass morphism panel
- Left: "MAHESH DIWAN — DEVOPS & CLOUD ENGINEER"
- Right: "© 2026 ALL RIGHTS RESERVED"
- Top border: 3px gradient (red → gold → teal → blue → purple)
- Carbon-fiber texture overlay (existing `section-carbon` class)

## What Stays Unchanged

- `portfolioConfig.ts` structure (no content changes)
- SPA-style section routing (SectionRouter)
- Command palette (Ctrl+K)
- Konami code easter egg
- Theme toggle (dark/light)
- GitHub Pages deployment config
- All existing Playwright tests

## Bug Fixes Included

1. Favicon 404 — add proper `.ico` or `.svg` to `/public`
2. Favicon path — ensure `metadataBase` points correctly

## Testing Strategy

After each phase:
1. `npx playwright test` — all 40 tests pass
2. Browser screenshots at 1440px, 768px, 375px in both themes
3. Lighthouse audit (target 95+ across all categories)
4. Manual check: animations respect `prefers-reduced-motion`
