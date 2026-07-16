import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  MessageCircleMore,
  Network,
  Quote,
} from "lucide-react";

import {
  parseCmsBook,
  splitCmsParagraphs,
  type ParsedCmsBook,
} from "@/lib/cms/book-data";
import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { parseCmsContent } from "@/lib/cms/content-data";
import { createCmsPageMetadata } from "@/lib/cms/metadata";
import { getCmsEntryHref } from "@/lib/cms/routes";

import { siteConfig } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "books");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Conversation Across Times Not Found",
      };
}

function BookConversationCard({ book }: { book: ParsedCmsBook }) {
  const connectionNames = book.entry.relationships
    .map((relationship) => relationship.target.title)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <article className="book-conversation-card">
      <div className="book-conversation-card__header">
        <span className="book-conversation-card__status">
          <Clock3 size={14} strokeWidth={1.8} aria-hidden="true" />

          {book.status}
        </span>

        <BookOpenText
          className="book-conversation-card__icon"
          size={19}
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </div>

      <div className="book-conversation-card__identity">
        <p>{book.author}</p>
        <h3>{book.entry.title}</h3>
      </div>

      <div className="book-conversation-card__question">
        <span>Question entering the conversation</span>

        <p>{book.centralQuestion}</p>
      </div>

      <p className="book-conversation-card__reflection">
        {book.currentReflection}
      </p>

      {connectionNames.length > 0 && (
        <div
          className="book-conversation-card__connections"
          aria-label={`Ideas connected to ${book.entry.title}`}
        >
          {connectionNames.map((connection) => (
            <span key={connection}>{connection}</span>
          ))}
        </div>
      )}

      <Link
        href={getCmsEntryHref(book.entry)}
        className="book-conversation-card__link"
        aria-label={`Open the conversation about ${book.entry.title}`}
      >
        Open conversation
        <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </Link>
    </article>
  );
}

