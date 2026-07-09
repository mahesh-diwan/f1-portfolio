"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-[var(--bg-base)] flex flex-col items-center justify-center transition-opacity duration-500",
        fadeOut ? "opacity-0" : "opacity-100",
      )}
      role="progressbar"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32" cy="32" r="28"
              fill="none" stroke="#222222" strokeWidth="3"
            />
            <circle
              cx="32" cy="32" r="28"
              fill="none" stroke="#dc0000" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="176"
              strokeDashoffset="44"
              className="animate-spin"
              style={{ animationDuration: "1.5s" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
            INITIALIZING TELEMETRY
          </p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full bg-[var(--accent-primary)]"
                style={{ animationDelay: `${i * 0.2}s` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
