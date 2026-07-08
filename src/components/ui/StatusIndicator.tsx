"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "active" | "inactive" | "warning" | "error";
  label: string;
  className?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-[var(--color-accent-green)] shadow-[0_0_8px_rgba(152,195,121,0.5)]",
  inactive: "bg-[var(--text-dim)]",
  warning: "bg-[var(--color-accent-gold)] shadow-[0_0_8px_rgba(229,192,123,0.5)]",
  error: "bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-glow)]",
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
      <span
        className={cn(
          "inline-block w-1.5 h-1.5 rounded-full flex-shrink-0",
          statusColors[status],
        )}
        aria-hidden="true"
      />
      <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
        {label}
      </span>
    </div>
  );
}
