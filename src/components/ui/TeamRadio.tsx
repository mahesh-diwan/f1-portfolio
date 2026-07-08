"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const messages = [
  { text: "Box, box. We're box, box this lap.", team: "Race Engineer" },
  { text: "Copy. Gap to P1 is 12.4 seconds.", team: "Driver" },
  { text: "Mode push. You have the gap. Go.", team: "Race Engineer" },
  { text: "Understood. Mode push confirmed.", team: "Driver" },
  { text: "Excellent sector. Keep that pace.", team: "Race Engineer" },
  { text: "Tires are holding up. No degradation.", team: "Driver" },
];

export function TeamRadio() {
  const [open, setOpen] = useState(false);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [radioActive, setRadioActive] = useState(false);

  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
      setRadioActive(true);
      setTimeout(() => setRadioActive(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider border rounded-sm transition-all duration-200",
          open
            ? "border-[var(--color-accent-green)] text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/5"
            : "border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]",
        )}
        aria-label={open ? "Close team radio" : "Open team radio"}
        aria-expanded={open}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            radioActive ? "bg-[var(--color-accent-green)] animate-pulse" : open ? "bg-[var(--color-accent-green)]" : "bg-[var(--text-dim)]",
          )}
          aria-hidden="true"
        />
        TEAM RADIO
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-72 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-sm shadow-2xl overflow-hidden z-30"
          role="status"
          aria-label="Team radio communication"
          style={{ animation: "fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="px-3 py-2 border-b border-[var(--border-default)]">
            <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-accent-green)]">
              RADIO ACTIVE
            </p>
          </div>
          <div className="p-3 min-h-[80px] flex flex-col justify-center">
            <p className={cn(
              "text-xs font-mono text-[var(--text-primary)] transition-opacity duration-300",
              radioActive ? "opacity-100" : "opacity-70",
            )}>
              &ldquo;{messages[currentMsg].text}&rdquo;
            </p>
            <p className="text-[9px] font-mono text-[var(--text-muted)] mt-1.5">
              &mdash; {messages[currentMsg].team}
            </p>
          </div>
          <div className="px-3 py-1.5 border-t border-[var(--border-default)] flex items-center justify-between">
            <span className="text-[8px] font-mono text-[var(--text-dim)]">
              CHANNEL: PIT WALL
            </span>
            <span className="text-[8px] font-mono text-[var(--text-dim)]">
              SIG: {radioActive ? "STRONG" : "WEAK"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
