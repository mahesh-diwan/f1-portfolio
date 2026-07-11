"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center p-8 text-center" role="alert">
            <div className="w-1 h-8 bg-[var(--accent-primary)] mb-4" aria-hidden="true" />
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent-primary)] mb-2">
              SYSTEM ERROR
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              An unexpected error occurred. Please try refreshing the page.
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
