"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SpeedometerProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  color?: string;
}

export function Speedometer({
  value,
  max = 100,
  label,
  className,
  color = "#dc0000",
}: SpeedometerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const clamped = Math.min(Math.max(value, 0), max);
  const angle = (clamped / max) * 180;
  const radius = 60;
  const cx = 80;
  const cy = 80;
  const arcLength = Math.PI * radius;

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
    const duration = 1500;
    const step = 16;
    const total = duration / step;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      const progress = Math.min(count / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = eased * clamped;
      setAnimatedValue(Math.round(current));
      if (progress >= 1) clearInterval(timer);
    }, step);

    return () => clearInterval(timer);
  }, [isVisible, clamped]);

  const needleAngle = 180 + (animatedValue / max) * 180;

  return (
    <div
      ref={ref}
      className={cn("flex flex-col items-center", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? "Speedometer"}
    >
      <div className="relative">
        <svg width="160" height="100" viewBox="0 0 160 100" className="overflow-visible">
          {[...Array(9)].map((_, i) => {
            const a = 180 + (i / 8) * 180;
            const rad = (a * Math.PI) / 180;
            const inner = radius - 8;
            const outer = radius;
            const x1 = cx + inner * Math.cos(rad);
            const y1 = cy + inner * Math.sin(rad);
            const x2 = cx + outer * Math.cos(rad);
            const y2 = cy + outer * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 2 === 0 ? "#f0f0f0" : "#707070"}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#222222"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * arcLength} ${arcLength}`}
            style={{
              transition:
                "stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <line
            x1={cx}
            y1={cy}
            x2={cx + (radius - 14) * Math.cos((needleAngle * Math.PI) / 180)}
            y2={cy + (radius - 14) * Math.sin((needleAngle * Math.PI) / 180)}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              transition: "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <circle cx={cx} cy={cy} r="3" fill={color} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pb-4">
          <span className="font-mono text-3xl font-bold tabular-nums" style={{ color }}>
            {animatedValue}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono -mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
