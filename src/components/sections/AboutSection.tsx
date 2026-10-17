import Link from "next/link";
import { company } from "@/content/company";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  return (
    <section id="about" className="section-glass py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <SectionReveal>
            <SectionHeader eyebrow="About Intellobloom" title={company.about.headline} />
            <div className="mt-6 space-y-4 text-stem-grey">
              {company.about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-stem-orange pl-4 text-midnight">
              <p className="font-display text-lg font-medium">{company.about.mission}</p>
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="outline">
                Full company story
              </Button>
              <Button href="/#team">Meet the team</Button>
            </div>
          </SectionReveal>

          <SectionReveal delay={120}>
            <div className="relative overflow-hidden rounded-2xl border border-stem-grey/15 bg-gradient-to-br from-[#3f444c] to-[#52565e] p-10 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-stem-orange">
                Who we are for
              </p>
              <ul className="mt-8 space-y-5 text-sm leading-relaxed text-white/85">
                <li>
                  <strong className="text-white">Schools & educators</strong> — STEM, AI, and
                  robotics programs through IntelliSTEM.
                </li>
                <li>
                  <strong className="text-white">Industrial & Oil & Gas teams</strong> — safety
                  technology and modelling through AgniKawach.
                </li>
                <li>
                  <strong className="text-white">Partners & institutions</strong> — new ventures
                  and scoped engineering collaborations with Intellobloom.
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-block text-sm font-medium text-stem-orange hover:text-white"
              >
                Discuss your use case →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
