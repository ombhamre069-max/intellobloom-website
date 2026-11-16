"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { VerticalId } from "@/content/verticals";
import { verticals } from "@/content/verticals";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { HudOverlay } from "@/components/verticals/HudOverlay";
import { BlueprintOverlay } from "@/components/verticals/BlueprintOverlay";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const assets = {
  education: {
    hero: "/assets/education/ai-robot.jpg",
    secondary: "/assets/education/industrial-robot.jpg",
    gallery: [
      { src: "/assets/education/robotics-pexels.jpg", alt: "Humanoid robotics technology" },
      { src: "/assets/education/circuit.jpg", alt: "Circuit board electronics" },
      { src: "/assets/education/lab-tech.jpg", alt: "Engineering laboratory workstation" },
    ],
    stories: ["Labs & hardware", "Curriculum alignment", "Partner programs"],
  },
  energy: {
    hero: "/assets/energy/oil-plant.jpg",
    secondary: "/assets/energy/pipes-industrial.jpg",
    gallery: [
      { src: "/assets/energy/pipeline-pexels.jpg", alt: "Oil and gas refining infrastructure" },
      { src: "/assets/energy/gas-facility.jpg", alt: "Energy infrastructure and substations" },
      { src: "/assets/energy/refinery-hero.jpg", alt: "Process piping and industrial systems" },
    ],
    stories: ["Scenario modelling", "Hazard analysis", "Operational safety"],
  },
} as const;

