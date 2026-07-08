"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RaceLightsProps {
  className?: string;
  autoStart?: boolean;
  onGo?: () => void;
}

export function RaceLights({ className, autoStart = false, onGo }: RaceLightsProps) {
  const [phase, setPhase] = useState<"idle" | "sequence" | "go">("idle");
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    if (!autoStart) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase("sequence"), 0));
    for (let i = 1; i <= 5; i++) {
      timers.push(
        setTimeout(() => setLitCount(i), i * 600 + 200),
      );
    }
    timers.push(
      setTimeout(() => {
        setPhase("go");
        onGo?.();
      }, 5 * 600 + 400),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoStart, onGo]);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("sequence");
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => setLitCount(i), i * 600 + 200);
    }
    setTimeout(() => {
      setPhase("go");
      onGo?.();
    }, 5 * 600 + 400);
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="flex items-center gap-[3px]" role="img" aria-label={phase === "go" ? "Race start! Green light" : `${litCount} of 5 red lights`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              "w-[14px] h-[14px] rounded-full border transition-all duration-150",
              phase === "go"
                ? "bg-[var(--color-accent-green)] border-[var(--color-accent-green)] shadow-[0_0_10px_rgba(102,217,160,0.6)]"
                : i <= litCount
                  ? "bg-[var(--accent-primary)] border-[var(--accent-primary-glow)] shadow-[0_0_10px_var(--accent-glow)]"
                  : "bg-[var(--bg-elevated)] border-[var(--border-default)]",
            )}
          />
        ))}
      </div>
      <button
        onClick={handleClick}
        disabled={phase !== "idle"}
        className={cn(
          "text-[8px] font-mono uppercase tracking-[0.2em] transition-all",
          phase === "go"
            ? "text-[var(--color-accent-green)]"
            : phase === "sequence"
              ? "text-[var(--accent-primary)] animate-indicator-flash"
              : "text-[var(--text-dim)] hover:text-[var(--text-primary)] cursor-pointer",
        )}
        aria-label={phase === "idle" ? "Start race lights sequence" : undefined}
      >
        {phase === "go" ? "GO! GO! GO!" : phase === "sequence" ? `STANDING BY` : "TAP FOR START"}
      </button>
    </div>
  );
}
