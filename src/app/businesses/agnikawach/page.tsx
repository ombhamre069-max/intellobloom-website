import { getBusinessBySlug } from "@/content/businesses";
import { createPageMetadata } from "@/lib/metadata";
import { SharedBusinessLayout } from "@/components/layout/SharedBusinessLayout";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { notFound } from "next/navigation";

const venture = getBusinessBySlug("agnikawach");

export const metadata = venture
  ? createPageMetadata({
      title: "AgniKawach",
      description: venture.description,
      path: "/businesses/agnikawach",
    })
  : {};

export default function AgniKawachPage() {
  if (!venture) notFound();

  return (
    <SharedBusinessLayout venture={venture}>
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionReveal>
          <h2 className="font-display text-2xl font-semibold text-white">Overview</h2>
          <p className="mt-4 leading-relaxed text-slate-muted">{venture.longDescription}</p>
          <p className="mt-6 text-sm text-slate-muted">
            AgniKawach is presented as a focused industrial safety technology initiative under
            Intellobloom — engineered for technical audiences in Oil &amp; Gas and adjacent
            industrial contexts.
          </p>
        </SectionReveal>
        <SectionReveal delay={80}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-semibold text-off-white">Technical capabilities</h3>
            <ul className="mt-4 space-y-3">
              {venture.capabilities.map((cap) => (
                <li key={cap} className="flex gap-3 text-sm text-slate-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-agni" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>

      <SectionReveal className="mt-16">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1324] p-8 sm:p-12">
          <p className="text-xs uppercase tracking-wider text-agni">Engineering context</p>
          <h3 className="mt-3 font-display text-2xl font-semibold">Oil &amp; Gas safety intelligence</h3>
          <p className="mt-4 max-w-3xl text-slate-muted">
            Visual storytelling emphasizes process safety, scenario evaluation, and decision support
            — not sensational hazard imagery. Diagrams and data-inspired elements reflect the
            engineering nature of consequence modelling work.
          </p>
          <svg
            className="mt-10 h-40 w-full opacity-70"
            viewBox="0 0 800 160"
            aria-hidden
          >
            <path d="M40 120 L200 40 L360 120 L520 60 L760 120" fill="none" stroke="#E85D4C" strokeWidth="1" opacity="0.5" />
            {[120, 280, 440, 600].map((x) => (
              <line key={x} x1={x} y1={120} x2={x} y2={80} stroke="#5B8CFF" strokeWidth="1" opacity="0.3" />
            ))}
          </svg>
        </div>
      </SectionReveal>
    </SharedBusinessLayout>
  );
}
