"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-[#e07d1f] shadow-[0_0_0_1px_rgb(242_140_40/0.35)] focus-visible:ring-brand",
  secondary:
    "bg-stem-grey/15 text-midnight border border-stem-grey/25 hover:bg-stem-grey/20 focus-visible:ring-stem-grey",
  ghost:
    "text-slate-muted hover:text-white hover:bg-white/5 focus-visible:ring-white/30",
  outline:
    "border border-stem-grey/30 text-midnight bg-white hover:border-stem-orange/50 hover:text-stem-orange focus-visible:ring-stem-orange",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-md",
  md: "text-sm px-5 py-2.5 rounded-lg",
  lg: "text-base px-6 py-3 rounded-xl",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  shine?: boolean;
  children: React.ReactNode;
} & (
  | { href: string; onClick?: never; type?: never; disabled?: boolean }
  | {
      href?: never;
      onClick?: () => void;
      type?: "button" | "submit";
      disabled?: boolean;
    }
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  shine = false,
  children,
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion();

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium transition-colors duration-[var(--duration-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    shine && variant === "primary" && "btn-shine",
    className,
  );

  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.99 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  if ("href" in props && props.href) {
    return (
      <MotionLink href={props.href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
