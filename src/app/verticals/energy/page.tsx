import { VerticalExperience } from "@/components/verticals/VerticalExperience";
import { createPageMetadata } from "@/lib/metadata";
import { verticals } from "@/content/verticals";

export const metadata = createPageMetadata({
  title: "Energy & Industrial Safety",
  description: verticals.energy.description,
  path: "/verticals/energy",
});

export default function EnergyVerticalPage() {
  return <VerticalExperience id="energy" />;
}