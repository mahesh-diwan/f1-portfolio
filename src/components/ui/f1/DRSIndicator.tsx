"use client";

import { cn } from "@/lib/utils";

interface DRSIndicatorProps {
  active: boolean;
  className?: string;
  detected?: boolean;
}

export function DRSIndicator({ active, className, detected }: DRSIndicatorProps) {
  const isDetected = detected ?? active;
  return (
    <div className={cn("flex items-center gap-1.5", className)} role="status" aria-label={`DRS ${active ? "active" : "inactive"}`}>
      <span
        className={cn(
          "text-[12px] font-mono uppercase tracking-wider font-bold transition-all duration-300",
          active ? "text-[var(--color-accent-green)]" : isDetected ? "text-[var(--color-accent-gold)]" : "text-[var(--text-dim)]",
        )}
      >
        DRS
      </span>
      <span className="relative inline-flex items-center justify-center" aria-hidden="true">
        <span
          className={cn(
            "inline-block w-[6px] h-[6px] rounded-full transition-all duration-300",
            active
              ? "bg-[var(--color-accent-green)] shadow-[0_0_8px_rgba(102,217,160,0.8)]"
              : isDetected
                ? "bg-[var(--color-accent-gold)] shadow-[0_0_6px_var(--shadow-glow-gold)]"
                : "bg-[var(--bg-inset)]",
          )}
        />
        {active && (
          <span className="absolute inset-0 inline-block w-[6px] h-[6px] rounded-full bg-[var(--color-accent-green)] animate-ping opacity-40" />
        )}
      </span>
      <span
        className={cn(
          "text-[12px] font-mono uppercase tracking-wider transition-all duration-300",
          active ? "text-[var(--color-accent-green)]" : "text-[var(--text-dim)]",
        )}
      >
        {active ? "OVERTAKE" : isDetected ? "<1s" : "OFF"}
      </span>
    </div>
  );
}
