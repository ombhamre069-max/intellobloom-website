import { innovationSteps } from "@/content/innovation";
import { group } from "@/content/verticals";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InnovationTimeline } from "@/components/sections/InnovationTimeline";
import { PartnershipCTA } from "@/components/sections/PartnershipCTA";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Innovation",
  description:
    "How Intellobloom Group approaches research, venture building, and applied engineering across education and industrial safety.",
  path: "/innovation",
});

export default function InnovationPage() {
  return (
    <div className="pb-16 pt-[var(--nav-height)]">
      <div className="section-glass border-b border-stem-grey/10 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Innovation"
            title="Research & venture building"
            description={`${group.legalName} invests engineering focus in two core verticals and a structured innovation process across ${innovationSteps.length} stages.`}
          />
        </div>
      </div>
      <InnovationTimeline />
      <PartnershipCTA />
    </div>
  );
}