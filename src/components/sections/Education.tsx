"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/motion/SectionReveal";

const podiumColors = [
  { border: "#f7d117", label: "P1 — FIRST", num: "#01" },
  { border: "#c0c0c0", label: "P2 — SECOND", num: "#02" },
  { border: "#cd7f32", label: "P3 — THIRD", num: "#03" },
];

const confettiColors = ["#f7d117", "#c0c0c0", "#cd7f32", "#ff6b6b", "#4ecdc4"];

export function Education() {
  const [liftIdx, setLiftIdx] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  if (portfolio.education.length === 0) return null;

  const handleLift = (idx: number) => {
    if (reducedMotion) return;
    setLiftIdx(idx);
    setTimeout(() => setLiftIdx(null), 1500);
  };

  return (
    <section id="education" className="py-28 px-4 relative grid-bg" aria-label="Education">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-[var(--color-accent-teal)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Championship Standings</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Education</h2>
            </div>
          </div>

          <StaggerReveal staggerDelay={0.1} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.education.map((edu, idx) => {
                const podium = podiumColors[idx] || podiumColors[0];
                const isLifted = liftIdx === idx;
                return (
                  <StaggerItem key={idx}>
                    <div className="relative">
                      <motion.div
                        className="glass shadow-card hover-lift p-5 h-full cursor-pointer"
                        style={{ borderTop: `3px solid ${podium.border}` }}
                        animate={isLifted ? {
                          y: [0, -8, 0],
                          boxShadow: [
                            "0 0 0 rgba(154, 122, 10, 0)",
                            "0 0 24px rgba(154, 122, 10, 0.3)",
                            "0 0 0 rgba(154, 122, 10, 0)",
                          ],
                        } : {}}
                        transition={{ duration: 1.2 }}
                        onClick={() => handleLift(idx)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[7px] uppercase tracking-[0.1em] font-mono" style={{ color: podium.border }}>
                            {podium.label}
                          </span>
                          <span className="text-[7px] text-[var(--text-muted)] font-mono">{podium.num}</span>
                        </div>
                        <h3 className="text-[11px] font-bold text-[var(--text-primary)] mb-1 leading-tight">{edu.degree}</h3>
                        <p className="text-[9px] text-[var(--text-secondary)] mb-2">{edu.institution}</p>
                        <p className="text-[9px] text-[var(--text-muted)]">
                          {edu.period} · {edu.gpa && (
                            <span style={{ color: podium.border, fontWeight: "bold" }}>
                              CGPA: {edu.gpa}
                            </span>
                          )}
                        </p>
                        {edu.details && (
                          <p className="text-[9px] text-[var(--text-secondary)] mt-3 pt-3 border-t border-[var(--border-default)] leading-relaxed">
                            {edu.details}
                          </p>
                        )}
                      </motion.div>
                      {!reducedMotion && isLifted && Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            width: 4 + Math.random() * 4,
                            height: 4 + Math.random() * 4,
                            backgroundColor: confettiColors[i % confettiColors.length],
                            left: `${20 + Math.random() * 60}%`,
                            bottom: "50%",
                          }}
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 0, y: -60 - Math.random() * 40 }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                        />
                      ))}
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
