"use client";

import { motion, useReducedMotion } from "framer-motion";
import { businesses } from "@/content/businesses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/ui/SectionReveal";
import { VentureExploreLink } from "@/components/ui/VentureExploreLink";
import { cn } from "@/lib/utils";

export function BusinessVentures() {
  const reduced = useReducedMotion();

  return (
    <section id="businesses" className="section-glass py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Our Businesses"
            title="Ventures built for their industries."
            description="Each initiative under Intellobloom is designed with its own identity, audience, and engineering focus."
          />
        </SectionReveal>

        <StaggerGroup className="mt-16 space-y-8">
          {businesses.map((venture) => (
            <StaggerItem key={venture.id}>
              <motion.div
                role="article"
                whileHover={reduced ? undefined : { y: -8, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border shadow-sm transition-shadow duration-500 hover:shadow-soft",
                  venture.theme === "intellistem"
                    ? "border-slate-200 bg-gradient-to-br from-white to-orange-50/40"
                    : "border-slate-800/20 bg-gradient-to-br from-graphite to-midnight text-white",
                )}
              >
                <div className="grid lg:grid-cols-2 lg:gap-0">
                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                    <p
                      className={cn(
                        "text-xs font-medium uppercase tracking-[0.2em]",
                        venture.theme === "intellistem"
                          ? "text-stem-orange"
                          : "text-agni",
                      )}
                    >
                      {venture.category}
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {venture.headline}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 text-base leading-relaxed",
                        venture.theme === "intellistem"
                          ? "text-stem-grey"
                          : "text-slate-muted",
                      )}
                    >
                      {venture.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {venture.capabilities.slice(0, 4).map((cap) => (
                        <li
                          key={cap}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs",
                            venture.theme === "intellistem"
                              ? "bg-stem-orange/10 text-stem-grey"
                              : "bg-white/10 text-slate-muted",
                          )}
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                    <VentureExploreLink
                      venture={venture}
                      className={cn(
                        "mt-8 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        venture.theme === "intellistem"
                          ? "text-midnight hover:text-stem-orange"
                          : "text-electric hover:text-white",
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "relative min-h-[240px] border-t lg:min-h-[320px] lg:border-t-0 lg:border-l",
                      venture.theme === "intellistem"
                        ? "border-slate-100 bg-[linear-gradient(135deg,#f8fafc_0%,#fff7ed_50%,#f1f5f9_100%)]"
                        : "border-white/10 bg-[#0d1324]",
                    )}
                    aria-hidden
                  >
                    {venture.theme === "intellistem" ? (
                      <IntelliSTEMVisual />
                    ) : (
                      <AgniVisual />
                    )}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function IntelliSTEMVisual() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320">
      <rect x="40" y="60" width="120" height="80" rx="8" fill="#707780" opacity="0.15" />
      <circle cx="100" cy="100" r="24" fill="#F28C28" opacity="0.2" />
      <path
        d="M200 140 L280 100 L280 180 Z"
        fill="none"
        stroke="#F28C28"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <rect x="220" y="200" width="140" height="60" rx="6" fill="#707780" opacity="0.12" />
      <text x="48" y="280" fill="#707780" fontSize="11" fontFamily="system-ui">
        AI · Robotics · Coding Labs
      </text>
    </svg>
  );
}

function AgniVisual() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320">
      <path
        d="M60 240 L200 80 L340 240"
        fill="none"
        stroke="#E85D4C"
        strokeWidth="1"
        opacity="0.35"
      />
      {[80, 140, 200, 260].map((x, i) => (
        <line
          key={x}
          x1={x}
          y1={200}
          x2={x}
          y2={120 - i * 10}
          stroke="#5B8CFF"
          strokeWidth="1"
          opacity="0.25"
        />
      ))}
      <rect x="120" y="160" width="160" height="100" rx="4" fill="none" stroke="#94A3B8" strokeOpacity="0.3" />
      <text x="48" y="280" fill="#94A3B8" fontSize="11" fontFamily="system-ui">
        Consequence modelling · Risk analysis
      </text>
    </svg>
  );
}
