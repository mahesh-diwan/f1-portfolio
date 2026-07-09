"use client";

import { portfolio } from "@/lib/portfolio";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass border-t border-[var(--border-default)] pt-0" role="contentinfo">
      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--accent)] via-[var(--color-accent-gold)] to-[var(--color-accent-teal)]" aria-hidden="true" />
      <div className="py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <EasterEgg message="Ping: 0.001ms — Server is alive!" icon="💚" trigger="click">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse cursor-pointer" aria-hidden="true" />
            </EasterEgg>
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {portfolio.name} &mdash; {portfolio.role}
            </span>
          </div>
          <EasterEgg message="Built with Next.js, Tailwind, Framer Motion & F1 telemetry vibes" icon="🛠️" trigger="double-click">
            <p className="text-[9px] font-mono text-[var(--text-dim)] cursor-pointer">
              &copy; {year} ALL RIGHTS RESERVED
            </p>
          </EasterEgg>
        </div>
      </div>
    </footer>
  );
}
