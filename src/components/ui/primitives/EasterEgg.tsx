"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggProps {
  children: React.ReactNode;
  message: string;
  icon?: string;
  className?: string;
  trigger?: "click" | "hover" | "double-click";
  size?: "sm" | "lg";
}

export function EasterEgg({
  children,
  message,
  icon = "🥚",
  className = "",
  trigger = "click",
  size = "lg",
}: EasterEggProps) {
  const [found, setFound] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const reveal = useCallback(() => {
    if (found) return;
    setFound(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  }, [found]);

  const handlers = {
    click: { onClick: reveal },
    hover: { onMouseEnter: reveal },
    "double-click": { onDoubleClick: reveal },
  };

  return (
    <span className={`relative inline-block ${className}`} {...handlers[trigger]}>
      {children}
      <AnimatePresence>
        {showToast && (
          <motion.span
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap rounded-lg border border-[var(--accent)]/40 bg-[var(--bg-elevated)]/95 backdrop-blur-md shadow-2xl z-50 ${
              size === "lg" ? "px-5 py-3 text-sm" : "px-3 py-1.5 text-[10px]"
            } font-mono text-[var(--text-primary)]`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: "spring", damping: 12, stiffness: 300 }}
          >
            <span className="mr-2 text-lg">{icon}</span>
            {message}
            <motion.span
              className="absolute -top-1 -right-1 text-sm"
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            >
              ✨
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
      {found && !showToast && (
        <span className="ml-1 text-[10px] animate-pulse" aria-hidden="true">🏆</span>
      )}
    </span>
  );
}
