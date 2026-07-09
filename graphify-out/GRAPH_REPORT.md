# Graph Report - .  (2026-07-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 258 nodes · 391 edges · 26 communities (19 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4be60e77`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- TelemetrySkills.tsx
- devDependencies
- page.tsx
- portfolio.ts
- layout.tsx
- compilerOptions
- DigitalReadout.tsx
- TelemetryStream.tsx
- GlowEffect.tsx
- MotionCard.tsx
- TypingEffect.tsx
- responsive.spec.ts
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `cn()` - 51 edges
2. `compilerOptions` - 16 edges
3. `portfolioConfig` - 11 edges
4. `scripts` - 9 edges
5. `EasterEgg()` - 7 edges
6. `SectionReveal()` - 7 edges
7. `usePageTransition()` - 7 edges
8. `portfolio` - 7 edges
9. `Navigation()` - 5 edges
10. `ErrorBoundary` - 5 edges

## Surprising Connections (you probably didn't know these)
- `DigitalReadout()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/DigitalReadout.tsx → src/lib/utils.ts
- `CommandPalette()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/CommandPalette.tsx → src/lib/utils.ts
- `Navigation()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Navigation.tsx → src/lib/utils.ts
- `SectionRouter()` --calls--> `usePageTransition()`  [EXTRACTED]
  src/components/layout/SectionRouter.tsx → src/lib/transition-context.tsx
- `F1Car()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/F1Car.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (26 total, 7 thin omitted)

### Community 0 - "cn"
Cohesion: 0.05
Nodes (39): DRSIndicator(), DRSIndicatorProps, F1Car(), F1CarProps, Gauge(), GaugeProps, HeartRate(), HeartRateProps (+31 more)

### Community 1 - "TelemetrySkills.tsx"
Cohesion: 0.12
Nodes (23): SectionRouter(), sections, Contact(), Education(), podiumColors, Experience(), sectors, Hero() (+15 more)

### Community 2 - "devDependencies"
Cohesion: 0.06
Nodes (30): allowScripts, @playwright/test@1.61.1, dependencies, framer-motion, lucide-react, next, react, react-dom (+22 more)

### Community 3 - "page.tsx"
Cohesion: 0.11
Nodes (18): Command, CommandPalette(), Footer(), Navigation(), navItems, ScrollProgress(), EASTER_EGG_MESSAGES, KONAMI_CODE (+10 more)

### Community 4 - "portfolio.ts"
Cohesion: 0.12
Nodes (12): portfolioContext, Certification, Education, Experience, portfolioConfig, Project, SkillGroup, Projects() (+4 more)

### Community 5 - "layout.tsx"
Cohesion: 0.12
Nodes (12): ibmPlexMono, inter, metadata, spaceGrotesk, ErrorBoundary, Props, State, LoadingScreen() (+4 more)

### Community 6 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 7 - "DigitalReadout.tsx"
Cohesion: 0.40
Nodes (4): AnimatedNumber(), AnimatedNumberProps, DigitalReadout(), DigitalReadoutProps

### Community 8 - "TelemetryStream.tsx"
Cohesion: 0.47
Nodes (5): generateStream(), PHRASES, seededRandom(), TelemetryStream(), TelemetryStreamProps

## Knowledge Gaps
- **107 isolated node(s):** `viewports`, `eslintConfig`, `nextConfig`, `name`, `version` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `TelemetrySkills.tsx`, `page.tsx`, `portfolio.ts`, `layout.tsx`, `DigitalReadout.tsx`, `TelemetryStream.tsx`?**
  _High betweenness centrality (0.215) - this node is a cross-community bridge._
- **Why does `portfolioConfig` connect `portfolio.ts` to `TelemetrySkills.tsx`, `page.tsx`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `viewports`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05376972530683811 - nodes in this community are weakly interconnected._
- **Should `TelemetrySkills.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11742424242424243 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._