"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

interface TransitionContextValue {
  isAnimating: boolean;
  navigateTo: (sectionId: string, label?: string) => void;
  activeSection: string;
}

const TransitionContext = createContext<TransitionContextValue>({
  isAnimating: false,
  navigateTo: () => {},
  activeSection: "hero",
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const SECTION_LABELS: Record<string, string> = {
  hero: "HOME",
  experience: "EXPERIENCE",
  education: "EDUCATION",
  projects: "PROJECTS",
  skills: "TELEMETRY",
  contact: "CONTACT",
};

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [overlay, setOverlay] = useState<{
    visible: boolean;
    label: string;
    phase: "enter" | "exit" | "idle";
  }>({ visible: false, label: "", phase: "idle" });
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);

  const navigateTo = useCallback((sectionId: string, label?: string) => {
    if (busyRef.current) return;
    if (sectionId === activeSection) return;
    busyRef.current = true;

    const displayLabel = label || SECTION_LABELS[sectionId] || sectionId.toUpperCase();
    pendingRef.current = sectionId;

    setOverlay({ visible: true, label: displayLabel, phase: "enter" });

    setTimeout(() => {
      const id = pendingRef.current;
      pendingRef.current = null;
      if (id) {
        setActiveSection(id);
        if (id !== "hero") {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }
      setOverlay((s) => ({ ...s, phase: "exit" }));

      setTimeout(() => {
        setOverlay({ visible: false, label: "", phase: "idle" });
        busyRef.current = false;
      }, 500);
    }, 600);
  }, [activeSection]);

  return (
    <TransitionContext.Provider value={{ isAnimating: overlay.phase !== "idle", navigateTo, activeSection }}>
      {children}
      {overlay.visible && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className={`absolute inset-0 bg-[var(--bg-overlay)] ${
              overlay.phase === "enter" ? "animate-transition-enter" : "animate-transition-exit"
            }`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              overlay.phase === "enter" ? "animate-transition-fade-in" : "animate-transition-fade-out"
            }`}
          >
            <div className="text-center">
              <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]/80 mb-3">
                MODE
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold tracking-wider text-[var(--text-primary)]">
                {overlay.label}
              </div>
              <div className="mt-4 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60 animate-pulse" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 animate-pulse" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
