"use client";

import { motion, useReducedMotion } from "framer-motion";

const items = [
  "Education Technology",
  "Industrial Safety",
  "AI & Robotics",
  "Software Platforms",
  "Consequence Modelling",
  "Venture Partnerships",
  "Applied Engineering",
];

export function CapabilityMarquee() {
  const reduced = useReducedMotion();
  const track = [...items, ...items];

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-[2] overflow-hidden border-t border-stem-orange/15 bg-white/55 py-2.5 backdrop-blur-lg"
      aria-hidden
    >
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap px-4 text-[11px] font-medium uppercase tracking-[0.22em] text-stem-grey"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {track.map((label, i) => (
          <span key={`${label}-${i}`} className="inline-flex items-center gap-10">
            {label}
            <span className="h-1 w-1 rounded-full bg-stem-orange" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
