"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLightsOut(true), 1500);
    const t2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-[var(--bg-base)] flex items-center justify-center transition-opacity duration-500",
        fadeOut ? "opacity-0" : "opacity-100",
      )}
      role="progressbar"
      aria-label="Loading"
    >

      <div className="flex items-center gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`f1-light ${!lightsOut ? "on" : ""}`}
            style={!lightsOut ? { animation: `lightOn 0.1s ${i * 300}ms forwards` } : undefined}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
