"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOut, fadeUp, viewport } from "@/components/motion/variants";

type SectionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "scaleIn";
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const variants =
    variant === "scaleIn"
      ? {
          hidden: { opacity: 0, scale: 0.94, y: 32 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, delay: delay / 1000, ease: easeOut },
          },
        }
      : {
          ...fadeUp,
          visible: {
            ...fadeUp.visible,
            transition: {
              ...fadeUp.visible.transition,
              delay: delay / 1000,
            },
          },
        };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
