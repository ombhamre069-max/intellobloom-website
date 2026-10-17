import { company } from "@/content/company";
import { businesses, parentCompany } from "@/content/businesses";
import { innovationSteps } from "@/content/innovation";
import { createPageMetadata } from "@/lib/metadata";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { LeadershipTeamSection } from "@/components/sections/LeadershipTeamSection";
import { CompanyOverviewSection } from "@/components/sections/CompanyOverviewSection";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "About",
  description: company.about.mission,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-off-white pt-[var(--nav-height)]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-stem-orange">
            About Intellobloom
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-midnight sm:text-5xl">
            {company.about.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-stem-grey">
            {company.about.mission}
          </p>
        </div>
      </div>

      <CompanyOverviewSection />

      <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionReveal>
          <div className="max-w-3xl space-y-4 text-stem-grey">
            {company.about.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <h2 className="font-display text-2xl font-semibold text-midnight">
            Business architecture
          </h2>
          <p className="mt-3 max-w-2xl text-stem-grey">{parentCompany.description}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {businesses.map((v) => (
              <li key={v.id}>
                <Link
                  href={v.href}
                  className="block rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-soft"
                >
                  <p className="text-xs uppercase tracking-wider text-stem-grey">{v.verticalLabel}</p>
                  <p className="mt-2 font-display text-xl font-semibold text-midnight">{v.name}</p>
                  <p className="mt-2 text-sm text-stem-grey">{v.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal>
          <h2 className="font-display text-2xl font-semibold text-midnight">Our approach</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {innovationSteps.map((step) => (
              <li key={step.step} className="rounded-xl border border-slate-200 bg-white p-5">
                <span className="font-mono text-sm text-stem-orange">{step.step}</span>
                <p className="mt-2 font-semibold text-midnight">{step.title}</p>
                <p className="mt-2 text-sm text-stem-grey">{step.description}</p>
              </li>
            ))}
          </ol>
        </SectionReveal>
      </div>

      <LeadershipTeamSection />
    </div>
  );
}
