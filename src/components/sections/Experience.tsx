"use client";

import { portfolio } from "@/lib/portfolio";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/motion/SectionReveal";

const sectors = [
  { label: "S1", time: "0:31.442", delta: "-0.234", status: "pb" as const },
  { label: "S2", time: "0:28.176", delta: "+0.087", status: "normal" as const },
  { label: "S3", time: "0:25.931", delta: "-0.412", status: "best" as const },
];

export function Experience() {
  if (portfolio.experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-4 relative grid-bg" aria-label="Career experience">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-[var(--accent)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Race History</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Career Timeline</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Left: Driver Standings */}
            <div className="glass p-5 h-fit">
              <p className="text-[8px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-4">Driver Standings</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="text-center bg-[var(--accent-muted)] border border-[var(--accent)]/15 p-3">
                  <div className="text-2xl font-bold text-[var(--accent)]">{portfolio.experience.length}</div>
                  <div className="text-[7px] uppercase tracking-[0.1em] text-[var(--text-muted)]">Positions</div>
                </div>
                <div className="text-center bg-[var(--color-accent-teal-muted)] border border-[var(--color-accent-teal)]/15 p-3">
                  <div className="text-2xl font-bold text-[var(--color-accent-teal)]">3</div>
                  <div className="text-[7px] uppercase tracking-[0.1em] text-[var(--text-muted)]">Seasons</div>
                </div>
              </div>

              {/* Best Sectors */}
              <p className="text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Best Sectors</p>
              <div className="space-y-1.5">
                {sectors.map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between px-2.5 py-1.5 text-[9px] font-mono ${
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
                      <span className={`text-[7px] ${s.status === "pb" ? "text-[var(--color-display-green)]" : "text-[var(--color-accent-gold)]"}`}>
                        {s.status === "pb" ? "PB" : "BEST"}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Work History */}
            <StaggerReveal staggerDelay={0.1} direction="up">
              <div className="space-y-4">
                {portfolio.experience.map((exp, idx) => (
                  <StaggerItem key={idx}>
                    <div className="glass p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[9px] font-mono px-2 py-0.5 ${
                          idx === 0
                            ? "text-[var(--color-display-green)] bg-[var(--color-display-green-muted)]"
                            : "text-[var(--color-accent-gold)] bg-[var(--color-accent-gold-muted)]"
                        }`}>
                          {idx === 0 ? "● FORMATION LAP" : "GREEN FLAG"}
                        </span>
                        <span className="text-[8px] text-[var(--text-muted)] font-mono">{exp.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{exp.role}</h3>
                      <p className="text-[10px] text-[var(--accent)] font-mono mb-2">{exp.company}</p>
                      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{exp.desc}</p>
                      {exp.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-[7px] font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
