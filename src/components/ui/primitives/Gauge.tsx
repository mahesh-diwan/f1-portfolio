"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface GaugeProps {
  value: number;
  label: string;
  color?: string;
  className?: string;
  size?: number;
}

export function Gauge({
  value,
  label,
  color = "#dc0000",
  className,
  size = 80,
}: GaugeProps) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);
  const offset = circumference - (clamped / 100) * circumference;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

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
    if (!isVisible || prefersReducedMotion) return;
    let start = 0;
    const duration = 1000;
    const step = 16;
    const totalSteps = duration / step;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / totalSteps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * clamped;
      setAnimatedValue(Math.round(start));
      if (progress >= 1) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [isVisible, clamped, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      className={cn("relative flex flex-col items-center gap-1", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        className="-rotate-90"
      >
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="var(--border-default)"
          strokeWidth="4"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isVisible ? offset : circumference}
          style={{
            transition: prefersReducedMotion
              ? "none"
              : "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span
          className="font-mono tabular-nums text-lg font-bold leading-none"
          style={{ color }}
        >
          {animatedValue}
        </span>
        <span className="text-[10px] text-[var(--text-dim)] font-mono">%</span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)] font-mono text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
