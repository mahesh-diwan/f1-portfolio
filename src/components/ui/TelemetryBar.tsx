"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TelemetryBarProps {
  value: number;
  label: string;
  color?: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function TelemetryBar({
  value,
  label,
  color = "#dc0000",
  className,
  size = "md",
}: TelemetryBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const startTime = useRef<number | null>(null);
  const animFrame = useRef<number>(0);
  const duration = 1200;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedWidth(eased * value);
      setAnimatedValue(Math.round(eased * value));
      if (progress < 1) {
        animFrame.current = requestAnimationFrame(animate);
      }
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${value}%`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">
          {label}
        </span>
        <span
          className="font-mono tabular-nums text-xs font-bold"
          style={{ color }}
        >
          {animatedValue}%
        </span>
      </div>
      <div
        className={cn(
          "w-full bg-[var(--bg-inset)] rounded-sm overflow-hidden",
          size === "xs" && "h-[2px]",
          size === "sm" && "h-1",
          size === "md" && "h-1.5",
          size === "lg" && "h-2",
        )}
      >
        <div
          className="h-full rounded-sm transition-none"
          style={{
            width: `${animatedWidth}%`,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}66, inset 0 1px 0 rgba(255,255,255,0.15)`,
          }}
        />
      </div>
    </div>
  );
}
