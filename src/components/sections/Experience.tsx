"use client";

import { portfolio } from "@/lib/portfolio";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { RaceTimeline } from "@/components/ui/RaceTimeline";
import { SectorTime } from "@/components/ui/SectorTime";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EasterEgg } from "@/components/ui/EasterEgg";

const sectors = ["FORMATION LAP", "GREEN FLAG", "SECTOR 1", "SECTOR 2", "SECTOR 3"];

export function Experience() {
  const items = portfolio.experience.map((exp, idx) => ({
    id: exp.id,
    date: exp.date,
    title: exp.role,
    subtitle: exp.company,
    description: exp.desc,
    tags: exp.tags,
    current: exp.current,
    sector: sectors[idx] ?? `SECTOR ${idx + 1}`,
  }));

  if (items.length === 0) return null;

  const yearStart = portfolio.experience.reduce((acc, e) => {
    const m = e.date.match(/(\d{4})/);
    return m ? Math.min(acc, parseInt(m[1])) : acc;
  }, new Date().getFullYear());
  const yearEnd = portfolio.experience.reduce((acc, e) => {
    if (e.current) return new Date().getFullYear();
    const m = e.date.match(/(\d{4})/);
    return m ? Math.max(acc, parseInt(m[1])) : acc;
  }, 0);
  const seasons = Math.max(0, yearEnd - yearStart + 1);

  return (
    <section id="experience" className="py-24 px-4 relative" aria-label="Career experience">
      <SectionReveal>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="section-accent-bar bg-gradient-to-b from-[var(--accent-primary)] to-[var(--color-accent-gold)]" aria-hidden="true" />
          <div>
            <p className="label-sm tracking-[0.2em]">RACE HISTORY</p>
            <h2 className="heading-md text-3xl sm:text-4xl text-[var(--text-primary)] mt-0.5">Career Timeline</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <TelemetryPanel label="DRIVER STATS" accent="var(--accent-primary)" className="lg:col-span-4">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <EasterEgg message="Every position on the grid counts — just like every commit! 🏆" icon="🏆" trigger="click" size="lg">
                  <div className="text-center p-4 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-default)]/60 hover-glow-accent cursor-pointer">
                    <span className="text-3xl font-mono font-bold text-[var(--accent-primary)] tabular-nums">
                      {portfolio.experience.length}
                    </span>
                    <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1.5">POSITIONS</p>
                  </div>
                </EasterEgg>
                <div className="text-center p-4 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-default)]/60 hover-glow-accent">
                  <span className="text-3xl font-mono font-bold text-[var(--color-accent-teal)] tabular-nums">{seasons}</span>
                  <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-[var(--text-muted)] mt-1.5">SEASONS</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-[8px] font-mono uppercase tracking-[0.12em] text-[var(--text-dim)]">BEST SECTORS</p>
                <SectorTime sector={1} time="0:31.442" delta="-0.234" personalBest />
                <SectorTime sector={2} time="0:28.176" delta="+0.087" />
                <SectorTime sector={3} time="0:25.931" delta="-0.412" best />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(new Set(portfolio.experience.flatMap((e) => e.tags))).slice(0, 8).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-[var(--bg-elevated)] text-[var(--text-muted)] rounded-sm border border-[var(--border-default)]/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TelemetryPanel>

          <TelemetryPanel label="CAREER LAPS" className="lg:col-span-8">
            <RaceTimeline items={items} />
          </TelemetryPanel>
        </div>
      </div>
      </SectionReveal>
    </section>
  );
}
