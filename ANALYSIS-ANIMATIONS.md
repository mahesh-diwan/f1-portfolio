# Animation Timing Analysis — F1 Portfolio

Generated: 2026-07-09

---

## 1. Loading Screen (`src/components/providers/LoadingScreen.tsx`)

### F1 Start Light Sequence
| Property | Value |
|----------|-------|
| **File/Line** | `LoadingScreen.tsx:54-61` |
| **What** | 5 red lights turning on sequentially (F1 start sequence) |
| **Duration** | `0.1s` per light |
| **Delay** | `i * 400ms` (lights at 0, 400, 800, 1200, 1600ms) |
| **Easing** | `forwards` fill mode |
| **Reduced motion** | Yes — `@media (prefers-reduced-motion: reduce)` disables animation, snaps lights to on |

### F1 Light to Lights-Out Transition
| Property | Value |
|----------|-------|
| **File/Line** | `LoadingScreen.tsx:12` |
| **What** | All lights go to "off" state |
| **Delay** | `2000ms` after mount |
| **Mechanism** | `setTimeout(() => setLightsOut(true), 2000)` |

### Loading Screen Fade-Out
| Property | Value |
|----------|-------|
| **File/Line** | `LoadingScreen.tsx:25-27` |
| **What** | Full-screen overlay fades from `opacity-100` to `opacity-0` |
| **Duration** | `500ms` (CSS `transition-opacity duration-500`) |
| **Delay** | `2200ms` after mount |
| **Mechanism** | Class toggle `fadeOut ? "opacity-0" : "opacity-100"` |

### Loading Screen Removal
| Property | Value |
|----------|-------|
| **File/Line** | `LoadingScreen.tsx:14-15` |
| **What** | Component unmounts (returns null) |
| **Delay** | `2800ms` after mount (`2200 + 600`) |

### F1 Light State Transition (CSS)
| Property | Value |
|----------|-------|
| **File/Line** | `LoadingScreen.tsx:42-43` |
| **What** | Light background-color and box-shadow transition |
| **Duration** | `0.3s` each for `background-color` and `box-shadow` |

---

## 2. Hero Section (`src/components/sections/Hero.tsx`)

### Role Label Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:84-91` |
| **What** | Role text ("Software Engineer" etc.) fades in and slides up |
| **Initial** | `{ opacity: 0, y: 10 }` |
| **Animate** | `{ opacity: 1, y: 0 }` |
| **Delay** | `0.2s` |
| **Easing** | Framer Motion default (ease-out) |

### Name Container Spring
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:94-98` |
| **What** | Name container scales and fades in |
| **Initial** | `{ opacity: 0, scale: 0.95 }` |
| **Animate** | `{ opacity: 1, scale: 1 }` |
| **Delay** | `0.4s` |
| **Easing** | Spring (stiffness: 100) |

### Name Typing Effect
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:52-68` |
| **What** | Characters appear one by one |
| **Interval** | `80ms` per character |
| **Cursor blink** | `animate-pulse` (Tailwind built-in: 2s cycle) |
| **Cursor hide** | `400ms` after typing completes |
| **Reduced motion** | Yes — skips typing, shows full name immediately |

### HeroStat Counter Animation
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:14-24` |
| **What** | Number counts up from 0 to target value |
| **Duration** | `1200ms` |
| **Easing** | `1 - Math.pow(1 - progress, 3)` (ease-out cubic) |
| **Reduced motion** | Not checked — always runs |

### F1 Subtitle Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:111-122` |
| **What** | "Race Engineer" text with decorative lines fades in |
| **Initial** | `{ opacity: 0 }` |
| **Animate** | `{ opacity: 1 }` |
| **Delay** | `1.4s` |

### Telemetry Strip Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:125-139` |
| **What** | Stats bar slides up and fades in |
| **Initial** | `{ opacity: 0, y: 20 }` |
| **Animate** | `{ opacity: 1, y: 0 }` |
| **Delay** | `1.6s` |

### Social Links Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:142-170` |
| **What** | Social icons row fades in |
| **Initial** | `{ opacity: 0 }` |
| **Animate** | `{ opacity: 1 }` |
| **Delay** | `1.8s` |

