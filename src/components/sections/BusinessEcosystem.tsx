"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { businesses, parentCompany } from "@/content/businesses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { lineDraw, viewport } from "@/components/motion/variants";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { VentureCardLink } from "@/components/ui/VentureCardLink";

type ActiveNode = "parent" | "intellistem" | "agnikawach" | null;

export function BusinessEcosystem() {
  const [active, setActive] = useState<ActiveNode>(null);

  const intellistem = businesses.find((b) => b.id === "intellistem")!;
  const agni = businesses.find((b) => b.id === "agnikawach")!;

  return (
    <section
      id="ecosystem"
      className="section-glass-dark relative overflow-hidden py-24 text-white sm:py-28"
    >
      <div className="engineering-lines ecosystem-grid-drift absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(242_140_40/0.14),transparent_55%)] ecosystem-glow-drift" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Our Business Ecosystem"
            title="One parent company. Focused ventures."
            description="Intellobloom develops and oversees specialized technology initiatives — each with a distinct industry focus and brand identity."
            dark
            align="center"
          />
        </SectionReveal>

        {/* Desktop diagram */}
        <SectionReveal className="mt-16 hidden lg:block">
          <div className="relative mx-auto max-w-4xl">
            <svg
              viewBox="0 0 800 420"
              className="mx-auto w-full"
              role="img"
              aria-label="Intellobloom parent company with IntelliSTEM and AgniKawach ventures"
            >
              <defs>
                <linearGradient id="stemBranch" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F28C28" />
                  <stop offset="100%" stopColor="#707780" />
                </linearGradient>
                <linearGradient id="agniBranch" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#707780" />
                  <stop offset="100%" stopColor="#E85D4C" />
                </linearGradient>
              </defs>
              <motion.path
                d="M400 130 L220 280"
                stroke="url(#stemBranch)"
                strokeWidth={active === "intellistem" ? 2.5 : 1.5}
                fill="none"
                opacity={active === "agnikawach" ? 0.25 : 0.85}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={lineDraw}
              />
              <motion.path
                d="M400 130 L580 280"
                stroke="url(#agniBranch)"
                strokeWidth={active === "agnikawach" ? 2.5 : 1.5}
                fill="none"
                opacity={active === "intellistem" ? 0.25 : 0.85}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={lineDraw}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center">
              <ParentNode active={active === "parent"} onFocus={() => setActive("parent")} onBlur={() => setActive(null)} />
              <div className="mt-8 h-16 w-px bg-gradient-to-b from-stem-orange/70 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between gap-8 px-4">
              <VentureNode
                venture={intellistem}
                active={active === "intellistem"}
                onEnter={() => setActive("intellistem")}
                onLeave={() => setActive(null)}
                accent="border-stem-orange/40 hover:border-stem-orange shadow-[0_0_40px_-12px_rgb(242_140_40/0.4)]"
              />
              <VentureNode
                venture={agni}
                active={active === "agnikawach"}
                onEnter={() => setActive("agnikawach")}
                onLeave={() => setActive(null)}
                accent="border-agni/40 hover:border-agni shadow-[0_0_40px_-12px_rgb(232_93_76/0.35)]"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Mobile vertical hierarchy */}
        <SectionReveal className="mt-12 space-y-4 lg:hidden">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-xs uppercase tracking-widest text-stem-orange">Parent Company</p>
            <p className="mt-2 font-display text-2xl font-semibold">{parentCompany.name}</p>
            <p className="mt-2 text-sm text-slate-muted">{parentCompany.description}</p>
          </div>
          <div className="mx-auto h-8 w-px bg-stem-orange/50" aria-hidden />
          {businesses.map((venture) => (
            <VentureCardLink
              key={venture.id}
              venture={venture}
              className={cn(
                "block rounded-xl border bg-[#151c2f] p-6 transition-colors",
                venture.theme === "intellistem"
                  ? "border-stem-orange/30"
                  : "border-agni/30",
              )}
            >
              <p className="text-xs uppercase tracking-wider text-slate-muted">
                {venture.verticalLabel}
              </p>
              <p className="mt-2 font-display text-xl font-semibold">{venture.name}</p>
              <p className="mt-2 text-sm text-slate-muted">{venture.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-stem-orange">
                Explore <ArrowUpRight className="h-4 w-4" />
              </span>
            </VentureCardLink>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}

function ParentNode({
  active,
  onFocus,
  onBlur,
}: {
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <div
      className={cn(
        "mt-4 rounded-xl border px-8 py-5 text-center transition-all",
        active
          ? "border-stem-orange/50 bg-white/10 shadow-glow"
          : "border-white/15 bg-white/5",
      )}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      <p className="text-[10px] uppercase tracking-[0.25em] text-stem-orange">
        {parentCompany.label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold">{parentCompany.name}</p>
    </div>
  );
}

function VentureNode({
  venture,
  active,
  onEnter,
  onLeave,
  accent,
}: {
  venture: (typeof businesses)[number];
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  accent: string;
}) {
  return (
    <VentureCardLink
      venture={venture}
      className={cn(
        "w-[calc(50%-1rem)] max-w-sm rounded-xl border bg-[#4a4f57] p-6 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stem-orange",
        accent,
        active && "scale-[1.02]",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      <p className="text-[10px] uppercase tracking-wider text-slate-muted">
        {venture.verticalLabel}
      </p>
      <p className="mt-2 font-display text-xl font-semibold">{venture.name}</p>
      <p
        className={cn(
          "mt-3 text-sm text-slate-muted transition-opacity",
          active ? "opacity-100" : "opacity-80",
        )}
      >
        {venture.description}
      </p>
      <p className="mt-3 text-xs text-stem-orange">{venture.category}</p>
    </VentureCardLink>
  );
}
