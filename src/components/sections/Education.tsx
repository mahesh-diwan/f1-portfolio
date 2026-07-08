"use client";

import { portfolio } from "@/lib/portfolio";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/SectionReveal";
import { EasterEgg } from "@/components/ui/EasterEgg";

const podiumColors = ["var(--color-accent-gold)", "#c0c0c0", "var(--color-accent-purple)"];
const podiumLabels = ["P1 — FIRST", "P2 — SECOND", "P3 — THIRD"];

export function Education() {
  if (portfolio.education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-4 relative" aria-label="Education">
      <SectionReveal>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="section-accent-bar bg-gradient-to-b from-[var(--color-accent-teal)] to-[var(--color-accent-teal-dim)]" aria-hidden="true" />
          <div>
            <p className="label-sm tracking-[0.2em]">CHAMPIONSHIP STANDINGS</p>
            <h2 className="heading-md text-3xl sm:text-4xl text-[var(--text-primary)] mt-0.5">
              <EasterEgg message="Champions are made in the classroom, not just on the track! ⭐" icon="🎓" trigger="click" size="lg">
                Education
              </EasterEgg>
            </h2>
          </div>
        </div>

        <StaggerReveal staggerDelay={0.1} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.education.map((edu, idx) => (
              <StaggerItem key={edu.id}>
                <TelemetryPanel
                  label={podiumLabels[idx] ?? `P${idx + 1}`}
                  value={`#${idx + 1}`}
                  accent={podiumColors[idx]}
                  className="h-full hover-lift"
                >
                  <div className="space-y-4">
                    <div>
                      <span className="heading-sm text-lg text-[var(--text-primary)] block leading-tight">{edu.degree}</span>
                      <span className="text-xs font-mono text-[var(--text-secondary)] mt-1 block">{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-secondary)]">
                      <span>{edu.period}</span>
                      {edu.gpa && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-[var(--border-default)]" aria-hidden="true" />
                          <span className="text-[var(--text-primary)] font-medium">{edu.gpa}</span>
                        </>
                      )}
                    </div>
                    {edu.details && (
                      <p className="text-xs font-mono text-[var(--text-secondary)]/80 leading-relaxed pt-3 border-t border-[var(--border-default)]/60">
                        {edu.details}
                      </p>
                    )}
                  </div>
                </TelemetryPanel>
              </StaggerItem>
            ))}
          </div>
        </StaggerReveal>
      </div>
      </SectionReveal>
    </section>
  );
}
