"use client";

import { motion, useReducedMotion } from "framer-motion";
import { leadershipTeam } from "@/content/team";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
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
        <SectionReveal>
          <SectionHeader
            eyebrow="Leadership & Team"
            title="People behind the ventures."
            description="Intellobloom combines executive direction, product design, engineering, and security expertise to build and support our ventures responsibly."
            align="center"
          />
        </SectionReveal>

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
            <motion.li
              key={member.id}
              variants={fadeUp}
              whileHover={reduced ? undefined : { y: -6 }}
              className="rounded-2xl border border-stem-grey/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-soft"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-stem-orange/25 to-stem-grey/20 font-display text-sm font-semibold text-midnight"
                  aria-hidden
                >
                  {initials(member.name)}
                </div>
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