### Scroll Indicator Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:174-190` |
| **What** | "Scroll" label and mouse icon fade in |
| **Initial** | `{ opacity: 0 }` |
| **Animate** | `{ opacity: 1 }` |
| **Delay** | `2.0s` |

### Scroll Indicator Bounce
| Property | Value |
|----------|-------|
| **File/Line** | `Hero.tsx:184-188` |
| **What** | Dot bounces up/down inside scroll indicator |
| **Animate** | `{ y: [0, 6, 0] }` |
| **Duration** | `1.5s` |
| **Repeat** | `Infinity` |

---

## 3. Section Reveal System (`src/components/ui/motion/SectionReveal.tsx`)

### SectionReveal (Base)
| Property | Value |
|----------|-------|
| **File/Line** | `SectionReveal.tsx:39-67` |
| **What** | Section content fades in with directional slide on scroll |
| **Direction** | Default `up` (also: down, left, right, none) |
| **Initial** | `{ opacity: 0, y: 24 }` (for "up") |
| **Animate** | `{ opacity: 1, y: 0 }` |
| **Duration** | `0.6s` (default) |
| **Delay** | `0` (default, configurable) |
| **Easing** | `[0.25, 0.1, 0.25, 1]` (ease-out curve) |
| **Trigger** | IntersectionObserver, `margin: "0px 0px -60px 0px"` (triggers 60px before entering viewport) |
| **Once** | `true` (only animates once) |

### StaggerReveal (Container)
| Property | Value |
|----------|-------|
| **File/Line** | `SectionReveal.tsx:86-115` |
| **What** | Container that staggers child animations |
| **Stagger delay** | `0.08s` between children |
| **Child delay** | Configurable via `staggerDelay` prop (default `0`) |
| **Trigger** | Same IntersectionObserver as SectionReveal |

### StaggerItem (Child)
| Property | Value |
|----------|-------|
| **File/Line** | `SectionReveal.tsx:117-136` |
| **What** | Individual item in a stagger group |
| **Initial** | `{ opacity: 0, y: 16 }` |
| **Animate** | `{ opacity: 1, y: 0 }` |
| **Duration** | `0.5s` |
| **Easing** | `[0.25, 0.1, 0.25, 1]` |

---

## 4. Section-by-Section Usage

### Projects (`src/components/sections/Projects.tsx`)
| Animation | Source | Notes |
|-----------|--------|-------|
| Section wrapper | `SectionReveal` (line 153) | Default settings: 0.6s, up, ease-out |
| Status dot pulse | `animate-telemetry-pulse` (line 60) | CSS: `pulse-dim 2s ease-in-out infinite` |
| Expanded content fade | `animate-fade-in` (line 114) | CSS: `fade-in 0.3s ease-out-expo both` |
| Hover lift | `hover-lift` class | CSS: `transform 0.2s, box-shadow 0.2s` |

### Experience (`src/components/sections/Experience.tsx`)
| Animation | Source | Notes |
|-----------|--------|-------|
| Section wrapper | `SectionReveal` (line 18) | Default settings |
| Experience cards | `StaggerReveal` (line 77) | `staggerDelay={0.1}`, direction up |
| Individual cards | `StaggerItem` (line 80) | 0.5s, y: 16->0 |
| Hover lift | `hover-lift` class | 0.2s transition |

### Education (`src/components/sections/Education.tsx`)
| Animation | Source | Notes |
|-----------|--------|-------|
| Section wrapper | `SectionReveal` (line 18) | Default settings |
| Education cards | `StaggerReveal` (line 28) | `staggerDelay={0.1}`, direction up |
| Individual cards | `StaggerItem` (line 33) | 0.5s, y: 16->0 |
| Hover lift | `hover-lift` class | 0.2s transition |

### TelemetrySkills (`src/components/sections/TelemetrySkills.tsx`)
| Animation | Source | Notes |
|-----------|--------|-------|
| Section wrapper | `SectionReveal` (line 33) | Default settings |
| Engine mode text | `AnimatePresence` + `motion.span` (lines 46-56) | 0.1s fade, y: 4->0 |
| Skills cards | `StaggerReveal` (line 60) | `staggerDelay={0.1}`, direction up |
| Individual cards | `StaggerItem` (line 65) | 0.5s, y: 16->0 |
| Card mode label | `AnimatePresence` + `motion.span` (lines 82-91) | 0.1s fade, y: 3->0 |
| OtherSkills reveal | `SectionReveal delay={0.2}` (line 103) | 0.2s additional delay |
| Hover lift | `hover-lift` class | 0.2s transition |

