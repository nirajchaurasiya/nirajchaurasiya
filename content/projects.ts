export const projectStatuses = [
  "Active",
  "Developing",
  "Researching",
  "Archived",
] as const;

export const projectCategories = [
  "Software",
  "Engineering",
  "Research Systems",
  "Community Platforms",
  "Experiments",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectCategory = (typeof projectCategories)[number];

export type RelatedItem = {
  title: string;
  description?: string;
  href: string;
};

export type ProjectMilestone = {
  date: string;
  title: string;
  description: string;
  version?: string;
};

export type ProjectExternalLink = {
  label: string;
  href: string;
  type: "Website" | "Repository" | "Documentation" | "Video" | "Publication";
};

export type Project = {
  title: string;
  shortName: string;
  slug: string;
  type: string;
  summary: string;
  description: string;

  status: ProjectStatus;
  featured: boolean;

  startDate: string;
  updatedAt: string;

  categories: ProjectCategory[];
  disciplines: string[];
  technologies: string[];

  currentDirection: string;
  centralQuestion: string;

  problem: string;
  whyItMatters: string;

  currentSystem: string[];
  keyQuestions: string[];

  understandings: string[];
  uncertainties: string[];

  milestones: ProjectMilestone[];

  relatedResearch: RelatedItem[];
  relatedFrameworks: RelatedItem[];
  relatedMedia: RelatedItem[];

  externalLinks: ProjectExternalLink[];
};

export const projectCatalog = [
  {
    title: "TechShortsApp",
    shortName: "TSA",
    slug: "techshortsapp",
    type: "Credibility-first learning platform",

    summary:
      "A research-driven short-form learning platform that interprets behavioral evidence instead of treating engagement as truth.",

    description:
      "TechShortsApp explores how technical learning content might be ranked when educational value and truth cannot be observed directly. The system uses uncertain behavioral signals to estimate confidence rather than claiming to identify truth itself.",

    status: "Active",
    featured: true,

    startDate: "2025-03-01",
    updatedAt: "2026-07-14",

    categories: ["Software", "Research Systems"],
    disciplines: [
      "Recommendation systems",
      "Behavioral evidence",
      "Learning science",
      "Epistemic system design",
    ],

    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Cloudflare R2",
      "TypeScript",
    ],

    currentDirection:
      "Studying how the meaning of behavioral signals changes across learning domains and contexts.",

    centralQuestion:
      "What can behavioral traces reasonably tell us about educational value when truth and learning remain latent?",

    problem:
      "Most short-form platforms optimize for engagement. Watch time, likes, replays, and follows are often interpreted as evidence that content is valuable. However, engagement can result from entertainment, confusion, controversy, familiarity, or genuine learning.",

    whyItMatters:
      "When engagement is confused with credibility, systems can confidently amplify content without knowing whether it is accurate, useful, or educational. A learning platform therefore needs a more careful relationship between observable behavior and hidden value.",

    currentSystem: [
      "Watch ratio and replay are interpreted as implicit behavioral evidence.",
      "Bookmarks represent possible revisit intention.",
      "Helpful provides explicit usefulness feedback after sufficient exposure.",
      "Follow represents creator affinity rather than direct proof of video quality.",
      "Posterior confidence, uncertainty penalties, and time decay influence ranking.",
      "Different domains use different evidence-decay periods.",
    ],

    keyQuestions: [
      "Does the same watch ratio mean the same thing in mathematics and software engineering?",
      "How should explicit and implicit signals be weighted?",
      "When does replay indicate usefulness, and when does it indicate confusion?",
      "Should creator-level evidence be separated from video-level evidence?",
      "How should uncertainty be communicated to users?",
    ],

    understandings: [
      "Engagement is an observable trace, not proof of credibility.",
      "Behavioral signals gain meaning only after assumptions are introduced.",
      "Explicit and implicit evidence should not automatically be treated as equivalent.",
      "A ranking system can estimate confidence without claiming to rank truth.",
    ],

    uncertainties: [
      "How domain-specific should the ranking model become?",
      "How much historical behavior is needed before personalization becomes meaningful?",
      "What evidence distinguishes confusion-driven replay from learning-driven replay?",
      "How should contradictory signals be reconciled?",
    ],

    milestones: [
      {
        date: "2025-03-01",
        title: "Initial platform exploration",
        description:
          "Started building a short-form platform for technical learning content.",
      },
      {
        date: "2026-05-18",
        title: "Engagement Is Not Evidence",
        description:
          "Published the first research paper establishing the distinction between engagement and epistemic evidence.",
      },
      {
        date: "2026-05-20",
        title: "TechShortsApp v2.3",
        version: "v2.3",
        description:
          "Introduced Helpful and Follow alongside watch ratio, replay, and bookmarks.",
      },
      {
        date: "2026-05-26",
        title: "Signal contribution paper",
        description:
          "Published an exploration of how much credibility each signal should contribute.",
      },
      {
        date: "2026-07-14",
        title: "Context-dependent signal research",
        description:
          "Began formalizing how domain and learning context alter the meaning of behavioral traces.",
      },
    ],

    relatedResearch: [
      {
        title: "Engagement Is Not Evidence",
        description:
          "Why observable engagement should not be confused with educational credibility.",
        href: "/research/engagement-is-not-evidence",
      },
      {
        title: "How Much Credibility Should Each Signal Contribute?",
        description:
          "An exploration of evidence strength across different platform signals.",
        href: "/research/signal-contribution",
      },
      {
        title: "Contextual Interpretation of Behavioral Signals",
        description:
          "Current research into domain-dependent signal meaning.",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        description:
          "Used to separate system inputs, interactions, outputs, assumptions, and uncertainty.",
        href: "/frameworks/signal",
      },
      {
        title: "Evidence of Learning",
        description:
          "Provides a model for thinking about evidence of changed capability.",
        href: "/frameworks/evidence-of-learning",
      },
    ],

    relatedMedia: [
      {
        title: "TechShortsApp development archive",
        description:
          "Videos and explanations documenting the platform's development.",
        href: "/media?project=techshortsapp",
      },
    ],

    externalLinks: [
      {
        label: "Visit TechShortsApp",
        href: "https://techshortsapp.com",
        type: "Website",
      },
      {
        label: "Read the documentation",
        href: "https://docs.techshortsapp.com",
        type: "Documentation",
      },
    ],
  },

  {
    title: "TechXEng",
    shortName: "TXE",
    slug: "techxeng",
    type: "Engineering and systems-thinking laboratory",

    summary:
      "A public engineering laboratory exploring mechanics, robotics, software, and system behavior through first-principles reasoning.",

    description:
      "TechXEng documents the process of moving from memorized equations toward system-level understanding. It combines engineering experiments, technical communication, robotics development, and the study of uncertainty.",

    status: "Active",
    featured: true,

    startDate: "2026-03-01",
    updatedAt: "2026-07-12",

    categories: ["Engineering", "Research Systems"],
    disciplines: [
      "Mechanical systems",
      "Robotics",
      "Systems thinking",
      "Engineering communication",
    ],

    technologies: [
      "SolidWorks",
      "Arduino",
      "MATLAB",
      "Next.js",
      "Physical prototyping",
    ],

    currentDirection:
      "Building a human-like robotic hand while developing a structured pathway from CAD to control systems.",

    centralQuestion:
      "How can engineering concepts be understood as interacting systems rather than isolated formulas?",

    problem:
      "Engineering education can reward formula recall and software operation without requiring learners to understand system boundaries, governing interactions, assumptions, or uncertainty.",

    whyItMatters:
      "Engineers make decisions in physical systems where incomplete understanding has real consequences. Technical competence requires more than obtaining the correct numerical output.",

    currentSystem: [
      "Engineering concepts are explained through complete system boundaries.",
      "Inputs, governing interactions, outputs, and assumptions are identified.",
      "Physical projects are used to test whether conceptual understanding transfers.",
      "Mistakes and design revisions are documented as part of the learning process.",
      "Videos connect mathematical representations to physical behavior.",
    ],

    keyQuestions: [
      "What does it mean to understand an engineering system?",
      "How should assumptions be made visible?",
      "When is a model sufficiently accurate for action?",
      "How can failed prototypes become evidence of learning?",
    ],

    understandings: [
      "A correct answer does not necessarily demonstrate system understanding.",
      "Design intent matters because models must survive parameter changes.",
      "Physical behavior emerges from interactions, not isolated components.",
      "Uncertainty should remain visible during engineering explanation.",
    ],

    uncertainties: [
      "How should the engineering learning pathway be sequenced?",
      "How much mathematical depth should each public explanation contain?",
      "How should physical experiments be evaluated as evidence of understanding?",
    ],

    milestones: [
      {
        date: "2026-03-01",
        title: "TechXEng launched",
        description:
          "Started publishing engineering and systems-thinking explorations.",
      },
      {
        date: "2026-03-15",
        title: "What Is a System?",
        description:
          "Published an early explanation of systems, boundaries, inputs, interactions, and outputs.",
      },
      {
        date: "2026-05-21",
        title: "Robotic hand series launched",
        description:
          "Started documenting the attempt to build a human-like robotic hand.",
      },
      {
        date: "2026-06-15",
        title: "Parametric design progress",
        description:
          "Moved from underdefined sketches toward fully defined links and design intent.",
      },
    ],

    relatedResearch: [
      {
        title: "Engineering systems under uncertainty",
        description:
          "Research and notes connecting system abstraction to engineering decisions.",
        href: "/research?area=engineering",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        description:
          "The primary framework used to examine engineering systems.",
        href: "/frameworks/signal",
      },
      {
        title: "Sufficient Understanding Framework",
        description:
          "Used to reason about when understanding is sufficient to build.",
        href: "/frameworks/sufficient-understanding",
      },
    ],

    relatedMedia: [
      {
        title: "Robotic hand video series",
        description:
          "The public development journey from CAD toward a physical robotic system.",
        href: "/media/robotic-hand",
      },
    ],

    externalLinks: [
      {
        label: "Visit TechXEng",
        href: "https://techxeng.com",
        type: "Website",
      },
      {
        label: "Watch TechXEng",
        href: "https://www.youtube.com/@TechXEng",
        type: "Video",
      },
    ],
  },

  {
    title: "GlobalBriz",
    shortName: "GB",
    slug: "globalbriz",
    type: "Immigrant information and community platform",

    summary:
      "A platform intended to make immigrant life easier, safer, and more connected through practical information and community knowledge.",

    description:
      "GlobalBriz explores how community, housing, cultural guidance, practical resources, and moderation can be combined into a reliable support platform for immigrants.",

    status: "Developing",
    featured: true,

    startDate: "2026-06-06",
    updatedAt: "2026-07-13",

    categories: ["Software", "Community Platforms"],
    disciplines: [
      "Community systems",
      "Information architecture",
      "Moderation",
      "Immigrant support",
    ],

    technologies: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Custom CSS",
      "REST APIs",
    ],

    currentDirection:
      "Connecting community questions, housing, moderation, guides, and practical resources into one coherent platform.",

    centralQuestion:
      "How can fragmented immigrant knowledge become accessible without sacrificing context, safety, or trust?",

    problem:
      "Immigrants often depend on scattered social posts, private conversations, outdated websites, and informal advice for decisions involving housing, employment, education, documents, and community life.",

    whyItMatters:
      "Information gaps create avoidable uncertainty and can expose people to scams, unsafe housing, misinformation, or isolation. A useful platform must provide access while preserving context and moderation.",

    currentSystem: [
      "Community questions and answers are connected to backend APIs.",
      "Housing posts can be submitted and moderated.",
      "Guides and resources organize practical information.",
      "Administrative moderation supports content review.",
      "Desktop sidebar and mobile bottom navigation provide responsive access.",
      "Light, dark, and system themes are supported.",
    ],

    keyQuestions: [
      "How should community answers be verified or contextualized?",
      "What information is universal, and what depends on location or visa status?",
      "How can harmful housing or job posts be detected?",
      "How should reputation work without creating popularity bias?",
    ],

    understandings: [
      "Immigrant information is highly context-dependent.",
      "Community knowledge requires moderation and traceability.",
      "Navigation must reflect practical user needs rather than internal product categories.",
      "Trust cannot be created through visual polish alone.",
    ],

    uncertainties: [
      "Which module should become the primary entry point?",
      "How should location-dependent guidance be maintained?",
      "What moderation model can scale with a small team?",
      "How should community contributors establish credibility?",
    ],

    milestones: [
      {
        date: "2026-06-06",
        title: "GlobalBriz exploration began",
        description:
          "Started exploring a unified immigrant-support platform.",
      },
      {
        date: "2026-07-01",
        title: "Initial information architecture",
        description:
          "Defined community, housing, guides, resources, jobs, and support modules.",
      },
      {
        date: "2026-07-13",
        title: "GlobalBriz v0.2",
        version: "v0.2",
        description:
          "Completed a major redesign and connected community, housing, answers, and moderation systems.",
      },
    ],

    relatedResearch: [
      {
        title: "Trust in community information systems",
        description:
          "Future research into credibility, moderation, and context-dependent guidance.",
        href: "/research?area=information-systems",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        description:
          "Used to analyze community inputs, moderation interactions, outputs, and uncertainty.",
        href: "/frameworks/signal",
      },
    ],

    relatedMedia: [
      {
        title: "GlobalBriz development updates",
        description:
          "Design and product-development records.",
        href: "/media?project=globalbriz",
      },
    ],

    externalLinks: [
      {
        label: "Visit GlobalBriz",
        href: "https://globalbriz.com",
        type: "Website",
      },
    ],
  },

  {
    title: "Human-Like Robotic Hand",
    shortName: "RH",
    slug: "robotic-hand",
    type: "Robotics learning and prototyping project",

    summary:
      "A long-term attempt to understand robotics by designing and building a human-like robotic hand from first principles.",

    description:
      "The robotic hand is both an engineering project and a learning system. It connects CAD, mechanical linkages, actuation, electronics, sensing, control, and physical experimentation.",

    status: "Active",
    featured: false,

    startDate: "2026-05-21",
    updatedAt: "2026-07-12",

    categories: ["Engineering", "Experiments"],
    disciplines: [
      "Mechanical design",
      "Robotics",
      "Control systems",
      "Physical prototyping",
    ],

    technologies: ["SolidWorks", "Arduino", "CAD assemblies", "3D printing"],

    currentDirection:
      "Designing finger links and assemblies before introducing actuation, electronics, and control.",

    centralQuestion:
      "What knowledge becomes necessary when a human biological structure is translated into an engineered mechanical system?",

    problem:
      "A robotic hand appears familiar from the outside, but recreating its motion requires decisions about joints, links, actuation, force, sensing, control, constraints, and manufacturability.",

    whyItMatters:
      "The project creates a concrete environment where fragmented knowledge must become integrated engineering capability.",

    currentSystem: [
      "Finger links are modeled parametrically in SolidWorks.",
      "Hole positions preserve geometric relationships when dimensions change.",
      "Sketches are fully defined before extrusion.",
      "Assemblies are used to study link relationships and motion.",
      "The project will later expand toward Arduino and control systems.",
    ],

    keyQuestions: [
      "How many degrees of freedom are practically necessary?",
      "What actuation method should be used?",
      "How should tendon-like motion be represented mechanically?",
      "What sensing is required for useful grasping?",
    ],

    understandings: [
      "A sketch must encode design intent, not only visual shape.",
      "Parametric relationships reduce failure during design changes.",
      "A finger must be understood as a linkage system.",
      "Mechanical geometry constrains future control possibilities.",
    ],

    uncertainties: [
      "The final actuation method remains undecided.",
      "The required balance between human likeness and mechanical simplicity is unclear.",
      "The sensing and control architecture has not yet been selected.",
    ],

    milestones: [
      {
        date: "2026-05-21",
        title: "Episode 1",
        description:
          "Started the public attempt to build a human-like robotic hand.",
      },
      {
        date: "2026-06-01",
        title: "SolidWorks fundamentals",
        description:
          "Developed the first fully defined parametric finger-link sketch.",
      },
      {
        date: "2026-06-12",
        title: "First 3D link",
        description:
          "Moved the design from a two-dimensional sketch into a three-dimensional component.",
      },
      {
        date: "2026-07-12",
        title: "Assembly exploration",
        description:
          "Began examining how separate links behave when assembled.",
      },
    ],

    relatedResearch: [
      {
        title: "Learning through physical system construction",
        href: "/research?area=learning",
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

    relatedMedia: [
      {
        title: "Robotic Hand Playlist",
        description:
          "The complete public video development series.",
        href: "https://www.youtube.com/playlist?list=PLOrDwx3YJxLobczHWNZPG7iyWNCJ3wDEr",
      },
    ],

    externalLinks: [
      {
        label: "Watch the playlist",
        href: "https://www.youtube.com/playlist?list=PLOrDwx3YJxLobczHWNZPG7iyWNCJ3wDEr",
        type: "Video",
      },
    ],
  },

  {
    title: "EPA Air-Quality Exploration",
    shortName: "EPA",
    slug: "epa-air-quality",
    type: "Data and environmental research project",

    summary:
      "An exploration of air-quality data and the difference between monitoring a system and modeling its behavior.",

    description:
      "This research project used Python and EPA air-quality data to examine what changes when data collection is extended from monitoring toward explanatory or predictive modeling.",

    status: "Researching",
    featured: false,

    startDate: "2026-05-28",
    updatedAt: "2026-06-17",

    categories: ["Research Systems", "Experiments"],
    disciplines: [
      "Environmental data",
      "Python",
      "Data analysis",
      "Research methods",
    ],

    technologies: ["Python", "Pandas", "Matplotlib", "EPA datasets"],

    currentDirection:
      "Translating the distinction between monitoring and modeling into a broader systems-research question.",

    centralQuestion:
      "What additional assumptions are introduced when a system moves from being monitored to being modeled?",

    problem:
      "Monitoring can describe observed conditions, while modeling attempts to explain, estimate, or predict behavior. These activities require different assumptions and support different claims.",

    whyItMatters:
      "Confusing observation with explanation can lead researchers to make claims that exceed the evidence available in the data.",

    currentSystem: [
      "EPA air-quality measurements provide the observational data.",
      "Python is used for cleaning, organizing, and visualizing data.",
      "Monitoring and modeling are treated as different epistemic activities.",
      "Assumptions are examined before explanatory claims are made.",
    ],

    keyQuestions: [
      "What can monitoring establish without a model?",
      "What assumptions does modeling introduce?",
      "How should missing or uneven measurements be interpreted?",
    ],

    understandings: [
      "A dataset does not explain itself.",
      "Monitoring and modeling support different kinds of conclusions.",
      "Visualization can reveal patterns without establishing causality.",
    ],

    uncertainties: [
      "How much environmental context is required for meaningful modeling?",
      "Which variables are necessary for causal interpretation?",
    ],

    milestones: [
      {
        date: "2026-05-28",
        title: "Research program began",
        description:
          "Started the ASRI Python and environmental data research track.",
      },
      {
        date: "2026-06-15",
        title: "Research presentation",
        description:
          "Presented the distinction between Monitor Only and Monitor and Model.",
      },
      {
        date: "2026-06-17",
        title: "Research reflection",
        description:
          "Documented the research process and methodological lessons.",
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

    relatedMedia: [
      {
        title: "ASRI research presentation",
        href: "/media/asri-air-quality",
      },
    ],

    externalLinks: [],
  },

  {
    title: "Hydrogen Turbine Research",
    shortName: "HT",
    slug: "hydrogen-turbine",
    type: "Mechanical and energy-system research",

    summary:
      "An engineering exploration of hydrogen combustion, turbocharger-based turbine systems, energy flow, and safety constraints.",

    description:
      "This project examines how hydrogen behaves inside a small gas-turbine or turbocharger-based system, including combustion zones, energy transfer, material constraints, and operational safety.",

    status: "Researching",
    featured: false,

    startDate: "2026-02-01",
    updatedAt: "2026-06-01",

    categories: ["Engineering", "Research Systems"],
    disciplines: [
      "Thermodynamics",
      "Fluid mechanics",
      "Combustion",
      "Turbomachinery",
    ],

    technologies: [
      "Gas turbines",
      "Turbochargers",
      "Hydrogen systems",
      "Engineering modeling",
    ],

    currentDirection:
      "Developing a clearer system model of combustion, pressure, temperature, turbine work, and safety boundaries.",

    centralQuestion:
      "How does replacing conventional fuel with hydrogen alter the behavior and constraints of a small turbine system?",

    problem:
      "Hydrogen differs from conventional fuels in flame speed, ignition behavior, storage, emissions, and safety. These differences affect more than the combustor alone.",

    whyItMatters:
      "A fuel substitution can change interactions across an entire energy system. Safe design requires examining the complete system rather than a single component.",

    currentSystem: [
      "Hydrogen enters a combustor and mixes with compressed air.",
      "Combustion changes temperature, pressure, and mass-flow conditions.",
      "Hot gases transfer energy through the turbine.",
      "Turbine work drives the compressor through the shaft.",
      "Safety constraints influence storage, mixing, ignition, and shutdown.",
    ],

    keyQuestions: [
      "How should hydrogen-air mixing be controlled?",
      "What combustion-zone geometry is required?",
      "How do flame speed and temperature affect materials?",
      "What failure modes become more important with hydrogen?",
    ],

    understandings: [
      "Fuel substitution affects the whole turbine system.",
      "Combustion behavior influences downstream mechanical performance.",
      "Safety must be modeled as a system constraint, not a final checklist.",
    ],

    uncertainties: [
      "The final combustor geometry is unresolved.",
      "Experimental operating conditions remain uncertain.",
      "Material and instrumentation requirements require further investigation.",
    ],

    milestones: [
      {
        date: "2026-02-01",
        title: "System exploration began",
        description:
          "Started studying hydrogen use in a turbocharger-based turbine system.",
      },
      {
        date: "2026-04-01",
        title: "Combustor-zone analysis",
        description:
          "Examined primary, secondary, and dilution-zone functions.",
      },
      {
        date: "2026-06-01",
        title: "Energy-flow model",
        description:
          "Connected combustion behavior to turbine work and compressor operation.",
      },
    ],

    relatedResearch: [
      {
        title: "Hydrogen combustion in small turbine systems",
        href: "/research/hydrogen-turbine",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],

    relatedMedia: [],

    externalLinks: [],
  },
] satisfies Project[];

export function getProjectBySlug(slug: string) {
  return projectCatalog.find((project) => project.slug === slug);
}