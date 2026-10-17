import { getBusinessBySlug } from "@/content/businesses";
import { createPageMetadata } from "@/lib/metadata";
import { SharedBusinessLayout } from "@/components/layout/SharedBusinessLayout";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { notFound } from "next/navigation";

const venture = getBusinessBySlug("intellistem");

export const metadata = venture
  ? createPageMetadata({
      title: "IntelliSTEM",
      description: venture.description,
      path: "/businesses/intellistem",
    })
  : {};

export default function IntelliSTEMPage() {
  if (!venture) notFound();

  return (
    <SharedBusinessLayout venture={venture}>
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        <SectionReveal>
          <h2 className="font-display text-2xl font-semibold text-midnight">Overview</h2>
          <p className="mt-4 leading-relaxed text-stem-grey">{venture.longDescription}</p>
        </SectionReveal>
        <SectionReveal delay={80}>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="font-semibold text-midnight">Programs &amp; capabilities</h3>
            <ul className="mt-4 space-y-3">
              {venture.capabilities.map((cap) => (
                <li key={cap} className="flex gap-3 text-sm text-stem-grey">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-stem-orange" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>

      <SectionReveal className="mt-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "AI & robotics labs",
              text: "Hands-on environments where students explore intelligent systems and physical computing.",
            },
            {
              title: "Institutional engagement",
              text: "Collaboration with schools and education partners to align technology with learning goals.",
            },
            {
              title: "Emerging tech experiences",
              text: "Exposure to AR/VR and other modalities where appropriate to the program context.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <h3 className="font-display text-lg font-semibold text-midnight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stem-grey">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionReveal>

      {venture.exploreUrl && (
        <SectionReveal className="mt-16 text-center">
          <a
            href={venture.exploreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-stem-orange px-8 py-3 text-base font-medium text-white hover:bg-[#e07d1f]"
          >
            Go to intellistem.in
          </a>
        </SectionReveal>
      )}
    </SharedBusinessLayout>
  );
}
