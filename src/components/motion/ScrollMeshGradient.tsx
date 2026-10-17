"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Lightweight static mesh — no Framer infinite loops (smoother scroll). */
export function ScrollMeshGradient() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="mesh-blob mesh-blob-a absolute -left-[15%] top-[8%] h-[65vmin] w-[65vmin] rounded-full bg-brand/12 blur-[100px]" />
      <div className="mesh-blob mesh-blob-b absolute -right-[10%] top-[30%] h-[55vmin] w-[55vmin] rounded-full bg-slate-400/15 blur-[90px]" />
      <div className="mesh-blob mesh-blob-c absolute bottom-[12%] left-[28%] h-[40vmin] w-[40vmin] rounded-full bg-brand/8 blur-[80px]" />
    </div>
  );
}
