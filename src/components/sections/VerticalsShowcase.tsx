"use client";

import { verticals } from "@/content/verticals";
import { VerticalGatewayCard } from "@/components/cinematic/VerticalGatewayCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function VerticalsShowcase() {
  return (
    <section id="verticals" className="section-glass-muted border-y border-midnight/8 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What we work on"
          title="Education & technology. Energy & industrial safety."
          description="Two clear areas of focus — each with its own venture brand under Intellobloom (IB Group)."
          align="center"
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <VerticalGatewayCard id="education" />
          <VerticalGatewayCard id="energy" />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-steel">
          <strong className="font-semibold text-midnight">{verticals.education.title}</strong>{" "}
          through {verticals.education.venture}.{" "}
          <strong className="font-semibold text-midnight">{verticals.energy.title}</strong> through{" "}
          {verticals.energy.venture}.
        </p>
      </div>
    </section>
  );
}
