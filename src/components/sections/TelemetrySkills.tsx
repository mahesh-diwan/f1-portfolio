"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { TelemetryBar } from "@/components/ui/primitives/TelemetryBar";
import { Gauge } from "@/components/ui/primitives/Gauge";
import { DRSIndicator } from "@/components/ui/f1/DRSIndicator";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/motion/SectionReveal";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

const engineModes = ["QUALIFYING", "RACE", "SAFETY CAR"];

export function TelemetrySkills() {
  const [modeIdx, setModeIdx] = useState(0);
  const reducedMotion = useReducedMotion() ?? false;

  if (portfolio.skills.length === 0) return null;

  const handleModeShift = () => {
    if (reducedMotion) return;
    setModeIdx((prev) => (prev + 1) % engineModes.length);
  };

  const adjustValue = (base: number) => {
    const shift = [0.9, 1.0, 1.1][modeIdx % 3] ?? 1.0;
    return Math.min(100, Math.round(base * shift));
  };

  return (
    <section id="skills" className="py-24 px-4 relative grid-bg" aria-label="Skills telemetry">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-[var(--color-accent-gold)]" />
            <div>
              <p className="text-[13px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">System Diagnostics</p>
              <h2
                className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] cursor-pointer select-none"
                onClick={handleModeShift}
                title="Click to shift engine mode"
              >
                Skills Telemetry
              </h2>
              <AnimatePresence mode="wait">
                <motion.span
                  key={modeIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-[12px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent-gold)]"
                >
                  MODE: {engineModes[modeIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <StaggerReveal staggerDelay={0.1} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.skills.map((group, idx) => {
                const avg = Math.round(group.items.reduce((sum, s) => sum + s.pct, 0) / group.items.length);
                return (
                  <StaggerItem key={group.group}>
                    <div className="glass shadow-card hover-lift p-5 h-full">
                      <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">{group.group}</p>
                      <div className="flex items-start gap-3">
                        <Gauge value={avg} label="AVG" color={avg >= 85 ? "var(--color-accent-purple)" : avg >= 70 ? "var(--color-accent-green)" : "var(--color-accent-gold)"} size={56} />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          {group.items.map((skill) => (
                            <TelemetryBar key={skill.name} value={adjustValue(skill.pct)} label={skill.name} color={skill.color} size="xs" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[var(--border-default)]">
                        <EasterEgg message="DRS ENABLED — Maximum power!" icon="🏎️" trigger="click">
                          <DRSIndicator active={group.items.some((s) => s.pct >= 85)} />
                        </EasterEgg>
                        <span className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-dim)] flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5" />
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={modeIdx}
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -3 }}
                            >
                              MODE: {engineModes[modeIdx]}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerReveal>

          {portfolio.otherSkills && portfolio.otherSkills.length > 0 && (
            <div className="mt-6">
              <SectionReveal delay={0.2}>
                <div className="glass shadow-card p-5">
                  <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Additional Capabilities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {portfolio.otherSkills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 text-[12px] font-mono uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/20 hover:text-[var(--text-primary)] transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
