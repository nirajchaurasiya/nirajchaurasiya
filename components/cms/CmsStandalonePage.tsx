import {
  ArrowUpRight,
  CalendarDays,
  Compass,
  Link2,
  MapPin,
} from "lucide-react";
import Link from "next/link";

import { parseCmsContent, readDetailString } from "@/lib/cms/content-data";

import type { CmsContentEntry } from "@/lib/cms/types";

function formatDate(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CmsStandalonePage({
  entry,
}: {
  entry: CmsContentEntry;
}) {
  const content = parseCmsContent(entry.data);

  const lastUpdated = readDetailString(content.details, "lastUpdated");

  const location = readDetailString(content.details, "location");

  return (
    <main className="cms-collection-landing">
      <header className="cms-collection-landing__hero">
        <div>
          <span>{content.hero.eyebrow || entry.title}</span>

          <h1>{entry.title}</h1>

          <p className="cms-collection-landing__summary">{entry.summary}</p>

          {content.hero.description && (
            <p className="cms-collection-landing__description">
              {content.hero.description}
            </p>
          )}

          {(lastUpdated || location) && (
            <div className="cms-knowledge-detail__metadata">
              {lastUpdated && (
                <span>
                  <CalendarDays size={15} />
                  Updated {formatDate(lastUpdated)}
                </span>
              )}

              {location && (
                <span>
                  <MapPin size={15} />

                  {location}
                </span>
              )}
            </div>
          )}
        </div>

        <Compass size={29} strokeWidth={1.4} />
      </header>

      {content.sections.length > 0 && (
        <section className="cms-collection-landing__introduction">
          {content.sections.map((section, index) => (
            <article id={section.id} key={section.id}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>

                {section.heading && <h2>{section.heading}</h2>}
              </header>

              <div>
                {section.body && <p>{section.body}</p>}

                {section.points.length > 0 && (
                  <ul>
                    {section.points.map((point, pointIndex) => (
                      <li key={`${section.id}-${pointIndex}`}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {content.tags.length > 0 && (
        <section className="cms-knowledge-tags">
          <span>Current themes</span>

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
              <span>Active connections</span>

              <h2>Work connected to now</h2>
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
    </main>
  );
}
