"use client";

import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/motion/SectionReveal";

const podiumColors = [
  { border: "#f7d117", label: "P1 — FIRST", num: "#01" },
  { border: "#c0c0c0", label: "P2 — SECOND", num: "#02" },
  { border: "#e8a87c", label: "P3 — THIRD", num: "#03" },
];

export function Education() {
  if (portfolio.education.length === 0) return null;

  return (
    <section id="education" className="py-28 px-4 relative grid-bg" aria-label="Education">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-[var(--color-accent-teal)]" />
            <div>
              <p className="text-[13px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Championship Standings</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Education</h2>
            </div>
          </div>

          <StaggerReveal staggerDelay={0.1} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.education.map((edu, idx) => {
                const podium = podiumColors[idx] || podiumColors[0];
                return (
                  <StaggerItem key={idx}>
                    <div
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
                        {edu.period} · {edu.gpa && (
                          <span style={{ color: podium.border, fontWeight: "bold" }}>
                            {edu.gpa}
                          </span>
                        )}
                      </p>
                      {edu.details && (
                        <p className="text-[13px] text-[var(--text-secondary)] mt-3 pt-3 border-t border-[var(--border-default)] leading-relaxed">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerReveal>
        </div>
      </SectionReveal>
    </section>
  );
}
