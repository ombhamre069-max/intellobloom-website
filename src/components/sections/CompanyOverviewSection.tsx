"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Factory, GraduationCap, Handshake } from "lucide-react";
import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionPattern } from "@/components/ui/SectionPattern";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { fadeUp, viewport } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

const icons = [Building2, GraduationCap, Factory, Handshake];

export function CompanyOverviewSection() {
  const reduced = useReducedMotion();
  const { overview } = company;

  return (
    <SectionPattern
      id="overview"
      pattern="graph"
      className="border-b border-midnight/8 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Company Overview"
          title={overview.headline}
          description={overview.summary}
          className="max-w-3xl"
        />

        <motion.div
          className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {overview.blocks.map((block, index) => {
            const Icon = icons[index] ?? Building2;
            return (
              <motion.div
                key={block.title}
                variants={fadeUp}
                className={cn(
                  index === 0 && "lg:col-span-7",
                  index === 1 && "lg:col-span-5",
                  index === 2 && "lg:col-span-5",
                  index === 3 && "lg:col-span-7",
                )}
              >
                <SpotlightCard
                  className={cn("card-border-glow h-full bg-white/90", index === 0 && "lg:min-h-[220px]")}
                  innerClassName={cn(
                    "flex flex-col p-8",
                    index === 0 && "lg:flex-row lg:items-start lg:gap-8 lg:p-10",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-stem-orange/25 to-stem-orange/5 text-stem-orange shadow-[inset_0_0_0_1px_rgb(242_140_40/0.2)]",
                      index === 0 && "lg:h-14 lg:w-14",
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="mt-5 lg:mt-0">
                    <h3 className="font-display text-xl font-semibold text-midnight">{block.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-midnight/70">{block.body}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>

        <SectionReveal className="mt-12">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-stem-orange/25 bg-gradient-to-br from-stem-orange/12 via-white/90 to-stem-grey/8 px-6 py-8 backdrop-blur-md sm:px-10"
            whileHover={reduced ? undefined : { scale: 1.005 }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-stem-orange/20 blur-3xl"
              aria-hidden
            />
            <p className="relative text-sm font-semibold uppercase tracking-wider text-stem-orange">
              In one sentence
            </p>
            <p className="relative mt-3 max-w-4xl text-lg leading-relaxed text-midnight sm:text-xl">
              <strong className="font-semibold">Intellobloom</strong> is the parent technology
              company — <strong className="font-semibold">IntelliSTEM</strong> is our education
              venture, and <strong className="font-semibold">AgniKawach</strong> is our industrial
              safety initiative for Oil &amp; Gas.
            </p>
          </motion.div>
        </SectionReveal>
      </div>
    </SectionPattern>
  );
}
