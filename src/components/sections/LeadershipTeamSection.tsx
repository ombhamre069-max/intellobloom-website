"use client";

import { motion, useReducedMotion } from "framer-motion";
import { leadershipTeam } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { fadeUp, viewport } from "@/components/motion/variants";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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
          {leadershipTeam.map((member, index) => (
            <motion.li key={member.id} variants={fadeUp}>
              <SpotlightCard
                className="card-border-glow h-full"
                innerClassName="p-6"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-stem-orange/30 via-white to-stem-grey/20 font-display text-sm font-semibold text-midnight shadow-[inset_0_0_0_1px_rgb(242_140_40/0.25)]"
                    aria-hidden
                    whileHover={reduced ? undefined : { rotate: index % 2 === 0 ? 3 : -3 }}
                  >
                    {initials(member.name)}
                    <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-stem-orange" />
                  </motion.div>
                  <div>
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

        <SectionReveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center text-sm text-stem-grey">
            Team photography and extended bios can be added when approved for publication. Roles
            listed reflect current organization structure.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
