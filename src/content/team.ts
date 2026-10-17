export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus?: string;
};

/**
 * Leadership and core team — update photos and bios in this file when ready.
 */
export const leadershipTeam: TeamMember[] = [
  {
    id: "ceo",
    name: "Gaurav Patil",
    role: "Chief Executive Officer",
    focus: "Company vision, ventures, and strategic partnerships",
  },
  {
    id: "cto",
    name: "Vaibhav Bachhav",
    role: "Chief Technology Officer",
    focus: "Engineering direction, architecture, and product technology",
  },
  {
    id: "design",
    name: "Om Bhamre",
    role: "UI/UX Designer",
    focus: "Product experience, interface design, and design systems",
  },
  {
    id: "security",
    name: "Koushal Patil",
    role: "Cyber Security Expert",
    focus: "Security practices, risk awareness, and secure engineering",
  },
  {
    id: "backend",
    name: "Lekhan Jomiwale",
    role: "Backend Developer",
    focus: "APIs, data layers, and server-side platform development",
  },
];
