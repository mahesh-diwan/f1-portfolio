"use client"

import repos from "@/data/github-repos.json"
import type { RepoSummary } from "@/data/repo-summary"
import { SectionReveal } from "@/components/ui/motion/SectionReveal"
import { SectionHeader } from "@/components/ui/SectionHeader"


const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00add8",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  CSS: "#563d7c",
  HTML: "#e34c26",
}

function daysAgo(date: string): string {
  const d = new Date(date)
  const now = new Date()
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "today"
  if (diff === 1) return "1 day ago"
  if (diff < 30) return `${diff} days ago`
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`
  return `${Math.floor(diff / 365)} years ago`
}

export function OpenSource() {
  const data = repos as RepoSummary[]
  const totalStars = data.reduce((s, r) => s + r.stars, 0)
  const totalForks = data.reduce((s, r) => s + r.forks, 0)
  const topLang = Object.entries(
    data.reduce<Record<string, number>>((acc, r) => {
      if (r.language) acc[r.language] = (acc[r.language] || 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  return (
    <section id="open-source" className="py-20 px-4 relative" aria-label="Open source projects">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            sector="SECTOR 5/6"
            right={`${data.length} REPOS · ${totalStars} ★`}
            title="Open Source"
          />

          <div className="flex flex-wrap gap-4 mb-6 glass shadow-card p-4">
            <Stat label="Repositories" value={data.length} />
            <Stat label="Total Stars" value={totalStars} />
            <Stat label="Forks" value={totalForks} />
            <Stat label="Top Language" value={topLang} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass shadow-card hover-lift p-5 block group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-mono font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-xs font-mono tabular-nums text-[var(--text-dim)]">
                      ★ {repo.stars}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-[var(--text-dim)]">
                      ⌥ {repo.forks}
                    </span>
                  </div>
                </div>
                {repo.description && (
                  <p className="text-xs text-[var(--text-muted)] font-mono mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: langColors[repo.language] || "#888" }}
                      />
                      <span className="text-xs font-mono text-[var(--text-dim)]">
                        {repo.language}
                      </span>
                    </span>
                  )}
                  <span className="text-xs font-mono text-[var(--text-dim)] ml-auto">
                    {daysAgo(repo.updated_at)}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center min-w-[100px]">
      <div className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono mb-1">
        {label}
      </div>
      <div className="text-xl font-bold font-mono tabular-nums text-[var(--text-primary)]">
        {value}
      </div>
    </div>
  )
}
