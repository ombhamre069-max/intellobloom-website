export type VerticalId = "education" | "energy";

export const verticals = {
  education: {
    id: "education" as const,
    title: "Education & Technology",
    subtitle: "STEM · AI · Robotics · Coding",
    shortTitle: "Education",
    venture: "IntelliSTEM",
    href: "/verticals/education",
    exploreUrl: "https://www.intellistem.in",
    tagline: "AI, robotics, and STEM for the next generation.",
    description:
      "Future skills, computational thinking, and hands-on innovation in schools and learning ecosystems.",
    theme: {
      accent: "#3978E8",
      accentSoft: "#E8F0FC",
      surface: "#F4F6F8",
      glow: "rgb(57 120 232 / 0.2)",
    },
    capabilities: [
      "Artificial Intelligence literacy",
      "Robotics & physical computing",
      "Coding & computational thinking",
      "STEM lab experiences",
      "Educational technology platforms",
      "Institutional programs",
    ],
    applications: [
      "Schools & K–12",
      "STEM labs",
      "Higher education partners",
      "Innovation programs",
    ],
    mission:
      "Make advanced technology approachable through structured, hands-on learning — powered by IntelliSTEM under Intellobloom (IB Group).",
  },
  energy: {
    id: "energy" as const,
    title: "Energy & Industrial Safety",
    subtitle: "Oil & Gas · Energy · Industrial Safety",
    shortTitle: "Energy & Safety",
    venture: "AgniKawach",
    href: "/verticals/energy",
    exploreUrl: "/verticals/energy",
    tagline: "Risk intelligence for Oil, Gas, and industrial operations.",
    description:
      "Consequence modelling, hazard analysis, and engineering-grade safety technology for critical infrastructure.",
    theme: {
      accent: "#F07832",
      accentSoft: "#172333",
      surface: "#101C2C",
      glow: "rgb(240 120 50 / 0.18)",
    },
    capabilities: [
      "Consequence modelling",
      "Risk assessment",
      "Hazard analysis",
      "Oil & Gas safety engineering",
      "Industrial risk intelligence",
      "Decision-support tooling",
    ],
    applications: [
      "Oil & Gas",
      "Natural gas facilities",
      "Industrial plants",
      "Process safety teams",
    ],
    mission:
      "Support safer industrial decisions with rigorous engineering thinking — through AgniKawach under Intellobloom (IB Group).",
  },
} as const;

export const group = {
  shortName: "IB",
  displayName: "IB GROUP",
  primaryBrand: "INTELLOBLOOM",
  legalName: "Intellobloom Interactive Learning Private Limited",
  tagline: "Engineering Intelligence. Building Tomorrow.",
  supporting:
    "An innovation-driven group advancing education, intelligent technologies and industrial safety.",
  vision:
    "A technology group where education and industrial safety advance together — built with engineering discipline and long-term intent.",
  mission:
    "To incubate, build, and operate ventures that turn complex domain challenges into deployable technology.",
};
