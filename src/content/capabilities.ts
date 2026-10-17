export type Capability = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export const capabilities: Capability[] = [
  {
    id: "edtech",
    title: "Education Technology",
    description:
      "Learning platforms, lab experiences, and programs that make emerging tech accessible in schools.",
    enabled: true,
  },
  {
    id: "ai-robotics",
    title: "AI and Robotics",
    description:
      "Practical AI and robotics education — from foundational concepts to project-based learning.",
    enabled: true,
  },
  {
    id: "software",
    title: "Software and Digital Platforms",
    description:
      "Focused software systems built for specific industry workflows and user needs.",
    enabled: true,
  },
  {
    id: "industrial-safety",
    title: "Industrial Safety Technology",
    description:
      "Tools and models that support hazard analysis and safer operational decisions.",
    enabled: true,
  },
  {
    id: "consequence",
    title: "Consequence Modelling",
    description:
      "Engineering-oriented modelling approaches for scenario evaluation in industrial contexts.",
    enabled: true,
  },
  {
    id: "research",
    title: "Applied Research and Engineering",
    description:
      "Structured exploration that feeds directly into product and venture development.",
    enabled: true,
  },
];

export const activeCapabilities = capabilities.filter((c) => c.enabled);
