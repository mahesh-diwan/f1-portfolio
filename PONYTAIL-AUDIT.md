# Ponytail Audit Findings

## delete: 17 unused `animate-*` utility classes + backing keyframes
- File: `src/app/globals.css`
- Lines: 1020-1092 (utilities), 688-1014 (keyframes)
- Replacement: nothing
- Classes: animate-fade-in-up, animate-fade-in-down, animate-slide-in-right, animate-slide-in-left, animate-scale-in, animate-scale-in-spring, animate-glow-pulse, animate-gradient-shift, animate-race-lights, animate-car-drive, animate-car-drive-slow, animate-telemetry-scroll, animate-heart-beat, animate-number-tick, animate-flag-wave, animate-indicator-flash, animate-counter-up, animate-progress-fill
- Keyframes orphaned: fade-in-up, fade-in-down, slide-in-right, slide-in-left, scale-in, scale-in-spring, pulse-glow, gradient-shift, race-lights, car-drive, car-drive-slow, telemetry-scroll, heart-beat, number-tick, flag-wave, indicator-flash, counter-up, progress-fill
- None referenced in any `.tsx` file

## delete: `border-draw` keyframe
- File: `src/app/globals.css:989-996`
- Replacement: nothing
- Never used — no utility, no inline animation name match

## delete: `gauge-sweep` keyframe
- File: `src/app/globals.css:998-1005`
- Replacement: nothing
- Never used — Gauge.tsx uses CSS transition instead

## delete: 14 heading/body/label/mono utility classes
- File: `src/app/globals.css:418-518`
- Replacement: nothing — Tailwind utilities or inline styles cover all usage
- Classes: heading-display, heading-lg, heading-md, heading-sm, heading-xs, body-lg, body-default, body-sm, label-lg, label-default, label-sm, mono-default, mono-sm, mono-xs
- None referenced in any `.tsx` file

## delete: 12 text colour utility classes
- File: `src/app/globals.css:520-562`
- Replacement: nothing — all usages use `text-[var(...)]` or Tailwind built-ins
- Classes: text-primary, text-secondary, text-muted, text-dim, text-accent, text-gold, text-teal, text-blue, text-green, text-purple, text-orange

## delete: 5 `surface-*` classes
- File: `src/app/globals.css:564-586`
- Replacement: nothing — all cards use `glass` + `shadow-card` pattern
- Classes: surface-base, surface-card, surface-elevated, surface-overlay, surface-inset

## delete: 4 `border-*` utility classes
- File: `src/app/globals.css:588-602`
- Replacement: nothing — borders use `border-[var(...)]` inline
- Classes: border-subtle, border-default, border-strong, border-focus

## delete: 7 `panel-*` utility classes
- File: `src/app/globals.css:604-641`
- Replacement: nothing — all panels use `glass` + `shadow-card` pattern
- Classes: panel-base, panel-elevated, panel-overlay, panel-glow, panel-glow-gold, panel-glow-teal

## delete: 6 `gradient-*` utility classes
- File: `src/app/globals.css:643-677`
- Replacement: nothing — gradients are applied inline
- Classes: gradient-accent, gradient-gold, gradient-teal, gradient-blue, gradient-surface, gradient-overlay

## delete: 3 `container-*` utility classes
- File: `src/app/globals.css:396-412`
- Replacement: nothing — all sections use inline `max-w-[1400px] mx-auto`
- Classes: container-page, container-wide, container-narrow

## delete: `text-balance` utility
- File: `src/app/globals.css:414`
- Replacement: nothing

## delete: `section-divider` & `section-accent-bar` utilities
- File: `src/app/globals.css:1260-1271`
- Replacement: nothing — accent bars are inline divs with `w-[3px] h-5`

## delete: 6 `stagger-*` utility classes
- File: `src/app/globals.css:1274-1291`
- Replacement: nothing — stagger is handled by framer-motion in StaggerReveal
- Classes: stagger-1 through stagger-6