export function VerticalExperience({ id }: { id: VerticalId }) {
  const v = verticals[id];
  const a = assets[id];
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const light = id === "education";

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".vx-hero-copy > *", {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".vx-reveal").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      gsap.to(".vx-parallax-img", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".vx-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, id]);

  return (
    <div
      ref={rootRef}
      className={cn(light ? "bg-platinum text-midnight" : "bg-[#0b111a] text-white")}
    >
      {/* ── Cinematic hero ── */}
      <section className="vx-hero relative min-h-[92svh] overflow-hidden pt-[var(--nav-height)]">
        <div className="absolute inset-0">
          <Image
            src={a.hero}
            alt=""
            fill
            priority
            className="vx-parallax-img object-cover scale-110"
            sizes="100vw"
          />
          <div
            className={cn(
              "absolute inset-0",
              light
                ? "bg-gradient-to-r from-[#101C2C]/88 via-[#101C2C]/72 to-[#101C2C]/45"
                : "bg-gradient-to-r from-[#101C2C]/75 via-[#172333]/55 to-[#101C2C]/35",
            )}
          />
          {light ? <HudOverlay /> : <BlueprintOverlay />}
        </div>

        <div className="relative mx-auto flex min-h-[calc(92svh-var(--nav-height))] max-w-7xl flex-col justify-end px-5 pb-16 pt-16 sm:px-6 lg:justify-center lg:px-8 lg:pb-24">
          <div className="vx-hero-copy max-w-3xl text-white">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-steel hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Intellobloom · IB Group
            </Link>
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.32em]",
                light ? "text-electric" : "text-agni",
              )}
            >
              {v.venture}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-tight">
              {v.title}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.22em] text-steel">
              {v.subtitle}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel sm:text-xl">
              {v.mission}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="/contact" size="lg">
                Inquiry
              </MagneticButton>
              {v.exploreUrl.startsWith("http") ? (
                <MagneticButton
                  href={v.exploreUrl}
                  external
                  variant="outline"
                  size="lg"
                  className="border-white/30 bg-white/5 text-white hover:border-electric hover:text-white"
                >
                  Visit {v.venture}
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              ) : (
                <Button href="/contact" variant="outline" size="lg" className="border-white/30 bg-transparent text-white">
                  Discuss AgniKawach
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview split ── */}
      <section className="vx-reveal relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src={a.secondary}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className={cn(
                "absolute inset-0",
                light
                  ? "bg-gradient-to-t from-[#101C2C]/50 to-transparent"
                  : "bg-gradient-to-t from-[#101C2C]/40 to-transparent",
              )}
            />
          </div>
          <div
            className={cn(
              "flex flex-col justify-center px-5 py-16 sm:px-10 lg:px-14",
              light ? "bg-white" : "bg-charcoal",
            )}
          >
            <SectionHeader
              eyebrow="Overview"
              title={`What we do · ${v.venture}`}
              description={v.description}
              dark={!light}
            />
            <ul className="mt-10 space-y-3">
              {v.capabilities.map((cap) => (
                <li
                  key={cap}
                  className={cn(
                    "flex gap-3 border-l-2 px-4 py-2.5 text-sm",
                    light
                      ? "border-electric bg-platinum/80 text-[#5a6b7d]"
                      : "border-agni bg-white/5 text-steel",
                  )}
                >
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Full-bleed cinematic strip ── */}
      <section className="vx-reveal relative h-[48vh] min-h-[280px] overflow-hidden sm:h-[56vh]">
        <Image
          src={a.gallery[2].src}
          alt={a.gallery[2].alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className={cn(
            "absolute inset-0 flex items-end",
            light
              ? "bg-gradient-to-t from-[#101C2C]/85 via-[#101C2C]/35 to-transparent"
              : "bg-gradient-to-t from-[#101C2C]/80 via-[#101C2C]/30 to-transparent",
          )}
        >
          <div className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.3em]",
                light ? "text-electric" : "text-agni",
              )}
            >
              Environment
            </p>
            <p className="mt-3 max-w-xl font-display text-2xl font-semibold text-white sm:text-3xl">
              {light
                ? "An advanced AI & robotics innovation ecosystem."
                : "Industrial infrastructure. Engineering-grade safety intelligence."}
            </p>
          </div>
        </div>
        {light ? (
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <HudOverlay />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <BlueprintOverlay />
          </div>
        )}
      </section>

      {/* ── Applications ── */}
      <section
        className={cn(
          "vx-reveal px-5 py-24 sm:px-6 lg:px-8",
          light ? "bg-platinum" : "bg-[#0b111a]",
        )}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Applications"
            title="Where we create impact"
            align="center"
            dark={!light}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {v.applications.map((app, i) => (
              <motion.article
                key={app}
                whileHover={reduced ? undefined : { y: -6 }}
                className={cn(
                  "relative overflow-hidden rounded-xl border p-6",
                  light
                    ? "border-midnight/8 bg-white shadow-soft"
                    : "border-white/10 bg-charcoal",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs font-bold",
                    light ? "text-electric" : "text-agni",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={cn("mt-3 font-display text-lg font-semibold", !light && "text-white")}>
                  {app}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial gallery ── */}
      <section className="vx-reveal mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <div className="relative min-h-[280px] overflow-hidden rounded-xl md:col-span-7 md:min-h-[420px]">
            <Image
              src={a.gallery[0].src}
              alt={a.gallery[0].alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-xl md:col-span-5 md:min-h-[420px]">
            <Image
              src={a.gallery[1].src}
              alt={a.gallery[1].alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      {/* ── Storytelling panel ── */}
      <section className="vx-reveal px-5 py-20 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative mx-auto max-w-7xl overflow-hidden rounded-2xl border p-8 sm:p-12 lg:p-16",
            light
              ? "border-electric/20 bg-gradient-to-br from-white via-[#E8F0FC]/60 to-white"
              : "border-agni/25 bg-gradient-to-br from-charcoal via-[#172333] to-[#101C2C]",
          )}
        >
          {!light && (
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <BlueprintOverlay />
            </div>
          )}
          {light && (
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <HudOverlay />
            </div>
          )}
          <div className="relative">
            <h3 className="font-display text-2xl font-semibold sm:text-3xl">
              {light ? "Technology storytelling" : "Engineering storytelling"}
            </h3>
            <p
              className={cn(
                "mt-4 max-w-3xl text-base leading-relaxed sm:text-lg",
                light ? "text-[#5a6b7d]" : "text-steel",
              )}
            >
              {light
                ? "Visual language emphasizes robotics, AI systems, and collaborative learning — aligned with IntelliSTEM programs and institutional partners."
                : "Visual language emphasizes engineering rigour, process safety, and scenario intelligence — aligned with AgniKawach and industrial audiences."}
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {a.stories.map((item) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-lg border px-5 py-5",
                    light
                      ? "border-midnight/8 bg-white/90"
                      : "border-white/10 bg-white/5",
                  )}
                >
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={light ? "bg-white" : "section-glass-dark"}>
        <ContactSection />
      </div>
    </div>
  );
}
