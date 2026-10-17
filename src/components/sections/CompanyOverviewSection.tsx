"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Factory, GraduationCap, Handshake } from "lucide-react";
import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { fadeUp, viewport } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

const icons = [Building2, GraduationCap, Factory, Handshake];

export function CompanyOverviewSection() {
  const reduced = useReducedMotion();
  const { overview } = company;

  return (
    <section id="overview" className="section-glass border-b border-stem-grey/10 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Company Overview"
            title={overview.headline}
            description={overview.summary}
            className="max-w-3xl"
          />
        </SectionReveal>

        <motion.div
          className="mt-14 grid gap-6 lg:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {overview.blocks.map((block, index) => {
            const Icon = icons[index] ?? Building2;
            return (
              <motion.article
                key={block.title}
                variants={fadeUp}
                whileHover={reduced ? undefined : { y: -4 }}
                className={cn(
                  "rounded-2xl border border-stem-grey/15 bg-off-white p-8 shadow-sm transition-shadow hover:shadow-soft",
                  index === 0 && "lg:col-span-2 lg:flex lg:gap-8 lg:p-10",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stem-orange/12 text-stem-orange",
                    index === 0 && "lg:h-14 lg:w-14",
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className={cn(index === 0 && "lg:mt-0 mt-5")}>
                  <h3 className="font-display text-xl font-semibold text-midnight">{block.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-stem-grey">{block.body}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <SectionReveal className="mt-12">
          <div className="rounded-2xl border border-stem-orange/20 bg-gradient-to-r from-stem-orange/8 via-white to-stem-grey/5 px-6 py-8 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-stem-orange">
              In one sentence
            </p>
            <p className="mt-3 max-w-4xl text-lg leading-relaxed text-midnight sm:text-xl">
              <strong className="font-semibold">Intellobloom</strong> is the parent technology
              company — <strong className="font-semibold">IntelliSTEM</strong> is our education
              venture, and <strong className="font-semibold">AgniKawach</strong> is our industrial
              safety initiative for Oil &amp; Gas.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
