"use client";

import { motion, useReducedMotion } from "framer-motion";
import { innovationSteps } from "@/content/innovation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { fadeUp, viewport } from "@/components/motion/variants";

export function InnovationTimeline() {
  const reduced = useReducedMotion();

  return (
    <section id="innovation" className="section-glass-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Innovation"
            title="From Complex Challenges to Purpose-Built Solutions."
            description="Our working approach — applied thoughtfully across ventures, not claimed uniformly for every initiative."
            align="center"
          />
        </SectionReveal>

        <div className="relative mt-16">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-stem-orange/40 to-transparent md:block"
            aria-hidden
          />
          <motion.ol
            className="relative grid gap-8 md:grid-cols-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {innovationSteps.map((step, index) => (
              <motion.li key={step.step} variants={fadeUp} className="relative">
                <motion.div
                  className="flex flex-col items-start md:items-center md:text-center"
                  whileHover={reduced ? undefined : { y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <motion.span
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-stem-orange/30 bg-white font-mono text-sm text-stem-orange shadow-sm"
                    whileInView={reduced ? undefined : { scale: [0.85, 1.05, 1] }}
                    viewport={viewport}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    {step.step}
                  </motion.span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-midnight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stem-grey">
                    {step.description}
                  </p>
                </motion.div>
                {index < innovationSteps.length - 1 && (
                  <div
                    className="mx-auto mt-6 h-8 w-px bg-stem-orange/25 md:hidden"
                    aria-hidden
                  />
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
