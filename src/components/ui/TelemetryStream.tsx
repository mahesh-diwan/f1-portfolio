"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TelemetryStreamProps {
  className?: string;
  lines?: number;
  speed?: "slow" | "fast";
  accent?: string;
}

const PHRASES = [
  "RPM:18200 TC:3 BRAKE:85 OIL:120°C",
  "MAP:2.4bar EGT:880°C FUEL:12.5L",
  "GEAR:7 DRS:OPEN SPEED:332 KPH",
  "LAP:47/57 S1:29.4 S2:31.8 S3:27.6",
  "TIRE:HARD FRONT:65°C REAR:72°C",
  "ERS:4.2MJ DEPLOY:33% HARVEST:2.1MJ",
  "THROTTLE:100% BRAKE:0% STEER:2.3°",
  "DIFF:85% BIAS:58% WING:FR8 RR6",
  "COOLANT:88°C OIL:115°C WATER:82°C",
  "VOLT:14.2V AMP:180AH FUEL:8.3kg/h",
  "SUSP:F:80mm R:75mm RIDE:25mm",
  "LAPTIME:1:32.874 GAP:-0.432 TO P1",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateStream(lines: number) {
  return Array.from({ length: lines }, (_, col) => ({
    id: col,
    items: Array.from({ length: 8 }, (_, i) => ({
      text: PHRASES[Math.floor(seededRandom(col * 100 + i) * PHRASES.length)],
      delay: seededRandom(col * 100 + i + 50) * 3,
    })),
  }));
}

export function TelemetryStream({ className, lines = 6, speed = "slow", accent }: TelemetryStreamProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const columns = generateStream(lines);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden font-mono text-[7px] leading-[1.6] opacity-[0.025] select-none pointer-events-none",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex gap-8 h-[200%] animate-telemetry-scroll" style={{ animationDuration: speed === "fast" ? "10s" : "25s" }}>
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-2 min-w-[200px]">
            {col.items.map((item, i) => (
              <span
                key={i}
                className="block whitespace-nowrap"
                style={{
                  color: accent ?? "#dc0000",
                  animationDelay: `${item.delay}s`,
                }}
              >
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
