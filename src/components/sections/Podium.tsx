"use client";

import { portfolio } from "@/lib/portfolio";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const all = [...portfolio.projects]
  .sort((a, b) => ((b.tags?.length ?? 0) + (b.metrics?.length ?? 0)) - ((a.tags?.length ?? 0) + (a.metrics?.length ?? 0)))
  .slice(0, 3);

const stands = [
  { place: "P2", color: "var(--color-accent-teal)", border: "border-[var(--color-accent-teal)]", bg: "bg-[var(--color-accent-teal-muted)]", height: "h-20", label: "RUNNER-UP" },
  { place: "P1", color: "var(--color-accent-gold)", border: "border-[var(--color-accent-gold)]", bg: "bg-[var(--color-accent-gold-muted)]", height: "h-28", label: "CHAMPION" },
  { place: "P3", color: "var(--color-accent-orange)", border: "border-[var(--color-accent-orange)]", bg: "bg-[var(--color-accent-orange-muted)]", height: "h-16", label: "THIRD" },
];

export function Podium() {
  if (all.length === 0) return null;

  const ordered = all.length < 2
    ? [all[0]]
    : all.length === 2
      ? [all[1], all[0]]
      : [all[1], all[0], all[2]];

  return (
    <section id="podium" className="py-20 px-4 relative grid-bg" aria-label="Project podium">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="PADDOCK CLUB" right="TOP 3" title="Podium" />
          <div className="flex items-end justify-center gap-3 md:gap-6">
            {ordered.map((project, i) => {
              if (!project) return null;
              const stand = stands[i];
              const idx = all.indexOf(project);
              return (
                <div key={project.id} className="flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <div className={`flex flex-col items-center justify-end p-3 ${stand.bg} border ${stand.border} rounded-t-lg ${stand.height} w-24 md:w-28`}>
                    <span className="text-lg">{project.icon}</span>
                    <span className="text-xs font-bold font-mono mt-1 text-center leading-tight" style={{ color: stand.color }}>
                      {project.name.length > 12 ? project.name.slice(0, 12) + "…" : project.name}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${stand.bg} border ${stand.border}`}>
                    <span className={`text-xs font-mono font-bold ${i === 1 ? "animate-sparkle" : ""}`} style={{ color: stand.color }}>{stand.place}</span>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">{stand.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
