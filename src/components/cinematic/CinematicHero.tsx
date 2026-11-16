"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { company } from "@/content/company";
import { BrandLockup } from "@/components/ui/BrandLockup";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { VerticalGatewayCard } from "@/components/cinematic/VerticalGatewayCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HeroScene3D = dynamic(
  () => import("@/components/cinematic/HeroScene3D").then((m) => m.HeroScene3D),
  { ssr: false },
);

export function CinematicHero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lockupRef.current, { y: 28, opacity: 0, duration: 0.9 })
        .from(titleRef.current, { y: 48, opacity: 0, duration: 1 }, "-=0.45")
        .from(subRef.current, { y: 28, opacity: 0, duration: 0.85 }, "-=0.55")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-gateway", { y: 36, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.35");

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
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-height)] text-white"
    >
      <div className="hero-parallax-bg hero-cinematic-bg absolute inset-0" aria-hidden />
      <div className="architectural-grid-dark absolute inset-0 opacity-60" aria-hidden />
      {!reduced && <HeroScene3D />}

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--nav-height))] max-w-7xl flex-col justify-center px-5 pb-24 pt-8 sm:px-6 lg:px-8">
        <div ref={lockupRef} className="mb-10">
          <BrandLockup variant="light" size="hero" href={undefined} showMark priority />
        </div>

        <h1
          ref={titleRef}
          className="max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5.25rem)] font-semibold leading-[1.05] tracking-tight"
        >
          Engineering Intelligence.
          <br />
          <span className="text-gradient-brand">Building Tomorrow.</span>
        </h1>

        <p
          ref={subRef}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-steel sm:text-xl"
        >
          {company.subTagline}
        </p>

        <div className="hero-cta mt-10 flex flex-wrap gap-4">
          <MagneticButton href="/#verticals" size="lg">
            Explore what we work on
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline" size="lg" className="border-white/25 bg-white/5 text-white hover:border-electric hover:text-white">
            Start a conversation
          </MagneticButton>
        </div>

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-7">
          <div className="hero-gateway">
            <VerticalGatewayCard id="education" />
          </div>
          <div className="hero-gateway">
            <VerticalGatewayCard id="energy" />
          </div>
        </div>
      </div>

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-steel"
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          aria-hidden
        >
          Scroll
          <div className="scroll-indicator h-12 w-px bg-gradient-to-b from-electric to-transparent" />
        </motion.div>
      )}
    </section>
  );
}
