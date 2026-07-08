"use client";

import { cn } from "@/lib/utils";

interface PerformanceMeterProps {
  value: number;
  label: string;
  color?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PerformanceMeter({
  value,
  label,
  color = "#dc0000",
  className,
  size = "md",
}: PerformanceMeterProps) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("flex flex-col gap-1", className)} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
          {label}
        </span>
        <span className="font-mono tabular-nums text-xs text-[var(--text-primary)]">
          {clamped}%
        </span>
      </div>
      <div
        className={cn(
          "w-full bg-[var(--bg-inset)] rounded-sm overflow-hidden",
          size === "sm" && "h-1",
          size === "md" && "h-1.5",
          size === "lg" && "h-2",
        )}
      >
        <div
          className="h-full rounded-sm transition-all duration-1000 ease-out"
          style={{
            width: `${clamped}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}
