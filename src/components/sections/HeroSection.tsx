"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { company } from "@/content/company";
import { Button } from "@/components/ui/Button";
import { HeroEcosystemVisual } from "@/components/motion/HeroEcosystemVisual";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

function HighlightTagline({ text }: { text: string }) {
  const parts = text.split(/(Intelligence|Impact)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === "Intelligence" || part === "Impact" ? (
          <span key={i} className="text-gradient-brand">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function HeroSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const visualScale = useTransform(scrollYProgress, [0, 0.85], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[108vh] overflow-hidden pt-[var(--nav-height)]"
    >
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgb(242_140_40/0.18),transparent_55%)]" aria-hidden />
      <div className="section-grid-drift pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <motion.div
        className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-36 pt-12 sm:px-6 lg:min-h-[calc(108vh-var(--nav-height))] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-8 lg:pb-44 lg:pt-16"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-stem-orange/30 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stem-orange shadow-[0_0_0_1px_rgb(255_255_255/0.5)_inset] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-stem-orange opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-stem-orange" />
            </span>
            Parent Technology Company
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.35rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-[#2d3239]"
          >
            <HighlightTagline text={company.tagline} />
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xl font-medium leading-snug text-midnight/90 sm:text-2xl"
          >
            {company.subTagline}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-stem-grey">
            {company.description}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" shine className="min-w-[240px]">
              Start a Project Conversation
            </Button>
            <Button href="/#overview" variant="outline" size="lg" className="min-w-[240px] border-white/50 bg-white/50 backdrop-blur-sm">
              What We Do
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {company.heroGlance.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-white/50 bg-white/45 px-4 py-3 backdrop-blur-md transition-colors hover:border-stem-orange/35 hover:bg-white/65"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stem-orange">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-snug text-stem-grey">{item.text}</p>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative lg:justify-self-end"
          style={reduced ? undefined : { scale: visualScale }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroEcosystemVisual />
        </motion.div>
      </motion.div>

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute bottom-28 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-stem-grey"
          animate={{ y: [0, 10, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <span>Scroll to explore</span>
          <div className="scroll-indicator h-14 w-px bg-gradient-to-b from-stem-orange via-stem-orange/50 to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
