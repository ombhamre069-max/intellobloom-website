export type Industry = {
  id: string;
  name: string;
  challenges: string;
  focus: string;
  venture: string;
  ventureHref?: string;
};

export const industries: Industry[] = [
  {
    id: "education",
    name: "Education and Learning",
    challenges:
      "Closing the gap between curriculum and rapidly evolving technology fields.",
    focus: "Hands-on STEM, AI literacy, robotics, and computational thinking.",
    venture: "IntelliSTEM",
    ventureHref: "https://www.intellistem.in",
  },
  {
    id: "oil-gas",
    name: "Oil & Gas",
    challenges:
      "Managing operational risk in complex, high-consequence environments.",
    focus: "Consequence modelling and engineering decision support.",
    venture: "AgniKawach",
    ventureHref: "/businesses/agnikawach",
  },
  {
    id: "industrial-safety",
    name: "Industrial Safety and Risk Engineering",
    challenges:
      "Evaluating hazard scenarios with rigor and clarity under uncertainty.",
    focus: "Risk assessment, scenario analysis, and safety intelligence.",
    venture: "AgniKawach",
    ventureHref: "/businesses/agnikawach",
  },
  {
    id: "emerging-tech",
    name: "Emerging Technology and Applied Innovation",
    challenges:
      "Turning advanced capabilities into deployable, industry-ready solutions.",
    focus: "Applied research, software platforms, and cross-domain engineering.",
    venture: "Intellobloom",
  },
];
