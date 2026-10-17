"use client";

import { useState } from "react";
import Link from "next/link";
import { industries } from "@/content/industries";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  const [activeId, setActiveId] = useState(industries[0]?.id ?? "");

  const active = industries.find((i) => i.id === activeId) ?? industries[0];

  return (
    <section id="industries" className="section-glass-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Industries"
            title="Domains where we apply focused engineering."
            description="We align technology development with industry context — without implying universal deployment across every sector listed."
          />
        </SectionReveal>

        <SectionReveal className="mt-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setActiveId(industry.id)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
                    activeId === industry.id
                      ? "border-electric/40 bg-white shadow-sm text-midnight"
                      : "border-transparent bg-transparent text-stem-grey hover:bg-white/60",
                  )}
                >
                  {industry.name}
                </button>
              ))}
            </div>

            {active && (
              <article className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
                <h3 className="font-display text-2xl font-semibold text-midnight">
                  {active.name}
                </h3>
                <dl className="mt-8 space-y-6">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-electric">
                      Key challenges
                    </dt>
                    <dd className="mt-2 text-stem-grey">{active.challenges}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-electric">
                      Technology focus
                    </dt>
                    <dd className="mt-2 text-stem-grey">{active.focus}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-electric">
                      Intellobloom venture
                    </dt>
                    <dd className="mt-2">
                      {active.ventureHref ? (
                        active.ventureHref.startsWith("http") ? (
                          <a
                            href={active.ventureHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-midnight hover:text-stem-orange"
                          >
                            {active.venture}
                          </a>
                        ) : (
                          <Link
                            href={active.ventureHref}
                            className="font-medium text-midnight hover:text-stem-orange"
                          >
                            {active.venture}
                          </Link>
                        )
                      ) : (
                        <span className="font-medium text-midnight">{active.venture}</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
