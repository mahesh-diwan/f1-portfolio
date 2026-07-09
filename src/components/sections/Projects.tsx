"use client";

import { useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { ExternalLink, GitBranch, Plus, Minus } from "lucide-react";
import { portfolio, getProject } from "@/lib/portfolio";
import { PerformanceMeter } from "@/components/ui/f1/PerformanceMeter";
import { SectionReveal } from "@/components/ui/motion/SectionReveal";
import { EasterEgg } from "@/components/ui/primitives/EasterEgg";

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

function ProjectCard({ project, index, blurControls }: { project: ReturnType<typeof getProject>; index: number; blurControls: ReturnType<typeof useAnimation> }) {
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
  const heights = ["min-h-[220px]", "min-h-[300px]", "min-h-[240px]", "min-h-[280px]"];
  const cardHeight = heights[index % 4];

  return (
    <div className="break-inside-avoid mb-4">
      <motion.div
        className={`glass shadow-card hover-lift p-5 ${cardHeight} flex flex-col`}
        animate={blurControls}
        initial={{ filter: "blur(0px)", scale: 1 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--text-muted)] font-mono">
            {project.type?.toUpperCase()}
          </span>
          {status && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider border ${status.bgClass}`}>
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-telemetry-pulse" style={{ backgroundColor: status.color }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: status.color }} />
              </span>
              {status.label}
            </span>
          )}
        </div>

        {/* Title + icon */}
        <div className="flex items-start gap-3 mb-3">
          <EasterEgg message={`Shipped ${project.name} to prod!`} icon="🏁" trigger="click">
            <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">{project.icon}</span>
          </EasterEgg>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{project.name}</h3>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">{project.desc}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-[var(--text-muted)] border border-[var(--border-default)] bg-[var(--bg-surface)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border-default)]">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-[9px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} repository`}>
              <GitBranch className="w-3 h-3" /> Repo
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-[9px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={`${project.name} demo`}>
              <ExternalLink className="w-3 h-3" /> Demo
            </a>
          )}
          {(project.problem || project.solution || project.architecture || metrics.length > 0) && (
            <button onClick={() => setExpanded(!expanded)}
              className="ml-auto flex items-center gap-0.5 px-2 py-1 text-[9px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
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
                <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--accent)] mb-1">Problem</p>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-display-green)] mb-1">Solution</p>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.architecture && (
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--color-accent-teal)] mb-1">Architecture</p>
                <pre className="text-[9px] font-mono text-[var(--text-secondary)] bg-[var(--bg-elevated)] p-2 rounded border border-[var(--border-default)] overflow-x-auto whitespace-pre leading-relaxed">{project.architecture}</pre>
              </div>
            )}
            {metrics.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)]">Metrics</p>
                {metrics.map((m) => (
                  <PerformanceMeter key={m.label} value={m.value} label={m.label} color={m.color} size="sm" />
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function Projects() {
  if (portfolio.projects.length === 0) return null;

  const reducedMotion = useReducedMotion() ?? false;
  const blurControls = useAnimation();

  const handlePitStop = async () => {
    if (reducedMotion) return;
    await blurControls.start({
      filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
      scale: [1, 0.98, 1],
      transition: { duration: 1.5, ease: "easeInOut" },
    });
  };

  return (
    <section id="projects" className="py-20 px-4 relative grid-bg" aria-label="Projects">
      <SectionReveal>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="flex items-center gap-3 mb-12 cursor-pointer select-none"
            onClick={handlePitStop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePitStop(); }}
          >
            <div className="w-[3px] h-5 bg-gradient-to-b from-[var(--color-accent-blue)] to-[var(--color-accent-teal)]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">Pit Wall Monitor</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">Projects</h2>
            </div>
          </div>

          <div className="columns-1 md:columns-2 gap-4">
            {portfolio.projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} blurControls={blurControls} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
