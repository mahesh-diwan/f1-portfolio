"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(className, visible ? "animate-fade-in" : "opacity-0")}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

