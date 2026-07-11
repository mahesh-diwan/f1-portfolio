"use client";

import { useState } from "react";
import { ExternalLink, GitBranch, Plus, Minus } from "lucide-react";
import { portfolio } from "@/lib/portfolio";
import type { Project } from "@/lib/portfolio";
import ownRepoData from "@/data/github-own-repos.json";
import type { RepoSummary } from "@/data/repo-summary";

import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const statusConfig: Record<string, { label: string; color: string; bgClass: string }> = {
  "in-production": {
    label: "IN PRODUCTION",
    color: "var(--color-display-green)",
    bgClass: "bg-[var(--color-display-green-muted)] border-[var(--color-display-green)]/20 text-[var(--color-display-green)]",
  },
  experimental: {
    label: "EXPERIMENTAL",
    color: "var(--color-accent-purple)",
    bgClass: "bg-[var(--color-accent-purple-muted)] border-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]",
  },
  archived: {
    label: "ARCHIVED",
    color: "var(--color-text-dim)",
    bgClass: "bg-[var(--text-dim)]/10 border-[var(--text-dim)]/20 text-[var(--text-dim)]",
  },
};

function ProjectCard({ project }: { project: Project | undefined }) {
  const [expanded, setExpanded] = useState(false);
  if (!project) return null;

  const status = project.status ? statusConfig[project.status] : null;


  return (
    <div>
      <div className="glass shadow-card hover-lift p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm uppercase tracking-[0.1em] text-[var(--text-muted)] font-mono">
            {project.type?.toUpperCase()}
          </span>
          {status && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono uppercase tracking-wider border ${status.bgClass}`}>
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-telemetry-pulse" style={{ backgroundColor: status.color }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: status.color }} />
              </span>
              {status.label}
            </span>
          )}
        </div>

        {/* Title + icon */}
        <div className="flex items-start gap-3 mb-3 group">
          <span className="text-2xl" aria-hidden="true">{project.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">{project.desc}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border-default)]">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} repository`}>
              <GitBranch className="w-3 h-3" /> Repo
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} demo`}>
              <ExternalLink className="w-3 h-3" /> Demo
            </a>
          )}
          {(project.problem || project.solution || project.architecture) && (
            <button onClick={() => setExpanded(!expanded)}
              className="ml-auto flex items-center gap-0.5 px-2 py-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-expanded={expanded}>
              {expanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              Details
            </button>
          )}
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[var(--border-default)] space-y-3 animate-fade-in">
            {project.problem && (
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] mb-1">Problem</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-display-green)] mb-1">Solution</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.architecture && (
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-teal)] mb-1">Architecture</p>
                <pre className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-elevated)] p-2 rounded border border-[var(--border-default)] overflow-x-auto whitespace-pre leading-relaxed">{project.architecture}</pre>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

const significantRepoNames = new Set([
  "go-shell",
]);

const ownRepos: (Project & { stars: number; forks: number })[] = (ownRepoData as RepoSummary[])
  .filter(r => significantRepoNames.has(r.name))
  .map(r => ({
    id: r.name,
    name: r.name,
    desc: r.description || "",
    type: "OPEN SOURCE",
    tags: [r.language, ...r.topics].filter((t): t is string => t !== null),
    link: r.url,
    accent: "var(--color-accent-teal)",
    icon: "⚡",
    status: "experimental" as const,
    stars: r.stars,
    forks: r.forks,
  }));

const allProjects = [...portfolio.projects, ...ownRepos];

export function Projects() {
  if (allProjects.length === 0) return null;

  return (
    <section id="projects" className="py-20 px-4 relative grid-bg" aria-label="Projects">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader sector="SECTOR 3/6" right={`${allProjects.length} PROJECTS`} title="Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {allProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
