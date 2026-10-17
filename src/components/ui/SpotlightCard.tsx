"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function SpotlightCard({ children, className, innerClassName }: SpotlightCardProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(480px circle at ${x}px ${y}px, rgb(37 99 235 / 0.11), transparent 42%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  if (reduced) {
    return (
      <div className={cn("rounded-2xl border border-stem-grey/15 bg-white/90", className)}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-stem-grey/15 bg-white/75 shadow-sm backdrop-blur-md transition-shadow duration-500 hover:shadow-soft",
        className,
      )}
      onMouseMove={onMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgb(37 99 235 / 0.06), transparent 40%, rgb(100 116 139 / 0.05))",
        }}
        aria-hidden
      />
      <div className={cn("relative", innerClassName)}>{children}</div>
    </motion.div>
  );
}
