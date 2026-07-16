import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Link2,
  Tag,
} from "lucide-react";
import Link from "next/link";

import {
  parseCmsContent,
  readDetailString,
  readDetailStringArray,
} from "@/lib/cms/content-data";
import type { CmsContentEntry } from "@/lib/cms/types";

type KnowledgeType = "PROJECT" | "RESEARCH" | "FRAMEWORK" | "MEDIA" | "ARCHIVE";
type FieldDefinition = {
  key: string;
  label: string;
};

type ListDefinition = {
  key: string;
  label: string;
};

type LinkDefinition = {
  key: string;
  label: string;
};

type KnowledgeConfiguration = {
  label: string;
  backLabel: string;
  backHref: string;
  questionKey: string;

  fields: FieldDefinition[];
  lists: ListDefinition[];
  links: LinkDefinition[];
};

const configurations: Record<KnowledgeType, KnowledgeConfiguration> = {
  PROJECT: {
    label: "Project",
    backLabel: "All work",
    backHref: "/work",
    questionKey: "centralQuestion",

    fields: [
      {
        key: "status",
        label: "Status",
      },
      {
        key: "stage",
        label: "Current stage",
      },
    ],

    lists: [
      {
        key: "technologies",
        label: "Technologies",
      },
    ],

    links: [
      {
        key: "liveUrl",
        label: "Open project",
      },
      {
        key: "repositoryUrl",
        label: "View repository",
      },
    ],
  },
  MEDIA: {
    label: "Media",

    backLabel: "All media",

    backHref: "/media",

    questionKey: "centralQuestion",

    fields: [
      {
        key: "mediaType",

        label: "Media type",
      },

      {
        key: "platform",

        label: "Platform",
      },

      {
        key: "status",

        label: "Status",
      },

      {
        key: "series",

        label: "Series",
      },

      {
        key: "episode",

        label: "Episode",
      },

      {
        key: "duration",

        label: "Duration",
      },
    ],

    lists: [],

    links: [
      {
        key: "mediaUrl",

        label: "Open media",
      },

      {
        key: "playlistUrl",

        label: "Open playlist",
      },

      {
        key: "slidesUrl",

        label: "View presentation",
      },

      {
        key: "downloadUrl",

        label: "Download resource",
      },
    ],
  },

  RESEARCH: {
    label: "Research",
    backLabel: "All research",
    backHref: "/research",
    questionKey: "question",

    fields: [
      {
        key: "status",
        label: "Status",
      },
      {
        key: "kind",
        label: "Research kind",
      },
      {
        key: "centralClaim",
        label: "Current claim",
      },
    ],

    lists: [
      {
        key: "methods",
        label: "Methods",
      },
      {
        key: "limitations",
        label: "Limitations",
      },
    ],

    links: [],
  },

  FRAMEWORK: {
    label: "Framework",
    backLabel: "All frameworks",
    backHref: "/frameworks",
    questionKey: "question",

    fields: [
      {
        key: "version",
        label: "Framework version",
      },
      {
        key: "status",
        label: "Status",
      },
      {
        key: "category",
        label: "Category",
      },
      {
        key: "principle",
        label: "Central principle",
      },
    ],

    lists: [
      {
        key: "components",
        label: "Components",
      },
    ],

    links: [],
  },
  ARCHIVE: {
    label: "Archive record",

    backLabel: "All archive records",

    backHref: "/archive",

    questionKey: "centralQuestion",

    fields: [
      {
        key: "status",
        label: "Archive status",
      },
      {
        key: "archiveType",
        label: "Archive type",
      },
      {
        key: "period",
        label: "Period or version",
      },
      {
        key: "originalStatus",
        label: "Original status",
      },
      {
        key: "reason",
        label: "Why it was archived",
      },
      {
        key: "replacement",
        label: "Current replacement",
      },
    ],

    lists: [
      {
        key: "lessons",
        label: "Lessons preserved",
      },
    ],

    links: [],
  },
};

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function readSafeExternalUrl(value: string) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export default function CmsKnowledgeEntry({
  entry,
}: {
  entry: CmsContentEntry;
}) {
  const configuration = configurations[entry.type as KnowledgeType];

  if (!configuration) {
    return null;
  }

  const content = parseCmsContent(entry.data);

  const question = readDetailString(content.details, configuration.questionKey);

  const visibleFields = configuration.fields
    .map((field) => ({
      ...field,

      value: readDetailString(content.details, field.key),
    }))
    .filter((field) => field.value);

  const visibleLists = configuration.lists
    .map((list) => ({
      ...list,

      values: readDetailStringArray(content.details, list.key),
    }))
    .filter((list) => list.values.length > 0);

  const visibleLinks = configuration.links
    .map((link) => ({
      ...link,

      url: readSafeExternalUrl(readDetailString(content.details, link.key)),
    }))
    .filter(
      (
        link,
      ): link is LinkDefinition & {
        url: string;
      } => Boolean(link.url),
    );

  const publishedDate = formatDate(entry.publishedAt);

  return (
    <div className="cms-knowledge-detail">
      <div className="cms-knowledge-detail__navigation">
        <Link href={configuration.backHref}>
          <ArrowLeft size={16} />

          {configuration.backLabel}
        </Link>

        <span>Public snapshot v{entry.version}</span>
      </div>

      <article>
        <header className="cms-knowledge-detail__hero">
          <div className="cms-knowledge-detail__eyebrow">
            <span>{content.hero.eyebrow || configuration.label}</span>

            {entry.featured && <small>Featured</small>}
          </div>

          <h1>{entry.title}</h1>

          <p className="cms-knowledge-detail__summary">{entry.summary}</p>

          <div className="cms-knowledge-detail__metadata">
            {publishedDate && (
              <span>
                <CalendarDays size={15} />

                {publishedDate}
              </span>
            )}

            <span>
              <Tag size={15} />

              {configuration.label}
            </span>
          </div>

          {content.hero.description && (
            <p className="cms-knowledge-detail__opening">
              {content.hero.description}
            </p>
          )}

          {visibleLinks.length > 0 && (
            <div className="cms-knowledge-detail__actions">
              {visibleLinks.map((link) => (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.key}
                >
                  {link.label}

                  <ExternalLink size={15} />
                </a>
              ))}
            </div>
          )}
        </header>

        {question && (
          <aside className="cms-knowledge-question">
            <span>Central question</span>

            <blockquote>{question}</blockquote>
          </aside>
        )}

        {visibleFields.length > 0 && (
          <section className="cms-knowledge-facts">
            {visibleFields.map((field) => (
              <article key={field.key}>
                <span>{field.label}</span>

                <p>{field.value}</p>
              </article>
            ))}
          </section>
        )}

        {content.sections.length > 0 && (
          <div className="cms-knowledge-body">
            {content.sections.map((section, index) => (
              <section id={section.id} key={section.id}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  {section.heading && <h2>{section.heading}</h2>}
                </header>

                {section.body && <p>{section.body}</p>}

                {section.points.length > 0 && (
                  <ul>
                    {section.points.map((point, pointIndex) => (
                      <li key={`${section.id}-${pointIndex}`}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}

        {visibleLists.length > 0 && (
          <section className="cms-knowledge-lists">
            {visibleLists.map((list) => (
              <article key={list.key}>
                <span>{list.label}</span>

                <div>
                  {list.values.map((value) => (
                    <small key={value}>{value}</small>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {content.tags.length > 0 && (
          <section className="cms-knowledge-tags">
            <span>Topics</span>

            <div>
              {content.tags.map((tag) => (
                <small key={tag}>{tag}</small>
              ))}
            </div>
          </section>
        )}

        {entry.relationships.length > 0 && (
          <aside className="cms-knowledge-relationships">
            <header>
              <Link2 size={19} />

              <div>
                <span>Connected knowledge</span>

                <h2>Related work</h2>
              </div>
            </header>

            <div>
              {entry.relationships.map((relationship) => {
                const card = (
                  <>
                    <span>
                      {relationship.kind.replaceAll("_", " ").toLowerCase()}
                    </span>

                    <strong>{relationship.target.title}</strong>

                    {relationship.description && (
                      <p>{relationship.description}</p>
                    )}
                  </>
                );

                return relationship.target.publicPath ? (
                  <Link
                    href={relationship.target.publicPath}
                    key={relationship.id}
                  >
                    {card}

                    <ArrowUpRight size={16} />
                  </Link>
                ) : (
                  <article key={relationship.id}>{card}</article>
                );
              })}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
}
