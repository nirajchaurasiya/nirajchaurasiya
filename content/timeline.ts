import { frameworkCatalog } from "./frameworks";
import { mediaCatalog } from "./media";
import { projectCatalog } from "./projects";
import { researchCatalog } from "./research";
import { writingCatalog } from "./writing";

export const timelineEventTypes = [
  "Project",
  "Research",
  "Framework",
  "Writing",
  "Media",
  "Academic",
] as const;

export type TimelineEventType =
  (typeof timelineEventTypes)[number];

export type TimelineEvent = {
  id: string;
  date: string;
  type: TimelineEventType;
  title: string;
  description: string;
  href?: string;
  label?: string;
};

const manualEvents: TimelineEvent[] = [
  {
    id: "academic-arkansas-state-2024",
    date: "2024-08-01",
    type: "Academic",
    title: "Mechanical engineering at Arkansas State University",
    description:
      "Began studying mechanical engineering in the United States while continuing independent software development.",
    label: "Academic path",
  },
  {
    id: "asri-program-2026",
    date: "2026-05-28",
    type: "Academic",
    title: "ASRI Python research track",
    description:
      "Started an environmental data research project using EPA air-quality data and Python.",
    href: "/work/epa-air-quality",
    label: "Research program",
  },
];

const projectEvents: TimelineEvent[] =
  projectCatalog.flatMap((project) =>
    project.milestones.map((milestone, index) => ({
      id: `project-${project.slug}-${index}`,
      date: milestone.date,
      type: "Project",
      title: milestone.title,
      description: milestone.description,
      href: `/work/${project.slug}`,
      label: milestone.version ?? project.title,
    })),
  );

const researchEvents: TimelineEvent[] =
  researchCatalog.map((research) => ({
    id: `research-${research.slug}`,
    date: research.publishedAt ?? research.updatedAt,
    type: "Research",
    title: research.title,
    description:
      research.status === "Published"
        ? "Published as an independent public research essay."
        : research.abstract,
    href: `/research/${research.slug}`,
    label: research.status,
  }));

const frameworkEvents: TimelineEvent[] =
  frameworkCatalog.flatMap((framework) =>
    framework.versionHistory.map((version) => ({
      id: `framework-${framework.slug}-${version.version}`,
      date: version.date,
      type: "Framework",
      title: `${framework.title} ${version.version}`,
      description: version.summary,
      href: `/frameworks/${framework.slug}`,
      label: version.status,
    })),
  );

const writingEvents: TimelineEvent[] =
  writingCatalog
    .filter(
      (writing) =>
        writing.status === "Published" &&
        writing.publishedAt,
    )
    .map((writing) => ({
      id: `writing-${writing.slug}`,
      date: writing.publishedAt!,
      type: "Writing",
      title: writing.title,
      description: writing.excerpt,
      href: `/writing/${writing.slug}`,
      label: writing.category,
    }));

const mediaEvents: TimelineEvent[] =
  mediaCatalog
    .filter((media) => media.publishedAt)
    .map((media) => ({
      id: `media-${media.slug}`,
      date: media.publishedAt!,
      type: "Media",
      title: media.title,
      description: media.summary,
      href: `/media/${media.slug}`,
      label: media.type,
    }));

export const timelineCatalog = [
  ...manualEvents,
  ...projectEvents,
  ...researchEvents,
  ...frameworkEvents,
  ...writingEvents,
  ...mediaEvents,
].sort((a, b) => b.date.localeCompare(a.date));

export const timelineYears = Array.from(
  new Set(
    timelineCatalog.map((event) =>
      new Date(`${event.date}T00:00:00Z`)
        .getUTCFullYear()
        .toString(),
    ),
  ),
).sort((a, b) => Number(b) - Number(a));