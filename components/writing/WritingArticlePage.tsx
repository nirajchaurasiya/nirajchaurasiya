import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  Link2,
  Tags,
} from "lucide-react";
import type {
  WritingBlock,
  WritingItem,
  WritingRelationship,
} from "@/content/writing";
import WritingStatus from "./WritingStatus";

type WritingArticlePageProps = {
  writing: WritingItem;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function isExternal(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

export default function WritingArticlePage({
  writing,
}: WritingArticlePageProps) {
  return (
    <article className="writing-article">
      <header className="writing-article-hero">
        <nav
          className="project-breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>

          <ChevronRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <Link href="/writing">Writing</Link>

          <ChevronRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span aria-current="page">
            {writing.title}
          </span>
        </nav>

        <div className="writing-article-hero__layout">
          <div className="writing-article-hero__main">
            <div className="writing-article-hero__metadata">
              <WritingStatus
                status={writing.status}
              />

              <span>{writing.category}</span>

              <span>
                {writing.readingMinutes} min read
              </span>
            </div>

            <h1>{writing.title}</h1>

            <p className="writing-article-hero__excerpt">
              {writing.excerpt}
            </p>

            {writing.externalLinks.length > 0 && (
              <div className="writing-article-hero__actions">
                {writing.externalLinks.map(
                  (link, index) => (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      key={link.href}
                      className={
                        index === 0
                          ? "button button--primary"
                          : "button button--secondary"
                      }
                    >
                      {link.label}

                      <ExternalLink
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </a>
                  ),
                )}
              </div>
            )}
          </div>

          <aside className="writing-article-facts">
            <div>
              <CalendarDays
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>
                  {writing.publishedAt
                    ? "Published"
                    : "Updated"}
                </small>

                <strong>
                  {formatDate(
                    writing.publishedAt ??
                      writing.updatedAt,
                  )}
                </strong>
              </span>
            </div>

            <div>
              <Clock3
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Reading time</small>
                <strong>
                  {writing.readingMinutes} minutes
                </strong>
              </span>
            </div>

            <div>
              <Tags
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Topics</small>
                <strong>
                  {writing.tags.join(" · ")}
                </strong>
              </span>
            </div>
          </aside>
        </div>

        <blockquote className="writing-article-opening">
          {writing.opening}
        </blockquote>
      </header>

      <div className="writing-article-layout">
        <aside className="writing-article-sidebar">
          <p>Filed under</p>

          <strong>{writing.category}</strong>

          <div>
            {writing.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>

        <div className="writing-article-body">
          {writing.blocks.map((block, index) => (
            <WritingBlockRenderer
              block={block}
              key={`${block.type}-${index}`}
            />
          ))}
        </div>
      </div>

      <section className="writing-connections">
        <div className="writing-connections__heading">
          <p className="section-eyebrow">
            Connected work
          </p>

          <h2>
            This writing belongs to a larger system.
          </h2>
        </div>

        <div className="writing-relationship-grid">
          <RelationshipGroup
            title="Projects"
            items={writing.relatedProjects}
          />

          <RelationshipGroup
            title="Research"
            items={writing.relatedResearch}
          />

          <RelationshipGroup
            title="Frameworks"
            items={writing.relatedFrameworks}
          />
        </div>
      </section>

      <footer className="writing-article-footer">
        <Link
          href="/writing"
          className="writing-back-link"
        >
          <ArrowLeft
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Return to writing
        </Link>

        <div>
          <span>Continue exploring</span>

          <h2>
            Follow the ideas into the systems they shape.
          </h2>
        </div>

        <Link
          href="/work"
          className="button button--primary"
        >
          Explore the work

          <ArrowRight
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      </footer>
    </article>
  );
}

function WritingBlockRenderer({
  block,
}: {
  block: WritingBlock;
}) {
  switch (block.type) {
    case "heading":
      if (block.level === 3) {
        return <h3>{block.text}</h3>;
      }

      return <h2>{block.text}</h2>;

    case "paragraph":
      return <p>{block.text}</p>;

    case "quote":
      return (
        <blockquote className="writing-body-quote">
          <p>{block.text}</p>

          {block.attribution && (
            <cite>{block.attribution}</cite>
          )}
        </blockquote>
      );

    case "list":
      if (block.style === "ordered") {
        return (
          <ol>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }

      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <aside className="writing-body-callout">
          <span>{block.label}</span>
          <p>{block.text}</p>
        </aside>
      );

    case "divider":
      return <hr />;

    default:
      return null;
  }
}

function RelationshipGroup({
  title,
  items,
}: {
  title: string;
  items: WritingRelationship[];
}) {
  return (
    <article className="writing-relationship-group">
      <div className="writing-relationship-group__heading">
        <Link2
          size={17}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <h3>{title}</h3>
      </div>

      {items.length > 0 ? (
        <div>
          {items.map((item) => {
            const content = (
              <>
                <span>
                  <strong>{item.title}</strong>

                  {item.description && (
                    <small>
                      {item.description}
                    </small>
                  )}
                </span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </>
            );

            if (isExternal(item.href)) {
              return (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={item.href}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.href}
              >
                {content}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="writing-relationship-empty">
          No connected public entries yet.
        </p>
      )}
    </article>
  );
}