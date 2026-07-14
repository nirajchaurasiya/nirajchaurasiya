export const frameworkStatuses = [
  "Active",
  "Developing",
  "Archived",
] as const;

export const frameworkCategories = [
  "Systems Thinking",
  "Learning",
  "Decision-Making",
] as const;

export type FrameworkStatus = (typeof frameworkStatuses)[number];
export type FrameworkCategory = (typeof frameworkCategories)[number];

export type FrameworkRelationship = {
  title: string;
  description?: string;
  href: string;
};

export type FrameworkComponent = {
  key: string;
  title: string;
  description: string;
  question?: string;
};

export type FrameworkExample = {
  title: string;
  context: string;
  application: string;
};

export type FrameworkVersion = {
  version: string;
  date: string;
  status: "Current" | "Previous" | "Draft";
  summary: string;
  changes: string[];
};

export type Framework = {
  title: string;
  shortName: string;
  slug: string;

  category: FrameworkCategory;
  status: FrameworkStatus;
  version: string;

  question: string;
  summary: string;
  description: string;

  createdAt: string;
  updatedAt: string;

  purpose: string;
  centralPrinciple: string;

  components: FrameworkComponent[];
  principles: string[];
  applications: string[];
  examples: FrameworkExample[];

  limitations: string[];
  openQuestions: string[];

  versionHistory: FrameworkVersion[];

  relatedProjects: FrameworkRelationship[];
  relatedResearch: FrameworkRelationship[];
  relatedFrameworks: FrameworkRelationship[];

  externalLinks: Array<{
    label: string;
    href: string;
  }>;
};

