"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/lib/transition-context";

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  action: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigateTo } = usePageTransition();

  const commands: Command[] = [
    { id: "hero", label: "Go to Profile", shortcut: "G H", action: () => { navigateTo("hero"); setOpen(false); } },
    { id: "experience", label: "Go to Experience", shortcut: "G E", action: () => { navigateTo("experience"); setOpen(false); } },
    { id: "education", label: "Go to Education", shortcut: "G D", action: () => { navigateTo("education"); setOpen(false); } },
    { id: "projects", label: "Go to Projects", shortcut: "G P", action: () => { navigateTo("projects"); setOpen(false); } },
    { id: "skills", label: "Go to Skills", shortcut: "G S", action: () => { navigateTo("skills"); setOpen(false); } },
    { id: "contact", label: "Go to Contact", shortcut: "G C", action: () => { navigateTo("contact"); setOpen(false); } },
    { id: "top", label: "Scroll to Top", shortcut: "G T", action: () => { navigateTo("hero"); setOpen(false); } },
  ];

  const filtered = query
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()),
      )
    : commands;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    },
    [filtered, selectedIndex],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="relative w-full max-w-lg mx-4 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-sm shadow-2xl overflow-hidden">
        <div className="flex items-center border-b border-[var(--border-default)] px-3">
          <svg className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent border-none px-2.5 py-3 text-xs font-mono text-[var(--text-primary)] placeholder-f1-dim focus:outline-none"
            aria-label="Search commands"
          />
          <kbd className="text-[9px] font-mono text-[var(--text-dim)] border border-[var(--border-default)] rounded-sm px-1.5 py-0.5 flex-shrink-0">
            ESC
          </kbd>
        </div>
        <div className="max-h-60 overflow-y-auto" role="listbox">
          {filtered.length === 0 ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs font-mono text-[var(--text-dim)]">No results found</p>
            </div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                role="option"
                aria-selected={idx === selectedIndex}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors",
                  idx === selectedIndex
                    ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-inset)]/50",
                )}
              >
                <span className="text-xs font-mono">{cmd.label}</span>
                {cmd.shortcut && (
                  <kbd className="text-[9px] font-mono text-[var(--text-dim)] border border-[var(--border-default)] rounded-sm px-1.5 py-0.5">
                    {cmd.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
