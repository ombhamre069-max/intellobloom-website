"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollMotion } from "@/hooks/useScrollMotion";

export function ScrollMeshGradient() {
  const reduced = useReducedMotion();
  const { progress } = useScrollMotion();

  if (reduced) return null;

  const rotate = progress * 28;
  const scale = 1 + progress * 0.15;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-[20%] top-[5%] h-[70vmin] w-[70vmin] rounded-full bg-stem-orange/25 blur-[120px]"
        animate={{ x: [0, 40, -20, 0], y: [0, 30, 10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotate: `${rotate}deg`, scale }}
      />
      <motion.div
        className="absolute -right-[15%] top-[25%] h-[60vmin] w-[60vmin] rounded-full bg-stem-grey/20 blur-[100px]"
        animate={{ x: [0, -35, 15, 0], y: [0, -25, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotate: `${-rotate * 0.8}deg`, scale }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-[45vmin] w-[45vmin] rounded-full bg-stem-orange/15 blur-[90px]"
        animate={{ x: [0, 25, -25, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotate: `${rotate * 1.2}deg` }}
      />
      <div
        className="mesh-noise absolute inset-0 opacity-[0.35]"
        style={{ transform: `translateY(calc(var(--scroll-y, 0px) * -0.08))` }}
      />
    </div>
  );
}
