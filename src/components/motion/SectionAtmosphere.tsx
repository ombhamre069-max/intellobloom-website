"use client";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Tone = "light" | "dark" | "warm";

const toneStyles: Record<Tone, string> = {
  light: "from-electric/8 via-transparent to-violet/6",
  dark: "from-electric/12 via-violet/8 to-transparent",
  warm: "from-stem-orange/10 via-transparent to-electric/5",
};

type SectionAtmosphereProps = {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
};

export function SectionAtmosphere({
  children,
  className,
  tone = "light",
  id,
}: SectionAtmosphereProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div id={id} className={cn("relative overflow-hidden", className)}>
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className={cn(
              "section-atmosphere-blob absolute -left-1/4 top-0 h-[55%] w-[70%] rounded-full bg-gradient-to-br opacity-70 blur-3xl",
              toneStyles[tone],
            )}
          />
          <div
            className={cn(
              "section-atmosphere-blob-alt absolute -right-1/4 bottom-0 h-[45%] w-[60%] rounded-full bg-gradient-to-tl opacity-60 blur-3xl",
              toneStyles[tone],
            )}
          />
          <div className="section-grid-drift absolute inset-0 opacity-[0.4]" />
        </div>
      )}
      {children}
    </div>
  );
}
