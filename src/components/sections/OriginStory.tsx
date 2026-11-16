"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { originStory } from "@/content/origin-story";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export function OriginStory() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !rootRef.current || !pinRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const pin = pinRef.current;
    const chapters = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-origin-chapter]"),
    );
    const media = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-origin-media]"),
    );
    const labels = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-origin-label]"),
    );

    const ctx = gsap.context(() => {
      gsap.set(chapters, { autoAlpha: 0, y: 48 });
      gsap.set(media, { autoAlpha: 0, scale: 1.06 });
      gsap.set(labels, { opacity: 0.42 });
      gsap.set(chapters[0], { autoAlpha: 1, y: 0 });
      gsap.set(media[0], { autoAlpha: 1, scale: 1 });
      gsap.set(labels[0], { opacity: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * chapters.length * 1.05)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      chapters.forEach((_, i) => {
        if (i === 0) return;
        const at = i;
        tl.to(chapters[i - 1], { autoAlpha: 0, y: -36, duration: 0.4 }, at)
          .to(media[i - 1], { autoAlpha: 0, scale: 1.02, duration: 0.5 }, at)
          .to(labels[i - 1], { opacity: 0.42, duration: 0.3 }, at)
          .fromTo(
            chapters[i],
            { autoAlpha: 0, y: 48 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            at + 0.05,
          )
          .fromTo(
            media[i],
            { autoAlpha: 0, scale: 1.08 },
            { autoAlpha: 1, scale: 1, duration: 0.65 },
            at,
          )
          .to(labels[i], { opacity: 1, duration: 0.3 }, at + 0.08);
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section
        id="our-story"
        className="bg-midnight py-20 text-white"
        aria-labelledby="origin-story-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-agni">
            {originStory.eyebrow}
          </p>
          <h2
            id="origin-story-heading"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {originStory.headline}
          </h2>
          <div className="mt-14 space-y-20">
            {originStory.chapters.map((chapter, i) => (
              <article key={chapter.id} className="grid gap-8 lg:grid-cols-2 lg:gap-14">
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Image
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/55 to-midnight/10" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-mono text-lg font-semibold tracking-[0.2em] text-agni sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                    <span className="ml-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
                      {chapter.phase}
                    </span>
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-white/90">
                    {chapter.body}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/65">
                    {chapter.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      id="our-story"
      className="relative bg-midnight text-white"
      aria-labelledby="origin-story-heading"
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          {originStory.chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              data-origin-media
              className={cn(
                "absolute inset-0",
                i === 0 ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={chapter.image}
                alt=""
                fill
                priority={i === 0}
                className="object-cover object-center brightness-[0.92] contrast-[1.05]"
                sizes="100vw"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-midnight/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/82 via-midnight/38 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/55 via-transparent to-midnight/25" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:80px_80px]"
          aria-hidden
        />

        <div className="absolute inset-x-0 top-0 z-20 h-[3px] bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-electric via-white to-agni"
          />
        </div>

        {/* Chapter numbers — large enough to read at a glance */}
        <aside className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:left-5 lg:flex xl:left-8">
          {originStory.chapters.map((chapter, i) => (
            <span
              key={chapter.id}
              data-origin-label
              className={cn(
                "font-mono text-xl font-bold tracking-[0.08em] xl:text-2xl",
                i === 0 ? "text-white" : "text-white/40",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </aside>

        <div className="relative z-10 flex h-full items-end px-5 pb-12 pt-[calc(var(--nav-height)+1.25rem)] sm:px-6 sm:pb-16 lg:items-center lg:px-8 lg:pb-0 xl:px-20">
          <div className="relative mx-auto w-full max-w-7xl lg:pl-14 xl:pl-16">
            <div className="mb-6 max-w-2xl lg:mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-agni">
                {originStory.eyebrow}
              </p>
              <h2
                id="origin-story-heading"
                className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white"
              >
                {originStory.headline}
              </h2>
            </div>

            <div className="relative min-h-[22rem] max-w-3xl sm:min-h-[24rem] lg:min-h-[26rem]">
              {originStory.chapters.map((chapter, i) => (
                <article
                  key={chapter.id}
                  data-origin-chapter
                  className={cn(
                    "absolute inset-x-0 top-0",
                    i === 0 ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-xl font-semibold tracking-[0.12em] text-agni sm:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-base">
                      {chapter.phase}
                    </span>
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.06] tracking-tight text-white">
                    {chapter.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/92 sm:text-xl sm:leading-relaxed">
                    {chapter.body}
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg sm:leading-relaxed">
                    {chapter.detail}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-8 hidden text-xs uppercase tracking-[0.28em] text-white/50 lg:block">
              Scroll to continue the story
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
