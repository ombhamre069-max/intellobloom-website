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
                    ? "border-slate-200 bg-gradient-to-br from-white to-orange-50/45"
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
      <defs>
        <linearGradient id="stemGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F28C28" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.rect
        x="40"
        y="60"
        width="120"
        height="80"
        rx="8"
        fill="url(#stemGlow)"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="24"
        fill="#F28C28"
        animate={{ r: [22, 28, 22], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M200 140 L280 100 L280 180 Z"
        fill="none"
        stroke="#F28C28"
        strokeWidth="1.5"
        animate={{ opacity: [0.35, 0.75, 0.35] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={220 + i * 18}
          y={200 - i * 8}
          width="120"
          height="8"
          rx="4"
          fill="#707780"
          opacity={0.12}
          animate={{ x: [220 + i * 18, 228 + i * 18, 220 + i * 18] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <text x="48" y="280" fill="#707780" fontSize="11" fontFamily="system-ui">
        AI · Robotics · Coding Labs
      </text>
    </svg>
  );
}

function AgniVisual() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 320">
      <motion.path
        d="M60 240 L200 80 L340 240"
        fill="none"
        stroke="#E85D4C"
        strokeWidth="1.2"
        animate={{ opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {[80, 140, 200, 260].map((x, i) => (
        <motion.line
          key={x}
          x1={x}
          y1={200}
          x2={x}
          y2={120 - i * 10}
          stroke="#F28C28"
          strokeWidth="1"
          animate={{ opacity: [0.15, 0.45, 0.15], y1: [200, 196, 200] }}
          transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.rect
        x="120"
        y="160"
        width="160"
        height="100"
        rx="4"
        fill="none"
        stroke="#94A3B8"
        strokeOpacity="0.35"
        animate={{ strokeOpacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="48" y="280" fill="#94A3B8" fontSize="11" fontFamily="system-ui">
        Consequence modelling · Risk analysis
      </text>
    </svg>
  );
}
