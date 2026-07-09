"use client";

import { useState } from "react";
import { ExternalLink, GitBranch, Plus, Minus } from "lucide-react";
import { portfolio, getProject } from "@/lib/portfolio";
import { PerformanceMeter } from "@/components/ui/PerformanceMeter";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EasterEgg } from "@/components/ui/EasterEgg";

const statusConfig: Record<string, { label: string; color: string; bgClass: string }> = {
  "in-production": {
    label: "IN PRODUCTION",
    color: "#00ff88",
    bgClass: "bg-[var(--color-display-green-muted)] border-[var(--color-display-green)]/20 text-[var(--color-display-green)]",
  },
  experimental: {
    label: "EXPERIMENTAL",
    color: "#b388ff",
    bgClass: "bg-[var(--color-accent-purple-muted)] border-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]",
  },
  archived: {
    label: "ARCHIVED",
    color: "#8a8a9a",
    bgClass: "bg-[var(--text-dim)]/10 border-[var(--text-dim)]/20 text-[var(--text-dim)]",
  },
};

function ProjectCard({ project, index }: { project: ReturnType<typeof getProject>; index: number }) {
  const [expanded, setExpanded] = useState(false);
  if (!project) return null;

  const metrics: { label: string; value: number; color: string }[] = [];
  if (project.metrics && Array.isArray(project.metrics)) {
    project.metrics.forEach((m) => {
      if (typeof m === "string") {
        const [key, val] = m.split(":").map((s) => s.trim());
        if (key && val) {
          const v = parseInt(val);
          const c = key.toLowerCase().includes("perf") ? "var(--color-display-green)" : key.toLowerCase().includes("rel") ? "var(--color-accent-teal)" : "var(--color-accent-blue)";
          metrics.push({ label: key, value: isNaN(v) ? 85 : v, color: c });
        }
      }
    });
  }

  const status = project.status ? statusConfig[project.status] : null;
  const heights = ["min-h-[220px]", "min-h-[260px]", "min-h-[240px]"];
  const cardHeight = heights[index % 3];

  return (
    <div className="break-inside-avoid mb-4">
      <div className={`glass p-4 ${cardHeight} flex flex-col`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[7px] uppercase tracking-[0.1em] text-[var(--text-muted)] font-mono">
            {project.type?.toUpperCase()}
          </span>
          {status && (
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[7px] font-mono uppercase tracking-wider border ${status.bgClass}`}>
              <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-telemetry-pulse" style={{ backgroundColor: status.color }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
              </span>
              {status.label}
            </span>
          )}
        </div>

        {/* Title + icon */}
        <div className="flex items-start gap-2.5 mb-2">
          <EasterEgg message={`Shipped ${project.name} to prod!`} icon="🏁" trigger="click">
            <span className="text-lg cursor-pointer hover:scale-110 transition-transform">{project.icon}</span>
          </EasterEgg>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
            <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed">{project.desc}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[7px] font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto pt-2.5 border-t border-[var(--border-default)]">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} repository`}>
              <GitBranch className="w-2.5 h-2.5" /> Repo
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-1.5 py-0.5 text-[8px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} demo`}>
              <ExternalLink className="w-2.5 h-2.5" /> Demo
            </a>
          )}
          {(project.problem || project.solution || metrics.length > 0) && (
            <button onClick={() => setExpanded(!expanded)}
              className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-expanded={expanded}>
              {expanded ? <Minus className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5" />}
              Data
            </button>
          )}
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-[var(--border-default)] space-y-2.5 animate-fade-in">
            {project.problem && (
              <div>
                <p className="text-[7px] font-mono uppercase tracking-wider text-[var(--accent)] mb-0.5">Problem</p>
                <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-[7px] font-mono uppercase tracking-wider text-[var(--color-display-green)] mb-0.5">Solution</p>
                <p className="text-[9px] text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
              </div>
            )}
            {metrics.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[7px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Metrics</p>
                {metrics.map((m) => (
                  <PerformanceMeter key={m.label} value={m.value} label={m.label} color={m.color} size="sm" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  if (portfolio.projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-4 relative grid-bg" aria-label="Projects">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-[3px] h-5 bg-gradient-to-b from-[var(--color-accent-blue)] to-[var(--color-accent-teal)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Pit Wall Monitor</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Projects</h2>
            </div>
          </div>

          <div className="columns-1 md:columns-2 gap-4">
            {portfolio.projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
