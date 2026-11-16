import { VerticalExperience } from "@/components/verticals/VerticalExperience";
import { createPageMetadata } from "@/lib/metadata";
import { verticals } from "@/content/verticals";

export const metadata = createPageMetadata({
  title: "Education & Technology",
  description: verticals.education.description,
  path: "/verticals/education",
});

export default function EducationVerticalPage() {
  return <VerticalExperience id="education" />;
}