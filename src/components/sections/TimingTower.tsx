"use client";

import ownRepoData from "@/data/github-own-repos-cached.json";
import type { RepoSummary } from "@/data/repo-summary";
import { TimingRow } from "@/components/ui/f1/TimingRow";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const repos = (ownRepoData as RepoSummary[]).sort((a, b) => b.stars - a.stars);

export function TimingTower() {
  if (repos.length === 0) {
    return (
      <section id="timing" className="py-20 px-4 relative grid-bg" aria-label="GitHub timing tower">
        <SectionReveal>
          <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-dim)]">NO DATA — PIT LANE</p>
          </div>
        </SectionReveal>
      </section>
    );
  }

  return (
    <section id="timing" className="py-20 px-4 relative grid-bg" aria-label="GitHub timing tower">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="SECTOR 5/6" right={`${repos.length} REPOS`} title="Timing Tower" />

          <div className="glass shadow-card overflow-x-auto">
            <div className="flex items-center gap-2 h-10 px-3 text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
              <span className="w-6 text-center">POS</span>
              <span className="flex-1">DRIVER</span>
              <span className="w-14 text-right">LAPS</span>
              <span className="w-14 text-right hidden md:block">GAP</span>
              <span className="w-10 text-right hidden md:block">S1</span>
              <span className="w-12 text-right hidden md:block">S2</span>
              <span className="w-16 text-right">TIRE</span>
            </div>

            {repos.map((repo, i) => (
              <TimingRow key={repo.name} repo={repo} rank={i + 1} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
