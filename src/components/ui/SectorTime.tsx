"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectorTimeProps {
  className?: string;
  sector: number;
  time: string;
  delta?: string;
  best?: boolean;
  personalBest?: boolean;
}

export function SectorTime({ className, sector, time, delta, best = false, personalBest = false }: SectorTimeProps) {
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowDelta(true), 300 + sector * 200);
    return () => clearTimeout(t);
  }, [sector]);

  const isFaster = delta?.startsWith("-");
  const isSlower = delta?.startsWith("+");

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-sm border transition-all duration-300",
        best
          ? "border-[var(--color-accent-purple)]/40 bg-[var(--color-accent-purple)]/5"
          : personalBest
            ? "border-[var(--color-accent-green)]/40 bg-[var(--color-accent-green)]/5"
            : "border-[var(--border-default)] bg-[var(--bg-elevated)]/50",
        className,
      )}
    >
      <span
        className={cn(
          "text-[9px] font-mono font-bold w-4 text-center",
          best ? "text-[var(--color-accent-purple)]" : personalBest ? "text-[var(--color-accent-green)]" : "text-[var(--text-muted)]",
        )}
      >
        S{sector}
      </span>
      <span className="text-[11px] font-mono tabular-nums text-[var(--text-primary)]">{time}</span>
      {showDelta && delta && (
        <span
          className={cn(
            "text-[9px] font-mono tabular-nums transition-all duration-500",
            isFaster ? "text-[var(--color-accent-green)]" : isSlower ? "text-[var(--accent-primary)]" : "text-[var(--text-muted)]",
          )}
        >
          {delta}
        </span>
      )}
      {best && <span className="text-[7px] font-mono uppercase tracking-wider text-[var(--color-accent-purple)] ml-auto">Best</span>}
      {!best && personalBest && <span className="text-[7px] font-mono uppercase tracking-wider text-[var(--color-accent-green)] ml-auto">PB</span>}
    </div>
  );
}
