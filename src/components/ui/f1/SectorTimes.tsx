import type { Project } from "@/lib/portfolio";

export function SectorTimes({ project, allProjects }: { project: Project; allProjects: Project[] }) {
  const s1 = project.tags?.length ?? 0;
  const s2 = project.desc?.split(" ").length ?? 0;
  const s3 = project.metrics?.length ?? 0;

  const max1 = Math.max(...allProjects.map((p) => p.tags?.length ?? 0), 1);
  const max2 = Math.max(...allProjects.map((p) => p.desc?.split(" ").length ?? 0), 1);
  const max3 = Math.max(...allProjects.map((p) => p.metrics?.length ?? 0), 1);

  const avg1 = allProjects.reduce((s, p) => s + (p.tags?.length ?? 0), 0) / allProjects.length;
  const avg2 = allProjects.reduce((s, p) => s + (p.desc?.split(" ").length ?? 0), 0) / allProjects.length;
  const avg3 = allProjects.reduce((s, p) => s + (p.metrics?.length ?? 0), 0) / allProjects.length;

  const sectors = [
    { label: "S1", value: s1, max: max1, avg: avg1 },
    { label: "S2", value: s2, max: max2, avg: avg2 },
    { label: "S3", value: s3, max: max3, avg: avg3 },
  ];

  const barHeight = 80;

  return (
    <div className="flex items-end gap-3 pt-2">
      {sectors.map((s) => {
        const pct = s.max > 0 ? (s.value / s.max) * barHeight : 0;
        const isPb = s.value === s.max && s.max > 0;
        const isAbove = s.value > s.avg;
        const color = isPb ? "var(--color-accent-purple)" : isAbove ? "var(--color-display-green)" : "var(--color-display-amber)";
        return (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <span className="text-xs font-mono text-[var(--text-dim)]">{s.value}</span>
            <div className="w-4 md:w-5 rounded-sm" style={{ height: `${pct}px`, backgroundColor: color, minHeight: s.value > 0 ? 4 : 0 }} />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}
