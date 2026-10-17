export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus?: string;
  photo: string;
};

export const leadershipTeam: TeamMember[] = [
  {
    id: "ceo",
    name: "Gaurav Patil",
    role: "Chief Executive Officer",
    focus: "Company vision, ventures, and strategic partnerships",
    photo: "/team/gaurav-patil.png",
  },
  {
    id: "cto",
    name: "Vaibhav Bachhav",
    role: "Chief Technology Officer",
    focus: "Engineering direction, architecture, and product technology",
    photo: "/team/vaibhav-bachhav.png",
  },
  {
    id: "design",
    name: "Om Bhamre",
    role: "UI/UX Designer",
    focus: "Product experience, interface design, and design systems",
    photo: "/team/om-bhamre.png",
  },
  {
    id: "security",
    name: "Koushal Patil",
    role: "Cyber Security Expert",
    focus: "Security practices, risk awareness, and secure engineering",
    photo: "/team/koushal-patil.png",
  },
  {
    id: "backend",
    name: "Lekhan Jomiwale",
    role: "Backend Developer",
    focus: "APIs, data layers, and server-side platform development",
    photo: "/team/lekhan-jomiwale.png",
  },
];