### Contact (`src/components/sections/Contact.tsx`)
| Animation | Source | Notes |
|-----------|--------|-------|
| Section wrapper | `SectionReveal` (line 29) | Default settings |
| Radio burst sweep | `motion.div` clipPath (lines 67-84) | 1.5s, easeInOut, clipPath: top->bottom->top |
| Radio scan lines | `motion.div` scaleY (lines 75-81) | 0.3s, repeat Infinity, staggered 0.1s |
| "ROGER THAT" text | `motion.div` opacity (lines 87-97) | 0.5s, delay 1.0s, opacity pulse |
| Hover lift | `hover-lift` class | 0.2s transition |
| Reduced motion | Yes — `handleRadio` returns early | Prevents radio burst animation |

---

## 5. UI Component Animations

### StatusIndicator (`src/components/ui/primitives/StatusIndicator.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `StatusIndicator.tsx:41` |
| **What** | Active status ping ring |
| **Animation** | `animate-ping` (Tailwind: 1s cubic-bezier(0, 0, 0.2, 1) infinite) |
| **Duration** | `1s` |
| **Repeat** | Infinite |
| **Also** | `glow-ring 2s ease-in-out infinite` on the dot (line 48) |

### TelemetryBar (`src/components/ui/primitives/TelemetryBar.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `TelemetryBar.tsx:45-59` |
| **What** | Bar fill animates from 0 to target width |
| **Duration** | `1200ms` |
| **Easing** | `1 - Math.pow(1 - progress, 3)` (ease-out cubic) |
| **Trigger** | IntersectionObserver (threshold: 0.1) |
| **Reduced motion** | Not checked |

### Gauge (`src/components/ui/primitives/Gauge.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `Gauge.tsx:43-61` |
| **What** | Number counter animates from 0 to value |
| **Duration** | `1000ms` |
| **Easing** | `1 - Math.pow(1 - progress, 3)` (ease-out cubic) |
| **Trigger** | IntersectionObserver (threshold: 0.1) |
| **Also** | SVG `stroke-dashoffset` transition: `1.2s cubic-bezier(0.16, 1, 0.3, 1)` (line 98) |

### PerformanceMeter (`src/components/ui/f1/PerformanceMeter.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `PerformanceMeter.tsx:41` |
| **What** | Bar fill width transition |
| **Duration** | `1000ms` |
| **Easing** | `ease-out` (CSS `transition-all duration-1000 ease-out`) |

### DRSIndicator (`src/components/ui/f1/DRSIndicator.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `DRSIndicator.tsx:17, 26` |
| **What** | Color and shadow transitions on DRS dot and text |
| **Duration** | `300ms` (CSS `transition-all duration-300`) |
| **Active state** | Also adds `animate-ping` ring (line 35) |

### EasterEgg Toast (`src/components/ui/primitives/EasterEgg.tsx`)
| Property | Value |
|----------|-------|
| **File/Line** | `EasterEgg.tsx:44-63` |
| **What** | Toast notification appears |
| **Initial** | `{ opacity: 0, y: 8, scale: 0.9 }` |
| **Animate** | `{ opacity: 1, y: 0, scale: 1 }` |
| **Exit** | `{ opacity: 0, y: 8, scale: 0.9 }` |
| **Easing** | Spring (damping: 12, stiffness: 300) |
| **Sparkle** | Rotates 360deg + scales in, delay 0.2s, spring stiffness 400 |
| **Duration** | Toast auto-hides after `4000ms` |

---

## 6. Navigation Animations (`src/components/layout/Navigation.tsx`)

### Header Transition
| Property | Value |
|----------|-------|
| **File/Line** | `Navigation.tsx:35` |
| **What** | Header background transition |
| **Duration** | `500ms` |
| **Easing** | `transition-all` (Tailwind default) |

