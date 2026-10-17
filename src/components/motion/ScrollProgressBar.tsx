"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollProgressBar() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-[max(0.02,var(--scroll-progress))] bg-gradient-to-r from-brand via-slate-400 to-brand-secondary opacity-90"
      aria-hidden
    />
  );
}
