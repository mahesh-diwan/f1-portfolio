"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "inactive" | "warning" | "error";
  label: string;
  className?: string;
}

const statusDot: Record<string, string> = {
  active: "bg-[var(--color-accent-green)]",
  inactive: "bg-[var(--text-dim)]",
  warning: "bg-[var(--color-accent-gold)]",
  error: "bg-[var(--accent)]",
};

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
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
            statusDot[status],
          )}
        />
      </span>
      <span className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
        {label}
      </span>
    </div>
  );
}
