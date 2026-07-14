import { projectCatalog } from "./projects";
import { frameworkCatalog } from "./frameworks";
import { writingCatalog } from "./writing";
import { mediaCatalog } from "./media";
export type FocusItem = {
  title: string;
  description: string;
  href: string;
  category: string;
};

export type FeaturedWork = {
  index: string;
  title: string;
  slug: string;
  type: string;
  summary: string;
  status: "Active" | "Developing" | "Researching" | "Archived";
  latestUpdate: string;
  href: string;
};

export type FrameworkSummary = {
  name: string;
  shortName: string;
  version: string;
  question: string;
  description: string;
  href: string;
};

export type ThinkingItem = {
  title: string;
  type: "Research" | "Writing" | "Project update" | "Video";
  description: string;
  date: string;
  href: string;
};

export type WorkMapGroup = {
  label: string;
  description: string;
  items: Array<{
    name: string;
    href: string;
  }>;
};

export const siteIdentity = {
  name: "Niraj Chaurasiya",
  shortName: "NC",
  tagline: "Building systems under uncertainty",
  footerDescription:
    "Exploring engineering, software, learning and systems where outcomes are uncertain and evidence remains incomplete.",
};
const latestPublishedWriting = [...writingCatalog]
  .filter((item) => item.status === "Published" && item.publishedAt)
  .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))[0];

const latestPublishedMedia = [...mediaCatalog]
  .filter((item) => item.publishedAt)
  .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))[0];
export const homePageContent = {
  hero: {
    eyebrow: "Mechanical engineering · Software · Research",
    title: "I build systems",
    titleContinuation: "for uncertain realities.",
    description:
      "I am a mechanical engineering student, researcher and builder exploring how we can make better judgments when outcomes are uncertain, signals are noisy and truth cannot be observed directly.",
    primaryAction: {
      label: "Explore my work",
      href: "/work",
    },
    secondaryAction: {
      label: "Read my research",
      href: "/research",
    },
  },

  currentFocus: {
    eyebrow: "What I am working on now",
    title: "Current focus",
    introduction:
      "My work currently moves across learning science, credibility systems, robotics and community infrastructure.",
    updatedAt: "2026-07-14",
    items: [
      {
        title: "Context-dependent behavioral signals",
        description:
          "Developing the third TechShortsApp paper around behavior, domain and the interpretation of indirect evidence.",
        href: "/research/contextual-behavioral-signals",
        category: "Research",
      },
      {
        title: "The Illusion of Learning",
        description:
          "Developing the TEDx talk, short-form series and long-form explanation around evidence of learning.",
        href: "/research/illusion-of-learning",
        category: "Learning",
      },
      {
        title: "Human-like robotic hand",
        description:
          "Learning mechanical design through SolidWorks, parametric modeling, assemblies and physical prototyping.",
        href: "/work/robotic-hand",
        category: "Engineering",
      },
      {
        title: "GlobalBriz",
        description:
          "Building an information and community platform intended to make immigrant life safer and easier.",
        href: "/work/globalbriz",
        category: "Platform",
      },
    ],
    uncertainty:
      "How should evidence be interpreted when the same observable behavior can result from different hidden causes?",
  },

  centralQuestion: {
    eyebrow: "The question behind the work",
    question:
      "How do we make better decisions when reality cannot be observed directly?",
    description:
      "Each project approaches this question from a different system, but the underlying problem remains similar: the thing that matters is often latent, while the available evidence is incomplete.",
    connections: [
      {
        label: "Credibility",
        system: "TechShortsApp",
        explanation:
          "Educational value is hidden, so the system reasons from uncertain behavioral evidence.",
        href: "/work/techshortsapp",
      },
      {
        label: "Learning",
        system: "Evidence of Learning",
        explanation:
          "Learning cannot be observed directly, so we look for evidence of changed capability.",
        href: "/frameworks/evidence-of-learning",
      },
      {
        label: "Understanding",
        system: "SUF",
        explanation:
          "Complete certainty is usually unavailable, but action still requires sufficient understanding.",
        href: "/frameworks/sufficient-understanding",
      },
      {
        label: "Physical systems",
        system: "TechXEng",
        explanation:
          "Visible motion is produced by hidden interactions, assumptions and constraints.",
        href: "/work/techxeng",
      },
    ],
  },

  featuredWork: projectCatalog
    .filter((project) => project.featured)
    .map((project, index) => ({
      index: String(index + 1).padStart(2, "0"),
      title: project.title,
      slug: project.slug,
      type: project.type,
      summary: project.summary,
      status: project.status,
      latestUpdate: project.currentDirection,
      href: `/work/${project.slug}`,
    })) satisfies FeaturedWork[],

  frameworks: frameworkCatalog.map((framework) => ({
    name: framework.title,
    shortName: framework.shortName,
    version: framework.version,
    question: framework.question,
    description: framework.summary,
    href: `/frameworks/${framework.slug}`,
  })) satisfies FrameworkSummary[],

  latestThinking: [
    {
      title: latestPublishedWriting.title,
      type: "Writing",
      description: latestPublishedWriting.excerpt,
      date:
        latestPublishedWriting.publishedAt ?? latestPublishedWriting.updatedAt,
      href: `/writing/${latestPublishedWriting.slug}`,
    },
    {
      title: latestPublishedMedia.title,
      type: "Video",
      description: latestPublishedMedia.summary,
      date: latestPublishedMedia.publishedAt ?? latestPublishedMedia.updatedAt,
      href: `/media/${latestPublishedMedia.slug}`,
    },
  ] satisfies ThinkingItem[],

  workMap: [
    {
      label: "Systems",
      description: "Products, platforms and engineering experiments.",
      items: [
        {
          name: "TechShortsApp",
          href: "/work/techshortsapp",
        },
        {
          name: "TechXEng",
          href: "/work/techxeng",
        },
        {
          name: "GlobalBriz",
          href: "/work/globalbriz",
        },
        {
          name: "Robotic Hand",
          href: "/work/robotic-hand",
        },
      ],
    },
    {
      label: "Frameworks",
      description: "Reusable models for reasoning and decision-making.",
      items: [
        {
          name: "SIGNAL",
          href: "/frameworks/signal",
        },
        {
          name: "Evidence of Learning",
          href: "/frameworks/evidence-of-learning",
        },
        {
          name: "Sufficient Understanding",
          href: "/frameworks/sufficient-understanding",
        },
      ],
    },
    {
      label: "Research",
      description: "Questions connecting evidence, learning and systems.",
      items: [
        {
          name: "Behavioral evidence",
          href: "/research?area=behavioral-evidence",
        },
        {
          name: "Learning and cognition",
          href: "/research?area=learning",
        },
        {
          name: "Engineering systems",
          href: "/research?area=engineering",
        },
        {
          name: "Latent uncertainty",
          href: "/research?area=uncertainty",
        },
      ],
    },
  ] satisfies WorkMapGroup[],
};
