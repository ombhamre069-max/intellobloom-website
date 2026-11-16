"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { group } from "@/content/verticals";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const panels = [
  {
    title: "Vision",
    body: group.vision,
  },
  {
    title: "Mission",
    body: group.mission,
  },
  {
    title: "Ecosystem",
    body: "IntelliSTEM and AgniKawach share engineering standards while speaking to distinct audiences — schools and industrial teams.",
  },
  {
    title: "Partnership",
    body: "Institutions, operators, and venture partners engage Intellobloom Group when the problem is worth long-term technology commitment.",
  },
];

export function HorizontalStory() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !trackRef.current || !wrapRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      const scrollWidth = track.scrollWidth - wrap.offsetWidth;
      gsap.to(track, {
        x: () => -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-midnight py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 sm:px-6">
          {panels.map((p) => (
            <article key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-xl font-semibold text-stem-orange">{p.title}</h3>
              <p className="mt-3 text-sm text-slate-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-midnight text-white">
      <div ref={wrapRef} className="relative h-[100svh] overflow-hidden lg:h-auto">
        <div
          ref={trackRef}
          className="flex h-full flex-col gap-6 px-5 py-20 lg:h-[100svh] lg:flex-row lg:items-center lg:gap-0 lg:px-0 lg:py-0"
        >
          {panels.map((panel, i) => (
            <article
              key={panel.title}
              className="flex w-full shrink-0 flex-col justify-center border-white/10 px-8 lg:h-full lg:w-[85vw] lg:border-r lg:px-20 xl:w-[70vw]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.4em] text-stem-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{panel.title}</h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-muted">{panel.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}