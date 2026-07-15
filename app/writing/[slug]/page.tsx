import type {
  Metadata,
} from "next";

import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Link2,
  Tag,
} from "lucide-react";
import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import {
  getPublishedEntry,
} from "@/lib/cms/client";

import {
  parseCmsContent,
  readDetailString,
} from "@/lib/cms/content-data";

type WritingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(
  value: string | null,
) {
  if (!value) {
    return null;
  }

  return new Date(
    value,
  ).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const entry =
    await getPublishedEntry(
      "WRITING",
      slug,
    );

  if (!entry) {
    return {
      title:
        "Writing Not Found",
    };
  }

  const canonicalPath =
    entry.publicPath ||
    `/writing/${entry.slug}`;

  return {
    title: entry.title,

    description:
      entry.summary,

    alternates: {
      canonical:
        canonicalPath,
    },

    openGraph: {
      type: "article",

      title:
        entry.title,

      description:
        entry.summary,

      url:
        canonicalPath,

      publishedTime:
        entry.publishedAt ??
        undefined,

      modifiedTime:
        entry.updatedAt,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        entry.title,

      description:
        entry.summary,
    },
  };
}

export default async function WritingDetailPage({
  params,
}: WritingPageProps) {
  const { slug } =
    await params;

  const entry =
    await getPublishedEntry(
      "WRITING",
      slug,
    );

  if (!entry) {
    notFound();
  }

  const content =
    parseCmsContent(
      entry.data,
    );

  const category =
    readDetailString(
      content.details,
      "category",
    ) || "Writing";

  const readingTime =
    readDetailString(
      content.details,
      "readingTime",
    );

  const centralQuestion =
    readDetailString(
      content.details,
      "centralQuestion",
    );

  const externalUrl =
    readDetailString(
      content.details,
      "externalUrl",
    );

  const originalPublishedAt =
    readDetailString(
      content.details,
      "originalPublishedAt",
    );

  const publishedDate =
    formatDate(
      entry.publishedAt,
    );

  const originalDate =
    formatDate(
      originalPublishedAt ||
        null,
    );

  const canonicalPath =
    entry.publicPath ||
    `/writing/${entry.slug}`;

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type": "Article",

    headline:
      entry.title,

    description:
      entry.summary,

    datePublished:
      entry.publishedAt,

    dateModified:
      entry.updatedAt,

    mainEntityOfPage:
      canonicalPath,

    author: {
      "@type": "Person",
      name:
        "Niraj Kumar Chaurasiya",
    },
  };

  return (
    <main className="cms-writing-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ).replace(
              /</g,
              "\\u003c",
            ),
        }}
      />

      <div className="cms-writing-detail__navigation">
        <Link href="/writing">
          <ArrowLeft size={16} />
          All writing
        </Link>

        <span>
          Version {entry.version}
        </span>
      </div>

      <article>
        <header className="cms-writing-detail__hero">
          <div className="cms-writing-detail__eyebrow">
            <span>
              {content.hero.eyebrow ||
                category}
            </span>

            {entry.featured && (
              <small>
                Featured
              </small>
            )}
          </div>

          <h1>
            {entry.title}
          </h1>

          <p className="cms-writing-detail__summary">
            {entry.summary}
          </p>

          <div className="cms-writing-detail__metadata">
            {publishedDate && (
              <span>
                <CalendarDays
                  size={15}
                />

                {publishedDate}
              </span>
            )}

            {readingTime && (
              <span>
                <Clock3
                  size={15}
                />

                {readingTime}
              </span>
            )}

            <span>
              <Tag size={15} />
              {category}
            </span>
          </div>

          {content.hero.description && (
            <p className="cms-writing-detail__opening">
              {content.hero.description}
            </p>
          )}
        </header>

        {centralQuestion && (
          <aside className="cms-writing-question">
            <span>
              Central question
            </span>

            <blockquote>
              {centralQuestion}
            </blockquote>
          </aside>
        )}

        <div className="cms-writing-body">
          {content.sections.map(
            (
              section,
              index,
            ) => (
              <section
                id={section.id}
                key={section.id}
              >
                <header>
                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  {section.heading && (
                    <h2>
                      {section.heading}
                    </h2>
                  )}
                </header>

                {section.body && (
                  <p>
                    {section.body}
                  </p>
                )}

                {section.points.length >
                  0 && (
                  <ul>
                    {section.points.map(
                      (
                        point,
                        pointIndex,
                      ) => (
                        <li
                          key={`${section.id}-${pointIndex}`}
                        >
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </section>
            ),
          )}
        </div>

        {content.tags.length >
          0 && (
          <footer className="cms-writing-tags">
            <span>
              Topics
            </span>

            <div>
              {content.tags.map(
                (tag) => (
                  <small key={tag}>
                    {tag}
                  </small>
                ),
              )}
            </div>
          </footer>
        )}

        {(externalUrl ||
          originalDate) && (
          <aside className="cms-writing-original">
            <div>
              <span>
                Original publication
              </span>

              <p>
                {originalDate
                  ? `Originally published ${originalDate}.`
                  : "This entry also exists on an external publication."}
              </p>
            </div>

            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open original
                <ArrowUpRight
                  size={15}
                />
              </a>
            )}
          </aside>
        )}

        {entry.relationships.length >
          0 && (
          <aside className="cms-writing-relationships">
            <header>
              <Link2 size={19} />

              <div>
                <span>
                  Connected knowledge
                </span>

                <h2>
                  Related work
                </h2>
              </div>
            </header>

            <div>
              {entry.relationships.map(
                (
                  relationship,
                ) => {
                  const relationshipContent = (
                    <>
                      <span>
                        {relationship.kind
                          .replaceAll(
                            "_",
                            " ",
                          )
                          .toLowerCase()}
                      </span>

                      <strong>
                        {
                          relationship
                            .target
                            .title
                        }
                      </strong>

                      {relationship.description && (
                        <p>
                          {
                            relationship.description
                          }
                        </p>
                      )}
                    </>
                  );

                  return relationship
                    .target
                    .publicPath ? (
                    <Link
                      href={
                        relationship
                          .target
                          .publicPath
                      }
                      key={
                        relationship.id
                      }
                    >
                      {
                        relationshipContent
                      }

                      <ArrowUpRight
                        size={16}
                      />
                    </Link>
                  ) : (
                    <article
                      key={
                        relationship.id
                      }
                    >
                      {
                        relationshipContent
                      }
                    </article>
                  );
                },
              )}
            </div>
          </aside>
        )}
      </article>
    </main>
  );
}