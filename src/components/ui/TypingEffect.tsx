"use client";

import { useState, useEffect, useCallback } from "react";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingEffect({
  text,
  speed = 60,
  delay = 1000,
  className = "",
  cursorClassName = "border-[var(--accent)]",
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block w-[2px] h-[1em] ml-0.5 align-middle border-r-2 ${cursorClassName} ${
          isTyping ? "animate-pulse" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
