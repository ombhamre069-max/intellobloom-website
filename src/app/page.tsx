import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { VerticalsShowcase } from "@/components/sections/VerticalsShowcase";
import { CompanyOverviewSection } from "@/components/sections/CompanyOverviewSection";
import { BusinessEcosystem } from "@/components/sections/BusinessEcosystem";
import { HorizontalStory } from "@/components/sections/HorizontalStory";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { InnovationTimeline } from "@/components/sections/InnovationTimeline";
import { LeadershipTeamSection } from "@/components/sections/LeadershipTeamSection";
import { PartnershipCTA } from "@/components/sections/PartnershipCTA";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionAtmosphere } from "@/components/motion/SectionAtmosphere";

export default function HomePage() {
  return (
    <ScrollExperience>
      <div className="pb-12">
        <CinematicHero />
        <TrustStrip />
        <VerticalsShowcase />
        <CompanyOverviewSection />
        <BusinessEcosystem />
        <HorizontalStory />
        <SectionAtmosphere tone="light">
          <CapabilitiesSection />
        </SectionAtmosphere>
        <InnovationTimeline />
        <LeadershipTeamSection />
        <PartnershipCTA />
        <ContactSection />
      </div>
    </ScrollExperience>
  );
}
