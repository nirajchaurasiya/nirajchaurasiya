export const researchStatuses = [
  "Published",
  "In Progress",
  "Developing",
  "Completed",
  "Exploratory",
] as const;

export const researchAreas = [
  "Behavioral Evidence",
  "Learning & Cognition",
  "Engineering Systems",
  "Information Systems",
  "Research Methods",
] as const;

export const researchKinds = [
  "Independent Research Essay",
  "Framework Paper",
  "Research Project",
  "Research Note",
  "Talk Development",
] as const;

export type ResearchStatus = (typeof researchStatuses)[number];
export type ResearchArea = (typeof researchAreas)[number];
export type ResearchKind = (typeof researchKinds)[number];

export type ResearchRelationship = {
  title: string;
  description?: string;
  href: string;
};

export type ResearchSection = {
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type ResearchReference = {
  author: string;
  title: string;
  year?: string;
  href?: string;
};

export type ResearchItem = {
  title: string;
  shortTitle: string;
  slug: string;

  question: string;
  abstract: string;

  status: ResearchStatus;
  kind: ResearchKind;
  areas: ResearchArea[];

  publishedAt?: string;
  updatedAt: string;

  publicationNote: string;
  peerReviewed: boolean;

  centralClaim: string;
  motivation: string;

  methods: string[];
  evidence: string[];
  limitations: string[];
  openQuestions: string[];

  sections: ResearchSection[];

  relatedProjects: ResearchRelationship[];
  relatedFrameworks: ResearchRelationship[];
  relatedResearch: ResearchRelationship[];

  references: ResearchReference[];

  externalLinks: Array<{
    label: string;
    href: string;
  }>;
};

export const researchCatalog = [
  {
    title: "Engagement Is Not Evidence",
    shortTitle: "Engagement Is Not Evidence",
    slug: "engagement-is-not-evidence",

    question:
      "Can engagement signals establish that technical content is credible or educationally valuable?",

    abstract:
      "This essay examines the gap between observable engagement and hidden educational value. It argues that watch time, replay, likes, bookmarks, and similar behaviors are traces produced by multiple possible causes and therefore should not be treated as direct proof of credibility.",

    status: "Published",
    kind: "Independent Research Essay",
    areas: ["Behavioral Evidence", "Information Systems"],

    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",

    publicationNote:
      "Publicly published independent research essay. It has not undergone formal academic peer review.",

    peerReviewed: false,

    centralClaim:
      "Engagement may provide evidence about user behavior, but it does not independently establish truth, credibility, or learning.",

    motivation:
      "Recommendation systems frequently optimize measurable engagement because it is readily available. The danger begins when systems interpret those measurements as though they directly represent usefulness or truth.",

    methods: [
      "Conceptual analysis of common engagement signals.",
      "Separation of directly observed behavior from inferred educational value.",
      "Comparison of alternative hidden causes for the same behavioral trace.",
      "Analysis of assumptions introduced during ranking.",
    ],

    evidence: [
      "The same watch duration can result from interest, confusion, entertainment, or genuine learning.",
      "Replay can indicate usefulness, difficulty, poor explanation, or accidental repetition.",
      "Bookmarks can represent revisit intention without proving that a revisit or learning occurred.",
      "Explicit feedback provides stronger intentional evidence but remains dependent on the user's judgment.",
    ],

    limitations: [
      "The paper is primarily conceptual rather than based on a controlled experiment.",
      "It does not yet estimate the empirical reliability of individual signals.",
      "The examples focus on short-form technical learning systems.",
      "The proposed distinctions require validation across domains and learner groups.",
    ],

    openQuestions: [
      "Which signals remain useful after engagement is separated from credibility?",
      "How can systems represent confidence without overstating certainty?",
      "How should conflicting behavioral evidence be combined?",
      "What evidence would empirically validate the proposed distinctions?",
    ],

    sections: [
      {
        heading: "The observable and the latent",
        paragraphs: [
          "A platform can observe that a user watched, replayed, bookmarked, or followed. It cannot directly observe that the user learned, that the content was correct, or that the explanation was credible.",
          "The distinction matters because every ranking decision introduces an interpretation between the observed behavior and the latent property the system attempts to estimate.",
        ],
      },
      {
        heading: "Behavior is multiply caused",
        paragraphs: [
          "A single behavioral trace rarely has one unique explanation. Long watch time may result from clarity, difficulty, novelty, entertainment, or confusion.",
          "Treating one trace as though it has one fixed meaning creates false certainty.",
        ],
      },
      {
        heading: "From truth to confidence",
        paragraphs: [
          "A credibility-first platform should avoid claiming to rank truth directly. It can instead estimate confidence using incomplete and uncertain evidence.",
          "This changes the system's claim from certainty to justified inference.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "The ranking system that motivated the distinction between engagement and evidence.",
        href: "/work/techshortsapp",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        description:
          "Separates observable outputs from assumptions and latent uncertainty.",
        href: "/frameworks/signal",
      },
      {
        title: "Evidence of Learning",
        description:
          "Provides a stronger vocabulary for evidence of changed capability.",
        href: "/frameworks/evidence-of-learning",
      },
    ],

    relatedResearch: [
      {
        title: "How Much Credibility Should Each Signal Contribute?",
        href: "/research/signal-contribution",
      },
      {
        title: "Contextual Interpretation of Behavioral Signals",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    references: [],

    externalLinks: [],
  },

  {
    title: "How Much Credibility Should Each Signal Contribute?",
    shortTitle: "Signal Contribution",
    slug: "signal-contribution",

    question:
      "If behavioral signals are uncertain evidence, how much influence should each signal have in a credibility-oriented ranking system?",

    abstract:
      "This essay examines the relative strength of implicit and explicit signals in TechShortsApp. It argues that signals should not receive weight merely because they are measurable; their contribution should depend on interpretation, intentionality, exposure, context, and uncertainty.",

    status: "Published",
    kind: "Independent Research Essay",
    areas: ["Behavioral Evidence", "Information Systems"],

    publishedAt: "2026-05-26",
    updatedAt: "2026-05-26",

    publicationNote:
      "Publicly published independent research essay. The weighting model remains provisional and has not been empirically validated.",

    peerReviewed: false,

    centralClaim:
      "Signal weighting should reflect evidential meaning and uncertainty rather than measurement convenience.",

    motivation:
      "Once a system accepts that engagement is not proof, it still needs a principled way to decide how much each available trace should influence ranking.",

    methods: [
      "Conceptual comparison of implicit and explicit feedback.",
      "Analysis of user intentionality behind each signal.",
      "Evaluation of exposure requirements before feedback becomes meaningful.",
      "Examination of signal aggregation and confidence.",
    ],

    evidence: [
      "Watch ratio is frequently available but weakly intentional.",
      "Replay may contain more information than passive continuation but remains ambiguous.",
      "Bookmarks involve deliberate action but express future intention rather than completed learning.",
      "Helpful feedback is explicit but depends on the user's ability to judge usefulness.",
      "Following a creator reflects creator affinity and should not automatically transfer to every video.",
    ],

    limitations: [
      "The proposed weighting relationships are not final numerical estimates.",
      "User behavior may differ significantly across domains.",
      "Explicit feedback can be sparse or strategically manipulated.",
      "The model does not yet fully separate learner knowledge state.",
    ],

    openQuestions: [
      "Should weights be universal or domain-specific?",
      "How should sparse explicit feedback interact with abundant implicit behavior?",
      "Should creator-level and content-level evidence use different models?",
      "How should evidence decay over time?",
    ],

    sections: [
      {
        heading: "Availability is not evidential strength",
        paragraphs: [
          "Platforms often privilege signals that are plentiful and easy to measure. However, signal frequency does not determine what the signal means.",
          "A weak but abundant trace should not automatically overpower a sparse but more intentional one.",
        ],
      },
      {
        heading: "Intentionality and interpretation",
        paragraphs: [
          "Explicit actions generally communicate more deliberate judgment, but they remain subjective and context-dependent.",
          "Implicit behavior can provide scale while requiring greater caution during interpretation.",
        ],
      },
      {
        heading: "Confidence rather than fixed truth",
        paragraphs: [
          "Weights should operate inside a model that retains uncertainty. The objective is not to convert ambiguous behavior into artificial certainty.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        href: "/work/techshortsapp",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
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

    references: [],

    externalLinks: [],
  },

  {
    title: "Contextual Interpretation of Behavioral Signals",
    shortTitle: "Contextual Behavioral Signals",
    slug: "contextual-behavioral-signals",

    question:
      "Why can the same observable behavior carry different meanings across learning domains and contexts?",

    abstract:
      "This developing paper investigates the contextual dependence of behavioral evidence. It begins by distinguishing behavior from behavioral traces, then examines how domain, knowledge state, learning objective, content type, interface, emotion, and time can alter interpretation. The initial paper focuses primarily on domain.",

    status: "In Progress",
    kind: "Framework Paper",
    areas: [
      "Behavioral Evidence",
      "Learning & Cognition",
      "Information Systems",
    ],

    updatedAt: "2026-07-14",

    publicationNote:
      "Active research draft. Arguments, terminology, scope, and examples remain subject to revision.",

    peerReviewed: false,

    centralClaim:
      "A behavioral trace has no stable evidential meaning independent of the context that produced it.",

    motivation:
      "Earlier TechShortsApp work treated signals as uncertain evidence. The next problem is deeper: even uncertainty may be incorrectly modeled if the same signal is assumed to mean the same thing everywhere.",

    methods: [
      "Definition of behavior and behavioral traces.",
      "Conceptual separation of observed action from inferred cognitive state.",
      "Cross-domain comparison of learning tasks.",
      "Analysis of plausible hidden causes for identical signals.",
      "Development of a contextual interpretation model.",
    ],

    evidence: [
      "Replaying code may indicate debugging, copying syntax, checking output, or conceptual confusion.",
      "Replaying a mathematics derivation may reflect stepwise reasoning or working-memory limitations.",
      "Low watch ratio can represent irrelevance, prior knowledge, poor quality, or rapid problem resolution.",
      "A bookmark may represent study intent, reference utility, or simple collection behavior.",
    ],

    limitations: [
      "The current draft focuses on conceptual structure rather than causal measurement.",
      "Domain boundaries can themselves be ambiguous.",
      "Examples do not yet establish population-level behavioral patterns.",
      "Knowledge state and learning objective are acknowledged but not fully modeled in the first paper.",
    ],

    openQuestions: [
      "What exactly counts as behavior in a digital learning environment?",
      "Which contextual variables are necessary rather than merely useful?",
      "How should a ranking system represent alternative causes?",
      "Can domain-specific models generalize without becoming fragmented?",
      "How can the model be empirically tested?",
    ],

    sections: [
      {
        heading: "What is behavior?",
        paragraphs: [
          "Behavior is an action or response produced by an organism or agent in relation to internal and external conditions.",
          "A digital platform does not observe behavior in its complete causal context. It records a trace: a click, duration, replay, scroll, bookmark, or feedback action.",
        ],
      },
      {
        heading: "Behavior and behavioral traces",
        paragraphs: [
          "Behavior includes intention, perception, prior knowledge, emotion, environment, and response. A behavioral trace is the partial measurable record left inside an interface.",
          "The trace is therefore not identical to the behavior and is even further removed from the latent state a system may wish to infer.",
        ],
      },
      {
        heading: "Why context changes meaning",
        paragraphs: [
          "Learning tasks differ across domains. Debugging software, following a mathematical proof, recognizing a mechanical component, and memorizing terminology place different demands on attention, memory, reasoning, and action.",
          "Because the underlying task changes, the behavioral traces produced during that task cannot automatically retain a universal meaning.",
        ],
      },
      {
        heading: "Initial scope: domain",
        paragraphs: [
          "Context includes domain, knowledge state, learning objective, content type, interface, emotion, and time.",
          "The current paper narrows the first analysis to domain so that one variable can be examined without pretending that the remaining variables are irrelevant.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "Provides the practical ranking problem motivating the research.",
        href: "/work/techshortsapp",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        description:
          "Makes assumptions, context, outputs, and latent uncertainty explicit.",
        href: "/frameworks/signal",
      },
      {
        title: "Evidence of Learning",
        description:
          "Distinguishes observable activity from evidence of learning.",
        href: "/frameworks/evidence-of-learning",
      },
    ],

    relatedResearch: [
      {
        title: "Engagement Is Not Evidence",
        href: "/research/engagement-is-not-evidence",
      },
      {
        title: "How Much Credibility Should Each Signal Contribute?",
        href: "/research/signal-contribution",
      },
    ],

    references: [],

    externalLinks: [],
  },

  {
    title: "The Illusion of Learning",
    shortTitle: "The Illusion of Learning",
    slug: "illusion-of-learning",

    question:
      "How do we know that learning occurred rather than merely experiencing familiarity, fluency, engagement, or completion?",

    abstract:
      "This research and communication project examines learning as a latent process. It asks what observable evidence can support the claim that capability changed and distinguishes feelings associated with learning from demonstrations of recall, performance, transfer, teaching, creation, and reflection.",

    status: "Developing",
    kind: "Talk Development",
    areas: ["Learning & Cognition"],

    updatedAt: "2026-07-14",

    publicationNote:
      "Developing TEDx talk, essay, and public video series. It is not currently a formal experimental study.",

    peerReviewed: false,

    centralClaim:
      "The subjective feeling that learning occurred is not sufficient evidence that capability changed.",

    motivation:
      "Students frequently leave lectures, courses, books, and seminars feeling that they learned. That feeling can be meaningful, but it does not independently demonstrate recall, application, transfer, or creation.",

    methods: [
      "Conceptual analysis of learning as a latent process.",
      "Comparison of learning feelings with observable performance.",
      "Development of the Evidence of Learning framework.",
      "Translation of research ideas into a public talk and video series.",
    ],

    evidence: [
      "Attention demonstrates exposure but not necessarily durable learning.",
      "Fluency can make information feel understood because processing feels easy.",
      "Recognition can occur without independent recall.",
      "Independent performance and transfer provide stronger evidence than passive familiarity.",
      "Teaching and creation can reveal relationships that memorization alone may not demonstrate.",
    ],

    limitations: [
      "The current model is a conceptual framework rather than a validated diagnostic instrument.",
      "Different learning types may require different forms of evidence.",
      "Performance can be influenced by anxiety, context, prior knowledge, and available tools.",
      "Failure to perform once does not prove that no learning occurred.",
    ],

    openQuestions: [
      "How should evidence differ across conceptual, procedural, perceptual, and motor learning?",
      "How much evidence is sufficient before claiming that learning occurred?",
      "How should delayed retention be incorporated?",
      "Can reflection be evaluated without rewarding polished language over genuine understanding?",
    ],

    sections: [
      {
        heading: "Learning cannot be observed directly",
        paragraphs: [
          "Learning is inferred from changes in knowledge, capability, behavior, or performance. The process itself is not directly visible.",
          "This makes learning an epistemic problem: we must decide what evidence justifies the claim that learning occurred.",
        ],
      },
      {
        heading: "The feeling of learning",
        paragraphs: [
          "Attention, completion, enjoyment, note-taking, and familiarity can accompany learning, but none independently establishes it.",
          "The problem is not that these experiences are useless. The problem is treating them as conclusive.",
        ],
      },
      {
        heading: "Evidence of changed capability",
        points: [
          "Recall without the original material.",
          "Imitation with guidance.",
          "Independent performance.",
          "Transfer to a changed context.",
          "Teaching relationships to another person.",
          "Creating something that depends on the knowledge.",
          "Reflecting on limitations, mistakes, and uncertainty.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "The platform asks whether behavioral evidence can support educational ranking.",
        href: "/work/techshortsapp",
      },
      {
        title: "TechXEng",
        description:
          "Engineering projects provide environments for testing learning through performance.",
        href: "/work/techxeng",
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

    relatedResearch: [
      {
        title: "Contextual Interpretation of Behavioral Signals",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    references: [],

    externalLinks: [],
  },

  {
    title: "Monitor Only vs. Monitor and Model",
    shortTitle: "Monitoring vs. Modeling",
    slug: "monitoring-versus-modeling",

    question:
      "What additional assumptions and claims are introduced when environmental data collection moves from monitoring toward modeling?",

    abstract:
      "This project used EPA air-quality data to examine the distinction between observing environmental conditions and constructing a model intended to explain or predict them. It emphasizes that visual patterns and measurements do not independently establish causal relationships.",

    status: "Completed",
    kind: "Research Project",
    areas: ["Research Methods", "Engineering Systems"],

    updatedAt: "2026-06-17",

    publicationNote:
      "Completed student research project developed during the ASRI Python track. Its scope was educational and exploratory.",

    peerReviewed: false,

    centralClaim:
      "Monitoring describes observed conditions, while modeling introduces structural assumptions that support different—and potentially stronger—claims.",

    motivation:
      "Environmental datasets can make patterns visible, but researchers must distinguish what was measured from what was inferred through a model.",

    methods: [
      "Collection and organization of EPA air-quality data.",
      "Cleaning and transformation with Python and Pandas.",
      "Exploratory visualization.",
      "Conceptual comparison of monitoring and modeling claims.",
    ],

    evidence: [
      "Measurements can show temporal or geographic differences.",
      "Visualization can reveal correlation and pattern.",
      "Prediction requires assumptions about relationships and future stability.",
      "Causal explanation requires more than observed association.",
    ],

    limitations: [
      "The project did not construct a complete causal environmental model.",
      "Available data may contain missingness and uneven sampling.",
      "Weather, traffic, industry, and other contextual variables were not fully incorporated.",
      "The project duration constrained validation.",
    ],

    openQuestions: [
      "Which variables are necessary for useful air-quality modeling?",
      "How should missing spatial and temporal data be represented?",
      "What model would be appropriate for causal rather than predictive claims?",
    ],

    sections: [
      {
        heading: "Monitoring",
        paragraphs: [
          "Monitoring records conditions through measurements. It can establish what was observed at a location and time within the limits of the instrument and sampling process.",
        ],
      },
      {
        heading: "Modeling",
        paragraphs: [
          "A model introduces relationships among variables. These relationships may support estimation, prediction, or explanation, but they also introduce assumptions.",
        ],
      },
      {
        heading: "The epistemic boundary",
        paragraphs: [
          "A visualization may reveal that variables move together. It does not by itself establish why they move together.",
          "The distinction protects the analysis from making claims that exceed the evidence.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "EPA Air-Quality Exploration",
        href: "/work/epa-air-quality",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],

    relatedResearch: [],

    references: [],

    externalLinks: [],
  },

  {
    title: "Hydrogen Combustion in a Small Turbine System",
    shortTitle: "Hydrogen Turbine",
    slug: "hydrogen-turbine",

    question:
      "How does hydrogen alter the behavior, design constraints, and safety requirements of a small turbine system?",

    abstract:
      "This engineering research exploration examines hydrogen combustion in a turbocharger-based or small gas-turbine system. It considers mixing, combustion zones, temperature, turbine work, materials, and safety as connected parts of one system.",

    status: "Exploratory",
    kind: "Research Note",
    areas: ["Engineering Systems"],

    updatedAt: "2026-06-01",

    publicationNote:
      "Exploratory engineering research notes. The system has not yet been experimentally validated.",

    peerReviewed: false,

    centralClaim:
      "Replacing conventional fuel with hydrogen changes interactions across the complete turbine system rather than only changing the fuel input.",

    motivation:
      "Hydrogen differs in ignition characteristics, flame speed, storage, emissions, and safety. These differences affect combustor design, materials, operation, and failure modes.",

    methods: [
      "System decomposition of compressor, combustor, turbine, and shaft.",
      "Conceptual analysis of combustion zones.",
      "Comparison of hydrogen with conventional fuel behavior.",
      "Identification of assumptions and safety constraints.",
    ],

    evidence: [
      "Hydrogen has different ignition and flame-propagation characteristics.",
      "Combustion temperature affects turbine materials and downstream behavior.",
      "Compressor, combustor, and turbine performance are coupled.",
      "Storage and leakage risks affect system-level design.",
    ],

    limitations: [
      "No completed experimental combustor has been validated.",
      "Operating pressure, flow, and temperature ranges remain uncertain.",
      "Material selection and instrumentation require additional analysis.",
      "The current model is conceptual.",
    ],

    openQuestions: [
      "What combustor geometry is appropriate for the intended operating range?",
      "How should hydrogen-air mixing be controlled?",
      "What instrumentation is required for safe testing?",
      "Which failure modes should dominate the shutdown design?",
    ],

    sections: [
      {
        heading: "A coupled energy system",
        paragraphs: [
          "The compressor, combustor, turbine, and shaft cannot be understood independently. Changes in one component alter operating conditions elsewhere.",
        ],
      },
      {
        heading: "Combustion zones",
        paragraphs: [
          "Primary, secondary, and dilution regions perform different functions related to flame stability, completion of combustion, and turbine-entry temperature.",
        ],
      },
      {
        heading: "Safety as a governing constraint",
        paragraphs: [
          "Safety should not be appended after the thermodynamic model. It changes permissible storage, mixing, ignition, control, sensing, and shutdown decisions.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "Hydrogen Turbine Research",
        href: "/work/hydrogen-turbine",
      },
    ],

    relatedFrameworks: [
      {
        title: "SIGNAL",
        href: "/frameworks/signal",
      },
    ],

    relatedResearch: [],

    references: [],

    externalLinks: [],
  },
] satisfies ResearchItem[];

export function getResearchBySlug(slug: string) {
  return researchCatalog.find((item) => item.slug === slug);
}

export function researchAreaToQuery(area: ResearchArea) {
  return area
    .toLowerCase()
    .replaceAll("&", "and")
    .replaceAll(/\s+/g, "-");
}

export function queryToResearchArea(query: string | null) {
  if (!query) {
    return null;
  }

  return (
    researchAreas.find((area) => researchAreaToQuery(area) === query) ?? null
  );
}