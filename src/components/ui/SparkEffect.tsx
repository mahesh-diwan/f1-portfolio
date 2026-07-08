"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SparkEffectProps {
  className?: string;
  color?: string;
  intensity?: "low" | "medium" | "high";
  triggerOn?: "hover" | "click";
}

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  born: number;
}

export function SparkEffect({ className, color = "#f7d117", intensity = "medium", triggerOn = "hover" }: SparkEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number>(0);

  const spawn = useCallback((x: number, y: number) => {
    const count = intensity === "high" ? 8 : intensity === "medium" ? 4 : 2;
    const now = performance.now();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8;
      const speed = 80 + Math.random() * 120;
      sparksRef.current.push({
        id: now + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        size: 1.5 + Math.random() * 2.5,
        life: 0.3 + Math.random() * 0.4,
        born: now,
      });
    }
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const active = sparksRef.current.filter((s) => now - s.born < s.life * 1000);
      sparksRef.current = active;

      for (const s of active) {
        const t = (now - s.born) / (s.life * 1000);
        const x = s.x + s.vx * t;
        const y = s.y + s.vy * t + 200 * t * t;
        const alpha = 1 - t;
        const scale = 1 - t * 0.5;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = s.size * 3;
        ctx.beginPath();
        ctx.arc(x, y, s.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || triggerOn !== "hover") return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleMove = (e: MouseEvent) => {
      if (Math.random() > 0.12) return;
      const rect = parent.getBoundingClientRect();
      spawn(e.clientX - rect.left, e.clientY - rect.top);
    };
    parent.addEventListener("mousemove", handleMove);
    return () => parent.removeEventListener("mousemove", handleMove);
  }, [triggerOn, spawn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || triggerOn !== "click") return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleClick = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (let i = 0; i < 4; i++) {
        setTimeout(() => spawn(cx + (Math.random() - 0.5) * 20, cy + (Math.random() - 0.5) * 20), i * 40);
      }
    };
    parent.addEventListener("click", handleClick);
    return () => parent.removeEventListener("click", handleClick);
  }, [triggerOn, spawn]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none z-10", className)}
      aria-hidden="true"
    />
  );
}
