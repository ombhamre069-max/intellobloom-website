import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CompanyIntroduction() {
  return (
    <section id="about-preview" className="section-glass-muted py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Intellobloom"
            title={company.introHeadline}
            description={company.introBody}
            className="max-w-3xl"
          />
        </SectionReveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {company.pillars.map((pillar, index) => (
            <SectionReveal
              key={pillar.title}
              delay={index * 80}
              className={cnPillarLayout(index)}
            >
              <article className="group relative h-full overflow-hidden rounded-xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
                <span className="font-mono text-xs text-electric/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-midnight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stem-grey sm:text-base">
                  {pillar.description}
                </p>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-stem-orange/10 to-stem-grey/10 transition-transform duration-500 group-hover:scale-110" />
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function cnPillarLayout(index: number): string {
  if (index === 0) return "lg:col-span-5 lg:row-span-2";
  if (index === 1) return "lg:col-span-7";
  return "lg:col-span-7";
}
