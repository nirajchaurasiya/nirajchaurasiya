import { ArrowUpRight, CalendarDays, MapPin, Milestone } from "lucide-react";
import Link from "next/link";

import { parseCmsContent, readDetailString } from "@/lib/cms/content-data";

import type { CmsContentEntry } from "@/lib/cms/types";

type TimelineItem = {
  entry: CmsContentEntry;
  content: ReturnType<typeof parseCmsContent>;
  date: Date;
  eventDate: string;
  eventType: string;
  status: string;
  location: string;
};

function parseEventDate(value: string) {
  const date = new Date(`${value}T12:00:00`);

  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

function formatEventDate(date: Date) {
  if (date.getTime() === 0) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CmsTimeline({
  pageEntry,
  entries,
}: {
  pageEntry: CmsContentEntry;
  entries: CmsContentEntry[];
}) {
  const pageContent = parseCmsContent(pageEntry.data);

  const items: TimelineItem[] = entries
    .map((entry) => {
      const content = parseCmsContent(entry.data);

      const eventDate = readDetailString(content.details, "eventDate");

      return {
        entry,
        content,
        eventDate,
        date: parseEventDate(eventDate),

        eventType:
          readDetailString(content.details, "eventType") || "Milestone",

        status: readDetailString(content.details, "status"),

        location: readDetailString(content.details, "location"),
      };
    })
    .sort((left, right) => right.date.getTime() - left.date.getTime());

  const groupedByYear = new Map<string, TimelineItem[]>();

  for (const item of items) {
    const year =
      item.date.getTime() === 0 ? "Undated" : String(item.date.getFullYear());

    const existing = groupedByYear.get(year) ?? [];

    existing.push(item);

    groupedByYear.set(year, existing);
  }

  return (
    <main className="cms-timeline">
      <header className="cms-timeline__hero">
        <div>
          <span>{pageContent.hero.eyebrow || "Timeline"}</span>

          <h1>{pageEntry.title}</h1>

          <p className="cms-timeline__summary">{pageEntry.summary}</p>

          {pageContent.hero.description && (
            <p className="cms-timeline__description">
              {pageContent.hero.description}
            </p>
          )}
        </div>

        <Milestone size={30} strokeWidth={1.4} />
      </header>

      {pageContent.sections.length > 0 && (
        <section className="cms-timeline__introduction">
          {pageContent.sections.map((section) => (
            <article key={section.id}>
              {section.heading && <h2>{section.heading}</h2>}

              {section.body && <p>{section.body}</p>}

              {section.points.length > 0 && (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}

      <section className="cms-timeline__records">
        {[...groupedByYear.entries()].map(([year, yearItems]) => (
          <section className="cms-timeline__year" key={year}>
            <header>
              <span>Year</span>

              <h2>{year}</h2>

              <small>
                {yearItems.length}{" "}
                {yearItems.length === 1 ? "milestone" : "milestones"}
              </small>
            </header>

            <div className="cms-timeline__items">
              {yearItems.map(
                ({ entry, content, date, eventType, status, location }) => {
                  const firstSection = content.sections[0];

                  const connectedTarget = entry.relationships.find(
                    (relationship) => Boolean(relationship.target.publicPath),
                  );

                  return (
                    <article
                      className={
                        entry.featured
                          ? "cms-timeline-card cms-timeline-card--featured"
                          : "cms-timeline-card"
                      }
                      id={entry.slug}
                      key={entry.id}
                    >
                      <div className="cms-timeline-card__marker">
                        <span />
                      </div>

                      <div className="cms-timeline-card__content">
                        <header>
                          <div>
                            <span>{eventType}</span>

                            {status && <small>{status}</small>}
                          </div>

                          <time>
                            <CalendarDays size={14} />

                            {formatEventDate(date)}
                          </time>
                        </header>

                        <h3>{entry.title}</h3>

                        <p>{entry.summary}</p>

                        {firstSection?.body && (
                          <div className="cms-timeline-card__change">
                            <span>
                              {firstSection.heading || "What changed"}
                            </span>

                            <p>{firstSection.body}</p>
                          </div>
                        )}

                        {firstSection && firstSection.points.length > 0 && (
                          <ul>
                            {firstSection.points.slice(0, 4).map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        )}

                        <footer>
                          {location ? (
                            <span>
                              <MapPin size={14} />

                              {location}
                            </span>
                          ) : (
                            <span />
                          )}

                          {connectedTarget && (
                            <Link href={connectedTarget.target.publicPath!}>
                              {connectedTarget.target.title}

                              <ArrowUpRight size={15} />
                            </Link>
                          )}
                        </footer>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </section>
        ))}

        {items.length === 0 && (
          <div className="cms-timeline__empty">
            <Milestone size={27} strokeWidth={1.4} />

            <h2>No timeline records yet.</h2>

            <p>Published milestones will appear here automatically.</p>
          </div>
        )}
      </section>
    </main>
  );
}
