import { frameworkCatalog } from "./frameworks";
import { projectCatalog } from "./projects";
import { researchCatalog } from "./research";
import { writingCatalog } from "./writing";

export type ProfileRelationship = {
  title: string;
  description: string;
  href: string;
};

export type FocusType =
  | "Building"
  | "Researching"
  | "Preparing"
  | "Learning";

export type CurrentFocusItem = {
  type: FocusType;
  title: string;
  description: string;
  status: string;
  href: string;
};

function requireProject(slug: string) {
  const project = projectCatalog.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }

  return project;
}

function requireResearch(slug: string) {
  const research = researchCatalog.find(
    (item) => item.slug === slug,
  );

  if (!research) {
    throw new Error(`Research not found: ${slug}`);
  }

  return research;
}

const techShortsApp = requireProject(
  "techshortsapp",
);

const roboticHand = requireProject(
  "robotic-hand",
);

const globalBriz = requireProject(
  "globalbriz",
);

const contextualSignals = requireResearch(
  "contextual-behavioral-signals",
);

const illusionOfLearning = requireResearch(
  "illusion-of-learning",
);

const latestPublishedWriting = [
  ...writingCatalog,
]
  .filter(
    (item) =>
      item.status === "Published" &&
      item.publishedAt,
  )
  .sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(
      a.publishedAt ?? "",
    ),
  )[0];

export const aboutPageContent = {
  hero: {
    eyebrow:
      "Mechanical engineering · Software · Research",
    title: "I am trying to understand",
    titleContinuation:
      "how systems behave when certainty is unavailable.",
    description:
      "I am Niraj Chaurasiya, a mechanical engineering student, software builder, researcher, and technical communicator working across engineering, learning, information systems, and uncertainty.",
  },

  identity: {
    title:
      "My work begins with questions that appear simple but become difficult when examined carefully.",
    paragraphs: [
      "How do we know learning occurred? What does a behavioral signal actually mean? When is understanding sufficient to build? What can an output tell us about the system that produced it?",
      "I explore these questions through software platforms, engineering projects, research essays, public frameworks, videos, and physical prototypes.",
      "The projects differ on the surface, but they repeatedly return to the same problem: reality is often only partially observable, while decisions still need to be made.",
    ],
  },

  roles: [
    {
      title: "Engineering",
      shortName: "ENG",
      description:
        "Studying mechanical systems, dynamics, thermodynamics, fluids, controls, robotics, and physical system design.",
      href: "/work?category=engineering",
    },
    {
      title: "Software",
      shortName: "DEV",
      description:
        "Building platforms, interfaces, APIs, ranking systems, moderation tools, and dynamic information architectures.",
      href: "/work?category=software",
    },
    {
      title: "Research",
      shortName: "RES",
      description:
        "Investigating behavioral evidence, learning, latent variables, system assumptions, and decision-making under uncertainty.",
      href: "/research",
    },
    {
      title: "Communication",
      shortName: "COM",
      description:
        "Turning developing ideas into essays, talks, frameworks, diagrams, and public engineering explanations.",
      href: "/writing",
    },
  ],

  thinkingThemes: [
    {
      title: "Causality",
      description:
        "I try to distinguish what happened from what caused it. Correlation, output, and sequence do not automatically establish mechanism.",
    },
    {
      title: "Non-linearity",
      description:
        "Small changes can produce disproportionate consequences, while visible outcomes may emerge from several interacting causes.",
    },
    {
      title: "Latent variables",
      description:
        "The property that matters most—learning, credibility, understanding, trust, or intent—is often not directly observable.",
    },
    {
      title: "Evidence",
      description:
        "I ask what a trace genuinely supports before allowing a system or argument to become confident.",
    },
    {
      title: "System boundaries",
      description:
        "The way a problem is framed determines what enters the analysis, what disappears, and what later conclusions become possible.",
    },
    {
      title: "Upgraded questions",
      description:
        "Progress sometimes comes not from answering the original question, but from discovering that the original question was incomplete.",
    },
  ],

  academicPath: {
    institution:
      "Arkansas State University",
    program:
      "Bachelor of Science in Mechanical Engineering",
    expectedGraduation: "2028",
    description:
      "My academic path provides the mathematical and physical foundation for studying mechanics, thermodynamics, fluid systems, controls, design, and robotics.",
    areas: [
      "Mechanical systems and dynamics",
      "Thermodynamics and fluid mechanics",
      "Control systems and robotics",
      "Engineering mathematics",
      "CAD and parametric modeling",
      "Programming and computational analysis",
    ],
  },

  journey: [
    {
      period: "2024",
      title:
        "Mechanical engineering in the United States",
      description:
        "Began studying mechanical engineering at Arkansas State University while continuing to build software independently.",
    },
    {
      period: "2025",
      title:
        "TechShortsApp became an epistemic system",
      description:
        "The product moved beyond short-form video delivery toward questions about evidence, credibility, ranking, and latent truth.",
    },
    {
      period: "2026",
      title:
        "Research, frameworks, and physical systems",
      description:
        "Expanded the work through TechXEng, the robotic hand, GlobalBriz, environmental research, public writing, and the SIGNAL, EoL, and SUF frameworks.",
    },
    {
      period: "Long term",
      title:
        "Robotics, autonomous systems, and Nepal",
      description:
        "Develop the technical, intellectual, financial, and institutional capacity to build meaningful engineering systems for Nepal.",
    },
  ],

  principles: [
    {
      title:
        "Building is a form of investigation",
      description:
        "A prototype does not only produce an object. It exposes assumptions that remained invisible during abstract reasoning.",
    },
    {
      title:
        "Uncertainty should remain visible",
      description:
        "A polished interface or precise number should not make a weak inference appear stronger than it is.",
    },
    {
      title:
        "Question Version 0",
      description:
        "When later iterations stop improving, the original problem definition or assumption may be the real constraint.",
    },
    {
      title:
        "Evidence should match the claim",
      description:
        "An observation, reflection, experiment, conceptual essay, and peer-reviewed study support different levels of confidence.",
    },
    {
      title:
        "Understanding serves action",
      description:
        "The goal is not infinite analysis. It is responsible action with understanding proportionate to consequences and reversibility.",
    },
    {
      title:
        "Not building feels dishonest",
      description:
        "External recognition is uncertain, but ignoring questions and systems that genuinely matter would feel less honest than attempting them.",
    },
  ],

  direction: {
    title:
      "The long-term direction is larger than a portfolio.",
    paragraphs: [
      "I want to work toward robotics, autonomous systems, reliable information systems, and engineering institutions capable of solving difficult problems.",
      "The projects on this website are early systems, experiments, and intellectual foundations—not the final destination.",
      "Long term, I want the freedom and capability to build meaningful systems for Nepal.",
    ],
  },
};

