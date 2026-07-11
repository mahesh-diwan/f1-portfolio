"use client";

import { useState, useEffect, useMemo } from "react";
import calendar from "@/data/f1-calendar.json";
import standingsData from "@/data/standings.json";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";

interface Race {
  round: number;
  name: string;
  country: string;
  circuit: string;
  date: string;
  flag: string;
  winner?: string;
  team?: string;
  p2?: string;
  p2Team?: string;
  p3?: string;
  p3Team?: string;
  cancelled?: boolean;
}

const races = calendar as Race[];

function calcDiff(target: Date) {
  const now = Date.now();
  const diff = target.getTime() - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function getRaceData() {
  const now = new Date();
  const completed = races
    .filter((r) => new Date(r.date) < now && !r.cancelled && r.winner)
    .sort((a, b) => b.round - a.round);
  const lastRace = completed[0] ?? null;
  const upcoming = races
    .map((r) => ({ ...r, dateObj: new Date(r.date) }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .find((r) => r.dateObj >= now && !r.cancelled);
  return { lastRace, upcoming, now };
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function PitStopCountdown() {
  const { lastRace, upcoming, now } = useMemo(() => getRaceData(), []);
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(
    upcoming ? calcDiff(new Date(upcoming.date)) : null
  );

  const raceDateStr = upcoming?.date ?? null;

  useEffect(() => {
    if (!raceDateStr) return;
    const id = setInterval(() => {
      setCountdown(calcDiff(new Date(raceDateStr)));
    }, 1000);
    return () => clearInterval(id);
  }, [raceDateStr]);

  if (!upcoming) {
    return (
      <section id="pit-stop" className="py-20 px-4 relative grid-bg" aria-label="Race countdown">
        <SectionReveal>
          <div className="max-w-[1400px] mx-auto text-center">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-dim)]">
              SEASON COMPLETE — NEXT SEASON 2027
            </p>
          </div>
        </SectionReveal>
      </section>
    );
  }

  const raceDate = new Date(upcoming.date);
  const isToday =
    raceDate.getDate() === now.getDate() &&
    raceDate.getMonth() === now.getMonth() &&
    raceDate.getFullYear() === now.getFullYear();

  return (
    <section id="pit-stop" className="py-20 px-4 relative grid-bg" aria-label="Race countdown">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass shadow-card p-6 text-center h-full">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] mb-2">
                {isToday ? "RACE WEEKEND" : "NEXT RACE"}
              </p>
              <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">
                {upcoming.flag} {upcoming.name}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] mb-4 font-mono">
                {upcoming.circuit} · {upcoming.country}
              </p>
              {isToday ? (
                <p className="text-2xl font-mono uppercase tracking-[0.2em] text-[var(--accent)]">
                  GRAND PRIX DAY
                </p>
              ) : countdown ? (
                <div className="flex items-center justify-center gap-4 md:gap-6 font-mono">
                  {[
                    { value: countdown.days, label: "DAYS" },
                    { value: countdown.hours, label: "HRS" },
                    { value: countdown.minutes, label: "MIN" },
                    { value: countdown.seconds, label: "SEC" },
                  ].map((unit, i) => (
                    <div key={unit.label} className="flex items-center gap-4 md:gap-6">
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold tabular-nums text-[var(--text-primary)]">
                          {String(unit.value).padStart(2, "0")}
                        </div>
                        <div className="text-xs uppercase tracking-[0.15em] text-[var(--text-dim)]">
                          {unit.label}
                        </div>
                      </div>
                      {i < 3 && (
                        <span className="text-2xl text-[var(--text-dim)] self-start mt-1">:</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {lastRace && (
              <div className="glass shadow-card p-6 text-center h-full">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] mb-2">
                  LAST RACE
                </p>
                <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">
                  {lastRace.flag} {lastRace.name}
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mb-4 font-mono">
                  {lastRace.circuit} · {formatDate(new Date(lastRace.date))}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-sm border border-[var(--color-display-green)]/20 bg-[var(--color-display-green-muted)]">
                    <span className="text-xl">🏆</span>
                    <div className="text-left">
                      <p className="text-xs font-mono text-[var(--text-dim)]">P1</p>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{lastRace.winner}</p>
                      <p className="text-xs font-mono text-[var(--text-secondary)]">{lastRace.team}</p>
                    </div>
                  </div>
                  {lastRace.p2 && (
                    <div className="flex items-center gap-3 px-4 py-2 rounded-sm border border-[var(--color-display-green)]/20 bg-[var(--color-display-green-muted)]">
                      <span className="text-xl">🥈</span>
                      <div className="text-left">
                        <p className="text-xs font-mono text-[var(--text-dim)]">P2</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{lastRace.p2}</p>
                        <p className="text-xs font-mono text-[var(--text-secondary)]">{lastRace.p2Team}</p>
                      </div>
                    </div>
                  )}
                  {lastRace.p3 && (
                    <div className="flex items-center gap-3 px-4 py-2 rounded-sm border border-[var(--color-display-green)]/20 bg-[var(--color-display-green-muted)]">
                      <span className="text-xl">🥉</span>
                      <div className="text-left">
                        <p className="text-xs font-mono text-[var(--text-dim)]">P3</p>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{lastRace.p3}</p>
                        <p className="text-xs font-mono text-[var(--text-secondary)]">{lastRace.p3Team}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)]">2026 SEASON</span>
              <span className="text-xs font-mono text-[var(--text-secondary)]">Round {standingsData.seasonProgress.completed} of {standingsData.seasonProgress.total}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--color-display-green-muted)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-display-green)] transition-all"
                style={{ width: `${(standingsData.seasonProgress.completed / standingsData.seasonProgress.total) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="md:col-span-2 glass shadow-card p-6">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] mb-4">DRIVER STANDINGS</p>
              <div className="flex flex-col gap-1">
                {standingsData.drivers.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-[var(--color-display-green-muted)] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 text-center text-sm font-mono ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-[var(--text-dim)]'}`}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{d.name}</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-[var(--text-primary)]">{d.points}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass shadow-card p-6">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] mb-4">CONSTRUCTORS</p>
              <div className="flex flex-col gap-1">
                {standingsData.constructors.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-[var(--color-display-green-muted)] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 text-center text-sm font-mono ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-[var(--text-dim)]'}`}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{c.name}</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-[var(--text-primary)]">{c.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
