"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { company } from "@/content/company";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

export function HeroSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      id="home"
      className="section-glass relative min-h-[105vh] overflow-hidden pt-[var(--nav-height)]"
    >
      <motion.div
        className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-32 pt-14 sm:px-6 lg:min-h-[calc(105vh-var(--nav-height))] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-40 lg:pt-20"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-stem-orange/25 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-stem-orange backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-stem-orange" />
            Parent Technology Company
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.25rem,5.5vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-[#3d424a]"
          >
            {company.tagline}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-xl text-stem-grey sm:text-2xl">
            {company.subTagline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-relaxed text-stem-grey">
            {company.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" className="min-w-[220px]">
              Start a Project Conversation
            </Button>
            <Button href="/#overview" variant="outline" size="lg" className="min-w-[220px] bg-white/80">
              What We Do
            </Button>
          </motion.div>
        </motion.div>

        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border border-stem-grey/15 bg-white/75 p-6 shadow-soft backdrop-blur-md sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-stem-orange">
            At a glance
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-stem-grey">
            {company.heroGlance.map((item) => (
              <li key={item.title} className="border-b border-stem-grey/10 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-midnight">{item.title}</p>
                <p className="mt-1">{item.text}</p>
              </li>
            ))}
          </ul>
        </motion.aside>
      </motion.div>

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-stem-grey"
          animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <span className="uppercase tracking-[0.3em]">Scroll to explore</span>
          <div className="h-12 w-px bg-gradient-to-b from-stem-orange to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
