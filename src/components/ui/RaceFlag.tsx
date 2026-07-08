"use client";

import { cn } from "@/lib/utils";

type FlagType = "green" | "checkered" | "yellow" | "red" | "blue";

interface RaceFlagProps {
  type: FlagType;
  className?: string;
  label?: string;
  animate?: boolean;
}

const flagColors: Record<FlagType, string> = {
  green: "bg-[var(--color-accent-green)]",
  checkered: "bg-[var(--text-primary)]",
  yellow: "bg-[var(--color-accent-gold)]",
  red: "bg-[var(--accent-primary)]",
  blue: "bg-[var(--color-accent-blue)]",
};

export function RaceFlag({ type, className, label, animate = false }: RaceFlagProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} role="status" aria-label={`${type} flag`}>
      <div
        className={cn(
          "relative w-4 h-3 flex-shrink-0 overflow-hidden rounded-[1px] border border-[var(--border-default)]",
          animate && "animate-flag-wave",
        )}
      >
        {type === "checkered" ? (
          <div className="grid grid-cols-4 grid-rows-3 w-full h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  (Math.floor(i / 4) + i) % 2 === 0 ? "bg-[var(--bg-base)]" : "bg-[var(--text-primary)]",
                )}
              />
            ))}
          </div>
        ) : (
          <div className={cn("w-full h-full", flagColors[type])} />
        )}
        {animate && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        )}
      </div>
      {label && (
        <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{label}</span>
      )}
    </div>
  );
}
