import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="w-1 h-12 bg-[var(--accent-primary)] mb-6" aria-hidden="true" />
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-primary)] mb-3">
          ERROR 404
        </p>
        <h1 className="font-heading text-6xl font-bold text-[var(--text-primary)] mb-2">
          OFF TRACK
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
          This section does not exist on the circuit. The navigation system could not find the requested route.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider border border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors rounded-sm"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          RETURN TO PIT WALL
        </Link>
      </div>
    </div>
  );
}
