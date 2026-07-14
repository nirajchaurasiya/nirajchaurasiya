export const mediaTypes = [
  "Video Series",
  "Short Series",
  "Playlist",
  "Talk",
  "Presentation",
  "Interview",
] as const;

export const mediaStatuses = [
  "Published",
  "Ongoing",
  "Developing",
  "Archived",
] as const;

export type MediaType = (typeof mediaTypes)[number];
export type MediaStatus = (typeof mediaStatuses)[number];

export type MediaRelationship = {
  title: string;
  description?: string;
  href: string;
};

export type MediaSection = {
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type MediaItem = {
  title: string;
  slug: string;

  type: MediaType;
  status: MediaStatus;
  platform: string;

  summary: string;
  description: string;

  publishedAt?: string;
  updatedAt: string;

  featured: boolean;
  episodeCount?: number;

  externalUrl?: string;

  sections: MediaSection[];

  relatedProjects: MediaRelationship[];
  relatedResearch: MediaRelationship[];
  relatedFrameworks: MediaRelationship[];
};

export const mediaCatalog = [
  {
    title: "Human-Like Robotic Hand",
    slug: "robotic-hand",

    type: "Playlist",
    status: "Ongoing",
    platform: "YouTube · TechXEng",

    summary:
      "A public engineering series documenting the attempt to design and build a human-like robotic hand from first principles.",

    description:
      "The series follows the complete learning and building process—from early questions and SolidWorks fundamentals toward mechanical assemblies, electronics, actuation, and control.",

    publishedAt: "2026-05-21",
    updatedAt: "2026-07-12",

    featured: true,
    episodeCount: 3,

    externalUrl:
      "https://www.youtube.com/playlist?list=PLOrDwx3YJxLobczHWNZPG7iyWNCJ3wDEr",

    sections: [
      {
        heading: "Why the series exists",
        paragraphs: [
          "The robotic hand is not presented as a polished final product. It is a public record of developing the knowledge required to build one.",
          "Each episode documents both the visible engineering progress and the assumptions, mistakes, and uncertainty behind it.",
        ],
      },
      {
        heading: "Current progression",
        points: [
          "Understanding the hand as a mechanical system.",
          "Learning parametric sketching and design intent.",
          "Creating the first three-dimensional link.",
          "Moving toward assemblies and controlled motion.",
          "Preparing for Arduino, sensing, actuation, and control.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "Human-Like Robotic Hand",
        href: "/work/robotic-hand",
      },
      {
        title: "TechXEng",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        description:
          "The series provides visible evidence of movement from imitation toward independent construction.",
        href: "/research/illusion-of-learning",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
      {
        title: "Evidence of Learning",
        href: "/frameworks/evidence-of-learning",
      },
      {
        title: "Sufficient Understanding Framework",
        href: "/frameworks/sufficient-understanding",
      },
    ],
  },

  {
    title: "Evidence of Learning",
    slug: "evidence-of-learning",

    type: "Short Series",
    status: "Ongoing",
    platform: "Instagram · TikTok · Short-form video",

    summary:
      "A short-form series asking what evidence supports the claim that learning actually occurred.",

    description:
      "The series translates the Evidence of Learning framework and The Illusion of Learning research direction into standalone short videos.",

    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",

    featured: true,
    episodeCount: 2,

    sections: [
      {
        heading: "The central question",
        paragraphs: [
          "A learner can pay attention, finish a lecture, and feel that everything made sense. The series asks whether those experiences are sufficient evidence of learning.",
        ],
      },
      {
        heading: "Planned progression",
        points: [
          "The feeling of learning.",
          "Learning as a latent process.",
          "Recall and recognition.",
          "Independent performance.",
          "Transfer.",
          "Teaching and creation.",
          "Reflection and productive uncertainty.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        href: "/work/techshortsapp",
      },
      {
        title: "TechXEng",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        href: "/research/illusion-of-learning",
      },
    ],

    relatedFrameworks: [
      {
        title: "Evidence of Learning",
        href: "/frameworks/evidence-of-learning",
      },
    ],
  },

  {
    title: "The Illusion of Learning",
    slug: "illusion-of-learning-talk",

    type: "Talk",
    status: "Developing",
    platform: "TEDx talk development",

    summary:
      "A developing public talk asking how people know whether learning occurred.",

    description:
      "The talk begins with two students leaving the same lecture with the same feeling that they learned, then examines whether attention, completion, familiarity, and fluency are sufficient evidence.",

    updatedAt: "2026-07-14",

    featured: true,

    sections: [
      {
        heading: "Talk direction",
        paragraphs: [
          "The talk introduces learning as a latent process and reframes the question from whether learning happened to what evidence supports that claim.",
        ],
      },
      {
        heading: "Current structure",
        points: [
          "The feeling of learning.",
          "Why learning cannot be observed directly.",
          "Weak and strong forms of evidence.",
          "The Evidence of Learning framework.",
          "How learners can test changed capability.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        href: "/work/techshortsapp",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        href: "/research/illusion-of-learning",
      },
    ],

    relatedFrameworks: [
      {
        title: "Evidence of Learning",
        href: "/frameworks/evidence-of-learning",
      },
    ],
  },

  {
    title: "Monitor Only vs. Monitor and Model",
    slug: "asri-air-quality",

    type: "Presentation",
    status: "Published",
    platform: "ASRI Research Symposium",

    summary:
      "A student research presentation examining the distinction between observing environmental data and constructing explanatory or predictive models.",

    description:
      "The presentation used EPA air-quality data and Python to explore what additional assumptions are introduced when analysis moves from monitoring toward modeling.",

    publishedAt: "2026-06-15",
    updatedAt: "2026-06-17",

    featured: false,

    sections: [
      {
        heading: "Research focus",
        paragraphs: [
          "Monitoring records observed conditions. Modeling introduces relationships intended to support estimation, prediction, or explanation.",
        ],
      },
      {
        heading: "Main methodological lesson",
        paragraphs: [
          "A visible pattern does not explain itself. The strength of a conclusion must remain proportional to the evidence and assumptions supporting it.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "EPA Air-Quality Exploration",
        href: "/work/epa-air-quality",
      },
    ],

    relatedResearch: [
      {
        title: "Monitor Only vs. Monitor and Model",
        href: "/research/monitoring-versus-modeling",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],
  },

  {
    title: "Systems Foundations",
    slug: "systems-foundations",

    type: "Video Series",
    status: "Published",
    platform: "YouTube · TechXEng",

    summary:
      "Early TechXEng videos introducing systems, coordinates, particle models, rigid bodies, and engineering abstraction.",

    description:
      "This collection established the foundational direction of TechXEng: moving from isolated formulas toward complete system understanding.",

    publishedAt: "2026-03-01",
    updatedAt: "2026-04-01",

    featured: false,

    sections: [
      {
        heading: "Topics explored",
        points: [
          "What is a system?",
          "The hidden system behind coordinate choices.",
          "Normal-tangential coordinates.",
          "Particle and rigid-body models.",
          "Assumptions behind engineering abstractions.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechXEng",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],
  },

  {
    title: "TechShortsApp Research Explainers",
    slug: "techshortsapp-research-explainers",

    type: "Video Series",
    status: "Developing",
    platform: "YouTube · Short-form video",

    summary:
      "A planned media series explaining credibility-first ranking, behavioral evidence, and uncertainty in recommendation systems.",

    description:
      "The series will translate TechShortsApp research into accessible videos without collapsing the underlying uncertainty into simplified certainty.",

    updatedAt: "2026-07-14",

    featured: false,

    sections: [
      {
        heading: "Planned topics",
        points: [
          "Why engagement is not evidence.",
          "What a behavioral signal actually measures.",
          "Implicit and explicit feedback.",
          "Confidence rather than truth ranking.",
          "Context-dependent signal interpretation.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        href: "/work/techshortsapp",
      },
    ],

    relatedResearch: [
      {
        title: "Engagement Is Not Evidence",
        href: "/research/engagement-is-not-evidence",
      },
      {
        title: "Contextual Interpretation of Behavioral Signals",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],
  },
] satisfies MediaItem[];

export function getMediaBySlug(slug: string) {
  return mediaCatalog.find((item) => item.slug === slug);
}