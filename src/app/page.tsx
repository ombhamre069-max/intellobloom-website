import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { ScrollExperience } from "@/components/motion/ScrollExperience";
import { VerticalsShowcase } from "@/components/sections/VerticalsShowcase";
import { CompanyOverviewSection } from "@/components/sections/CompanyOverviewSection";
import { OriginStory } from "@/components/sections/OriginStory";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { InnovationTimeline } from "@/components/sections/InnovationTimeline";
import { LeadershipTeamSection } from "@/components/sections/LeadershipTeamSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <ScrollExperience>
      <div>
        <CinematicHero />
        <OriginStory />
        <VerticalsShowcase />
        <CompanyOverviewSection />
        <CapabilitiesSection />
        <InnovationTimeline />
        <LeadershipTeamSection />
        <ContactSection />
      </div>
    </ScrollExperience>
  );
}
