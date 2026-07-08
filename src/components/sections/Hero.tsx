"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import { usePageTransition } from "@/lib/transition-context";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { StatusIndicator } from "@/components/ui/StatusIndicator";

function HeroStat({ label, value, accent, prefix }: { label: string; value: number; accent: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startTime = useRef<number | null>(null);
  const animFrame = useRef<number>(0);
  const duration = 1200;

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(animate);
      }
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [value]);

  return (
    <motion.div
      ref={ref}
      className="flex-1 min-w-[140px]"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <TelemetryPanel label={label}>
        <div className="flex flex-col" role="status" aria-label={`${label}: ${value}`}>
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono" />
          <span className="font-mono tabular-nums tracking-tight text-3xl md:text-4xl" style={{ color: accent }}>
            {prefix && <span className="text-sm text-[var(--text-muted)] mr-0.5">{prefix}</span>}
            {display}
          </span>
        </div>
      </TelemetryPanel>
    </motion.div>
  );
}

export function Hero() {
  const [scrollPct, setScrollPct] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { navigateTo, isAnimating } = usePageTransition();

  const handleNav = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (isAnimating) return;
    navigateTo(id);
  }, [navigateTo, isAnimating]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = portfolio.links;

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* F1 Team inspired background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ferrari red glow — top left */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#dc0000]/[0.04] blur-[120px]" />
        {/* Red Bull blue glow — top right */}
        <div className="absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full bg-[#1e3a8a]/[0.05] blur-[100px]" />
        {/* Mercedes teal glow — center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#00d2be]/[0.03] blur-[120px]" />
        {/* Red Bull yellow accent */}
        <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-[#ffd700]/[0.02] blur-[80px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Status bar */}
        <div className="flex items-center justify-center gap-5 mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <StatusIndicator status="active" label="ONLINE" />
          <span className="w-px h-3 bg-[var(--border-default)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase">{portfolio.location}</span>
          <span className="w-px h-3 bg-[var(--border-default)]" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--accent)] uppercase">{portfolio.role}</span>
        </div>

        {/* Name — THE easter egg lives here */}
        <div className="text-center mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="heading-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[var(--text-primary)] hero-name-glow">
            <EasterEgg message="Tifosi, Bulls & Silver Arrows unite! 🐎🐂⭐" icon="🏎️" trigger="double-click" size="lg">
              {portfolio.titleName}
            </EasterEgg>
          </h1>
        </div>

        {/* Role tagline with F1 team color bars */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex gap-0.5" aria-hidden="true">
            <span className="w-4 h-[2px] bg-[#dc0000]" />
            <span className="w-4 h-[2px] bg-[#1e3a8a]" />
            <span className="w-4 h-[2px] bg-[#00d2be]" />
          </div>
          <p className="text-sm sm:text-base font-mono text-[var(--accent)] tracking-[0.25em] uppercase">
            <TypingEffect text={portfolio.role} speed={50} delay={800} />
          </p>
          <div className="flex gap-0.5" aria-hidden="true">
            <span className="w-4 h-[2px] bg-[#00d2be]" />
            <span className="w-4 h-[2px] bg-[#1e3a8a]" />
            <span className="w-4 h-[2px] bg-[#dc0000]" />
          </div>
        </div>

        {/* Bio */}
        <p
          className="text-center text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {portfolio.bioShort}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <HeroStat label="PROJECTS" value={portfolio.projects.length} accent="var(--color-accent-gold)" prefix="#" />
          <HeroStat label="EXPERIENCE" value={portfolio.experience.length} accent="var(--color-accent-blue)" prefix="#" />
          <HeroStat label="SKILLS" value={portfolio.skills.reduce((a, g) => a + g.items.length, 0)} accent="var(--color-accent-teal)" prefix="#" />
          <HeroStat label="CONFIDENCE" value={98} accent="var(--color-accent-green)" prefix="" />
        </div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {links.github && (
            <GlowEffect color="var(--accent-primary)" size={140}>
              <motion.a
                href={links.github} target="_blank" rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="GitHub"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span className="text-[10px]">GitHub</span>
              </motion.a>
            </GlowEffect>
          )}
          {links.linkedin && (
            <GlowEffect color="var(--color-accent-blue)" size={140}>
              <motion.a
                href={links.linkedin} target="_blank" rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span className="text-[10px]">LinkedIn</span>
              </motion.a>
            </GlowEffect>
          )}
          {links.instagram && (
            <GlowEffect color="var(--accent)" size={140}>
              <motion.a
                href={links.instagram} target="_blank" rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Instagram"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="text-[10px]">Instagram</span>
              </motion.a>
            </GlowEffect>
          )}
          {links.resume && (
            <motion.a
              href={links.resume} target="_blank" rel="noopener noreferrer"
              className="hero-social-link hero-social-link--accent"
              aria-label="View resume"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span className="text-[10px]">Resume</span>
            </motion.a>
          )}
          <motion.button
            onClick={(e) => handleNav(e, "projects")}
            className="hero-social-link hero-social-link--gold"
            aria-label="View projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-[10px]">View Projects</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        aria-hidden="true"
      >
        <span className="text-[7px] font-mono uppercase tracking-[0.25em] text-[var(--text-muted)]">SCROLL</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--text-muted)] animate-bounce">
          <path d="M7 2v10M3.5 8.5L7 12l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
