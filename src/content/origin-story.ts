export type OriginChapter = {
  id: string;
  phase: string;
  title: string;
  body: string;
  detail: string;
  image: string;
  imageAlt: string;
  accent: "neutral" | "education" | "energy" | "group";
};

/**
 * Scroll storytelling arc:
 * founding → education first → expansion → fire & safety → IB Group today.
 */
export const originStory = {
  eyebrow: "Our story",
  headline: "How Intellobloom became IB Group.",
  chapters: [
    {
      id: "spark",
      phase: "The beginning",
      title: "It started with a belief.",
      body: "Technology should not stay locked in labs and boardrooms. It should reach the people who will build the next decade — students, teachers, and institutions ready to learn by doing. That belief is why Intellobloom exists.",
      detail:
        "We were founded as a technology company with one clear first mission: make advanced learning real, practical, and reachable. Not as a slogan — as engineering work that schools could actually use. From day one, Intellobloom was built to turn complex capability into something people can teach, practice, and grow with.",
      image: "/assets/education/lab-tech.jpg",
      imageAlt: "Engineer working with technology in a lab environment",
      accent: "neutral",
    },
    {
      id: "education",
      phase: "Chapter 01 · Education",
      title: "We entered education first.",
      body: "Through IntelliSTEM, we brought AI, robotics, coding, and STEM into classrooms — turning curiosity into competence. Schools and learning partners became our first proving ground: programs, labs, and project-based experiences designed for Classes and institutions that wanted more than theory.",
      detail:
        "This was our first vertical — not a side project. IntelliSTEM shaped how Intellobloom learns to listen to real users, design for real constraints, and ship technology that belongs in the hands of students and educators. Education taught us discipline before we ever entered industry.",
      image: "/assets/education/robotics-hero.jpg",
      imageAlt: "Students and robotics learning environment",
      accent: "education",
    },
    {
      id: "build",
      phase: "The craft",
      title: "Learning by building changed everything.",
      body: "As IntelliSTEM grew, so did our engineering culture: design with intent, validate in the field, and keep improving. Classrooms forced clarity — if a concept could not be taught, practiced, and understood, it was not finished. Product, design, and security began working as one team under the parent brand.",
      detail:
        "That craft — engineering, experience design, and secure delivery under one roof — became the operating system of IB Group. It prepared us to take on harder problems in higher-stakes environments, without abandoning the patience we learned in education.",
      image: "/assets/education/robot-lab.jpg",
      imageAlt: "Robotics lab with hands-on learning setup",
      accent: "education",
    },
    {
      id: "pivot",
      phase: "The expansion",
      title: "Then the question got bigger.",
      body: "If technology can reshape how the next generation learns, what else can focused engineering protect? Critical industry needed the same clarity we brought to classrooms — especially where risk, fire, consequence, and human decision-making meet under pressure.",
      detail:
        "IB Group was ready for a second vertical. Same parent company. New domain. Same intensity. We did not abandon education; we expanded the mission: use focused technology wherever complex domains demand seriousness, structure, and trust.",
      image: "/assets/energy/industrial-night.jpg",
      imageAlt: "Industrial facility at night",
      accent: "group",
    },
    {
      id: "safety",
      phase: "Chapter 02 · Fire & Safety",
      title: "We entered fire, risk, and industrial safety.",
      body: "AgniKawach was born to serve Oil & Gas and hazardous industries — consequence modelling, hazard analysis, and decision-support technology for operators who cannot afford guesswork. Where education asked us to make technology approachable, industrial safety asked us to make it rigorous.",
      detail:
        "From classrooms to critical facilities: a deliberate second chapter, not a rebrand of the first. AgniKawach carries the same Intellobloom DNA — clear scope, engineering discipline, and respect for the people who use what we build — into environments where safety outcomes matter most.",
      image: "/assets/energy/refinery-hero.jpg",
      imageAlt: "Industrial refinery and process facility",
      accent: "energy",
    },
    {
      id: "today",
      phase: "IB Group today",
      title: "One company. Two focused verticals.",
      body: "Education through IntelliSTEM. Industrial safety through AgniKawach. Both under Intellobloom — IB Group — still engineering intelligence, still building tomorrow. We remain a parent technology company that incubates and operates focused ventures, each with its own audience and identity.",
      detail:
        "The story continues wherever focused technology can turn a complex domain into something deployable, responsible, and real. If you are an institution, an industrial team, or a partner with a problem worth building for — this is who we are, and how we got here.",
      image: "/assets/energy/pipeline.jpg",
      imageAlt: "Industrial pipeline infrastructure",
      accent: "group",
    },
  ] satisfies OriginChapter[],
};