### Active Nav Indicator
| Property | Value |
|----------|-------|
| **File/Line** | `Navigation.tsx:71` |
| **What** | Active section underline glow |
| **Animation** | Static (no animation, just glow shadow) |

### Mobile Menu Open
| Property | Value |
|----------|-------|
| **File/Line** | `Navigation.tsx:174` |
| **What** | Mobile nav menu appears |
| **Animation** | `animate-fade-in` (CSS: `fade-in 0.3s ease-out-expo both`) |

### Nav Button Transitions
| Property | Value |
|----------|-------|
| **File/Line** | `Navigation.tsx:63` |
| **What** | Nav button color/background changes |
| **Duration** | `200ms` (CSS `transition-all duration-200`) |

---

## 7. Page Transition System (`src/lib/transition-context.tsx`)

### Overlay Enter (Wipe)
| Property | Value |
|----------|-------|
| **File/Line** | `transition-context.tsx:78` |
| **What** | Clip-path wipe from left to right |
| **CSS Class** | `animate-transition-enter` |
| **Duration** | `0.45s` |
| **Easing** | `cubic-bezier(0.76, 0, 0.24, 1)` (sharp ease-in-out) |

### Overlay Exit (Wipe)
| Property | Value |
|----------|-------|
| **File/Line** | `transition-context.tsx:78` |
| **What** | Clip-path wipe from right to left |
| **CSS Class** | `animate-transition-exit` |
| **Duration** | `0.55s` |
| **Easing** | `cubic-bezier(0.76, 0, 0.24, 1)` |

### Label Fade-In
| Property | Value |
|----------|-------|
| **File/Line** | `transition-context.tsx:83` |
| **What** | Section label text fades in and slides up |
| **CSS Class** | `animate-transition-fade-in` |
| **Duration** | `0.35s` |
| **Delay** | `0.1s` |
| **Easing** | `ease-out-expo` |

### Label Fade-Out
| Property | Value |
|----------|-------|
| **File/Line** | `transition-context.tsx:83` |
| **What** | Section label text fades out and slides up |
| **CSS Class** | `animate-transition-fade-out` |
| **Duration** | `0.2s` |
| **Easing** | `ease-out-expo` |

### Loading Dots Pulse
| Property | Value |
|----------|-------|
| **File/Line** | `transition-context.tsx:94-96` |
| **What** | Three dots pulse in sequence |
| **Animation** | `animate-pulse` (Tailwind: 2s cycle) |
| **Stagger** | `0.15s` delay between dots |

### Transition Timing Sequence
```
0ms      navigateTo() called
0ms      Overlay enter starts (0.45s wipe)
0ms      Label fade-in starts (0.35s, 0.1s delay)
450ms    Wipe complete
600ms    Active section switches, scroll to top
600ms    Overlay exit starts (0.55s wipe)
600ms    Label fade-out starts (0.2s)
800ms    Label gone
1100ms   Overlay fully gone
1100ms   busyRef resets, navigation unlocked
```

---

## 8. CSS Keyframe Animations (`src/app/globals.css`)

### Utility Animation Classes

