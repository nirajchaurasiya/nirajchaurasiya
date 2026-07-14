export const writingCategories = [
  "Essay",
  "Reflection",
  "Research Note",
  "Technical Explanation",
  "Building Log",
  "Personal Philosophy",
] as const;

export const writingStatuses = ["Published", "Draft", "Archived"] as const;

export type WritingCategory = (typeof writingCategories)[number];

export type WritingStatus = (typeof writingStatuses)[number];

export type WritingRelationship = {
  title: string;
  description?: string;
  href: string;
};

export type WritingBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "quote";
      text: string;
      attribution?: string;
    }
  | {
      type: "list";
      style: "ordered" | "unordered";
      items: string[];
    }
  | {
      type: "callout";
      label: string;
      text: string;
    }
  | {
      type: "divider";
    };

export type WritingItem = {
  title: string;
  slug: string;

  excerpt: string;
  opening: string;

  category: WritingCategory;
  status: WritingStatus;

  publishedAt?: string;
  updatedAt: string;

  readingMinutes: number;
  featured: boolean;

  tags: string[];

  blocks: WritingBlock[];

  relatedProjects: WritingRelationship[];
  relatedResearch: WritingRelationship[];
  relatedFrameworks: WritingRelationship[];

  externalLinks: Array<{
    label: string;
    href: string;
  }>;
};

