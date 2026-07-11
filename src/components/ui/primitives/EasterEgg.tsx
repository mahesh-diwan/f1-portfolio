"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface EasterEggProps {
  children: React.ReactNode;
  message: string;
  icon?: string;
  className?: string;
  trigger?: "click" | "hover" | "double-click";
}

export function EasterEgg({
  children,
  message,
  icon = "🥚",
  className = "",
  trigger = "click",
}: EasterEggProps) {
  const [found, setFound] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const reveal = useCallback(() => {
    if (found) return;
    setFound(true);
    setShowToast(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowToast(false), 4000);
  }, [found]);

  const handlers = {
    click: { onClick: reveal },
    hover: { onMouseEnter: reveal },
    "double-click": { onDoubleClick: reveal },
  };

  return (
    <span className={`relative inline-block ${className}`} {...handlers[trigger]}>
      {children}
      {showToast && (
        <span
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-lg border border-[var(--accent)]/40 bg-[var(--bg-elevated)]/95 backdrop-blur-md shadow-2xl z-50 ${
            "px-5 py-3 text-sm"
          } font-mono text-[var(--text-primary)] animate-fade-in`}
          role="status"
          aria-live="polite"
        >
          <span className="mr-2 text-lg">{icon}</span>
          {message}
          <span className="absolute -top-1 -right-1 text-sm" aria-hidden="true">
            ✨
          </span>
        </span>
      )}
      {found && !showToast && (
        <span className="ml-1 text-xs animate-pulse" aria-hidden="true">🏆</span>
      )}
    </span>
  );
}
