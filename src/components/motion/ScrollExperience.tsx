"use client";

import { MotionConfig } from "framer-motion";
import { ScrollMotionProvider } from "@/hooks/useScrollMotion";
import { AmbientScrollCanvas } from "@/components/motion/AmbientScrollCanvas";
import { ScrollMeshGradient } from "@/components/motion/ScrollMeshGradient";
import { ParallaxEngineeringField } from "@/components/motion/ParallaxEngineeringField";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { ScrollOrbs } from "@/components/motion/ScrollOrbs";
import { CapabilityMarquee } from "@/components/motion/CapabilityMarquee";

export function ScrollExperience({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollMotionProvider>
        <div className="fixed inset-0 z-0 bg-[#f6f7f9]" aria-hidden />
        <ScrollMeshGradient />
        <ParallaxEngineeringField />
        <ScrollOrbs />
        <AmbientScrollCanvas />
        <ScrollProgressBar />
        <CapabilityMarquee />
        <div className="relative z-[2]">{children}</div>
      </ScrollMotionProvider>
    </MotionConfig>
  );
}
