"use client";

import { Zap } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { TelemetryBar } from "@/components/ui/TelemetryBar";
import { Gauge } from "@/components/ui/Gauge";
import { DRSIndicator } from "@/components/ui/DRSIndicator";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/SectionReveal";
import { EasterEgg } from "@/components/ui/EasterEgg";

const engineModes = ["QUALIFYING", "RACE", "SAFETY CAR"];

export function TelemetrySkills() {
  if (portfolio.skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-4 relative section-carbon" aria-label="Skills telemetry">
      <SectionReveal>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="section-accent-bar bg-gradient-to-b from-[var(--color-accent-gold)] to-[var(--color-accent-gold-dim)]" aria-hidden="true" />
          <div>
            <p className="label-sm tracking-[0.2em]">SYSTEM DIAGNOSTICS</p>
            <h2 className="heading-md text-3xl sm:text-4xl text-[var(--text-primary)] mt-0.5">Skills Telemetry</h2>
          </div>
        </div>

        <StaggerReveal staggerDelay={0.1} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.skills.map((group, idx) => {
              const avg = Math.round(group.items.reduce((sum, s) => sum + s.pct, 0) / group.items.length);
              return (
                <StaggerItem key={group.group}>
                  <TelemetryPanel label={group.group.toUpperCase()} accent={group.items[0]?.color ?? "var(--accent-primary)"} className="h-full hover-lift">
                    <div className="flex items-start gap-4 mb-4">
                      <Gauge value={avg} label="AVG" color={avg >= 85 ? "#a855f7" : avg >= 70 ? "#22c55e" : "#eab308"} size={80} />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        {group.items.map((skill) => (
                          <TelemetryBar key={skill.name} value={skill.pct} label={skill.name} color={skill.color} size="xs" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border-default)]/60">
                      <EasterEgg message="DRS ENABLED — Maximum power! Forza Ferrari! 🐎" icon="🏎️" trigger="click" size="lg">
                        <DRSIndicator active={group.items.some((s) => s.pct >= 85)} />
                      </EasterEgg>
                      <span className="text-[7px] font-mono uppercase tracking-wider text-[var(--text-dim)] flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" aria-hidden="true" />
                        MODE: {engineModes[idx] ?? "RACE"}
                      </span>
                    </div>
                  </TelemetryPanel>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerReveal>

        {portfolio.otherSkills && portfolio.otherSkills.length > 0 && (
          <div className="mt-6">
            <SectionReveal delay={0.2}>
              <TelemetryPanel label="ADDITIONAL CAPABILITIES">
                <div className="flex flex-wrap gap-2">
                  {portfolio.otherSkills.map((skill, i) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider bg-[var(--bg-surface)] text-[var(--text-secondary)] rounded-sm border border-[var(--border-default)] hover:border-[var(--accent)]/30 hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TelemetryPanel>
            </SectionReveal>
          </div>
        )}
      </div>
      </SectionReveal>
    </section>
  );
}
