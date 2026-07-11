"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect, startTransition, type ReactNode } from "react";

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
  "open-source": "OPEN SOURCE",
  contact: "CONTACT",
};

const radioMessages = [
  "Box, box.",
  "Push now.",
  "Mode: Race.",
  "DRS enabled.",
  "Safety Car deployed.",
  "We're racing.",
];

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [overlay, setOverlay] = useState<{
    visible: boolean;
    label: string;
    phase: "enter" | "exit" | "idle";
  }>({ visible: false, label: "", phase: "idle" });
  const pendingRef = useRef<string | null>(null);
  const busyRef = useRef(false);
  const [radioMessage, setRadioMessage] = useState<string | null>(null);
  const radioTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (radioTimeoutRef.current) clearTimeout(radioTimeoutRef.current);
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
  }, []);

  const navigateTo = useCallback((sectionId: string, label?: string) => {
    if (busyRef.current) return;
    if (sectionId === activeSection) return;
    busyRef.current = true;

    const displayLabel = label || SECTION_LABELS[sectionId] || sectionId.toUpperCase();
    pendingRef.current = sectionId;

    setOverlay({ visible: true, label: displayLabel, phase: "enter" });

    if (radioTimeoutRef.current) clearTimeout(radioTimeoutRef.current);
    const randomMsg = radioMessages[Math.floor(Math.random() * radioMessages.length)];
    setRadioMessage(randomMsg);
    radioTimeoutRef.current = setTimeout(() => setRadioMessage(null), 3500);

    navTimeoutRef.current = setTimeout(() => {
      navTimeoutRef.current = null;
      const id = pendingRef.current;
      pendingRef.current = null;
      if (id) {
        startTransition(() => setActiveSection(id));
        if (id !== "hero") {
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }
      setOverlay((s) => ({ ...s, phase: "exit" }));

      navTimeoutRef.current = setTimeout(() => {
        navTimeoutRef.current = null;
        setOverlay({ visible: false, label: "", phase: "idle" });
        busyRef.current = false;
      }, 300);
    }, 400);
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
      {radioMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] animate-fade-in-up">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] px-4 py-2 shadow-lg">
            <span className="text-[12px] font-mono text-[var(--color-display-amber)] uppercase tracking-[0.1em]">
              📡 {radioMessage}
            </span>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
