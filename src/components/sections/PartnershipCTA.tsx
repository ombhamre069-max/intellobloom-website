"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { company } from "@/content/company";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewport } from "@/components/motion/variants";

export function PartnershipCTA() {
  const reduced = useReducedMotion();
  const cta = company.partnershipCta;

  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3f444c] via-[#52565e] to-[#707780]" aria-hidden />
      <motion.div
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-stem-orange/25 blur-[100px]"
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-[90px]"
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-stem-orange"
          >
            Work With Intellobloom
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {cta.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-white/75">
            {cta.description}
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button href="/contact" size="lg" className="min-w-[240px]">
              {cta.primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              href="/#ecosystem"
              variant="secondary"
              size="lg"
              className="min-w-[240px] border-white/25 bg-white/10 text-white hover:bg-white/15"
            >
              {cta.secondaryLabel}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