| Class | Keyframe | Duration | Easing | Repeat |
|-------|----------|----------|--------|--------|
| `animate-fade-in` | `fade-in` | 0.3s | ease-out-expo | once |
| `animate-fade-in-up` | `fade-in-up` | 0.5s | ease-out-expo | once |
| `animate-fade-in-down` | `fade-in-down` | 0.5s | ease-out-expo | once |
| `animate-slide-in-right` | `slide-in-right` | 0.4s | ease-out-expo | once |
| `animate-slide-in-left` | `slide-in-left` | 0.4s | ease-out-expo | once |
| `animate-scale-in` | `scale-in` | 0.35s | ease-out-expo | once |
| `animate-scale-in-spring` | `scale-in-spring` | 0.5s | ease-spring | once |
| `animate-glow-pulse` | `pulse-glow` | 2s | ease-in-out | infinite |
| `animate-gradient-shift` | `gradient-shift` | 4s | ease-in-out | infinite |
| `animate-race-lights` | `race-lights` | 4s | ease-in-out | forwards |
| `animate-car-drive` | `car-drive` | 3.5s | ease-in-out | forwards |
| `animate-car-drive-slow` | `car-drive-slow` | 10s | linear | infinite |
| `animate-telemetry-scroll` | `telemetry-scroll` | 25s | linear | infinite |
| `animate-heart-beat` | `heart-beat` | 1.2s | ease-in-out | infinite |
| `animate-number-tick` | `number-tick` | 0.25s | ease-out | once |
| `animate-flag-wave` | `flag-wave` | 0.35s | ease-in-out | infinite |
| `animate-indicator-flash` | `indicator-flash` | 0.8s | step-end | infinite |
| `animate-counter-up` | `counter-up` | 0.6s | ease-out-expo | once |
| `animate-progress-fill` | `progress-fill` | 0.8s | ease-out-expo | once |
| `animate-transition-enter` | `transition-enter` | 0.45s | cubic-bezier(0.76,0,0.24,1) | forwards |
| `animate-transition-exit` | `transition-exit` | 0.55s | cubic-bezier(0.76,0,0.24,1) | forwards |
| `animate-transition-fade-in` | `transition-fade-in` | 0.35s | ease-out-expo | once (0.1s delay) |
| `animate-transition-fade-out` | `transition-fade-out` | 0.2s | ease-out-expo | once |
| `animate-telemetry-pulse` | `pulse-dim` | 2s | ease-in-out | infinite |

### Hover Transitions

| Class | Properties | Duration | Easing |
|-------|------------|----------|--------|
| `hover-lift` | transform, box-shadow | 0.2s | ease-in-out |
| `hover-tinted-border` | border-color | 0.2s | ease |
| `hover-glow-accent` | box-shadow, border-color | 0.2s | ease-in-out |

### CSS Transition Tokens (globals.css:122-125)
```
--transition-fast:    120ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-default: 200ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow:    300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slower:  500ms cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 9. Timeline Diagram

### Page Load Sequence
```
TIME    EVENT
──────  ─────────────────────────────────────────────
0ms     LoadingScreen mounts, F1 lights begin
0ms     Light 1 turns on
400ms   Light 2 turns on
800ms   Light 3 turns on
1200ms  Light 4 turns on
1600ms  Light 5 turns on
2000ms  All lights go out
2200ms  Loading screen fade-out begins (500ms)
2800ms  Loading screen removed from DOM

       ── Hero section now visible ──

2200ms  Hero elements begin animating:
2200ms   Role label fades in (0.2s delay → fires at 2400ms)
2400ms   Name container spring (0.4s delay → fires at 2600ms)
2600ms   Name typing begins (80ms per char)
         ~3400ms typing complete (for ~10 char name)
3800ms   F1 subtitle fades in (1.4s delay → fires at 3600ms)
4000ms   Telemetry strip slides up (1.6s delay → fires at 3800ms)
4200ms   Social links fade in (1.8s delay → fires at 4000ms)
4400ms   Scroll indicator fades in (2.0s delay → fires at 4200ms)
4400ms   Scroll dot bounce begins (infinite)
```

### Scroll-Triggered Sections
```
SCROLL POSITION    ANIMATION
────────────────   ─────────────────────────────────
~60px before       SectionReveal triggers (0.6s fade+slide)
                   StaggerReveal staggers children (0.08s apart)
                   TelemetryBar fills (1200ms)
                   Gauge sweeps (1000ms stroke, 1200ms CSS)
                   PerformanceMeter fills (1000ms CSS transition)
