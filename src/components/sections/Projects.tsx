"use client";

import { useState } from "react";
import { ExternalLink, GitBranch, Plus, Minus } from "lucide-react";
import { portfolio, getProject } from "@/lib/portfolio";
import { TelemetryPanel } from "@/components/ui/TelemetryPanel";
import { PerformanceMeter } from "@/components/ui/PerformanceMeter";
import { SectionReveal, StaggerReveal, StaggerItem } from "@/components/ui/SectionReveal";
import { EasterEgg } from "@/components/ui/EasterEgg";
import { MotionCard } from "@/components/ui/MotionCard";

const statusConfig: Record<string, { label: string; color: string; bgClass: string }> = {
  "in-production": {
    label: "IN PRODUCTION",
    color: "#66d9a0",
    bgClass: "bg-[var(--color-accent-green)]/10 border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)]",
  },
  experimental: {
    label: "EXPERIMENTAL",
    color: "#b388ff",
    bgClass: "bg-[var(--color-accent-purple)]/10 border-[var(--color-accent-purple)]/30 text-[var(--color-accent-purple)]",
  },
  archived: {
    label: "ARCHIVED",
    color: "#8a8a9a",
    bgClass: "bg-[var(--text-dim)]/10 border-[var(--text-dim)]/30 text-[var(--text-dim)]",
  },
};

function ProjectCard({ project, index }: { project: ReturnType<typeof getProject>; index: number }) {
  const [expanded, setExpanded] = useState(false);
  if (!project) return null;

  const heights = ["min-h-[220px]", "min-h-[260px]", "min-h-[240px]"];
  const cardHeight = heights[index % 3];

  const metrics: { label: string; value: number; color: string }[] = [];
  if (project.metrics && Array.isArray(project.metrics)) {
    project.metrics.forEach((m) => {
      if (typeof m === "string") {
        const [key, val] = m.split(":").map((s) => s.trim());
        if (key && val) {
          const v = parseInt(val);
          const c = key.toLowerCase().includes("perf") ? "var(--color-accent-green)" : key.toLowerCase().includes("rel") ? "var(--color-accent-teal)" : "var(--color-accent-blue)";
          metrics.push({ label: key, value: isNaN(v) ? 85 : v, color: c });
        }
      }
    });
  }

  const status = project.status ? statusConfig[project.status] : null;

  return (
    <StaggerItem>
      <MotionCard tiltAmount={5} className={`h-full ${cardHeight}`}>
        <TelemetryPanel label={project.type?.toUpperCase() ?? "PROJECT"} accent={project.accent} className="group h-full hover-lift">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 15%, transparent), color-mix(in srgb, ${project.accent} 5%, transparent))`,
                border: `1px solid color-mix(in srgb, ${project.accent} 25%, transparent)`,
              }}
              aria-hidden="true"
            >
              <EasterEgg message={`Shipped ${project.name} to prod! Pit stop complete.`} icon="🏁" trigger="click" size="lg">
                <span className="text-base cursor-pointer hover:scale-125 transition-transform inline-block">{project.icon}</span>
              </EasterEgg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="heading-sm text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
                {status && (
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[7px] font-mono uppercase tracking-wider rounded-sm border ${status.bgClass}`}>
                    <span className="relative inline-flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: status.color }} />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: status.color }} />
                    </span>
                    {status.label}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5 line-clamp-2 leading-relaxed">{project.desc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)] rounded-sm border border-[var(--border-default)] bg-[var(--bg-surface)] transition-colors group-hover:border-[var(--border-strong)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border-default)]/60">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-sm transition-all" aria-label={`${project.name} GitHub repository`}>
                <GitBranch className="w-3 h-3" aria-hidden="true" />
                Repo
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-sm transition-all" aria-label={`${project.name} live demo`}>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                Demo
              </a>
            )}
            {(project.problem || project.solution || metrics.length > 0) && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-auto flex items-center gap-1 px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                aria-expanded={expanded}
                aria-label={`${expanded ? "Hide" : "Show"} project telemetry`}
              >
                {expanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                DATA
              </button>
            )}
          </div>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-[var(--border-default)]/60 animate-fade-in space-y-3">
              {project.problem && (
                <div>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--accent)] mb-1">PROBLEM</p>
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--color-accent-green)] mb-1">SOLUTION</p>
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
                </div>
              )}
              {project.challenges && (
                <div>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--color-accent-gold)] mb-1">CHALLENGES</p>
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] leading-relaxed">{project.challenges}</p>
                </div>
              )}
              {project.lessons && (
                <div>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--color-accent-teal)] mb-1">LESSONS</p>
                  <p className="text-[10px] font-mono text-[var(--text-secondary)] leading-relaxed">{project.lessons}</p>
                </div>
              )}
              {metrics.length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)]">PERFORMANCE METRICS</p>
                  {metrics.map((m) => (
                    <PerformanceMeter key={m.label} value={m.value} label={m.label} color={m.color} size="sm" />
                  ))}
                </div>
              )}
              {project.architecture && (
                <div>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">ARCHITECTURE</p>
                  <pre className="text-[8px] font-mono text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap bg-[var(--bg-surface)] p-2 rounded-sm border border-[var(--border-default)]/60">{project.architecture}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </TelemetryPanel>
      </MotionCard>
    </StaggerItem>
  );
}

export function Projects() {
  if (portfolio.projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-4 relative section-carbon" aria-label="Projects">
      <SectionReveal>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="section-accent-bar bg-gradient-to-b from-[var(--color-accent-blue)] to-[var(--color-accent-teal)]" aria-hidden="true" />
          <div>
            <p className="label-sm tracking-[0.2em]">PIT WALL MONITOR</p>
            <h2 className="heading-md text-3xl sm:text-4xl text-[var(--text-primary)] mt-0.5">Projects</h2>
          </div>
        </div>

        <StaggerReveal staggerDelay={0.1} direction="up">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {portfolio.projects.map((project, idx) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        </StaggerReveal>
      </div>
      </SectionReveal>
    </section>
  );
}
