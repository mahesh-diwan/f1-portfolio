"use client";

import { useState } from "react";
import type { RepoSummary } from "@/data/repo-summary";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "TODAY";
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.floor(days / 30)}mo`;
  return `${Math.floor(days / 365)}y`;
}

const rankColors = ["text-[#f7d117]", "text-[#9ca3af]", "text-[#ff8c42]"];

export function TimingRow({ repo, rank }: { repo: RepoSummary; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const isTop3 = rank <= 3;
  const gap = rank === 1 ? "—" : `+${repo.stars}`;

  return (
    <div className="border-b border-[var(--border-default)] last:border-b-0">
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-2 h-12 px-3 text-xs font-mono transition-colors hover:bg-[var(--bg-elevated)]"
        aria-expanded={expanded}
      >
        <span className={`w-6 text-center ${isTop3 ? rankColors[rank - 1] : "text-[var(--text-dim)]"}`}>
          #{rank}
        </span>
        <span className="flex-1 truncate text-left text-[var(--text-primary)]">{repo.name}</span>
        <span className="w-14 text-right tabular-nums text-[var(--text-primary)]">{repo.stars}</span>
        <span className="w-14 text-right tabular-nums text-[var(--text-dim)] hidden md:block">{gap}</span>
        <span className="w-10 text-right tabular-nums text-[var(--text-muted)] hidden md:block">{repo.forks}</span>
        <span className="w-12 text-right text-[var(--text-muted)] hidden md:block">{timeAgo(repo.updated_at)}</span>
        {repo.language ? (
          <span className="w-16 text-right text-[var(--text-secondary)] truncate">{repo.language}</span>
        ) : (
          <span className="w-16 text-right text-[var(--text-dim)]">—</span>
        )}
        <span className="w-12 text-right text-xs tracking-wider text-[var(--color-display-green)]">
          LIVE
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 animate-fade-in" role="region" aria-labelledby={`repo-name-${rank}`}>
          <div className="ml-8 pl-2 border-l-2 border-[var(--accent)]/30 pl-4 py-2 space-y-2">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {repo.description || "No description"}
            </p>
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 6).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <a href={repo.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-[var(--accent)] border border-[var(--accent)]/30 hover:bg-[var(--accent-muted)] transition-colors"
              aria-label={`${repo.name} repository on GitHub`}>
              VIEW ON GITHUB →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
