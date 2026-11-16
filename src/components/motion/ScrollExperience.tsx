"use client";

import { MotionConfig } from "framer-motion";
import { ScrollMotionProvider } from "@/hooks/useScrollMotion";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <ScrollMotionProvider>
        <div className="fixed inset-0 z-0 bg-midnight" aria-hidden />
        <ScrollProgressBar />
        <div className="relative z-[2]">{children}</div>
      </ScrollMotionProvider>
    </MotionConfig>
  );
}
