"use client";

import { motion, useReducedMotion } from "framer-motion";

export function BlueprintOverlay() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="bpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="rgba(158,173,191,0.18)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#bpGrid)" />

        {/* Pipeline schematic */}
        <g fill="none" stroke="#F07832" strokeWidth="1.4" opacity="0.55">
          <path d="M80 620 H320 L380 560 H620 L680 620 H920 L980 540 H1140" />
          <circle cx="320" cy="620" r="6" />
          <circle cx="620" cy="560" r="6" />
          <circle cx="920" cy="620" r="6" />
        </g>

        <g fill="none" stroke="#9EADBF" strokeWidth="1" opacity="0.4">
          <rect x="140" y="180" width="160" height="100" rx="2" />
          <rect x="360" y="160" width="120" height="140" rx="2" />
          <line x1="300" y1="230" x2="360" y2="230" />
          <text x="150" y="170" fill="#9EADBF" fontSize="11" fontFamily="monospace" opacity="0.7">
            PROCESS NODE
          </text>
        </g>

        {/* Measurement ticks */}
        <g stroke="#9EADBF" strokeWidth="0.8" opacity="0.35">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={100 + i * 80} y1="740" x2={100 + i * 80} y2="752" />
          ))}
          <line x1="100" y1="746" x2="980" y2="746" />
        </g>
      </svg>

      {!reduced && (
        <motion.div
          className="absolute bottom-[18%] left-[8%] h-px w-[70%] origin-left bg-gradient-to-r from-agni/70 via-agni/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 3 }}
        />
      )}
    </div>
  );
}
