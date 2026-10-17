"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { leadershipTeam } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { fadeUp, viewport } from "@/components/motion/variants";

export function LeadershipTeamSection() {
  const reduced = useReducedMotion();

  return (
    <section id="team" className="section-glass-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Leadership & Team"
          title="People behind the ventures."
          description="Intellobloom combines executive direction, product design, engineering, and security expertise to build and support our ventures responsibly."
          align="center"
        />

        <motion.ul
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {leadershipTeam.map((member) => (
            <motion.li key={member.id} variants={fadeUp}>
              <SpotlightCard className="card-border-glow h-full" innerClassName="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <motion.div
                    className="relative mx-auto h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl border border-stem-grey/20 bg-stem-grey/10 shadow-sm sm:mx-0"
                    whileHover={reduced ? undefined : { scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image
                      src={member.photo}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="120px"
                    />
                    <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-stem-orange" aria-hidden />
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display text-lg font-semibold text-midnight">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-stem-orange">{member.role}</p>
                    {member.focus && (
                      <p className="mt-3 text-sm leading-relaxed text-stem-grey">{member.focus}</p>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
