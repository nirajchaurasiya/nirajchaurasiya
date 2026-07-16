import { archiveCatalog } from "./archive";
import { frameworkCatalog } from "./frameworks";
import { mediaCatalog } from "./media";
import { projectCatalog } from "./projects";
import { publicWritingCatalog } from "./writing";
import { researchCatalog } from "./research";
export const searchTypes = [
  "Page",
  "Project",
  "Research",
  "Framework",
  "Writing",
  "Book",
  "Media",
  "Archive",
] as const;

export type SearchType = (typeof searchTypes)[number];

export type SearchEntry = {
  id: string;
  type: SearchType;

  title: string;
  description: string;
  href: string;

  keywords: string[];
  date?: string;
  status?: string;
};

const staticPages: SearchEntry[] = [
  {
    id: "page-books",
    type: "Page",
    title: "Conversation Across Times",
    description:
      "Books, thinkers, questions, and intellectual conversations shaping Niraj Chaurasiya’s projects, research, frameworks, and understanding.",
    href: "/books",
    keywords: [
      "books",
      "reading",
      "conversation across times",
      "intellectual conversations",
      "reading reflections",
      "thinking",
      "authors",
      "ideas",
    ],
  },
  {
    id: "page-home",
    type: "Page",
    title: "Home",
    description:
      "An introduction to Niraj Chaurasiya's work across engineering, software, research, and systems under uncertainty.",
    href: "/",
    keywords: ["home", "niraj", "systems", "engineering", "software"],
  },
  {
    id: "page-work",
    type: "Page",
    title: "Work",
    description:
      "Software platforms, engineering systems, research projects, and experiments.",
    href: "/work",
    keywords: ["projects", "software", "engineering", "experiments"],
  },
  {
    id: "page-research",
    type: "Page",
    title: "Research",
    description:
      "Research into behavioral evidence, learning, engineering systems, and uncertainty.",
    href: "/research",
    keywords: ["research", "papers", "evidence", "learning"],
  },
  {
    id: "page-frameworks",
    type: "Page",
    title: "Frameworks",
    description:
      "SIGNAL, Evidence of Learning, and the Sufficient Understanding Framework.",
    href: "/frameworks",
    keywords: ["signal", "eol", "suf", "frameworks"],
  },
  {
    id: "page-writing",
    type: "Page",
    title: "Writing",
    description:
      "Essays, reflections, technical explanations, and building notes.",
    href: "/writing",
    keywords: ["writing", "essays", "reflections"],
  },
  {
    id: "page-about",
    type: "Page",
    title: "About Niraj",
    description:
      "Niraj's identity, academic path, thinking, principles, and long-term direction.",
    href: "/about",
    keywords: ["about", "niraj", "biography", "mechanical engineering"],
  },
  {
    id: "page-now",
    type: "Page",
    title: "Now",
    description:
      "What Niraj is currently building, researching, preparing, reading, and questioning.",
    href: "/now",
    keywords: ["now", "current", "focus", "reading"],
  },
  {
    id: "page-timeline",
    type: "Page",
    title: "Timeline",
    description:
      "A chronological record of projects, research, frameworks, writing, and media.",
    href: "/timeline",
    keywords: ["timeline", "history", "milestones"],
  },
  {
    id: "page-media",
    type: "Page",
    title: "Media",
    description:
      "Videos, talks, presentations, playlists, and short-form series.",
    href: "/media",
    keywords: ["media", "video", "talk", "presentation"],
  },
  {
    id: "page-archive",
    type: "Page",
    title: "Archive",
    description:
      "Deprecated versions, old prototypes, retired assumptions, and historical experiments.",
    href: "/archive",
    keywords: ["archive", "old versions", "deprecated", "failed experiments"],
  },
  {
    id: "page-contact",
    type: "Page",
    title: "Contact",
    description:
      "Contact Niraj about research, engineering, collaboration, speaking, or the projects.",
    href: "/contact",
    keywords: ["contact", "message", "collaboration"],
  },
];

const projectEntries: SearchEntry[] = projectCatalog.map((project) => ({
  id: `project-${project.slug}`,
  type: "Project",
  title: project.title,
  description: project.summary,
  href: `/work/${project.slug}`,
  keywords: [
    project.type,
    project.status,
    ...project.categories,
    ...project.disciplines,
    ...project.technologies,
    ...project.keyQuestions,
  ],
  date: project.updatedAt,
  status: project.status,
}));

const researchEntries: SearchEntry[] = researchCatalog.map((research) => ({
  id: `research-${research.slug}`,
  type: "Research",
  title: research.title,
  description: research.abstract,
  href: `/research/${research.slug}`,
  keywords: [
    research.question,
    research.centralClaim,
    research.kind,
    research.status,
    ...research.areas,
    ...research.openQuestions,
  ],
  date: research.publishedAt ?? research.updatedAt,
  status: research.status,
}));

const frameworkEntries: SearchEntry[] = frameworkCatalog.map((framework) => ({
  id: `framework-${framework.slug}`,
  type: "Framework",
  title: framework.title,
  description: framework.summary,
  href: `/frameworks/${framework.slug}`,
  keywords: [
    framework.shortName,
    framework.question,
    framework.category,
    framework.version,
    ...framework.principles,
    ...framework.components.flatMap((component) => [
      component.key,
      component.title,
      component.description,
    ]),
  ],
  date: framework.updatedAt,
  status: framework.status,
}));

const writingEntries: SearchEntry[] = publicWritingCatalog.map((writing) => ({
  id: `writing-${writing.slug}`,
  type: "Writing",
  title: writing.title,
  description: writing.excerpt,
  href: `/writing/${writing.slug}`,
  keywords: [writing.category, ...writing.tags, writing.opening],
  date: writing.publishedAt ?? writing.updatedAt,
  status: writing.status,
}));

const mediaEntries: SearchEntry[] = mediaCatalog.map((media) => ({
  id: `media-${media.slug}`,
  type: "Media",
  title: media.title,
  description: media.summary,
  href: `/media/${media.slug}`,
  keywords: [media.type, media.status, media.platform],
  date: media.publishedAt ?? media.updatedAt,
  status: media.status,
}));

const archiveEntries: SearchEntry[] = archiveCatalog.map((archive) => ({
  id: `archive-${archive.slug}`,
  type: "Archive",
  title: archive.title,
  description: archive.summary,
  href: `/archive/${archive.slug}`,
  keywords: [
    archive.type,
    archive.originalPeriod,
    archive.reason,
    ...archive.lessons,
  ],
  date: archive.archivedAt,
  status: "Archived",
}));

export const searchCatalog: SearchEntry[] = [
  ...staticPages,
  ...projectEntries,
  ...researchEntries,
  ...frameworkEntries,
  ...writingEntries,
  ...mediaEntries,
  ...archiveEntries,
];
