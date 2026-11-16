"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { VerticalId } from "@/content/verticals";
import { verticals } from "@/content/verticals";
import { cn } from "@/lib/utils";

const visuals: Record<VerticalId, { gradient: string; mesh: string; label: string }> = {
  education: {
    gradient: "from-electric/30 via-electric/10 to-transparent",
    mesh: "education-mesh",
    label: "IntelliSTEM · AI · Robotics · STEM",
  },
  energy: {
    gradient: "from-agni/25 via-charcoal/40 to-transparent",
    mesh: "energy-mesh",
    label: "AgniKawach · Oil & Gas · Risk & safety",
  },
};

export function VerticalGatewayCard({ id }: { id: VerticalId }) {
  const reduced = useReducedMotion();
  const v = verticals[id];
  const visual = visuals[id];

  return (
    <motion.div
      className="group relative h-full min-h-[260px] lg:min-h-[300px]"
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={v.href}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl border p-7 shadow-soft transition-shadow duration-500 sm:p-8",
          id === "education"
            ? "border-white/15 bg-white/95 text-midnight hover:shadow-[0_24px_60px_-20px_rgb(57_120_232/0.4)]"
            : "border-white/10 bg-charcoal/90 text-white hover:shadow-[0_24px_60px_-20px_rgb(240_120_50/0.3)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100",
            visual.gradient,
          )}
          aria-hidden
        />
        <div className={cn("pointer-events-none absolute inset-0", visual.mesh)} aria-hidden />

        <span
          className={cn(
            "relative text-[11px] font-semibold uppercase tracking-[0.28em]",
            id === "education" ? "text-electric" : "text-agni",
          )}
        >
          {v.venture}
        </span>
        <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {v.title}
        </h3>
        <p
          className={cn(
            "relative mt-1 text-xs font-medium uppercase tracking-wide",
            id === "education" ? "text-steel" : "text-steel",
          )}
        >
          {v.subtitle}
        </p>
        <p
          className={cn(
            "relative mt-4 max-w-sm text-sm leading-relaxed",
            id === "education" ? "text-[#5a6b7d]" : "text-steel",
          )}
        >
          {v.description}
        </p>
        <span
          className={cn(
            "relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold",
            id === "education" ? "text-midnight" : "text-white",
          )}
        >
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
