"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevCounterProps {
  value: number;
  max?: number;
  className?: string;
}

export function RevCounter({ value, max = 100, className }: RevCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animated, setAnimated] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const clamped = Math.min(Math.max(value, 0), max);
  const segments = 12;
  const activeSegments = Math.round((animated / max) * segments);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const duration = 1200;
    const step = 16;
    const total = duration / step;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      const progress = Math.min(count / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = eased * clamped;
      setAnimated(Math.round(current));
      if (progress >= 1) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, clamped]);

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-1", className)} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={max} aria-label="RPM">
      <div className="flex gap-[2px] items-end h-10">
        {Array.from({ length: segments }).map((_, i) => {
          const active = i < activeSegments;
          const isRed = i >= segments - 3;
          return (
            <div
              key={i}
              className={cn(
                "w-[5px] rounded-t-sm transition-all duration-500",
                active
                  ? isRed
                    ? "bg-[var(--accent-primary)] shadow-[0_0_6px_var(--accent-glow)]"
                    : "bg-[var(--color-accent-teal)] shadow-[0_0_4px_var(--shadow-glow-teal)]"
                  : "bg-[var(--bg-inset)]",
              )}
              style={{
                height: `${((i + 1) / segments) * 100}%`,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          );
        })}
      </div>
      <span className="text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)]">RPM</span>
    </div>
  );
}
