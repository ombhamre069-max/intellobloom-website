"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollOrbs() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="scroll-orb scroll-orb-a absolute -left-32 top-[12%] h-[420px] w-[420px] rounded-full bg-stem-orange/18 blur-[100px]" />
      <div className="scroll-orb scroll-orb-b absolute -right-24 top-[38%] h-[360px] w-[360px] rounded-full bg-stem-grey/14 blur-[90px]" />
      <div className="scroll-orb scroll-orb-c absolute bottom-[18%] left-[35%] h-[280px] w-[280px] rounded-full bg-stem-orange/8 blur-[80px]" />
      <div className="scroll-grid-drift absolute inset-0 opacity-[0.55]" />
    </div>
  );
}