```

### Page Navigation Sequence
```
TIME    EVENT
──────  ─────────────────────────────────────────────
0ms     User clicks nav item
0ms     Overlay wipe-in begins (0.45s)
0ms     Label fade-in begins (0.35s, 0.1s delay)
450ms   Wipe complete
600ms   Section switches, scroll to top
600ms   Overlay wipe-out begins (0.55s)
600ms   Label fade-out begins (0.2s)
800ms   Label gone
1100ms  Overlay fully removed
1100ms  Navigation unlocked
```

---

## 10. Conflicts and Overlaps Identified

### 1. Loading Screen vs Hero Entry
**Status: No conflict**
The loading screen removes itself at 2800ms. Hero animations use Framer Motion `initial`/`animate` which fire on mount. Since the Hero is already mounted (hidden behind loading screen), the Framer Motion animations have already completed by the time the loading screen fades out. The hero appears fully formed rather than animating in.

### 2. SectionReveal + StaggerReveal Overlap
**Status: Minor overlap**
When a section with both `SectionReveal` and `StaggerReveal` scrolls into view, both trigger simultaneously. The section fades in (0.6s) while children also start staggering. The stagger `delayChildren` adds a small offset, but the container's own reveal animation and the children's stagger can visually compete. The effect is subtle — the container opacity change makes children appear to "pop" as they stagger.

### 3. Multiple HeroStat Counters
**Status: No conflict**
All 4 `HeroStat` components mount simultaneously and each runs its own 1200ms counter. They animate in parallel, which is the intended effect (all stats counting up together).

### 4. TelemetryBar + Gauge Concurrent Animations
**Status: No conflict**
In TelemetrySkills, `TelemetryBar` (1200ms) and `Gauge` (1000ms stroke + 1000ms counter) animate concurrently. They use different mechanisms (requestAnimationFrame vs CSS transition + setInterval) but both start on IntersectionObserver visibility. The different durations create a natural staggered feel.

### 5. Radio Burst Animation Timing
**Status: Potential issue**
The radio burst in Contact has a 1.5s sweep + 1.0s delayed "ROGER THAT" text (total ~1.5s). The `setTimeout` to clear the burst is 1800ms. If the user clicks rapidly, only the first click triggers (guarded by `radioBurst === idx` check), but the 1800ms timeout could overlap with a subsequent click on a different channel.

### 6. Theme Toggle Transition
**Status: No conflict**
Theme toggle uses CSS custom property swaps with no transition defined on the variables themselves. The `transition-colors` and `transition-all` classes on individual elements handle the visual change. The header has `transition-all duration-500`.

### 7. Scroll Behavior
**Status: Note**
`html { scroll-behavior: smooth }` is set in globals.css but overridden to `auto` under `prefers-reduced-motion: reduce`. Page transitions use `window.scrollTo({ top: 0, behavior: "instant" })` which bypasses smooth scroll.

---

## 11. Reduced Motion Handling

### Global CSS (globals.css:382-391)
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```
This blanket rule effectively kills all CSS animations and transitions.

### Framer Motion `useReducedMotion()`
| Component | File | Handles |
|-----------|------|---------|
| Hero | `Hero.tsx:47` | Skips typing animation, shows full name immediately |
| Contact | `Contact.tsx:11` | Skips radio burst animation |
| TelemetrySkills | `TelemetrySkills.tsx:17` | Skips engine mode shift |

### Loading Screen CSS
| Property | Value |
|----------|-------|
| `LoadingScreen.tsx:48-51` | `@media (prefers-reduced-motion: reduce)` disables light animation, snaps to on state |

### Components WITHOUT Reduced Motion Checks
| Component | Issue |
|-----------|-------|
| HeroStat counter | Always animates (1200ms count-up) |
| TelemetryBar | Always animates (1200ms fill) |
| Gauge | Always animates (1000ms sweep) |
| PerformanceMeter | Uses CSS `transition-all` (covered by global CSS rule) |
| Scroll indicator bounce | Framer Motion infinite animation (covered by global CSS rule) |
| EasterEgg toast | Framer Motion spring animation |
| StatusIndicator ping | Tailwind `animate-ping` (covered by global CSS rule) |

**Note:** The global CSS `prefers-reduced-motion` rule catches most CSS-based animations. The main gaps are Framer Motion components that don't call `useReducedMotion()` — Framer Motion respects the OS setting by default via its `MotionConfig` context, so these should still be reduced. The requestAnimationFrame-based counters (HeroStat, TelemetryBar, Gauge) are the true gaps — they run regardless of reduced motion preference.

---

## 12. Summary Statistics

| Metric | Count |
|--------|-------|
| Total unique animation mechanisms | 28 |
| CSS keyframe animations | 17 |
| Framer Motion animations | 11 |
| requestAnimationFrame animations | 3 |
| CSS transition-based animations | 6 |
| Infinite/repeating animations | 8 |
| One-shot animations | 15 |
| Scroll-triggered animations | 4 |
| Interactive/animations | 4 |
| Components with reduced-motion checks | 3 |
| Components missing reduced-motion checks | 3 |
