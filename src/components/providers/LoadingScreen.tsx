"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [lightsOut, setLightsOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLightsOut(true), 2000);
    const t2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] bg-[#0a0e14] flex items-center justify-center transition-opacity duration-500",
        fadeOut ? "opacity-0" : "opacity-100",
      )}
      role="progressbar"
      aria-label="Loading"
    >
      <style>{`
        @keyframes lightOn {
          0% { background-color: #1a1a2e; box-shadow: none; }
          100% { background-color: #dc0000; box-shadow: 0 0 20px #dc0000, 0 0 40px rgba(220, 0, 0, 0.3); }
        }
        .f1-light {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #1a1a2e;
          border: 2px solid #333;
          transition: background-color 0.3s, box-shadow 0.3s;
        }
        .f1-light.on {
          background-color: #dc0000;
          box-shadow: 0 0 20px #dc0000, 0 0 40px rgba(220, 0, 0, 0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .f1-light { animation: none !important; }
          .f1-light.on { background-color: #dc0000; box-shadow: 0 0 20px #dc0000; }
        }
      `}</style>
      <div className="flex items-center gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn("f1-light", !lightsOut && "on")}
            style={!lightsOut ? { animation: `lightOn 0.1s ${i * 400}ms forwards` } : undefined}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
