"use client";

import { cn } from "@/lib/utils";
import { RaceFlag } from "@/components/ui/RaceFlag";

interface RaceTimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  current?: boolean;
  sector: string;
  flag?: "green" | "checkered" | "yellow" | "red";
}

interface RaceTimelineProps {
  items: RaceTimelineItem[];
  className?: string;
}

export function RaceTimeline({ items, className }: RaceTimelineProps) {
  const flagTypes: ("green" | "checkered" | "yellow" | "red")[] = [
    "green",
    "yellow",
    "red",
    "green",
    "checkered",
  ];

  return (
    <div className={cn("relative", className)} role="list" aria-label="Career timeline">
      <div className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--accent)]/40 via-[var(--border-default)] to-[var(--accent)]/20" aria-hidden="true" />
      <div className="flex flex-col gap-5">
        {items.map((item, idx) => (
          <div key={item.id} className="relative pl-10" role="listitem">
            <div
              className={cn(
                "absolute left-0 top-0.5 w-[31px] h-[31px] rounded-full border-2 flex items-center justify-center bg-[var(--bg-primary)]",
                item.current
                  ? "border-[var(--color-accent-green)] shadow-[0_0_12px_rgba(102,217,160,0.2)]"
                  : "border-[var(--border-default)]",
              )}
              aria-hidden="true"
            >
              <RaceFlag type={flagTypes[idx] ?? "green"} />
            </div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-[0.15em]",
                  item.current ? "text-[var(--color-accent-green)]" : "text-[var(--text-muted)]",
                )}
              >
                {item.current && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] mr-1.5 align-middle animate-pulse" aria-hidden="true" />
                )}
                {item.sector}
              </span>
            </div>
            <div className="text-xs font-mono text-[var(--text-secondary)] mb-1">{item.date}</div>
            <h3 className="text-sm font-heading font-semibold text-[var(--text-primary)] mb-0.5">
              {item.title}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-1">{item.subtitle}</p>
            <p className="text-xs text-[var(--text-secondary)]/80 leading-relaxed mb-2">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-[var(--bg-surface)] text-[var(--text-muted)] rounded-sm border border-[var(--border-default)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
