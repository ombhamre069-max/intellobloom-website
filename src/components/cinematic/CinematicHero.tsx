"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { company } from "@/content/company";
import { HeroBrandReveal } from "@/components/cinematic/HeroBrandReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HeroScene3D = dynamic(
  () => import("@/components/cinematic/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false },
);

export function CinematicHero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [brandDone, setBrandDone] = useState(false);

  const handleBrandComplete = useCallback(() => {
    setBrandDone(true);
  }, []);

  // Safety: never leave hero copy invisible if brand reveal stalls
  useEffect(() => {
    if (brandDone) return;
    const t = window.setTimeout(() => setBrandDone(true), 4200);
    return () => window.clearTimeout(t);
  }, [brandDone]);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!brandDone || reduced || !sectionRef.current) return;

    // Animate position only — opacity stays React-owned (brandDone ? 1 : 0)
    // so Strict Mode / GSAP revert can never leave copy stuck invisible.
    const targets = [titleRef.current, subRef.current, ".hero-cta"];
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [brandDone, reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-height)] text-white"
    >
      <div className="hero-parallax-bg hero-cinematic-bg absolute inset-0" aria-hidden />
      <div className="architectural-grid-dark absolute inset-0 z-0 opacity-35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgb(16_28_44/0.88)_0%,rgb(16_28_44/0.42)_30%,transparent_55%)] max-lg:bg-[linear-gradient(180deg,rgb(16_28_44/0.5)_0%,rgb(16_28_44/0.15)_45%,transparent_72%)]"
        aria-hidden
      />
      {!reduced && <HeroScene3D />}

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--nav-height))] max-w-7xl flex-col justify-center px-5 pb-28 pt-8 sm:px-6 lg:px-8 lg:pr-[min(42%,28rem)]">
        <div className="mb-10 overflow-visible">
          <HeroBrandReveal reduced={reduced} onComplete={handleBrandComplete} />
        </div>

        <h1
          ref={titleRef}
          className="max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5.25rem)] font-semibold leading-[1.05] tracking-tight"
          style={{ opacity: brandDone ? 1 : 0 }}
        >
          Engineering Intelligence.
          <br />
          <span className="text-gradient-brand">Building Tomorrow.</span>
        </h1>

        <p
          ref={subRef}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          style={{ opacity: brandDone ? 1 : 0 }}
        >
          {company.subTagline}
        </p>

        <div
          className="hero-cta mt-10 flex flex-wrap gap-4"
          style={{ opacity: brandDone ? 1 : 0 }}
        >
          <MagneticButton href="/#our-story" variant="clear" size="lg" shine={false}>
            Explore our story
          </MagneticButton>
          <MagneticButton href="/contact" variant="clear" size="lg" shine={false}>
            Start a conversation
          </MagneticButton>
        </div>
      </div>

      {!reduced && brandDone && (
        <motion.div
          className="hero-scroll-cue pointer-events-none absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-white/55"
          initial={{ opacity: 0, y: 12 }}
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: 0.35 }}
          aria-hidden
        >
          Scroll
          <div className="scroll-indicator h-12 w-px bg-gradient-to-b from-electric to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
