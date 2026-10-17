"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { businesses } from "@/content/businesses";
import { getVentureExploreUrl } from "@/lib/venture-links";

const intellistem = businesses.find((b) => b.id === "intellistem")!;
const agni = businesses.find((b) => b.id === "agnikawach")!;

export function HeroEcosystemVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-none">
      <div
        className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgb(37_99_235/0.16),transparent_62%)] blur-2xl"
        aria-hidden
      />
      <div
        className="absolute inset-[8%] rounded-full border border-slate-200/80 bg-white/50 shadow-[inset_0_0_48px_rgb(37_99_235/0.05)] backdrop-blur-md"
        aria-hidden
      />

      {!reduced && (
        <div
          className="pointer-events-none absolute inset-[18%] rounded-full border border-dashed border-slate-300/60 hero-orbit-slow"
          aria-hidden
        />
      )}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-brand/40"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          d="M200 118 L118 268"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.65"
        />
        <path
          d="M200 118 L282 268"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          opacity="0.65"
        />
      </svg>

      <motion.div
        className="absolute left-1/2 top-[14%] w-[min(72%,220px)] -translate-x-1/2 rounded-2xl border border-slate-200/90 bg-white/90 p-4 text-center shadow-soft backdrop-blur-sm sm:p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand">Parent</p>
        <p className="font-display text-xl font-semibold tracking-tight text-midnight sm:text-2xl">
          Intellobloom
        </p>
        <p className="mt-1 text-xs leading-snug text-stem-grey">
          Venture builder &amp; technology company
        </p>
      </motion.div>

      <VentureChip
        venture={intellistem}
        className="left-[4%] top-[58%] sm:left-[2%]"
        accent="from-sky-500/10 to-white border-slate-200 hover:border-brand/40"
        labelClass="text-brand-secondary"
      />
      <VentureChip
        venture={agni}
        className="right-[4%] top-[58%] sm:right-[2%]"
        accent="from-amber-700/10 to-white border-slate-200 hover:border-agni/50"
        labelClass="text-agni"
      />
    </div>
  );
}

function VentureChip({
  venture,
  className,
  accent,
  labelClass,
}: {
  venture: (typeof businesses)[number];
  className: string;
  accent: string;
  labelClass: string;
}) {
  const href = getVentureExploreUrl(venture);

  return (
    <motion.div
      className={`absolute w-[min(46%,200px)] ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: venture.id === "intellistem" ? 0.25 : 0.32 }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={href}
        target={venture.exploreUrl ? "_blank" : undefined}
        rel={venture.exploreUrl ? "noopener noreferrer" : undefined}
        className={`group block rounded-2xl border bg-gradient-to-br p-4 shadow-sm transition-shadow hover:shadow-soft ${accent}`}
      >
        <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${labelClass}`}>
          {venture.verticalLabel}
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-midnight">{venture.name}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stem-grey">
          {venture.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-midnight transition-colors group-hover:text-brand">
          Explore
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
