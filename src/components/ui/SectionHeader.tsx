"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewport } from "@/components/motion/variants";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  const content = (
    <>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-electric">
          <span className="h-px w-8 bg-gradient-to-r from-electric to-transparent" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]",
          dark ? "text-white" : "text-midnight",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-1 rounded-full bg-gradient-to-r from-electric via-electric/40 to-transparent",
          align === "center" ? "mx-auto w-24" : "w-20",
        )}
        aria-hidden
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-midnight/70",
          )}
        >
          {description}
        </p>
      )}
    </>
  );

  if (reduced) {
    return (
      <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
    >
      {content}
    </motion.div>
  );
}
