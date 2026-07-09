"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import { StatusIndicator } from "@/components/ui/primitives/StatusIndicator";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

function HeroStat({ label, value, accent }: { label: string; value: number; accent: string }) {
  const [display, setDisplay] = useState(0);
  const startTime = useRef<number | null>(null);
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-1">
        {label}
      </div>
      <div className="text-2xl font-bold font-mono tabular-nums" style={{ color: accent }}>
        {display}
      </div>
    </div>
  );
}

export function Hero() {
  const stats = [
    { label: "PROJECTS", value: portfolio.projects.length, accent: "var(--color-accent-gold)" },
    { label: "EXPERIENCE", value: portfolio.experience.length, accent: "var(--color-accent-teal)" },
    { label: "SKILLS", value: portfolio.skills.reduce((a, g) => a + g.items.length, 0), accent: "var(--color-accent-blue)" },
    { label: "CONFIDENCE", value: 98, accent: "var(--color-display-green)" },
  ];

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden" aria-label="Hero introduction">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

      {/* Status indicator — top right */}
      <div className="absolute top-6 right-6 z-10">
        <StatusIndicator status="active" label="ONLINE" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Role label */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {portfolio.role}
        </motion.p>

        {/* Name with scan line */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--text-primary)] tracking-tight">
            {portfolio.titleName}
          </h1>
          {/* Scan line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent animate-scanline opacity-60" aria-hidden="true" />
        </motion.div>

        {/* F1 subtitle */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-8 h-px bg-[var(--accent)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-mono">
            Race Engineer
          </span>
          <div className="w-8 h-px bg-[var(--accent)]" />
        </motion.div>

        {/* Telemetry strip */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
              <HeroStat label={stat.label} value={stat.value} accent={stat.accent} />
              {i < stats.length - 1 && (
                <div className="w-px h-8 bg-[var(--border-default)]" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Social links — icon only */}
        <motion.div
          className="flex items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <EasterEgg message="GitHub: Where code meets the track!" icon="🏁" trigger="click">
            <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm font-mono"
              aria-label="GitHub">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </EasterEgg>
          <a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm font-mono"
            aria-label="LinkedIn">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={portfolio.links.instagram} target="_blank" rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm font-mono"
            aria-label="Instagram">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href={portfolio.links.resume} target="_blank" rel="noopener noreferrer"
            className="text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors text-sm font-mono border-b border-[var(--accent)]"
            aria-label="View resume">
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--text-dim)] font-mono block mb-2">
          Scroll
        </span>
        <div className="w-4 h-6 border border-[var(--border-default)] rounded-full mx-auto flex justify-center pt-1">
          <motion.div
            className="w-1 h-1.5 bg-[var(--text-dim)] rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
