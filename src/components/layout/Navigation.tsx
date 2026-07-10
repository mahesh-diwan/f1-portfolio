"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/lib/transition-context";
import { useTheme } from "@/lib/theme-context";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

const navItems = [
  { label: "Profile", id: "hero" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "OSS", id: "open-source" },
  { label: "Contact", id: "contact" },
];

const tireCompounds = [
  { color: "var(--color-accent-primary)", label: "SOFT", ring: "rgba(220,0,0,0.4)" },
  { color: "#e8b800", label: "MEDIUM", ring: "rgba(232,184,0,0.4)" },
  { color: "#d4d4d4", label: "HARD", ring: "rgba(212,212,212,0.4)" },
  { color: "#3aa63f", label: "INTER", ring: "rgba(58,166,63,0.4)" },
  { color: "#2b6eb0", label: "WET", ring: "rgba(43,110,176,0.4)" },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { navigateTo, isAnimating, activeSection } = usePageTransition();
  const { theme, toggleTheme } = useTheme();
  const [compoundIdx, setCompoundIdx] = useState(0);
  const [pitClicks, setPitClicks] = useState(0);
  const [pitStop, setPitStop] = useState<number | null>(null);

  const handleNav = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (isAnimating) return;
    setMobileOpen(false);
    navigateTo(sectionId);
  }, [navigateTo, isAnimating]);

  const handlePitClick = useCallback(() => {
    setPitClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        const time = (2.4 + Math.random() * 1.5).toFixed(1);
        setPitStop(parseFloat(time));
        setTimeout(() => setPitStop(null), 2000);
        return 0;
      }
      return next;
    });
  }, []);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "glass-elevated border-b border-[var(--border-default)]",
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
        <button
          onClick={(e) => { handleNav(e, "hero"); handlePitClick(); }}
          className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)]/80 hover:text-[var(--accent)] transition-colors group"
          aria-label="Go to home"
        >
          <span
            className="relative flex h-2 w-2 items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setCompoundIdx((prev) => (prev + 1) % tireCompounds.length); }}
            title={tireCompounds[compoundIdx].label}
          >
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" aria-hidden="true" style={{ backgroundColor: tireCompounds[compoundIdx].color }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" aria-hidden="true" style={{ backgroundColor: tireCompounds[compoundIdx].color }} />
          </span>
          <EasterEgg message="Welcome to the pit wall, driver!" icon="🏎️" trigger="click">
            PIT WALL
          </EasterEgg>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
                <button
                  onClick={(e) => handleNav(e, item.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] transition-all duration-200 rounded-sm",
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent-muted)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-px h-[2px] bg-[var(--accent)] shadow-[0_0_6px_var(--accent-glow)] rounded-full" aria-hidden="true" />
                  )}
                  {item.label}
                </button>

            );
          })}

          <div className="w-px h-5 mx-2 bg-[var(--border-default)]" />

          <button
            onClick={toggleTheme}
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors rounded-sm"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>


        </div>

        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-b border-[var(--border-default)] animate-fade-in glass-overlay">
          <nav className="px-5 py-3 flex flex-col gap-0.5" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNav(e, item.id)}
                  className={cn(
                    "px-3 py-3 text-sm font-mono uppercase tracking-wider transition-colors rounded-sm text-left",
                    isActive
                      ? "text-[var(--accent)] bg-[var(--accent-muted)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
      {pitStop !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-base)]/90 backdrop-blur-sm animate-fade-in" onClick={() => setPitStop(null)}>
          <div className="text-center select-none">
            <div className="text-6xl mb-2">🔧🏎️🔧</div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-display-amber)] mb-1">Pit Stop</div>
            <div className="text-3xl font-mono font-bold text-[var(--color-display-green)] tabular-nums">{pitStop.toFixed(1)}s</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)] mt-1">
              {pitStop < 2.8 ? "World Class!" : pitStop < 3.5 ? "Solid Stop" : "Keep Practicing"}
            </div>
          </div>
        </div>
      )}
    </header>
    {mobileOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    )}
    </>
  );
}