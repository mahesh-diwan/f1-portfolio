"use client";

import { portfolio } from "@/lib/portfolio";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const podiumColors = [
  { border: "var(--color-accent-gold)", label: "P1 — FIRST", num: "#01" },
  { border: "#9ca3af", label: "P2 — SECOND", num: "#02" },
  { border: "var(--color-accent-orange)", label: "P3 — THIRD", num: "#03" },
];

export function Education() {
  if (portfolio.education.length === 0) return null;

  return (
    <section id="education" className="py-20 px-4 relative grid-bg" aria-label="Education">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="SECTOR 2/6" right={`${portfolio.education.length} DEGREES`} title="Education" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.education.map((edu, idx) => {
                const podium = podiumColors[idx] || podiumColors[0];
                return (
                    <div
                      key={edu.degree}
                      className="glass shadow-card hover-lift p-5 h-full"
                      style={{ borderTop: `3px solid ${podium.border}` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[12px] uppercase tracking-[0.1em] font-mono" style={{ color: podium.border }}>
                          {podium.label}
                        </span>
                        <span className="text-[12px] text-[var(--text-muted)] font-mono">{podium.num}</span>
                      </div>
                      <h3 className="text-[13px] font-bold text-[var(--text-primary)] mb-1 leading-tight">{edu.degree}</h3>
                      <p className="text-[12px] text-[var(--text-secondary)] mb-2">{edu.institution}</p>
                      <p className="text-[12px] text-[var(--text-muted)]">
                        {edu.period}{edu.gpa ? <span> · <span style={{ color: podium.border, fontWeight: "bold" }}>{edu.gpa}</span></span> : null}
                      </p>
                      {edu.details && (
                        <p className="text-[13px] text-[var(--text-secondary)] mt-3 pt-3 border-t border-[var(--border-default)] leading-relaxed">
                          {edu.details}
                        </p>
                      )}
                    </div>
                 );
               })}
             </div>
        </div>
      </SectionReveal>
    </section>
  );
}
