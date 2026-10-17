import {
  clientSectors,
  getPublishedEngagements,
} from "@/content/clients";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function ClientsAndPartners() {
  const published = getPublishedEngagements();
  const hasEngagements = published.length > 0;

  return (
    <section id="engagements" className="section-glass-dark py-24 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeader
            eyebrow="Industry Engagement"
            title="Building Technology for Real-World Needs."
            description={
              hasEngagements
                ? "Selected organizations and partners we work with — published only when verified and approved."
                : "We engage with schools, industrial teams, and technology partners as ventures mature. Verified client and partner listings will appear here when approved for publication."
            }
            dark
            align="center"
          />
        </SectionReveal>

        {hasEngagements ? (
          <div className="mt-14 space-y-12">
            {clientSectors.map((sector) => {
              const items = published.filter((c) => c.sector === sector.id);
              if (items.length === 0) return null;
              return (
                <SectionReveal key={sector.id}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-electric">
                    {sector.label}
                  </h3>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-white/10 bg-white/5 p-6"
                      >
                        <p className="font-medium">{item.organizationName}</p>
                        {item.description && (
                          <p className="mt-2 text-sm text-slate-muted">
                            {item.description}
                          </p>
                        )}
                        <p className="mt-3 text-xs text-slate-muted">
                          {item.relatedVenture}
                          {item.relationshipType
                            ? ` · ${item.relationshipType}`
                            : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                </SectionReveal>
              );
            })}
          </div>
        ) : (
          <SectionReveal className="mt-12">
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
              {clientSectors.map((sector) => (
                <div
                  key={sector.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-6 text-center"
                >
                  <p className="text-sm font-medium text-off-white">{sector.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-muted">
                    Verified engagements will be listed here as they are approved for publication.
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
