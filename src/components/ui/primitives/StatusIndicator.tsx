"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "inactive" | "warning" | "error";
  label: string;
  className?: string;
}

const statusColors: Record<string, { dot: string; ring: string }> = {
  active: {
    dot: "bg-[var(--color-accent-green)]",
    ring: "shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent-green)_50%,transparent)]",
  },
  inactive: { dot: "bg-[var(--text-dim)]", ring: "" },
  warning: {
    dot: "bg-[var(--color-accent-gold)]",
    ring: "shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent-gold)_50%,transparent)]",
  },
  error: {
    dot: "bg-[var(--accent-primary)]",
    ring: "shadow-[0_0_8px_var(--accent-glow)]",
  },
};

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
  const colors = statusColors[status];
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="status"
      aria-label={`${label}: ${status}`}
    >
      <span className="relative inline-flex h-2 w-2 flex-shrink-0" aria-hidden="true">
        {status === "active" && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-green)] opacity-75 animate-ping" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            colors.dot,
            colors.ring,
          )}
        />
      </span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
        {label}
      </span>
    </div>
  );
}
