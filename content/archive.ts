export const archiveTypes = [
  "Project Version",
  "Framework Version",
  "Prototype",
  "Experiment",
] as const;

export type ArchiveType = (typeof archiveTypes)[number];

export type ArchiveRelationship = {
  title: string;
  href: string;
};

export type ArchiveItem = {
  title: string;
  slug: string;
  type: ArchiveType;

  archivedAt: string;
  originalPeriod: string;

  summary: string;
  reason: string;

  whatItWas: string[];
  whatChanged: string[];
  lessons: string[];

  replacedBy?: ArchiveRelationship;
  relatedItems: ArchiveRelationship[];
};

export const archiveCatalog = [
  {
    title: "TechShortsApp v1.0",
    slug: "techshortsapp-v1",

    type: "Project Version",

    archivedAt: "2026-05-01",
    originalPeriod: "2025–2026",

    summary:
      "The first major version of TechShortsApp before the platform became explicitly credibility-first.",

    reason:
      "The version no longer represented the deeper research question emerging around evidence, confidence, and latent truth.",

    whatItWas: [
      "A short-form technical learning platform.",
      "A product architecture focused primarily on content delivery.",
      "An earlier ranking and interface model.",
    ],

    whatChanged: [
      "The platform moved from engagement-oriented product logic toward epistemic system design.",
      "Behavioral actions were reinterpreted as uncertain evidence.",
      "Research papers and explicit confidence modeling became part of the system.",
    ],

    lessons: [
      "A product can outgrow the problem it was originally designed to solve.",
      "A working interface does not guarantee that the underlying objective is correct.",
      "Version changes should reflect changes in understanding, not only visual redesign.",
    ],

    replacedBy: {
      title: "TechShortsApp",
      href: "/work/techshortsapp",
    },

    relatedItems: [
      {
        title: "Engagement Is Not Evidence",
        href: "/research/engagement-is-not-evidence",
      },
    ],
  },

  {
    title: "Skip Penalty Ranking Assumption",
    slug: "techshortsapp-skip-penalty",

    type: "Experiment",

    archivedAt: "2026-05-20",
    originalPeriod: "TechShortsApp v2.0–v2.1",

    summary:
      "An earlier assumption that skipping a video should directly reduce its credibility score.",

    reason:
      "Skipping has too many plausible causes to function as a reliable direct negative credibility signal.",

    whatItWas: [
      "A ranking penalty connected to early exit or skipping.",
      "An attempt to treat low exposure as negative evidence.",
    ],

    whatChanged: [
      "The direct skip penalty was removed.",
      "Watch behavior became contextual evidence rather than automatic punishment.",
      "The model retained uncertainty about why a user exited.",
    ],

    lessons: [
      "Absence of engagement is not automatically evidence of poor quality.",
      "Prior knowledge, irrelevance, time constraints, and interface behavior can all create the same trace.",
      "Negative evidence requires as much justification as positive evidence.",
    ],

    replacedBy: {
      title: "Contextual Behavioral Signals",
      href: "/research/contextual-behavioral-signals",
    },

    relatedItems: [
      {
        title: "TechShortsApp",
        href: "/work/techshortsapp",
      },
    ],
  },

  {
    title: "Evidence of Learning v1.0",
    slug: "evidence-of-learning-v1",

    type: "Framework Version",

    archivedAt: "2026-06-20",
    originalPeriod: "June 2026",

    summary:
      "The first version of the Evidence of Learning framework before Recall and Reflection were made explicit.",

    reason:
      "The original Observation stage did not adequately distinguish exposure, recognition, recall, and reflective evaluation.",

    whatItWas: [
      "Observation",
      "Imitation",
      "Independent Performance",
      "Transfer",
      "Teach",
      "Create",
    ],

    whatChanged: [
      "Recall became an explicit category.",
      "Reflection was added to represent metacognition, limitations, and uncertainty.",
      "Observation was removed as a sufficient evidence category.",
    ],

    lessons: [
      "Seeing a behavior is not the same as identifying what capability produced it.",
      "Reflection should preserve uncertainty rather than merely summarize success.",
      "Framework revisions should expose earlier limitations.",
    ],

    replacedBy: {
      title: "Evidence of Learning v1.1",
      href: "/frameworks/evidence-of-learning",
    },

    relatedItems: [
      {
        title: "The Illusion of Learning",
        href: "/research/illusion-of-learning",
      },
    ],
  },

  {
    title: "First Robotic Finger Geometry",
    slug: "robotic-finger-first-geometry",

    type: "Prototype",

    archivedAt: "2026-06-10",
    originalPeriod: "Robotic Hand early CAD phase",

    summary:
      "An early finger-link configuration whose assembled geometry produced an unintended cobra-like shape.",

    reason:
      "The geometry did not represent the intended finger motion, but it exposed missing understanding about link relationships and assembly constraints.",

    whatItWas: [
      "An early multi-link finger assembly.",
      "A geometry-first attempt before the movement relationships were sufficiently understood.",
    ],

    whatChanged: [
      "Greater attention was placed on design intent and geometric relationships.",
      "The finger began being treated as a linkage system rather than a collection of visually similar parts.",
    ],

    lessons: [
      "A model can look plausible as isolated parts and still fail as an assembled system.",
      "Unexpected geometry is evidence about relationships, not merely a visual mistake.",
      "Physical systems punish vague assumptions quickly.",
    ],

    replacedBy: {
      title: "Human-Like Robotic Hand",
      href: "/media/creating-our-first-link",
    },

    relatedItems: [
      {
        title: "Robotic Hand Playlist",
        href: "/media/creating-our-first-link",
      },
    ],
  },
] satisfies ArchiveItem[];

export function getArchiveBySlug(slug: string) {
  return archiveCatalog.find((item) => item.slug === slug);
}
