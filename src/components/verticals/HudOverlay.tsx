"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Original minimal HUD — not a copy of any film UI */
export function HudOverlay() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hudStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3978E8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9EADBF" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Fine grid */}
        <g stroke="rgba(57,120,232,0.12)" strokeWidth="0.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="1200" y2={i * 50} />
          ))}
        </g>

        {/* Concentric HUD rings */}
        <g fill="none" stroke="url(#hudStroke)" strokeWidth="1">
          <circle cx="980" cy="220" r="70" opacity="0.7" />
          <circle cx="980" cy="220" r="95" opacity="0.4" strokeDasharray="4 8" />
          <circle cx="980" cy="220" r="120" opacity="0.25" strokeDasharray="2 10" />
        </g>

        {/* Corner brackets */}
        <g stroke="#3978E8" strokeWidth="1.2" fill="none" opacity="0.55">
          <path d="M40 40 H120 M40 40 V120" />
          <path d="M1160 40 H1080 M1160 40 V120" />
          <path d="M40 760 H120 M40 760 V680" />
          <path d="M1160 760 H1080 M1160 760 V680" />
        </g>

        {/* Neural-ish connection lines */}
        <g stroke="#3978E8" strokeWidth="0.8" opacity="0.35">
          <path d="M180 520 C280 480, 360 560, 460 500" fill="none" />
          <path d="M460 500 C560 440, 640 520, 760 480" fill="none" />
          <circle cx="180" cy="520" r="3" fill="#3978E8" />
          <circle cx="460" cy="500" r="3" fill="#3978E8" />
          <circle cx="760" cy="480" r="3" fill="#3978E8" />
        </g>
      </svg>

      {!reduced && (
        <>
          <motion.div
            className="absolute right-[12%] top-[18%] h-40 w-40 rounded-full border border-electric/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute left-0 top-[35%] h-px w-full bg-gradient-to-r from-transparent via-electric/40 to-transparent"
            animate={{ y: [0, 220, 0], opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
}
