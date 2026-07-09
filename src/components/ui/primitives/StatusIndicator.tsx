"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "inactive" | "warning" | "error";
  label: string;
  className?: string;
}

const statusColors: Record<string, { dot: string; ringColor: string }> = {
  active: {
    dot: "bg-[var(--color-accent-green)]",
    ringColor: "var(--color-accent-green)",
  },
  inactive: { dot: "bg-[var(--text-dim)]", ringColor: "" },
  warning: {
    dot: "bg-[var(--color-accent-gold)]",
    ringColor: "var(--color-accent-gold)",
  },
  error: {
    dot: "bg-[var(--accent)]",
    ringColor: "var(--accent)",
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
          )}
          style={colors.ringColor ? { "--ring-color": colors.ringColor, animation: "glow-ring 2s ease-in-out infinite" } as React.CSSProperties : undefined}
        />
      </span>
      <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
        {label}
      </span>
    </div>
  );
}
