"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LapCounterProps {
  className?: string;
  totalLaps: number;
  currentLap?: number;
  onLapChange?: (lap: number) => void;
}

export function LapCounter({ className, totalLaps, currentLap: controlledLap, onLapChange }: LapCounterProps) {
  const [internalLap, setInternalLap] = useState(1);
  const currentLap = controlledLap ?? internalLap;

  useEffect(() => {
    if (controlledLap !== undefined) return;
    const interval = setInterval(() => {
      setInternalLap((prev) => (prev < totalLaps ? prev + 1 : 1));
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [totalLaps, controlledLap]);

  useEffect(() => {
    onLapChange?.(currentLap);
  }, [currentLap, onLapChange]);

  const progress = (currentLap / totalLaps) * 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex flex-col">
        <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)]">LAP</span>
        <div className="flex items-baseline gap-0.5">
          <span className="font-mono font-bold text-sm tabular-nums text-[var(--text-primary)]">{String(currentLap).padStart(2, "0")}</span>
          <span className="text-[9px] font-mono text-[var(--text-dim)]">/ {String(totalLaps).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="flex-1 h-[18px] bg-[var(--bg-elevated)] rounded-sm border border-[var(--border-default)] overflow-hidden min-w-[40px]">
        <div
          className="h-full bg-gradient-to-r from-f1-red to-f1-gold rounded-sm transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
