export type BusinessVenture = {
  id: string;
  slug: string;
  name: string;
  displayName?: string;
  role: "venture" | "initiative" | "placeholder";
  category: string;
  verticalLabel: string;
  headline: string;
  description: string;
  longDescription: string;
  capabilities: string[];
  /** Internal Intellobloom detail page */
  href: string;
  /** Public venture website for Explore CTAs */
  exploreUrl?: string;
  theme: "intellistem" | "agnikawach" | "parent";
  accentColor: string;
  secondaryColor: string;
};

export const parentCompany = {
  id: "intellibloom",
  name: "Intellobloom",
  label: "IB Group",
  description:
    "Intellobloom Interactive Learning Private Limited — the parent technology brand behind IntelliSTEM and AgniKawach.",
};

export const businesses: BusinessVenture[] = [
  {
    id: "intellistem",
    slug: "intellistem",
    name: "IntelliSTEM",
    role: "venture",
    category: "Education Technology",
    verticalLabel: "Education & Technology",
    headline: "Making Future-Ready Learning Practical.",
    description:
      "IntelliSTEM brings AI, robotics, coding, and emerging technologies into hands-on learning experiences for students and educational institutions.",
    longDescription:
      "IntelliSTEM is Intellobloom's education technology venture — focused on AI education, robotics, coding, and practical STEM learning. We work with schools and partners to create technology-enabled labs, computational thinking programs, and immersive learning experiences that prepare students for emerging fields.",
    capabilities: [
      "AI and Robotics Education",
      "School Technology Labs",
      "Coding and Computational Thinking",
      "Emerging Technology Experiences",
      "Practical STEM Learning",
    ],
    href: "/businesses/intellistem",
    exploreUrl: "https://www.intellistem.in",
    theme: "intellistem",
    accentColor: "#F28C28",
    secondaryColor: "#707780",
  },
  {
    id: "agnikawach",
    slug: "agnikawach",
    name: "AgniKawach",
    role: "initiative",
    category: "Oil & Gas | Industrial Safety Technology",
    verticalLabel: "Energy, Oil & Gas & Industrial Safety",
    headline: "Modelling Consequences. Informing Safer Decisions.",
    description:
      "AgniKawach is an industrial safety technology initiative focused on consequence modelling and risk assessment for the Oil & Gas sector.",
    longDescription:
      "AgniKawach is Intellobloom's industrial safety technology initiative for the Oil & Gas industry. The focus is consequence modelling software and engineering intelligence that supports hazard scenario analysis, risk assessment, and decision support for safer operations.",
    capabilities: [
      "Consequence Modelling",
      "Industrial Risk Assessment",
      "Hazard Scenario Analysis",
      "Engineering Decision Support",
      "Industrial Safety Intelligence",
    ],
    href: "/businesses/agnikawach",
    theme: "agnikawach",
    accentColor: "#E85D4C",
    secondaryColor: "#1E293B",
  },
];

/** Placeholder entries for future ventures — not displayed as active businesses */
export const futureVenturePlaceholders = [
  {
    id: "future-venture",
    label: "Future ventures",
    note: "Additional products and industry verticals can be added via businesses configuration.",
    enabled: false,
  },
];

export function getBusinessBySlug(slug: string): BusinessVenture | undefined {
  return businesses.find((b) => b.slug === slug);
}
