"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeartRateProps {
  className?: string;
  bpm?: number;
  size?: "sm" | "md" | "lg";
}

export function HeartRate({ className, bpm = 68, size = "sm" }: HeartRateProps) {
  const [currentBpm, setCurrentBpm] = useState(bpm);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBpm((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 6);
        return Math.max(52, Math.min(180, prev + drift));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const mid = h / 2;

    const normalized = (currentBpm - 50) / 130;
    const newY = mid - normalized * (h * 0.35);

    pointsRef.current.push(newY);
    if (pointsRef.current.length > 60) pointsRef.current.shift();

    ctx.clearRect(0, 0, w, h);

    if (pointsRef.current.length < 2) return;

    const stepX = w / 60;

    for (let i = 1; i < pointsRef.current.length; i++) {
      const x0 = (i - 1) * stepX;
      const x1 = i * stepX;
      const y0 = pointsRef.current[i - 1];
      const y1 = pointsRef.current[i];

      const alpha = i / pointsRef.current.length;
      ctx.strokeStyle = currentBpm > 140 ? "#dc0000" : currentBpm > 100 ? "#f7d117" : "#66d9a0";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = alpha * 0.8;
      ctx.shadowColor = currentBpm > 140 ? "#dc0000" : currentBpm > 100 ? "#f7d117" : "#66d9a0";
      ctx.shadowBlur = 4;

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    const last = pointsRef.current[pointsRef.current.length - 1];
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc((pointsRef.current.length - 1) * stepX, last, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(0, mid);
    for (let i = 0; i < pointsRef.current.length; i++) {
      ctx.lineTo(i * stepX, pointsRef.current[i]);
    }
    ctx.strokeStyle = currentBpm > 140 ? "#dc0000" : currentBpm > 100 ? "#f7d117" : "#66d9a0";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }, [currentBpm]);

  const dims = size === "lg" ? 48 : size === "md" ? 36 : 30;
  const w = size === "lg" ? 160 : size === "md" ? 120 : 100;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex flex-col">
        <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-[var(--text-muted)]">HR</span>
        <span
          className={cn(
            "font-mono font-bold tabular-nums",
            currentBpm > 140 ? "text-[var(--accent-primary)]" : currentBpm > 100 ? "text-[var(--color-accent-gold)]" : "text-[var(--color-accent-green)]",
            size === "lg" ? "text-lg" : "text-sm",
          )}
        >
          {currentBpm}
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={w}
        height={dims}
        className="rounded-sm"
        style={{ width: w, height: dims }}
        aria-hidden="true"
      />
    </div>
  );
}
