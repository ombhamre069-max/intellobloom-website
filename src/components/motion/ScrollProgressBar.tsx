"use client";

import { useScrollMotion } from "@/hooks/useScrollMotion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollProgressBar() {
  const { progress } = useScrollMotion();
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-stem-orange via-stem-grey to-stem-orange opacity-90"
      style={{ transform: `scaleX(${Math.max(0.02, progress)})` }}
      aria-hidden
    />
  );
}
