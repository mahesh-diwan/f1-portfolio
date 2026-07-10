interface SectionHeaderProps {
  sector: string;
  right: string;
  title: string;
}

export function SectionHeader({ sector, right, title }: SectionHeaderProps) {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-1">
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-[var(--color-display-amber)]">
          {sector}
        </span>
        <span className="h-px flex-1 bg-[var(--border-default)]" aria-hidden="true" />
        <span className="text-xs font-mono tabular-nums text-[var(--color-display-green)]">
          {right}
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] text-balance">
        {title}
      </h2>
    </div>
  );
}
