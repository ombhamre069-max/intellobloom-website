"use client";

import { motion } from "framer-motion";
import { company } from "@/content/company";
import { fadeUp, viewport } from "@/components/motion/variants";

export function TrustStrip() {
  return (
    <section className="section-glass border-y border-stem-grey/15 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
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
              className="group relative overflow-hidden rounded-xl border border-stem-grey/15 bg-off-white px-5 py-4"
            >
              <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-stem-orange transition-transform duration-500 group-hover:scale-y-100" />
              <p className="pl-2 text-sm font-medium leading-snug text-midnight">{point}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
