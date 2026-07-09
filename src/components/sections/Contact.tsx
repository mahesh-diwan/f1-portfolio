"use client";

import { portfolio } from "@/lib/portfolio";
import { StatusIndicator } from "@/components/ui/primitives/StatusIndicator";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

export function Contact() {
  const channels = [
    { label: "GITHUB", handle: `@${portfolio.githubUsername}`, url: portfolio.links.github, icon: "⬆" },
    { label: "LINKEDIN", handle: "Mahesh Diwan", url: portfolio.links.linkedin, icon: "⬆" },
    { label: "INSTAGRAM", handle: "@mahesh_diwan1", url: portfolio.links.instagram, icon: "⬆" },
    { label: "X", handle: "@mahesh_diwan1", url: portfolio.links.twitter, icon: "⬆" },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative grid-bg" aria-label="Contact">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-[var(--accent)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Pit Wall</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Communication</h2>
            </div>
          </div>

          {/* Direct Line */}
          <div className="glass shadow-card p-5 mb-4">
            <p className="text-[8px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-3">Direct Line</p>
            <div className="flex items-center gap-3">
              <StatusIndicator status="active" label="AVAILABLE" />
              <a href={`mailto:${portfolio.email}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono transition-colors">
                {portfolio.email}
              </a>
            </div>
          </div>

          {/* Channels grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {channels.map((ch) => (
              <EasterEgg key={ch.label} message={`Opening ${ch.label} channel...`} icon="📡" trigger="click">
                <a href={ch.url} target="_blank" rel="noopener noreferrer"
                  className="glass shadow-card hover-lift p-4 block hover:bg-[var(--bg-elevated)] transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[7px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Channel</span>
                    <span className="text-[7px] text-[var(--text-muted)] font-mono">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">{ch.icon}</span>
                    <span className="text-[10px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-mono">{ch.handle}</span>
                  </div>
                </a>
              </EasterEgg>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
