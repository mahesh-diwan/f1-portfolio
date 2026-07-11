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
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {portfolio.name} &mdash; {portfolio.role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--color-display-green)] animate-pulse" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--text-muted)]">
                PIT WALL &mdash; STANDING BY
              </span>
            </div>
            <EasterEgg message="Built with Next.js, Tailwind & F1 telemetry vibes" icon="🛠️" trigger="double-click">
              <p className="text-xs font-mono text-[var(--text-dim)] cursor-pointer">
                &copy; {year} ALL RIGHTS RESERVED
              </p>
            </EasterEgg>
          </div>
        </div>
      </div>
    </footer>
  );
}
