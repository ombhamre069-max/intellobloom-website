"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "clear";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  shine?: boolean;
};

const variants = {
  primary:
    "bg-electric text-white hover:bg-[#2f63c4] shadow-[0_0_0_1px_rgb(57_120_232/0.35)]",
  secondary:
    "bg-charcoal text-white border border-white/10 hover:bg-midnight",
  ghost: "text-steel hover:text-white hover:bg-white/5",
  outline:
    "border border-midnight/15 text-midnight bg-white/80 hover:border-electric/50 hover:text-electric",
  clear: "border border-white/40 bg-transparent text-white",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  external = false,
  shine = true,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const onMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-medium transition-colors duration-300",
    shine && "btn-shine",
    variants[variant],
    sizes[size],
    className,
  );

  return (
    <motion.div style={reduced ? undefined : { x: springX, y: springY }} className="inline-flex">
      <Link
        ref={ref}
        href={href}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </motion.div>
  );
}
