"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollOrbs() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="scroll-orb scroll-orb-a absolute -left-32 top-[12%] h-[380px] w-[380px] rounded-full bg-brand/14 blur-[90px]" />
      <div className="scroll-orb scroll-orb-b absolute -right-24 top-[38%] h-[320px] w-[320px] rounded-full bg-slate-400/12 blur-[80px]" />
      <div className="scroll-grid-drift absolute inset-0 opacity-40" />
    </div>
  );
}
