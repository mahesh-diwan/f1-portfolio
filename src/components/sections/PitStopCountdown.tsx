"use client";

import { useState, useEffect } from "react";
import calendar from "@/data/f1-calendar.json";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";

interface Race {
  round: number;
  name: string;
  country: string;
  circuit: string;
  date: string;
  flag: string;
}

const races = calendar as Race[];

function calcDiff(target: Date) {
  const now = Date.now();
  const diff = target.getTime() - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return { days, hours, minutes };
}

function findNextRace() {
  const now = new Date();
  const upcoming = races
    .map((r) => ({ ...r, dateObj: new Date(r.date) }))
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .find((r) => r.dateObj >= now);

  if (!upcoming) return null;

  const raceDate = new Date(upcoming.date);
  const today = new Date();
  const isToday =
    raceDate.getDate() === today.getDate() &&
    raceDate.getMonth() === today.getMonth() &&
    raceDate.getFullYear() === today.getFullYear();

  return { race: upcoming, raceDate, status: (isToday ? "today" : "upcoming") as "upcoming" | "today" };
}

export function PitStopCountdown() {
  const initial = findNextRace();
  const [nextRace] = useState<Race | null>(initial?.race ?? null);
  const [status] = useState<"upcoming" | "today" | "over">(initial?.status ?? "over");
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number } | null>(
    initial ? calcDiff(initial.raceDate) : null
  );

  useEffect(() => {
    const fresh = findNextRace();
    if (!fresh) return;
    const id = setInterval(() => {
      setCountdown(calcDiff(fresh.raceDate));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  if (!nextRace || status === "over") {
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

  return (
    <section id="pit-stop" className="py-20 px-4 relative grid-bg" aria-label="Race countdown">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="glass shadow-card p-6 md:p-8 text-center">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--text-dim)] mb-2">
              {status === "today" ? "RACE WEEKEND" : "NEXT RACE"}
            </p>
            <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">
              {nextRace.flag} {nextRace.name}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mb-6 font-mono">
              {nextRace.circuit} · {nextRace.country}
            </p>
            {status === "today" ? (
              <p className="text-2xl font-mono uppercase tracking-[0.2em] text-[var(--accent)]">
                GRAND PRIX DAY
              </p>
            ) : countdown ? (
              <div className="flex items-center justify-center gap-4 md:gap-6 font-mono">
                {[
                  { value: countdown.days, label: "DAYS" },
                  { value: countdown.hours, label: "HRS" },
                  { value: countdown.minutes, label: "MIN" },
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
                    {i < 2 && (
                      <span className="text-2xl text-[var(--text-dim)] self-start mt-1">:</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
