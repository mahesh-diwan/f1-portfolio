"use client";

import { cn } from "@/lib/utils";

interface TelemetryPanelProps {
  children: React.ReactNode;
  label?: string;
  value?: string;
  className?: string;
  accent?: string;
  fullHeight?: boolean;
  glass?: boolean;
}

export function TelemetryPanel({
  children,
  label,
  value,
  className,
  accent,
  fullHeight,
  glass = false,
}: TelemetryPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-md overflow-hidden transition-all duration-300",
        glass
          ? "glass hover:border-[var(--border-strong)]"
          : "border border-[var(--border-default)] bg-gradient-to-b from-[var(--bg-surface)] via-color-[var(--bg-elevated)]/80 to-[var(--bg-surface)] hover:border-[var(--border-strong)]",
        fullHeight && "h-full",
        className,
      )}
      role="region"
      aria-label={label ?? "Telemetry panel"}
    >
      {accent && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${accent} 15%, ${accent} 85%, transparent 100%)`,
            boxShadow: `0 0 12px ${accent}55`,
          }}
          aria-hidden="true"
        />
      )}
      {(label || value) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border-default)]/60 select-none">
          {label && (
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium">{label}</span>
          )}
          {value && (
            <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-wider">{value}</span>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