export const nowPageContent = {
  updatedAt: "2026-07-14",

  hero: {
    eyebrow: "Now",
    title: "What I am",
    titleContinuation:
      "building, studying, and questioning now.",
    description:
      "This page records my present direction. Unlike the About page, it is expected to change as projects, questions, priorities, and understanding evolve.",
  },

  focus: [
    {
      type: "Researching",
      title: contextualSignals.title,
      description:
        contextualSignals.centralClaim,
      status: contextualSignals.status,
      href: `/research/${contextualSignals.slug}`,
    },
    {
      type: "Building",
      title: roboticHand.title,
      description:
        roboticHand.currentDirection,
      status: roboticHand.status,
      href: `/work/${roboticHand.slug}`,
    },
    {
      type: "Preparing",
      title: illusionOfLearning.title,
      description:
        "Developing the TEDx talk, public short-form series, and long-form explanation around evidence of learning.",
      status: illusionOfLearning.status,
      href: `/research/${illusionOfLearning.slug}`,
    },
    {
      type: "Building",
      title: globalBriz.title,
      description:
        globalBriz.currentDirection,
      status: globalBriz.status,
      href: `/work/${globalBriz.slug}`,
    },
    {
      type: "Researching",
      title: techShortsApp.title,
      description:
        techShortsApp.currentDirection,
      status: techShortsApp.status,
      href: `/work/${techShortsApp.slug}`,
    },
  ] satisfies CurrentFocusItem[],

  currentQuestions: [
    "What exactly counts as behavior in a digital learning environment?",
    "Why can the same behavioral trace result from different hidden causes?",
    "How should learning evidence differ across conceptual, procedural, and physical tasks?",
    "When is understanding sufficient to move from analysis into construction?",
    "How can a public website represent evolving work without making unfinished ideas appear final?",
  ],

  reading: [
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      purpose:
        "Studying judgment, cognitive bias, intuition, and the limits of human reasoning.",
    },
    {
      title: "As a Man Thinketh",
      author: "James Allen",
      purpose:
        "Reflecting on thought, character, responsibility, and internal discipline.",
    },
    {
      title: "Leonardo da Vinci",
      author: "Walter Isaacson",
      purpose:
        "Studying curiosity, observation, cross-domain thinking, and the relationship between art and engineering.",
    },
  ],

  rhythm: [
    {
      period: "Monday–Wednesday",
      title: "TechShortsApp",
      description:
        "Research, reading, ranking-system reasoning, and Paper 3 development.",
    },
    {
      period: "Thursday–Saturday",
      title: "Robotic hand and TechXEng",
      description:
        "SolidWorks, mechanical design, robotics foundations, experimentation, and documentation.",
    },
    {
      period: "Sunday",
      title: "GlobalBriz and public work",
      description:
        "Platform development, content, website maintenance, and connecting the broader body of work.",
    },
    {
      period: "Daily",
      title: "Reading and reflection",
      description:
        "Three parallel books, research notes, and questions that may influence the systems being built.",
    },
  ],

  currentUncertainty: {
    title:
      "How should context enter an evidence model?",
    description:
      "The same trace may mean different things across domains, learners, tasks, interfaces, and moments. The current challenge is determining which contextual variables are necessary without creating a model that becomes fragmented or impossible to validate.",
  },

  commitments: [
    {
      title: "TechShortsApp Paper 3",
      description:
        "Define behavior, behavioral traces, context, and domain-dependent interpretation carefully enough to support the next research argument.",
      href: "/research/contextual-behavioral-signals",
    },
    {
      title:
        "The Illusion of Learning",
      description:
        "Prepare the TEDx direction while continuing the public short-video and long-form learning series regardless of the event outcome.",
      href: "/research/illusion-of-learning",
    },
    {
      title: "Robotic Hand",
      description:
        "Continue moving from CAD fundamentals toward assembled links, actuation, electronics, and control.",
      href: "/work/robotic-hand",
    },
  ],

  latestOutput: latestPublishedWriting
    ? {
        title: latestPublishedWriting.title,
        description:
          latestPublishedWriting.excerpt,
        href: `/writing/${latestPublishedWriting.slug}`,
        type: latestPublishedWriting.category,
      }
    : null,

  frameworkVersions: frameworkCatalog.map(
    (framework) => ({
      title: framework.shortName,
      version: framework.version,
      href: `/frameworks/${framework.slug}`,
    }),
  ),
};