## delete: `hover-tinted-border` & `hover-glow-accent` CSS classes
- File: `src/app/globals.css:1315-1335`
- Replacement: nothing — hover effects use inline classes

## delete: `glass-glow` utility
- File: `src/app/globals.css:1250-1258`
- Replacement: nothing — not referenced anywhere

## delete: `.section-carbon` CSS class
- File: `src/app/globals.css:1338-1360`
- Replacement: nothing — not referenced in any `.tsx` file

## delete: 5 unused exports from `src/lib/portfolio.ts`
- File: `src/lib/portfolio.ts:12-32`
- Replacement: nothing
- Exports: `getExperience`, `getEducation`, `getSkillGroup`, `getAllTags`, `getGithubApiUrl`
- Only `getProject` is called (in Projects.tsx)

## delete: 3 unused exports from `src/lib/utils.ts`
- File: `src/lib/utils.ts:5-23`
- Replacement: nothing
- Exports: `clamp`, `mapRange`, `formatNumber`
- Only `cn` is called across the codebase; Gauge.tsx and PerformanceMeter.tsx inline `Math.min(Math.max(...))` anyway

## shrink: `useReducedMotion` from framer-motion in 4 files
- Files: Hero.tsx, Contact.tsx, TelemetrySkills.tsx, TelemetryBar.tsx
- Lines: the hook import + variable line each
- Replacement: `window.matchMedia("(prefers-reduced-motion: reduce)").matches` — already used in Gauge.tsx, no framer dependency needed for this check
- Saves: framer-motion import surface in 4 files

## shrink: e2e test overlap
- File: `e2e/navigation.spec.ts` "should not have console errors" overlaps with `e2e/audit.spec.ts` "no console errors across all sections"
- File: `e2e/navigation.spec.ts` "should navigate to sections on click" overlaps with `e2e/audit.spec.ts` "all sections have visible content" and `content.spec.ts` visibility tests
- File: `e2e/keyboard.spec.ts` "should open command palette with Ctrl+K" overlaps with `e2e/accessibility.spec.ts` "should have accessible command palette"
- File: `e2e/navigation.spec.ts` "should display nav with all sections" overlaps with `e2e/audit.spec.ts` "nav items visible in light theme"
- Consolidate audit.spec.ts into navigation.spec.ts and delete audit.spec.ts (~198 lines) — its 10 tests overlap with 4 other spec files

## shrink: `PerformanceMeter` and `TelemetryBar` are ~85% duplicate
- Files: `src/components/ui/f1/PerformanceMeter.tsx:51` vs `src/components/ui/primitives/TelemetryBar.tsx:106`
- Both render a labelled horizontal bar: label + value + filled div. TelemetryBar adds IntersectionObserver + rAF animation. PerformanceMeter is a static version.
- PerformanceMeter is only used in Projects.tsx (static metrics display). TelemetryBar is only used in TelemetrySkills.tsx (animated display).
- Replacement: merge into one component with an `animated` prop, or inline PerformanceMeter's ~20 lines into Projects.tsx

## note: framer-motion is the heaviest dependency
- File: `package.json:16`
- Weight: ~30KB gzipped
- Used across: SectionReveal, MagneticHover, EasterEgg, Hero, Experience, Education, TelemetrySkills, Contact, KonamiCode — 9 components
- Most usages are simple enter/exit animations replaceable with CSS keyframes or transitions. Only `AnimatePresence` (EasterEgg, TelemetrySkills, KonamiCode) and `useInView` (SectionReveal) would be non-trivial to replace.
- ponytail: keep unless animations are de-prioritized — the spring physics are the main value

net: **~480 lines deletable** from globals.css alone, + ~30 lines from ts/tsx files, + ~198 lines of redundant e2e test file. ~1 dependency removable (none, framer-motion stays). CSS file shrinks from 1386 to ~900 lines.
