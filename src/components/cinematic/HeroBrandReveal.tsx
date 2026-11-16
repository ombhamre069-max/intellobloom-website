"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

const REVEAL_KEY = "ib-hero-brand-reveal-v1";

type HeroBrandRevealProps = {
  reduced: boolean;
  onComplete?: () => void;
  className?: string;
};

function hasPlayedThisSession() {
  try {
    return sessionStorage.getItem(REVEAL_KEY) === "1";
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(REVEAL_KEY, "1");
  } catch {
    /* ignore */
  }
}

/**
 * Cinematic brand reveal:
 * mark enters from right → settles left → INTELLOBLOOM clips out from behind → IB GROUP.
 */
export function HeroBrandReveal({
  reduced,
  onComplete,
  className,
}: HeroBrandRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const wordClipRef = useRef<HTMLSpanElement>(null);
  const secondaryRef = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);
  const [phase, setPhase] = useState<"boot" | "play" | "done">("boot");

  useEffect(() => {
    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      markPlayed();
      setPhase("done");
      onComplete?.();
    };

    if (!rootRef.current || !markRef.current || !wordClipRef.current || !secondaryRef.current) {
      finish();
      return;
    }

    const mark = markRef.current;
    const wordClip = wordClipRef.current;
    const secondary = secondaryRef.current;

    const forcePlay =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("reveal");

    if ((reduced || hasPlayedThisSession()) && !forcePlay) {
      gsap.set(mark, { x: 0, opacity: 1, scale: 1, clearProps: "transform" });
      gsap.set(wordClip, { clipPath: "inset(0 0% 0 0)", opacity: 1 });
      gsap.set(secondary, { opacity: 1, y: 0 });
      finish();
      return;
    }

    setPhase("play");

    const travel = Math.max(
      window.innerWidth - mark.getBoundingClientRect().left + 64,
      window.innerWidth * 0.6,
    );

    gsap.set(mark, {
      x: travel,
      opacity: 1,
      scale: 0.94,
      force3D: true,
    });
    gsap.set(wordClip, {
      clipPath: "inset(0 100% 0 0)",
      opacity: 1,
    });
    gsap.set(secondary, { opacity: 0, y: 10 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: finish,
      });

      // Hold a clean opening beat
      tl.to({}, { duration: 0.28 });

      // Circular mark travels right → left
      tl.to(
        mark,
        {
          x: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.inOut",
        },
        0.28,
      );

      // Controlled settle (no bounce)
      tl.to(
        mark,
        {
          x: 0,
          duration: 0.32,
          ease: "power2.out",
        },
        1.35,
      );

      // Wordmark reveals from behind the mark (left → right clip)
      tl.to(
        wordClip,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.95,
          ease: "power2.inOut",
        },
        1.55,
      );

      // IB GROUP arrives beneath
      tl.to(
        secondary,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        2.25,
      );
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, [reduced, onComplete]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-flex items-center gap-4 transition-opacity duration-200",
        phase === "boot" ? "opacity-0" : "opacity-100",
        className,
      )}
      aria-label={`${company.brandPrimary} ${company.brandSecondary}`}
    >
      <div
        ref={markRef}
        className="relative z-20 shrink-0 will-change-transform"
        style={{
          width: "clamp(3.5rem, 5.5vw, 4rem)",
          height: "clamp(3.5rem, 5.5vw, 4rem)",
        }}
      >
        <Image
          src={company.logoMark}
          alt=""
          width={128}
          height={128}
          priority
          className="h-full w-full rounded-full object-contain drop-shadow-[0_18px_36px_rgb(0_0_0/0.4)]"
        />
      </div>

      <span className="relative z-10 -ml-3 flex min-w-0 flex-col items-start justify-center pl-3 leading-none">
        <span
          ref={wordClipRef}
          className="inline-block max-w-full font-display text-[clamp(1.5rem,3.5vw,2.35rem)] font-semibold uppercase tracking-[0.18em] text-white will-change-[clip-path]"
        >
          {company.brandPrimary}
        </span>
        <span
          ref={secondaryRef}
          className="mt-1.5 font-semibold uppercase tracking-[0.32em] text-white/75"
          style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)" }}
        >
          {company.brandSecondary}
        </span>
      </span>
    </div>
  );
}
