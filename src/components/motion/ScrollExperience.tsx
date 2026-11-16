"use client";

import { MotionConfig } from "framer-motion";
import { ScrollMotionProvider } from "@/hooks/useScrollMotion";
import { AmbientScrollCanvas } from "@/components/motion/AmbientScrollCanvas";
import { ScrollMeshGradient } from "@/components/motion/ScrollMeshGradient";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { ScrollOrbs } from "@/components/motion/ScrollOrbs";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <ScrollMotionProvider>
        <div className="fixed inset-0 z-0 bg-platinum" aria-hidden />
        <ScrollMeshGradient />
        <ScrollOrbs />
        <AmbientScrollCanvas />
        <ScrollProgressBar />
        <div className="relative z-[2]">{children}</div>
      </ScrollMotionProvider>
    </MotionConfig>
  );
}