export const frameworkCatalog = [
  {
    title: "SIGNAL",
    shortName: "SIGNAL",
    slug: "signal",

    category: "Systems Thinking",
    status: "Active",
    version: "v1.0",

    question:
      "How can a system be understood without confusing its visible outputs with the complete system?",

    summary:
      "A systems-thinking framework for examining boundaries, inputs, governing interactions, outputs, assumptions, constraints, and latent uncertainty.",

    description:
      "SIGNAL is a reusable framework for analyzing physical, digital, organizational, and conceptual systems. It helps prevent visible outcomes from being treated as complete explanations by requiring the analyst to examine what enters the system, how elements interact, what assumptions constrain the model, and what remains hidden.",

    createdAt: "2026-03-01",
    updatedAt: "2026-07-14",

    purpose:
      "To provide a disciplined structure for understanding systems before explaining, designing, evaluating, or changing them.",

    centralPrinciple:
      "An observable output is the consequence of a system, not a complete explanation of that system.",

    components: [
      {
        key: "S",
        title: "System",
        description:
          "Define the system being examined, its purpose, and the boundary separating it from its environment.",
        question:
          "What exactly is the system, and where does it begin and end?",
      },
      {
        key: "I",
        title: "Inputs",
        description:
          "Identify the matter, energy, information, commands, resources, or conditions entering the system.",
        question:
          "What enters the system, and in what form?",
      },
      {
        key: "G",
        title: "Governing Interactions",
        description:
          "Examine the mechanisms, relationships, rules, forces, transformations, and feedback loops that produce system behavior.",
        question:
          "What interactions transform the inputs into observable outcomes?",
      },
      {
        key: "N",
        title: "Outputs",
        description:
          "Identify the observable results, effects, products, behaviors, and unintended consequences produced by the system.",
        question:
          "What does the system produce or change?",
      },
      {
        key: "A",
        title: "Assumptions and Constraints",
        description:
          "Make visible the conditions, simplifications, limits, environmental requirements, and design constraints shaping the model.",
        question:
          "What must be assumed, and what restricts the possible behavior?",
      },
      {
        key: "L",
        title: "Latent Uncertainty",
        description:
          "Identify hidden states, unknown relationships, incomplete evidence, measurement limits, and unresolved questions.",
        question:
          "What remains unknown, indirectly observed, or uncertain?",
      },
    ],

    principles: [
      "Define the boundary before analyzing components.",
      "Do not confuse an output with its cause.",
      "Relationships often explain more than isolated elements.",
      "Assumptions should be visible rather than silently embedded.",
      "Constraints are part of the system, not external inconveniences.",
      "Uncertainty should be represented instead of prematurely eliminated.",
    ],

    applications: [
      "Analyzing a mechanical or thermodynamic system.",
      "Designing a software platform or recommendation model.",
      "Examining community moderation and information flows.",
      "Explaining engineering concepts.",
      "Investigating causes behind behavioral evidence.",
      "Identifying missing assumptions in a research argument.",
    ],

    examples: [
      {
        title: "TechShortsApp ranking",
        context:
          "A recommendation system observes watch ratio, replay, bookmarks, Helpful, and Follow.",
        application:
          "SIGNAL separates user actions as inputs, ranking logic as governing interactions, recommendations as outputs, model assumptions as constraints, and educational value as a latent uncertainty.",
      },
      {
        title: "Robotic finger",
        context:
          "A finger assembly moves after force is introduced through an actuator or tendon mechanism.",
        application:
          "SIGNAL distinguishes the mechanical boundary, force and commands, linkage interactions, motion output, geometric constraints, and uncertainty in friction or material behavior.",
      },
      {
        title: "GlobalBriz moderation",
        context:
          "Community members submit questions, answers, housing posts, and reports.",
        application:
          "SIGNAL identifies content inputs, moderation rules, ranking and review interactions, visible community outputs, safety constraints, and uncertainty about trustworthiness.",
      },
    ],

    limitations: [
      "SIGNAL organizes analysis but does not automatically establish causality.",
      "A poorly chosen system boundary can distort every later stage.",
      "The framework does not prescribe a specific mathematical model.",
      "Complex systems may require several nested SIGNAL analyses.",
      "Uncertainty can be identified without being quantitatively estimated.",
    ],

    openQuestions: [
      "When should one system be decomposed into nested subsystems?",
      "How should competing system boundaries be compared?",
      "Can latent uncertainty be classified by source?",
      "How should feedback and time dependence be represented more explicitly?",
    ],

    versionHistory: [
      {
        version: "v1.0",
        date: "2026-03-01",
        status: "Current",
        summary:
          "Established the six-part framework for examining systems under uncertainty.",
        changes: [
          "Defined System, Inputs, Governing Interactions, Outputs, Assumptions and Constraints, and Latent Uncertainty.",
          "Applied the framework across engineering and software examples.",
          "Positioned uncertainty as a normal system property rather than a final disclaimer.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "Used to separate behavioral evidence, ranking logic, assumptions, and latent credibility.",
        href: "/work/techshortsapp",
      },
      {
        title: "TechXEng",
        description:
          "Used as the primary model for explaining engineering systems.",
        href: "/work/techxeng",
      },
      {
        title: "GlobalBriz",
        description:
          "Used to analyze community inputs, moderation, outputs, and trust.",
        href: "/work/globalbriz",
      },
      {
        title: "Hydrogen Turbine Research",
        description:
          "Used to connect combustion, compressor, turbine, shaft, and safety interactions.",
        href: "/work/hydrogen-turbine",
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
      {
        title: "Monitor Only vs. Monitor and Model",
        href: "/research/monitoring-versus-modeling",
      },
    ],

    relatedFrameworks: [
      {
        title: "Evidence of Learning",
        description:
          "Applies evidence-based reasoning to the latent process of learning.",
        href: "/frameworks/evidence-of-learning",
      },
      {
        title: "Sufficient Understanding Framework",
        description:
          "Helps decide when a system is understood well enough for action.",
        href: "/frameworks/sufficient-understanding",
      },
    ],

    externalLinks: [],
  },

  {
    title: "Evidence of Learning",
    shortName: "EoL",
    slug: "evidence-of-learning",

    category: "Learning",
    status: "Active",
    version: "v1.1",

    question:
      "What observable evidence supports the claim that learning has occurred?",

    summary:
      "A framework for distinguishing the feeling of learning from evidence that knowledge or capability has changed.",

    description:
      "Evidence of Learning treats learning as a latent process that cannot be directly observed. Instead of asking only whether someone paid attention, completed a course, or felt that information made sense, the framework examines progressively stronger demonstrations of changed capability.",

    createdAt: "2026-06-01",
    updatedAt: "2026-06-20",

    purpose:
      "To provide a practical vocabulary for reasoning about whether learning has occurred and what kind of evidence supports that conclusion.",

    centralPrinciple:
      "Exposure, attention, completion, and familiarity may accompany learning, but they are not independently sufficient evidence of learning.",

    components: [
      {
        key: "01",
        title: "Recall",
        description:
          "Retrieve relevant information without relying entirely on the original source or prompt.",
        question:
          "Can the learner recover the knowledge when the material is absent?",
      },
      {
        key: "02",
        title: "Imitate",
        description:
          "Reproduce a demonstrated process, pattern, or solution with guidance or a close example.",
        question:
          "Can the learner follow and reproduce a known procedure?",
      },
      {
        key: "03",
        title: "Perform Independently",
        description:
          "Complete the task without direct step-by-step guidance.",
        question:
          "Can the learner act without copying the original demonstration?",
      },
      {
        key: "04",
        title: "Transfer",
        description:
          "Apply knowledge or capability in a changed problem, environment, or representation.",
        question:
          "Can the learner use the knowledge when the surface conditions change?",
      },
      {
        key: "05",
        title: "Teach",
        description:
          "Explain the idea, process, relationships, assumptions, and common mistakes to another person.",
        question:
          "Can the learner make the underlying structure understandable?",
      },
      {
        key: "06",
        title: "Create",
        description:
          "Produce something new that depends on the learned knowledge or skill.",
        question:
          "Can the learner use the knowledge as a building material?",
      },
      {
        key: "07",
        title: "Reflection",
        description:
          "Identify errors, limitations, uncertainty, changes in understanding, and remaining questions.",
        question:
          "Can the learner examine the quality and boundaries of their own understanding?",
      },
    ],

    principles: [
      "Learning is inferred from evidence rather than directly observed.",
      "Different evidence supports different strengths of claim.",
      "Recognition is weaker than independent recall.",
      "Performance in one context does not automatically demonstrate transfer.",
      "Teaching can expose gaps hidden during private familiarity.",
      "Creation may demonstrate integration but does not guarantee correctness.",
      "Reflection preserves uncertainty and makes revision possible.",
    ],

    applications: [
      "Evaluating whether a course or lecture produced learning.",
      "Designing assessments beyond multiple-choice recognition.",
      "Planning personal study sessions.",
      "Evaluating technical tutorials.",
      "Documenting learning through public engineering projects.",
      "Designing educational recommendation signals.",
    ],

    examples: [
      {
        title: "Learning SolidWorks",
        context:
          "A learner watches a tutorial explaining how to create a parametric link.",
        application:
          "Completion of the tutorial demonstrates exposure. Independent modeling, dimension changes, transfer to a new link, teaching the process, and reflecting on design intent provide progressively different evidence.",
      },
      {
        title: "Learning a programming concept",
        context:
          "A learner understands an example while reading it.",
        application:
          "EoL asks whether the learner can recall the concept, reproduce the pattern, solve independently, transfer it to a different problem, explain it, and build something with it.",
      },
      {
        title: "Watching educational shorts",
        context:
          "A user watches, replays, bookmarks, or marks a video Helpful.",
        application:
          "These behaviors may provide indirect evidence of attention or usefulness, but they do not independently demonstrate recall, performance, transfer, teaching, or creation.",
      },
    ],

    limitations: [
      "The stages should not automatically be treated as a universal linear hierarchy.",
      "Different forms of learning require different demonstrations.",
      "Performance can be affected by anxiety, fatigue, context, and available tools.",
      "Teaching fluently does not guarantee that every claim is correct.",
      "Creation may contain misconceptions despite demonstrating integration.",
      "The framework is conceptual and is not yet a validated measurement instrument.",
    ],

    openQuestions: [
      "How should EoL differ across conceptual, procedural, perceptual, and motor learning?",
      "How much evidence is sufficient before claiming learning occurred?",
      "How should delayed retention be incorporated?",
      "Should reflection be a separate dimension rather than a final stage?",
      "How can evidence be evaluated without reducing learning to one score?",
    ],

    versionHistory: [
      {
        version: "v1.1",
        date: "2026-06-20",
        status: "Current",
        summary:
          "Expanded the framework to include Recall and Reflection.",
        changes: [
          "Added Recall as an explicit evidence category.",
          "Added Reflection to represent metacognition, limitations, and uncertainty.",
          "Replaced the earlier Observation terminology.",
          "Clarified the distinction between imitation and independent performance.",
        ],
      },
      {
        version: "v1.0",
        date: "2026-06-01",
        status: "Previous",
        summary:
          "Initial framework for reasoning about observable evidence of learning.",
        changes: [
          "Introduced Observation, Imitation, Independent Performance, Transfer, Teach, and Create.",
          "Separated learning feelings from evidence of capability.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "TechShortsApp",
        description:
          "Provides the practical problem of inferring learning-related value from behavioral evidence.",
        href: "/work/techshortsapp",
      },
      {
        title: "Human-Like Robotic Hand",
        description:
          "Provides a public environment for testing learning through performance and creation.",
        href: "/work/robotic-hand",
      },
      {
        title: "TechXEng",
        description:
          "Documents the movement from formula familiarity toward system understanding.",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        href: "/research/illusion-of-learning",
      },
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
        title: "Sufficient Understanding Framework",
        description:
          "Addresses when evidence of understanding becomes sufficient for action.",
        href: "/frameworks/sufficient-understanding",
      },
      {
        title: "SIGNAL",
        description:
          "Provides a system model for examining learning environments and evidence.",
        href: "/frameworks/signal",
      },
    ],

    externalLinks: [],
  },

  {
    title: "Sufficient Understanding Framework",
    shortName: "SUF",
    slug: "sufficient-understanding",

    category: "Decision-Making",
    status: "Developing",
    version: "v1.0",

    question:
      "When is understanding sufficient to justify building, deciding, or acting under uncertainty?",

    summary:
      "An epistemic decision framework for determining when understanding is sufficient for responsible action without requiring complete certainty.",

    description:
      "The Sufficient Understanding Framework addresses a practical problem faced by builders, researchers, and decision-makers: complete understanding is rarely available, but indefinite investigation prevents action. SUF provides stages for moving from problem definition toward application while retaining productive uncertainty.",

    createdAt: "2026-07-07",
    updatedAt: "2026-07-07",

    purpose:
      "To help determine whether the current level of understanding is sufficient for the consequences, reversibility, and uncertainty of a proposed action.",

    centralPrinciple:
      "Sufficient understanding is not complete understanding; it is understanding proportionate to the decision, consequences, uncertainty, and ability to revise.",

    components: [
      {
        key: "00",
        title: "Ask the Right Problem",
        description:
          "Examine whether the original question, objective, or system boundary is correctly framed.",
        question:
          "Are we solving the right problem, or merely optimizing a flawed Version 0?",
      },
      {
        key: "01",
        title: "Recognition",
        description:
          "Identify the phenomenon, pattern, component, or problem when encountered.",
        question:
          "Can I recognize what I am dealing with?",
      },
      {
        key: "02",
        title: "Definition",
        description:
          "State what the concept or system is, what it is not, and where its boundaries lie.",
        question:
          "Can I define it clearly enough to distinguish it from nearby ideas?",
      },
      {
        key: "03",
        title: "Justification",
        description:
          "Explain why the definition, claim, model, or proposed mechanism should be accepted.",
        question:
          "What evidence or reasoning supports this understanding?",
      },
      {
        key: "04",
        title: "Relationship",
        description:
          "Connect the concept to causes, effects, neighboring concepts, subsystems, and constraints.",
        question:
          "How does this idea interact with the larger system?",
      },
      {
        key: "05",
        title: "Application",
        description:
          "Use the understanding to perform, design, decide, predict, test, or build.",
        question:
          "Can this understanding support responsible action?",
      },
      {
        key: "06",
        title: "Productive Uncertainty",
        description:
          "Identify what remains unknown, what could invalidate the decision, and how the action can be monitored or revised.",
        question:
          "What uncertainty remains, and can the system fail safely while we learn?",
      },
    ],

    principles: [
      "The required depth of understanding depends on the decision.",
      "High-consequence and irreversible actions require stronger justification.",
      "Action can be rational before uncertainty reaches zero.",
      "Reversibility reduces the amount of understanding required before experimentation.",
      "Monitoring and feedback can compensate for incomplete initial understanding.",
      "Unknowns should be categorized by how they could affect the decision.",
      "A flawed problem definition cannot be repaired through later optimization alone.",
    ],

    applications: [
      "Deciding when to begin building a prototype.",
      "Determining whether a research claim is ready for publication.",
      "Evaluating whether a software feature is safe to release.",
      "Choosing whether to continue investigating or begin testing.",
      "Assessing readiness for an engineering experiment.",
      "Making decisions with incomplete but improving evidence.",
    ],

    examples: [
      {
        title: "Building the first robotic finger",
        context:
          "The complete design of a human-like hand is not yet understood.",
        application:
          "SUF asks whether the finger geometry, constraints, assembly relationships, and failure risks are understood sufficiently to create a reversible prototype and learn from it.",
      },
      {
        title: "Publishing a research essay",
        context:
          "An argument is conceptually developed but lacks formal experimental validation.",
        application:
          "SUF supports publication when the claim, justification, limitations, and status are clearly represented, while preventing the essay from being presented as stronger evidence than it contains.",
      },
      {
        title: "Changing a ranking model",
        context:
          "TechShortsApp introduces a new behavioral signal.",
        application:
          "SUF evaluates whether the signal is defined, justified, related to existing evidence, safe to test, observable after release, and reversible if assumptions fail.",
      },
    ],

    limitations: [
      "Sufficiency remains partly judgment-dependent.",
      "The framework does not currently provide a numerical sufficiency threshold.",
      "Users may underestimate consequences or unknown risks.",
      "A reversible experiment can still create indirect harm.",
      "Productive uncertainty requires honest monitoring and willingness to revise.",
      "The framework does not replace domain expertise.",
    ],

    openQuestions: [
      "Can sufficient understanding be scored without creating false precision?",
      "How should consequence and reversibility modify each stage?",
      "What types of uncertainty should block action entirely?",
      "How should group decisions handle disagreement about sufficiency?",
      "What evidence demonstrates that SUF improves decision quality?",
    ],

    versionHistory: [
      {
        version: "v1.0",
        date: "2026-07-07",
        status: "Current",
        summary:
          "Established the seven-stage framework for deciding when understanding is sufficient for action.",
        changes: [
          "Added Ask the Right Problem as Stage 0.",
          "Defined Recognition, Definition, Justification, Relationship, Application, and Productive Uncertainty.",
          "Connected sufficiency to action, revision, and remaining uncertainty.",
        ],
      },
    ],

    relatedProjects: [
      {
        title: "Human-Like Robotic Hand",
        description:
          "Used to decide when understanding is sufficient to move from CAD toward prototyping.",
        href: "/work/robotic-hand",
      },
      {
        title: "TechShortsApp",
        description:
          "Used to evaluate when ranking changes are justified enough for controlled release.",
        href: "/work/techshortsapp",
      },
      {
        title: "TechXEng",
        description:
          "Supports the transition from explanation toward physical building.",
        href: "/work/techxeng",
      },
    ],

    relatedResearch: [
      {
        title: "The Illusion of Learning",
        description:
          "Raises the question of what evidence is sufficient before claiming learning.",
        href: "/research/illusion-of-learning",
      },
      {
        title: "Contextual Interpretation of Behavioral Signals",
        description:
          "Examines whether the current context model is sufficient for ranking decisions.",
        href: "/research/contextual-behavioral-signals",
      },
    ],

    relatedFrameworks: [
      {
        title: "Evidence of Learning",
        description:
          "Provides possible evidence for whether understanding has developed.",
        href: "/frameworks/evidence-of-learning",
      },
      {
        title: "SIGNAL",
        description:
          "Provides the system analysis needed before sufficiency can be evaluated.",
        href: "/frameworks/signal",
      },
    ],

    externalLinks: [],
  },
] satisfies Framework[];

export function getFrameworkBySlug(slug: string) {
  return frameworkCatalog.find((framework) => framework.slug === slug);
}