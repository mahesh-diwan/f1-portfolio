"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface F1CarProps {
  className?: string;
  speed?: number;
  drs?: boolean;
  color?: string;
}

export function F1Car({ className, speed = 1, drs = false, color = "#dc0000" }: F1CarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(-30);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) / 1000;
      const pixelsPerSec = 60 * speed;
      const newPos = ((elapsed * pixelsPerSec) % (100 + 30)) - 30;
      setPos(newPos);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none", className)}
      style={{ transform: `translateX(${pos}vw)` }}
      aria-hidden="true"
    >
      <svg
        width="80"
        height="24"
        viewBox="0 0 200 60"
        fill="none"
        className="drop-shadow-[0_0_8px_rgba(220,0,0,0.3)]"
      >
        <path
          d="M175 35l-10-8h-15l-8 8H95l-5-8H60l-5 5H30l-8-5H10L5 30H0v10h8l5 5h20l8-5h25l5 8h35l8-8h15l10 8h15v-5l-6-5z"
          fill={color}
          className="transition-colors duration-300"
        />
        <rect x="30" y="20" width="8" height="6" rx="1" fill="#1a1a1a" />
        <rect x="105" y="22" width="20" height="4" rx="1" fill="#1a1a1a" />
        <rect x="130" y="18" width="15" height="8" rx="2" fill="#1a1a1a" />
        <rect x="140" y="14" width="4" height="4" rx="1" fill="#ff1a1a" />
        {drs && (
          <rect x="135" y="12" width="12" height="3" rx="1" fill="#66d9a0" className="transition-all duration-300" />
        )}
        <circle cx="165" cy="42" r="5" fill="#111" stroke="#333" strokeWidth="1" />
        <circle cx="165" cy="42" r="2" fill="#555" />
        <circle cx="40" cy="42" r="5" fill="#111" stroke="#333" strokeWidth="1" />
        <circle cx="40" cy="42" r="2" fill="#555" />
        <line x1="60" y1="28" x2="75" y2="28" stroke="#ff1a1a" strokeWidth="1.5" opacity="0.6" />
        <line x1="60" y1="30" x2="80" y2="30" stroke="#ff1a1a" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
