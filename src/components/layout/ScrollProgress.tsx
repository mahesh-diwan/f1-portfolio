"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <span className="font-mono text-[10px] tabular-nums text-[var(--text-muted)]">
        {Math.round(progress)}%
      </span>
      <div className="w-1 h-16 bg-[var(--border-default)] rounded-full overflow-hidden">
        <div
          className="w-full bg-[var(--accent)] rounded-full transition-all duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="font-mono text-[8px] tracking-wider text-[var(--text-dim)]" title="Page scroll progress">
        LAP
      </span>
    </div>
  );
}