"use client";

import { portfolio } from "@/lib/portfolio";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const sectors = [
  { label: "S1", time: "0:31.442", delta: "-0.234", pct: 85, status: "pb" as const },
  { label: "S2", time: "0:28.176", delta: "+0.087", pct: 76, status: "normal" as const },
  { label: "S3", time: "0:25.931", delta: "-0.412", pct: 70, status: "best" as const },
];

export function Experience() {
  if (portfolio.experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 px-4 relative grid-bg" aria-label="Career experience">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="SECTOR 1/6" right={`${portfolio.experience.length} ROLES`} title="Career Timeline" />

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Left: Driver Standings */}
            <div className="glass shadow-card p-5 h-fit">
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-4">Driver Standings</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="text-center bg-[var(--accent-muted)] border border-[var(--accent)]/15 p-3">
                  <div className="text-2xl font-bold text-[var(--accent)]">{portfolio.experience.length}</div>
                  <div className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Positions</div>
                </div>
                <div className="text-center bg-[var(--color-accent-teal-muted)] border border-[var(--color-accent-teal)]/15 p-3">
                  <div className="text-2xl font-bold text-[var(--color-accent-teal)]">3</div>
                  <div className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Seasons</div>
                </div>
              </div>

              {/* Best Sectors */}
              <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Best Sectors</p>
              <div className="space-y-1.5">
                {sectors.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-xs font-mono ${
                      s.status === "pb"
                        ? "bg-[var(--color-display-green-muted)] border border-[var(--color-display-green)]/15"
                        : s.status === "best"
                        ? "bg-[var(--color-accent-gold-muted)] border border-[var(--color-accent-gold)]/15"
                        : "bg-[var(--bg-surface)] border border-[var(--border-default)]"
                    }`}
                  >
                    <span className={s.status === "pb" ? "text-[var(--color-display-green)]" : s.status === "best" ? "text-[var(--color-accent-gold)]" : "text-[var(--text-secondary)]"}>
                      {s.label} {s.time}
                    </span>
                    <span className={s.status === "pb" ? "text-[var(--color-display-green)]" : s.status === "best" ? "text-[var(--color-accent-gold)]" : "text-[var(--text-muted)]"}>
                      {s.delta}
                    </span>
                    {s.status !== "normal" && (
                      <span className={`text-xs ${s.status === "pb" ? "text-[var(--color-display-green)]" : "text-[var(--color-accent-gold)]"}`}>
                        {s.status === "pb" ? "PB" : "BEST"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Work History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grid-rows-[1fr]">
                {portfolio.experience.map((exp, idx) => (
                    <div key={exp.id} className="glass shadow-card hover-lift p-5 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-mono px-2 py-0.5 ${
                          idx === 0
                            ? "text-[var(--color-display-green)] bg-[var(--color-display-green-muted)]"
                            : "text-[var(--color-accent-gold)] bg-[var(--color-accent-gold-muted)]"
                        }`}>
                          {idx === 0 ? "● FORMATION LAP" : "GREEN FLAG"}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono">{exp.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{exp.role}</h3>
                      <p className="text-sm text-[var(--accent)] font-mono mb-2">{exp.company}</p>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">{exp.desc}</p>
                      {exp.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                ))}
              </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
