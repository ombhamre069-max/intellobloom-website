export type NavItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
  children?: { label: string; href: string; description?: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About IB Group", href: "/about" },
  {
    label: "What We Work On",
    href: "/#verticals",
    isAnchor: true,
    children: [
      {
        label: "Education & Technology",
        href: "/verticals/education",
        description: "IntelliSTEM · AI · Robotics · STEM",
      },
      {
        label: "Energy & Industrial Safety",
        href: "/verticals/energy",
        description: "AgniKawach · Oil & Gas · Risk intelligence",
      },
    ],
  },
  { label: "Education & Technology", href: "/verticals/education" },
  { label: "Energy & Industrial Safety", href: "/verticals/energy" },
  { label: "Innovation", href: "/innovation" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About IB Group", href: "/about" },
    { label: "Innovation", href: "/innovation" },
    { label: "Leadership & Team", href: "/#team" },
    { label: "Contact", href: "/contact" },
  ],
  verticals: [
    { label: "Education & Technology", href: "/verticals/education" },
    { label: "Energy & Industrial Safety", href: "/verticals/energy" },
    { label: "IntelliSTEM", href: "https://www.intellistem.in" },
    { label: "AgniKawach", href: "/verticals/energy" },
  ],
  industries: [
    { label: "STEM Education", href: "/verticals/education" },
    { label: "Oil & Gas", href: "/verticals/energy" },
    { label: "Industrial Safety", href: "/verticals/energy" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};
