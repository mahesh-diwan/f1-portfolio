"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useAnimation } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/motion/SectionReveal";

const sectors = [
  { label: "S1", time: "0:31.442", delta: "-0.234", pct: 85, status: "pb" as const },
  { label: "S2", time: "0:28.176", delta: "+0.087", pct: 76, status: "normal" as const },
  { label: "S3", time: "0:25.931", delta: "-0.412", pct: 70, status: "best" as const },
];

function SectorBar({
  sector,
  playing,
  delay,
  reducedMotion,
}: {
  sector: (typeof sectors)[number];
  playing: boolean;
  delay: number;
  reducedMotion: boolean;
}) {
  const widthControls = useAnimation();
  const deltaControls = useAnimation();
  const [deltaDisplay, setDeltaDisplay] = useState("0.000");

  useEffect(() => {
    if (!playing) {
      widthControls.set({ width: "0%" });
      deltaControls.set({ opacity: 0 });
      setDeltaDisplay("0.000");
      return;
    }

    const run = async () => {
      if (reducedMotion) {
        widthControls.set({ width: `${sector.pct}%` });
        deltaControls.set({ opacity: 1 });
        setDeltaDisplay(sector.delta);
        return;
      }

      await new Promise((r) => setTimeout(r, delay));
      widthControls.start({
        width: `${sector.pct}%`,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      });
      await deltaControls.start({
        opacity: 1,
        transition: { duration: 0.15 },
      });

      // tick delta from 0 → value
      const target = parseFloat(sector.delta);
      const steps = 20;
      for (let i = 1; i <= steps; i++) {
        const t = (target * i) / steps;
        setDeltaDisplay((t >= 0 ? "+" : "") + t.toFixed(3));
        await new Promise((r) => setTimeout(r, 40));
      }
    };

    run();
  }, [playing, sector, delay, reducedMotion, widthControls, deltaControls]);

  const colorClass =
    sector.status === "pb"
      ? "text-[var(--color-display-green)]"
      : sector.status === "best"
        ? "text-[var(--color-accent-gold)]"
        : "text-[var(--text-secondary)]";
  const barColor =
    sector.status === "pb"
      ? "bg-[var(--color-display-green)]"
      : sector.status === "best"
        ? "bg-[var(--color-accent-gold)]"
        : "bg-[var(--accent)]";

  return (
    <div className="flex items-center gap-2 text-[8px] font-mono">
      <span className={`w-6 ${colorClass}`}>{sector.label}</span>
      <div className="flex-1 h-1.5 bg-[var(--bg-surface)] border border-[var(--border-default)] relative overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${barColor} opacity-80`}
          style={{ width: 0 }}
          animate={widthControls}
        />
      </div>
      <motion.span className={`w-12 text-right tabular-nums ${colorClass}`} animate={deltaControls} initial={{ opacity: 0 }}>
        {deltaDisplay}
      </motion.span>
    </div>
  );
}

function SectorReplay({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="mt-3 glass p-3 space-y-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {sectors.map((s, i) => (
            <SectorBar
              key={s.label}
              sector={s}
              playing={active}
              delay={i * 600}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Experience() {
  if (portfolio.experience.length === 0) return null;

  const [replayIdx, setReplayIdx] = useState<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleReplay = useCallback(
    (idx: number) => {
      if (reducedMotion) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setReplayIdx(idx);
      timerRef.current = setTimeout(() => setReplayIdx(null), 2500);
    },
    [reducedMotion],
  );

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <section id="experience" className="py-28 px-4 relative grid-bg" aria-label="Career experience">
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
            <div className="glass shadow-card p-5 h-fit">
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
                    <div
                      className="glass shadow-card hover-lift p-5 cursor-pointer"
                      onClick={() => handleReplay(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleReplay(idx); } }}
                    >
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
                      <SectorReplay active={replayIdx === idx} reducedMotion={reducedMotion} />
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
