import { activeCapabilities } from "@/content/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionPattern } from "@/components/ui/SectionPattern";

export function CapabilitiesSection() {
  return (
    <SectionPattern
      id="capabilities"
      pattern="squares"
      className="border-y border-midnight/8 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionReveal>
            <SectionHeader
              eyebrow="What We Build"
              title="Capabilities shaped by venture scope."
              description="Configurable capability areas — enable or disable items in content configuration as your portfolio evolves."
            />
          </SectionReveal>

          <div className="space-y-0 divide-y divide-midnight/8 rounded-2xl border border-midnight/8 bg-white/80 px-6 shadow-soft backdrop-blur-sm sm:px-8">
            {activeCapabilities.map((cap, index) => (
              <SectionReveal key={cap.id} delay={index * 60}>
                <div className="flex gap-6 py-6 first:pt-7 last:pb-7">
                  <span className="font-mono text-sm text-electric/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-midnight">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-midnight/70 sm:text-base">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </SectionPattern>
  );
}
