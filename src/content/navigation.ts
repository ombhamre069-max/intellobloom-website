export type NavItem = {
  label: string;
  href: string;
  isAnchor?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/#team", isAnchor: true },
  { label: "Our Businesses", href: "/#ecosystem", isAnchor: true },
  { label: "Industries", href: "/#industries", isAnchor: true },
  { label: "Innovation", href: "/#innovation", isAnchor: true },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/#team" },
    { label: "Innovation", href: "/#innovation" },
    { label: "Contact", href: "/contact" },
  ],
  businesses: [
    { label: "IntelliSTEM", href: "https://www.intellistem.in" },
    { label: "AgniKawach", href: "/businesses/agnikawach" },
  ],
  industries: [
    { label: "Education & Learning", href: "/#industries" },
    { label: "Oil & Gas", href: "/#industries" },
    { label: "Industrial Safety", href: "/#industries" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};
