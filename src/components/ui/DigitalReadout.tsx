"use client";

import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

interface DigitalReadoutProps {
  value: string | number;
  label: string;
  className?: string;
  accent?: string;
  large?: boolean;
  prefix?: string;
  trend?: "up" | "down" | "stable";
  animated?: boolean;
}

export function DigitalReadout({
  value,
  label,
  className,
  accent = "#dc0000",
  large,
  prefix,
  trend,
  animated = false,
}: DigitalReadoutProps) {
  const numericValue = typeof value === "number" ? value : parseInt(value as string);

  return (
    <div className={cn("flex flex-col", className)} role="status" aria-label={`${label}: ${value}`}>
      <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
        {label}
      </span>
      <span
        className={cn(
          "font-mono tabular-nums tracking-tight",
          large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
        )}
        style={{ color: accent }}
      >
        {prefix && (
          <span className="text-sm text-[var(--text-muted)] mr-0.5">{prefix}</span>
        )}
        {animated && !isNaN(numericValue) ? (
          <AnimatedNumber value={numericValue} duration={1000} />
        ) : (
          value
        )}
        {trend && (
          <span
            className={cn(
              "inline-block ml-1 text-sm",
              trend === "up" && "text-[var(--color-accent-green)]",
              trend === "down" && "text-[var(--accent-primary)]",
              trend === "stable" && "text-[var(--color-accent-gold)]",
            )}
          >
            {trend === "up" && "\u2191"}
            {trend === "down" && "\u2193"}
            {trend === "stable" && "\u2192"}
          </span>
        )}
      </span>
    </div>
  );
}