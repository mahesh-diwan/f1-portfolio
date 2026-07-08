"use client";

import { cn } from "@/lib/utils";

type Compound = "soft" | "medium" | "hard" | "intermediate" | "wet";

const compoundConfig: Record<Compound, { label: string; color: string; ringColor: string }> = {
  soft: { label: "SOFT", color: "bg-[var(--accent-primary)]", ringColor: "border-[var(--accent-primary)]" },
  medium: { label: "MEDIUM", color: "bg-[var(--color-accent-gold)]", ringColor: "border-[var(--color-accent-gold)]" },
  hard: { label: "HARD", color: "bg-[var(--text-primary)]", ringColor: "border-[var(--text-primary)]" },
  intermediate: { label: "INTER", color: "bg-[var(--color-accent-green)]", ringColor: "border-[var(--color-accent-green)]" },
  wet: { label: "WET", color: "bg-[var(--color-accent-blue)]", ringColor: "border-[var(--color-accent-blue)]" },
};

interface TireCompoundProps {
  compound: Compound;
  className?: string;
}

export function TireCompound({ compound, className }: TireCompoundProps) {
  const config = compoundConfig[compound];

  return (
    <div className={cn("flex items-center gap-1.5", className)} role="status" aria-label={`Tire compound: ${compound}`}>
      <div className={cn("w-3 h-3 rounded-full border-2", config.color, config.ringColor)} aria-hidden="true" />
      <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{config.label}</span>
    </div>
  );
}