export default async function BooksPage() {
  const [pageEntry, bookEntries] = await Promise.all([
    getPublishedEntry("PAGE", "books"),

    getPublishedContent("BOOK"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  const pageContent = parseCmsContent(pageEntry.data);

  const books = bookEntries.map(parseCmsBook);

  const activeBooks = books.filter(
    (book) =>
      book.status === "Currently reading" || book.status === "In conversation",
  );

  const archivedBooks = books.filter(
    (book) =>
      book.status !== "Currently reading" && book.status !== "In conversation",
  );

  const principlesSection = pageContent.sections.find((section) =>
    section.heading.toLowerCase().includes("what counts"),
  );

  const closingSection = pageContent.sections.find((section) =>
    section.heading.toLowerCase().includes("does not end"),
  );

  const threadMap = new Map<string, ParsedCmsBook[]>();

  for (const book of books) {
    for (const thread of book.threads) {
      const existing = threadMap.get(thread) ?? [];

      existing.push(book);

      threadMap.set(thread, existing);
    }
  }

  const readingThreads = [...threadMap.entries()].sort(([left], [right]) =>
    left.localeCompare(right),
  );

  const heroText = pageContent.hero.description || pageEntry.summary;

  const heroParagraphs = splitCmsParagraphs(heroText);

  const heroLead = heroParagraphs[0] || pageEntry.summary;

  const heroDescription = heroParagraphs.slice(1).join("\n\n");

  const pageUrl = `${siteConfig.url}/books`;

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "CollectionPage",

    name: pageEntry.title,

    description: pageEntry.summary,

    url: pageUrl,

    isPartOf: {
      "@type": "WebSite",

      name: siteConfig.name,

      url: siteConfig.url,
    },

    creator: {
      "@type": "Person",

      name: siteConfig.name,

      url: siteConfig.url,
    },

    mainEntity: {
      "@type": "ItemList",

      numberOfItems: books.length,

      itemListElement: books.map((book, index) => ({
        "@type": "ListItem",

        position: index + 1,

        url: `${siteConfig.url}${getCmsEntryHref(book.entry)}`,

        item: {
          "@type": "Book",

          name: book.entry.title,

          author: {
            "@type": "Person",

            name: book.author,
          },
        },
      })),
    },
  };

  return (
    <div className="books-page">
      <section className="books-hero" aria-labelledby="books-page-title">
        <div className="books-hero__symbol" aria-hidden="true">
          <BookOpenText size={24} strokeWidth={1.7} />
        </div>

        <p className="books-eyebrow">
          {pageContent.hero.eyebrow ||
            "Books · Ideas · Intellectual Conversations"}
        </p>

        <h1 id="books-page-title">{pageEntry.title}</h1>

        <p className="books-hero__lead">{heroLead}</p>

        {heroDescription && (
          <p className="books-hero__description">{heroDescription}</p>
        )}

        <blockquote className="books-hero__quote">
          <Quote size={18} strokeWidth={1.7} aria-hidden="true" />

          <p>
            I do not read only to finish books. I read to let another mind
            interfere with my own.
          </p>
        </blockquote>
      </section>

      <section
        className="books-section books-section--current"
        aria-labelledby="current-conversations-heading"
      >
        <header className="books-section__header">
          <div>
            <p className="books-section__eyebrow">Current shelf</p>

            <h2 id="current-conversations-heading">
              Currently in conversation
            </h2>
          </div>

          <span className="books-section__count">
            {activeBooks.length} active{" "}
            {activeBooks.length === 1 ? "conversation" : "conversations"}
          </span>
        </header>

        {activeBooks.length > 0 ? (
          <div className="book-conversation-grid">
            {activeBooks.map((book) => (
              <BookConversationCard book={book} key={book.entry.id} />
            ))}
          </div>
        ) : (
          <div className="books-empty-state">
            <BookOpenText size={25} strokeWidth={1.6} aria-hidden="true" />

            <h3>No active conversations are published.</h3>

            <p>
              Published books marked as currently reading or in conversation
              will appear here.
            </p>
          </div>
        )}
      </section>

      {principlesSection && (
        <section
          className="books-section"
          aria-labelledby="reading-principles-heading"
        >
          <header className="books-section__header">
            <div>
              <p className="books-section__eyebrow">Reading philosophy</p>

              <h2 id="reading-principles-heading">
                {principlesSection.heading}
              </h2>

              {principlesSection.body && (
                <p className="books-section__introduction">
                  {principlesSection.body}
                </p>
              )}
            </div>
          </header>

          {principlesSection.points.length > 0 && (
            <div className="reading-principles-grid">
              {principlesSection.points.map((principle, index) => (
                <article className="reading-principle-card" key={principle}>
                  <span className="reading-principle-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3>{principle}</h3>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {readingThreads.length > 0 && (
        <section
          className="books-section"
          aria-labelledby="reading-threads-heading"
        >
          <header className="books-section__header">
            <div>
              <p className="books-section__eyebrow">Intellectual map</p>

              <h2 id="reading-threads-heading">Reading threads</h2>
            </div>

            <Network size={21} strokeWidth={1.7} aria-hidden="true" />
          </header>

          <div className="reading-thread-list">
            {readingThreads.map(([thread, threadBooks], index) => (
              <article className="reading-thread" key={thread}>
                <span className="reading-thread__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="reading-thread__body">
                  <h3>{thread}</h3>

                  <p>
                    This question appears across {threadBooks.length} published{" "}
                    {threadBooks.length === 1
                      ? "conversation"
                      : "conversations"}
                    .
                  </p>

                  <div className="reading-thread__books">
                    {threadBooks.map((book) => (
                      <Link
                        href={getCmsEntryHref(book.entry)}
                        key={book.entry.id}
                      >
                        {book.entry.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <MessageCircleMore
                  className="reading-thread__icon"
                  size={19}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {archivedBooks.length > 0 && (
        <section className="books-section">
          <header className="books-section__header">
            <div>
              <p className="books-section__eyebrow">Preserved conversations</p>

              <h2>Completed and paused</h2>
            </div>

            <span className="books-section__count">
              {archivedBooks.length}{" "}
              {archivedBooks.length === 1 ? "conversation" : "conversations"}
            </span>
          </header>

          <div className="book-conversation-grid">
            {archivedBooks.map((book) => (
              <BookConversationCard book={book} key={book.entry.id} />
            ))}
          </div>
        </section>
      )}

      <section className="books-closing">
        <div className="books-closing__icon" aria-hidden="true">
          <MessageCircleMore size={22} strokeWidth={1.7} />
        </div>

        <div>
          <p className="books-section__eyebrow">An evolving archive</p>

          <h2>
            {closingSection?.heading ||
              "The conversation does not end with the final page."}
          </h2>

          <p>
            {closingSection?.body ||
              "Some books become writing. Some become frameworks. Some interfere with projects already being built. Others remain unresolved questions that may return years later."}
          </p>
        </div>
      </section>
    </div>
  );
}
