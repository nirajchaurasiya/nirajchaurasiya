import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  ExternalLink,
  Layers3,
} from "lucide-react";
import type {
  MediaItem,
  MediaRelationship,
} from "@/content/media";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function MediaDetailPage({
  media,
}: {
  media: MediaItem;
}) {
  return (
    <article className="media-detail-page">
      <header className="media-detail-hero">
        <nav className="project-breadcrumbs">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/media">Media</Link>
          <ChevronRight size={14} />
          <span>{media.title}</span>
        </nav>

        <div className="media-detail-hero__layout">
          <div>
            <div className="media-detail-metadata">
              <span>{media.status}</span>
              <span>{media.type}</span>
              <span>{media.platform}</span>
            </div>

            <h1>{media.title}</h1>
            <p>{media.description}</p>

            {media.externalUrl && (
              <a
                href={media.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="button button--primary"
              >
                Open media
                <ExternalLink size={16} strokeWidth={1.8} />
              </a>
            )}
          </div>

          <aside>
            <div>
              <CalendarDays size={18} />
              <span>
                <small>
                  {media.publishedAt
                    ? "Published"
                    : "Updated"}
                </small>
                <strong>
                  {formatDate(
                    media.publishedAt ?? media.updatedAt,
                  )}
                </strong>
              </span>
            </div>

            <div>
              <Layers3 size={18} />
              <span>
                <small>Format</small>
                <strong>{media.type}</strong>
              </span>
            </div>
          </aside>
        </div>
      </header>

      <section className="media-detail-content">
        {media.sections.map((section, index) => (
          <article key={section.heading}>
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h2>{section.heading}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.points && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="media-connections">
        <h2>Connected work</h2>

        <div>
          <RelationshipGroup
            title="Projects"
            items={media.relatedProjects}
          />

          <RelationshipGroup
            title="Research"
            items={media.relatedResearch}
          />

          <RelationshipGroup
            title="Frameworks"
            items={media.relatedFrameworks}
          />
        </div>
      </section>

      <footer className="media-detail-footer">
        <Link href="/media">
          <ArrowLeft size={17} />
          Return to media
        </Link>

        <Link href="/work" className="button button--primary">
          Explore the work
          <ArrowRight size={17} />
        </Link>
      </footer>
    </article>
  );
}

function RelationshipGroup({
  title,
  items,
}: {
  title: string;
  items: MediaRelationship[];
}) {
  return (
    <article>
      <h3>{title}</h3>

      {items.length > 0 ? (
        items.map((item) => (
          <Link href={item.href} key={item.href}>
            <span>
              <strong>{item.title}</strong>
              {item.description && (
                <small>{item.description}</small>
              )}
            </span>
            <ArrowUpRight size={16} />
          </Link>
        ))
      ) : (
        <p>No connected entries yet.</p>
      )}
    </article>
  );
}