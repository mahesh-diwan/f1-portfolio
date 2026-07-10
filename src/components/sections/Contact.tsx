"use client";

import { useState } from "react";
import { portfolio } from "@/lib/portfolio";
import { StatusIndicator } from "@/components/ui/primitives/StatusIndicator";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function Contact() {
  const reducedMotion = useReducedMotion() ?? false;
  const [radioBurst, setRadioBurst] = useState<number | null>(null);

  const handleRadio = (idx: number) => {
    if (reducedMotion) return;
    setRadioBurst(idx);
    setTimeout(() => setRadioBurst(null), 1800);
  };

  const channels = [
    { label: "GITHUB", handle: `@${portfolio.githubUsername}`, url: portfolio.links.github, icon: "⬆" },
    { label: "LINKEDIN", handle: "Mahesh Diwan", url: portfolio.links.linkedin, icon: "⬆" },
    { label: "INSTAGRAM", handle: "@mahesh_diwan1", url: portfolio.links.instagram, icon: "⬆" },
    { label: "X", handle: "@mahesh_diwan1", url: portfolio.links.twitter, icon: "⬆" },
    { label: "HASHNODE", handle: "@mahesh1215", url: portfolio.links.hashnode, icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 7 22 17 12 22 2 17 2 7 12 2"/>
      </svg>
    )},
    { label: "MEDIUM", handle: "mahesh1215", url: portfolio.links.medium, icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V4l6 8 6-8v16"/>
      </svg>
    )},
    { label: "LEETCODE", handle: "mahesh_diwan", url: portfolio.links.leetcode, icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 4l-8 8 8 8M14 4l8 8-8 8"/>
      </svg>
    )},
  ];

  return (
    <section id="contact" className="py-20 px-4 relative grid-bg" aria-label="Contact">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="SECTOR 6/6" right={`${Object.keys(portfolio.links).length} CHANNELS`} title="Communication" />

          <div className="glass shadow-card p-5 mb-4">
            <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Direct Line</p>
            <div className="flex items-center gap-3">
              <StatusIndicator status="active" label="AVAILABLE" />
              <a href={`mailto:${portfolio.email}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition-colors break-all">
                {portfolio.email}
              </a>
            </div>
          </div>

          <div className="glass shadow-card p-5 mb-4">
            <p className="text-[12px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Location</p>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-[13px] text-[var(--text-secondary)] font-mono">{portfolio.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {channels.map((ch, idx) => (
              <a key={ch.label} href={ch.url} target="_blank" rel="noopener noreferrer"
                  onClick={() => handleRadio(idx)}
                  className="glass shadow-card hover-lift p-5 block hover:bg-[var(--bg-elevated)] transition-colors group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Channel</span>
                    <span className="text-[12px] text-[var(--text-muted)] font-mono">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">{ch.icon}</span>
                    <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-mono">{ch.handle}</span>
                  </div>

                  {radioBurst === idx && (
                    <div className="absolute inset-0 z-20 pointer-events-none animate-fade-in">
                      <div className="absolute inset-0 bg-[var(--accent)]/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-mono font-bold text-[var(--accent)] tracking-widest bg-[var(--bg-elevated)]/90 px-2 py-1 rounded">
                          ROGER THAT
                        </span>
                      </div>
                    </div>
                  )}
                </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