export const writingCatalog = [
  {
    title: "The Illusion of Learning",
    slug: "the-illusion-of-learning",

    excerpt:
      "Attention, familiarity, completion, and fluency can feel like learning without necessarily demonstrating that capability changed.",

    opening:
      "Two students can attend the same lecture, pay attention to the same professor, and leave with the same feeling: “I learned a lot today.” The difficult question is not whether they felt engaged. It is how they know learning occurred.",

    category: "Essay",
    status: "Published",

    publishedAt: "2026-07-10",
    updatedAt: "2026-07-14",

    readingMinutes: 7,
    featured: true,

    tags: ["Learning", "Evidence", "Cognition", "Uncertainty"],

    blocks: [
      {
        type: "heading",
        level: 2,
        text: "The feeling is real, but the conclusion may not be",
      },
      {
        type: "paragraph",
        text: "A lecture can feel productive. A book can feel profound. A course can feel clear. These experiences matter, but the feeling that learning occurred is not identical to evidence that learning occurred.",
      },
      {
        type: "paragraph",
        text: "Attention demonstrates exposure. Completion demonstrates that the material was reached. Familiarity demonstrates that the material feels recognizable. None of these independently proves that knowledge or capability changed.",
      },
      {
        type: "quote",
        text: "How do you know you are learning?",
      },
      {
        type: "heading",
        level: 2,
        text: "Learning is not directly visible",
      },
      {
        type: "paragraph",
        text: "Learning is inferred through changes in recall, performance, transfer, explanation, creation, or behavior. The process itself remains latent. We do not observe learning directly; we observe evidence that may support the claim that learning occurred.",
      },
      {
        type: "callout",
        label: "Central distinction",
        text: "The feeling of learning and evidence of learning may overlap, but they are not interchangeable.",
      },
      {
        type: "heading",
        level: 2,
        text: "What stronger evidence might look like",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Recall the idea without relying on the original material.",
          "Reproduce a process after seeing it demonstrated.",
          "Perform the task independently.",
          "Transfer the idea to a changed context.",
          "Teach the relationships and assumptions to another person.",
          "Create something that depends on the knowledge.",
          "Reflect on errors, limitations, and remaining uncertainty.",
        ],
      },
      {
        type: "paragraph",
        text: "No single form of evidence is perfect. Performance can be affected by context, anxiety, prior knowledge, available tools, and the type of learning involved. The goal is not to replace one illusion with another rigid score. The goal is to make our claims more careful.",
      },
      {
        type: "divider",
      },
      {
        type: "heading",
        level: 2,
        text: "A better question",
      },
      {
        type: "paragraph",
        text: "Instead of asking only, “Did I learn?”, we can ask, “What evidence supports the claim that learning occurred?” That question does not eliminate uncertainty. It makes the uncertainty productive.",
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "Explores whether digital behavior can provide evidence of educational value.",
        href: "/work/techshortsapp",
      },
      {
        title: "TechXEng",
        description:
          "Uses engineering projects to move from familiarity toward performance.",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        description:
          "The developing research and TEDx direction behind this essay.",
        href: "/research/illusion-of-learning",
      },
      {
        title: "Contextual Interpretation of Behavioral Signals",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    relatedFrameworks: [
      {
        title: "Evidence of Learning",
        href: "/frameworks/evidence-of-learning",
      },
      {
        title: "Sufficient Understanding Framework",
        href: "/frameworks/sufficient-understanding",
      },
    ],

    externalLinks: [],
  },

  {
    title: "The App Started Building Me",
    slug: "the-app-started-building-me",

    excerpt:
      "I thought I was building a software product. Somewhere between the bugs, failed assumptions, and rewritten systems, the product began changing the builder.",

    opening:
      "For more than a year, I thought the goal was simple: build the app. Write the code, fix the bugs, improve the system, and eventually arrive at the product I had imagined.",

    category: "Reflection",
    status: "Published",

    publishedAt: "2026-06-13",
    updatedAt: "2026-06-13",

    readingMinutes: 4,
    featured: true,

    tags: ["Building", "Software", "Learning", "TechShortsApp"],

    blocks: [
      {
        type: "paragraph",
        text: "I wrote code, fixed bugs, tested ideas, and rebuilt entire systems. Each version appeared to move the product forward. But the most important changes were not happening only inside the repository.",
      },
      {
        type: "heading",
        level: 2,
        text: "Every bug exposed an assumption",
      },
      {
        type: "paragraph",
        text: "A bug was rarely just a broken line of code. It often revealed something I had assumed about users, data, timing, architecture, or the behavior of the system.",
      },
      {
        type: "paragraph",
        text: "The code made those assumptions visible because reality refused to behave exactly as the model in my head expected.",
      },
      {
        type: "quote",
        text: "I thought I was building the app. The app was also building me.",
      },
      {
        type: "heading",
        level: 2,
        text: "Failure changed meaning",
      },
      {
        type: "paragraph",
        text: "A failed version stopped feeling like wasted effort. It became evidence about what I did not yet understand.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Bugs taught patience.",
          "Failed ideas taught humility.",
          "Rebuilding taught that attachment to a version can obstruct the system.",
          "Uncertainty taught me to separate confidence from truth.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "The product is not the only output",
      },
      {
        type: "paragraph",
        text: "A project produces code, interfaces, users, and documentation. It also produces judgment, habits, scars, questions, and a changed understanding of what building requires.",
      },
      {
        type: "callout",
        label: "What remained",
        text: "Even if the current product disappears, the epistemic scars and lessons will stay.",
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
    ],

    relatedFrameworks: [
      {
        title: "Sufficient Understanding Framework",
        href: "/frameworks/sufficient-understanding",
      },
      {
        title: "Evidence of Learning",
        href: "/frameworks/evidence-of-learning",
      },
    ],

    externalLinks: [],
  },

  {
    title: "Building Systems Under Uncertainty",
    slug: "building-systems-under-uncertainty",

    excerpt:
      "The systems I care about most are the ones where outcomes are uncertain, signals are noisy, and decisions still need to be made.",

    opening:
      "Uncertainty is often treated as something that should disappear before serious work begins. But nearly every meaningful system I have encountered requires action before complete certainty becomes available.",

    category: "Personal Philosophy",
    status: "Published",

    publishedAt: "2026-07-01",
    updatedAt: "2026-07-14",

    readingMinutes: 5,
    featured: true,

    tags: ["Systems", "Uncertainty", "Engineering", "Decision-Making"],

    blocks: [
      {
        type: "heading",
        level: 2,
        text: "The systems that interest me",
      },
      {
        type: "paragraph",
        text: "I am interested in systems where the true state cannot be directly observed, where available signals are incomplete, and where waiting for perfect knowledge would prevent action entirely.",
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "A learning platform attempting to estimate educational value.",
          "A student trying to determine whether learning occurred.",
          "An engineer deciding whether a model is sufficient to build.",
          "An immigrant evaluating fragmented community information.",
          "A physical system whose internal interactions are inferred through outputs.",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Uncertainty is not permission for carelessness",
      },
      {
        type: "paragraph",
        text: "Acknowledging uncertainty does not mean every claim is equally reasonable. Evidence can be weak or strong. Assumptions can be visible or hidden. Decisions can be reversible or irreversible. Consequences can be small or catastrophic.",
      },
      {
        type: "callout",
        label: "Working principle",
        text: "Act with understanding proportionate to the consequences, reversibility, and uncertainty of the decision.",
      },
      {
        type: "heading",
        level: 2,
        text: "Confidence should be earned",
      },
      {
        type: "paragraph",
        text: "A system should not become confident merely because it has a number. A model can produce precise outputs while depending on weak assumptions. Precision is not the same as justification.",
      },
      {
        type: "paragraph",
        text: "This is why my work repeatedly returns to evidence, context, system boundaries, latent variables, and the question of sufficient understanding.",
      },
      {
        type: "quote",
        text: "Decrease one uncertainty, open two upgraded uncertainties.",
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
      {
        title: "GlobalBriz",
        href: "/work/globalbriz",
      },
    ],

    relatedResearch: [
      {
        title: "Contextual Interpretation of Behavioral Signals",
        href: "/research/contextual-behavioral-signals",
      },
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
      {
        title: "Sufficient Understanding Framework",
        href: "/frameworks/sufficient-understanding",
      },
    ],

    externalLinks: [],
  },

  {
    title: "Not Building Feels Dishonest",
    slug: "not-building-feels-dishonest",

    excerpt:
      "I do not know whether the world will care about everything I build. I know that refusing to build what I genuinely see would feel dishonest.",

    opening:
      "There are days when I wonder whether anyone will care about the systems, essays, frameworks, or experiments I am building. That question can become heavy when the work is slow and the outcome remains invisible.",

    category: "Reflection",
    status: "Draft",

    updatedAt: "2026-07-14",

    readingMinutes: 4,
    featured: false,

    tags: ["Building", "Purpose", "Identity", "Long-Term Work"],

    blocks: [
      {
        type: "paragraph",
        text: "It is possible that some projects will fail. Some ideas may remain unnoticed. Some frameworks may require years of revision before they become useful to anyone beyond me.",
      },
      {
        type: "heading",
        level: 2,
        text: "Attention cannot be the only justification",
      },
      {
        type: "paragraph",
        text: "If attention becomes the only reason to build, then every quiet period begins to look like evidence that the work has no value.",
      },
      {
        type: "paragraph",
        text: "But meaningful work often begins before external recognition exists. The absence of attention is not proof that the question is unimportant.",
      },
      {
        type: "quote",
        text: "Not building feels dishonest to me.",
      },
      {
        type: "heading",
        level: 2,
        text: "The responsibility of seeing",
      },
      {
        type: "paragraph",
        text: "Once I clearly see a problem, an unexplored question, or a system that might be built better, ignoring it creates its own discomfort.",
      },
      {
        type: "paragraph",
        text: "This does not mean every idea deserves unlimited time. It means the decision to stop should come from evidence, priority, or changed understanding—not only from fear that nobody will care.",
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
      {
        title: "GlobalBriz",
        href: "/work/globalbriz",
      },
    ],

    relatedResearch: [],

    relatedFrameworks: [
      {
        title: "Sufficient Understanding Framework",
        href: "/frameworks/sufficient-understanding",
      },
    ],

    externalLinks: [],
  },
] satisfies WritingItem[];

export const publicWritingCatalog = writingCatalog.filter(
  (writing) => writing.status === "Published",
);

export function getWritingBySlug(slug: string) {
  return writingCatalog.find((writing) => writing.slug === slug);
}

export function getPublicWritingBySlug(slug: string) {
  return publicWritingCatalog.find((writing) => writing.slug === slug);
}
