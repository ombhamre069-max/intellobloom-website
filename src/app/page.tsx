import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CompanyOverviewSection } from "@/components/sections/CompanyOverviewSection";
import { CompanyIntroduction } from "@/components/sections/CompanyIntroduction";
import { BusinessEcosystem } from "@/components/sections/BusinessEcosystem";
import { BusinessVentures } from "@/components/sections/BusinessVentures";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ClientsAndPartners } from "@/components/sections/ClientsAndPartners";
import { InnovationTimeline } from "@/components/sections/InnovationTimeline";
import { LeadershipTeamSection } from "@/components/sections/LeadershipTeamSection";
import { PartnershipCTA } from "@/components/sections/PartnershipCTA";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { SectionAtmosphere } from "@/components/motion/SectionAtmosphere";

export default function HomePage() {
  return (
    <ScrollExperience>
      <div className="pb-12">
        <HeroSection />
        <TrustStrip />
        <CompanyOverviewSection />
        <SectionAtmosphere tone="light">
          <CompanyIntroduction />
        </SectionAtmosphere>
        <BusinessEcosystem />
        <SectionAtmosphere tone="warm">
          <BusinessVentures />
        </SectionAtmosphere>
        <SectionAtmosphere tone="light">
          <IndustriesSection />
          <CapabilitiesSection />
        </SectionAtmosphere>
        <ClientsAndPartners />
        <SectionAtmosphere tone="light">
          <InnovationTimeline />
        </SectionAtmosphere>
        <LeadershipTeamSection />
        <PartnershipCTA />
        <SectionAtmosphere tone="light">
          <AboutSection />
          <ContactSection />
        </SectionAtmosphere>
      </div>
    </ScrollExperience>
  );
}
