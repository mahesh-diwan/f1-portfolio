"use client";

import { useState, useEffect, useCallback } from "react";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

const EASTER_EGG_MESSAGES = [
  "🏎️  You found the Konami code! Tifosi, Bulls & Silver Arrows salute you!",
  "🏆  Achievement Unlocked: Triple Threat — Ferrari x Red Bull x Mercedes",
  "⚡  TURBO MODE ACTIVATED — All three teams send their best engineers",
  "🔧  Pit crew approves this discovery — 2.1 second pit stop!",
  "🏁  Fastest finger in the west — that's a pole position right there",
  "🎯  Target acquired. Verstappen, Hamilton & Leclerc all impressed.",
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === KONAMI_CODE[index]) {
      const next = index + 1;
      if (next === KONAMI_CODE.length) {
        setActivated(true);
        setMessage(EASTER_EGG_MESSAGES[Math.floor(Math.random() * EASTER_EGG_MESSAGES.length)]);
        setIndex(0);
        setTimeout(() => setActivated(false), 4000);
      } else {
        setIndex(next);
      }
    } else {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return { activated, message };
}

export function KonamiCodeOverlay() {
  const { activated, message } = useKonamiCode();

  return (
    <>
      {activated && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-fade-in">
          <div className="absolute inset-0 bg-[var(--accent)]/10 backdrop-blur-sm" />
          <div className="relative px-8 py-5 rounded-lg border border-[var(--accent)]/40 bg-[var(--bg-elevated)]/90 backdrop-blur-md shadow-2xl animate-scale-in">
            <p className="text-lg font-mono text-[var(--text-primary)] text-center">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}
