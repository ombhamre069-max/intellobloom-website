"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Top edge: continuous electric blue track.
 * White fill grows from the left only as scroll progresses.
 */
export function ScrollProgressBar() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-electric"
      aria-hidden
    >
      <div
        className="h-full bg-white"
        style={{
          width: "calc(var(--scroll-progress, 0) * 100%)",
        }}
      />
    </div>
  );
}
