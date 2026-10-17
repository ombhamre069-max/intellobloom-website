import { activeCapabilities } from "@/content/capabilities";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="section-glass border-y border-slate-200/80 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectionReveal>
            <SectionHeader
              eyebrow="What We Build"
              title="Capabilities shaped by venture scope."
              description="Configurable capability areas — enable or disable items in content configuration as your portfolio evolves."
            />
          </SectionReveal>

          <div className="space-y-0 divide-y divide-slate-100">
            {activeCapabilities.map((cap, index) => (
              <SectionReveal key={cap.id} delay={index * 60}>
                <div className="flex gap-6 py-6 first:pt-0">
                  <span className="font-mono text-sm text-electric/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-midnight">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stem-grey sm:text-base">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
