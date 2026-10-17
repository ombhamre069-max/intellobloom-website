"use client";

import { motion } from "framer-motion";
import { company } from "@/content/company";
import { fadeUp, viewport } from "@/components/motion/variants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function TrustStrip() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-slate-200/80 bg-white/50 py-8 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-base to-transparent sm:w-24" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-base to-transparent sm:w-24" aria-hidden />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {!reduced ? (
          <ul className="trust-marquee-track flex w-max gap-4 sm:gap-5">
            {[...company.trustPoints, ...company.trustPoints].map((point, i) => (
              <li
                key={`${point}-${i}`}
                className="flex min-w-[240px] max-w-xs shrink-0 items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-5 py-4 shadow-sm sm:min-w-[280px]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                  {String((i % company.trustPoints.length) + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium leading-snug text-midnight">{point}</p>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {company.trustPoints.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="rounded-xl border border-slate-200/80 bg-white/90 px-5 py-4"
              >
                <p className="text-sm font-medium leading-snug text-midnight">{point}</p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
