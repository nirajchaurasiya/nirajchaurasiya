import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  CircleHelp,
  Clock3,
  MessageCircleMore,
  Network,
} from "lucide-react";

import { parseCmsBook, splitCmsParagraphs } from "@/lib/cms/book-data";
import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsMetadata } from "@/lib/cms/metadata";
import { getCmsEntryHref } from "@/lib/cms/routes";

import { siteConfig } from "@/content/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelationshipType(value: string) {
  return value
    .replace("RELATED_", "")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export async function generateStaticParams() {
  const entries = await getPublishedContent("BOOK");

  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const entry = await getPublishedEntry("BOOK", slug);

  if (!entry) {
    return {
      title: "Book Conversation Not Found",
    };
  }

  return createCmsMetadata(entry);
}

export default async function BookConversationPage({ params }: PageProps) {
  const { slug } = await params;

  const entry = await getPublishedEntry("BOOK", slug);

  if (!entry) {
    notFound();
  }

  const book = parseCmsBook(entry);

  const startedDate = formatDate(book.startedAt);

  const completedDate = formatDate(book.completedAt);

  const pageUrl = `${siteConfig.url}${getCmsEntryHref(entry)}`;

  const description = entry.summary || book.currentReflection;

  const structuredData = [
    {
      "@context": "https://schema.org",

      "@type": "WebPage",

      name: `${entry.title} — Conversation Across Times`,

      description,

      url: pageUrl,

      datePublished: entry.publishedAt ?? undefined,

      dateModified: entry.updatedAt,

      isPartOf: {
        "@type": "CollectionPage",

        name: "Conversation Across Times",

        url: `${siteConfig.url}/books`,
      },

      creator: {
        "@type": "Person",

        name: siteConfig.name,

        url: siteConfig.url,
      },

      about: {
        "@type": "Book",

        name: entry.title,

        author: {
          "@type": "Person",

          name: book.author,
        },
      },

      mainEntity: {
        "@type": "Book",

        name: entry.title,

        author: {
          "@type": "Person",

          name: book.author,
        },
      },
    },

    {
      "@context": "https://schema.org",

      "@type": "BreadcrumbList",

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: siteConfig.url,
        },

        {
          "@type": "ListItem",

          position: 2,

          name: "Conversation Across Times",

          item: `${siteConfig.url}/books`,
        },

        {
          "@type": "ListItem",

          position: 3,

          name: entry.title,

          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <article className="book-detail-page">
      <Link href="/books" className="book-detail-back">
        <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
        Conversation Across Times
      </Link>

      <header className="book-detail-hero">
        <div className="book-detail-hero__top">
          <div className="book-detail-hero__symbol" aria-hidden="true">
            <BookOpenText size={25} strokeWidth={1.7} />
          </div>

          <span className="book-detail-status">
            <Clock3 size={14} strokeWidth={1.8} aria-hidden="true" />

            {book.status}
          </span>
        </div>

        <p className="books-eyebrow">
          {book.eyebrow || `A conversation with ${book.author}`}
        </p>

        <h1>{entry.title}</h1>

        <p className="book-detail-hero__question">{book.centralQuestion}</p>

        <div className="book-detail-hero__metadata">
          <span>
            <BookOpenText size={15} strokeWidth={1.8} aria-hidden="true" />

            {book.author}
          </span>

          {startedDate && (
            <span>
              <CalendarDays size={15} strokeWidth={1.8} aria-hidden="true" />
              Started {startedDate}
            </span>
          )}

          {completedDate && (
            <span>
              <CalendarDays size={15} strokeWidth={1.8} aria-hidden="true" />
              Completed {completedDate}
            </span>
          )}
        </div>
      </header>

      <div className="book-detail-layout">
        <div className="book-detail-main">
          <section className="book-detail-opening">
            <p className="books-section__eyebrow">Why I entered</p>

            <h2>Entering the conversation</h2>

            {splitCmsParagraphs(book.whyEntered).map((paragraph, index) => (
              <p key={`why-entered-${index}`}>{paragraph}</p>
            ))}
          </section>

          <blockquote className="book-detail-current-reflection">
            <MessageCircleMore size={20} strokeWidth={1.7} aria-hidden="true" />

            <div>
              <span>Current reflection</span>

              {splitCmsParagraphs(book.currentReflection).map(
                (paragraph, index) => (
                  <p key={`reflection-${index}`}>{paragraph}</p>
                ),
              )}
            </div>
          </blockquote>

          <div className="book-detail-sections">
            {book.sections.map((section, index) => (
              <section className="book-detail-section" key={section.id}>
                <span className="book-detail-section__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  {section.heading && <h2>{section.heading}</h2>}

                  {splitCmsParagraphs(section.body).map(
                    (paragraph, paragraphIndex) => (
                      <p key={`${section.id}-paragraph-${paragraphIndex}`}>
                        {paragraph}
                      </p>
                    ),
                  )}

                  {section.points.length > 0 && (
                    <ul>
                      {section.points.map((point, pointIndex) => (
                        <li key={`${section.id}-point-${pointIndex}`}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {book.openQuestions.length > 0 && (
            <section className="book-detail-questions">
              <header>
                <CircleHelp size={22} strokeWidth={1.7} aria-hidden="true" />

                <div>
                  <p className="books-section__eyebrow">
                    Productive uncertainty
                  </p>

                  <h2>Questions still open</h2>
                </div>
              </header>

              <ol>
                {book.openQuestions.map((question, index) => (
                  <li key={`${question}-${index}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <p>{question}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {book.reflections.length > 0 && (
            <section className="book-detail-reflections">
              <header>
                <p className="books-section__eyebrow">Dated notes</p>

                <h2>Reflection log</h2>
              </header>

              <div className="book-reflection-list">
                {book.reflections.map((reflection, index) => (
                  <article
                    className="book-reflection-entry"
                    key={reflection.id || `${reflection.date}-${index}`}
                  >
                    <time dateTime={reflection.date}>
                      {formatDate(reflection.date) ||
                        reflection.date ||
                        "Date unavailable"}
                    </time>

                    <div>
                      {reflection.title && <h3>{reflection.title}</h3>}

                      {splitCmsParagraphs(reflection.body).map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={`${reflection.id}-paragraph-${paragraphIndex}`}
                          >
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {entry.relationships.length > 0 && (
            <section className="book-related-work">
              <header>
                <p className="books-section__eyebrow">
                  Across the knowledge system
                </p>

                <h2>Where this conversation appears</h2>
              </header>

              <div className="book-related-grid">
                {entry.relationships.map((relationship) => (
                  <Link
                    href={getCmsEntryHref(relationship.target)}
                    className="book-related-card"
                    key={relationship.id}
                  >
                    <span>{formatRelationshipType(relationship.kind)}</span>

                    <h3>{relationship.target.title}</h3>

                    <p>
                      {relationship.description ||
                        `Explore how this book conversation connects to ${relationship.target.title}.`}
                    </p>

                    <strong>
                      Explore connection
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </strong>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside
          className="book-detail-sidebar"
          aria-label={`${entry.title} conversation information`}
        >
          <section className="book-detail-sidebar__panel">
            <p className="books-section__eyebrow">Conversation map</p>

            <dl>
              <div>
                <dt>Status</dt>
                <dd>{book.status}</dd>
              </div>

              <div>
                <dt>Author</dt>
                <dd>{book.author}</dd>
              </div>

              {startedDate && (
                <div>
                  <dt>Started</dt>
                  <dd>{startedDate}</dd>
                </div>
              )}

              {completedDate && (
                <div>
                  <dt>Completed</dt>
                  <dd>{completedDate}</dd>
                </div>
              )}

              <div>
                <dt>Reflections</dt>
                <dd>{book.reflections.length}</dd>
              </div>

              <div>
                <dt>Open questions</dt>

                <dd>{book.openQuestions.length}</dd>
              </div>

              <div>
                <dt>Version</dt>
                <dd>v{entry.version}</dd>
              </div>
            </dl>
          </section>

          {book.threads.length > 0 && (
            <section className="book-detail-sidebar__panel">
              <div className="book-detail-sidebar__heading">
                <Network size={18} strokeWidth={1.7} aria-hidden="true" />

                <h2>Reading threads</h2>
              </div>

              <div className="book-detail-sidebar__tags">
                {book.threads.map((thread) => (
                  <span key={thread}>{thread}</span>
                ))}
              </div>
            </section>
          )}

          {entry.relationships.length > 0 && (
            <section className="book-detail-sidebar__panel">
              <div className="book-detail-sidebar__heading">
                <MessageCircleMore
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <h2>Connected work</h2>
              </div>

              <div className="book-detail-sidebar__links">
                {entry.relationships.map((relationship) => (
                  <Link
                    href={getCmsEntryHref(relationship.target)}
                    key={relationship.id}
                  >
                    {relationship.target.title}

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </article>
  );
}
