"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollMotion } from "@/hooks/useScrollMotion";

export function ParallaxEngineeringField() {
  const reduced = useReducedMotion();
  const { scrollY, progress } = useScrollMotion();

  if (reduced) return null;

  const y1 = scrollY * 0.12;
  const y2 = scrollY * -0.08;
  const y3 = scrollY * 0.18;
  const rot = progress * 12;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-70" aria-hidden>
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translateY(${y1}px) rotate(${rot * 0.3}deg)` }}
      >
        <defs>
          <pattern id="hexGrid" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
            <path
              d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z"
              fill="none"
              stroke="rgba(242,140,40,0.08)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      <svg
        className="absolute inset-0 h-full w-full"
        style={{ transform: `translateY(${y2}px)` }}
      >
        <circle
          cx="15%"
          cy="30%"
          r="120"
          fill="none"
          stroke="rgba(242,140,40,0.12)"
          strokeWidth="1"
          className="eng-ring-pulse"
        />
        <circle
          cx="85%"
          cy="55%"
          r="160"
          fill="none"
          stroke="rgba(112,119,128,0.15)"
          strokeWidth="1"
          className="eng-ring-pulse-slow"
        />
        <path
          d="M0 400 Q400 320 800 380 T1600 360"
          fill="none"
          stroke="rgba(242,140,40,0.1)"
          strokeWidth="1"
          strokeDasharray="8 12"
          className="engineering-dash-flow"
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% ${50 + progress * 20}%, rgba(242,140,40,0.06) 0%, transparent 45%)`,
          transform: `translateY(${y3}px)`,
        }}
      />
    </div>
  );
}
