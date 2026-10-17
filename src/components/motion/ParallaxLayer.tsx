"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxLayerProps = {
  children: React.ReactNode;
  className?: string;
  /** Multiplier applied to --scroll-y (negative = moves up on scroll) */
  speed?: number;
};

export function ParallaxLayer({
  children,
  className,
  speed = -0.12,
}: ParallaxLayerProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn("will-change-transform", className)}
      style={{
        transform: `translate3d(0, calc(var(--scroll-y, 0px) * ${speed}), 0)`,
      }}
    >
      {children}
    </div>
  );
}
