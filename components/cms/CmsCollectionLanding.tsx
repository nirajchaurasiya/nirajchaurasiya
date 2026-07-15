import { ArrowUpRight, Boxes } from "lucide-react";
import Link from "next/link";

import { parseCmsContent, readFirstDetailString } from "@/lib/cms/content-data";
import { getCmsEntryHref } from "@/lib/cms/routes";
import type { CmsContentEntry } from "@/lib/cms/types";

type CmsCollectionLandingProps = {
  pageEntry: CmsContentEntry;
  entries: CmsContentEntry[];
  itemName: string;
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

export default function CmsCollectionLanding({
  pageEntry,
  entries,
  itemName,
}: CmsCollectionLandingProps) {
  const pageContent = parseCmsContent(pageEntry.data);

  const sortedEntries = [...entries].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    const leftTime = left.publishedAt
      ? new Date(left.publishedAt).getTime()
      : 0;

    const rightTime = right.publishedAt
      ? new Date(right.publishedAt).getTime()
      : 0;

    return rightTime - leftTime;
  });

  return (
    <main className="cms-collection-landing">
      <header className="cms-collection-landing__hero">
        <div>
          <span>{pageContent.hero.eyebrow || pageEntry.type}</span>

          <h1>{pageEntry.title}</h1>

          <p className="cms-collection-landing__summary">{pageEntry.summary}</p>

          {pageContent.hero.description && (
            <p className="cms-collection-landing__description">
              {pageContent.hero.description}
            </p>
          )}
        </div>

        <Boxes size={28} strokeWidth={1.4} />
      </header>

      {pageContent.sections.length > 0 && (
        <section className="cms-collection-landing__introduction">
          {pageContent.sections.map((section, index) => (
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

      <section className="cms-collection-landing__collection">
        <header>
          <div>
            <span>Published knowledge</span>

            <h2>{pageEntry.title}</h2>
          </div>

          <strong>
            {sortedEntries.length}{" "}
            {sortedEntries.length === 1 ? itemName : `${itemName}s`}
          </strong>
        </header>

        <div className="cms-collection-landing__grid">
          {sortedEntries.map((entry) => {
            const content = parseCmsContent(entry.data);

            const label =
              readFirstDetailString(content.details, [
                "status",
                "category",
                "kind",
                "stage",
                "version",
              ]) || itemName;

            const question = readFirstDetailString(content.details, [
              "centralQuestion",
              "question",
            ]);

            const publishedDate = formatDate(entry.publishedAt);

            return (
              <Link
                href={getCmsEntryHref(entry)}
                className={
                  entry.featured
                    ? "cms-dynamic-card cms-dynamic-card--featured"
                    : "cms-dynamic-card"
                }
                key={entry.id}
              >
                <header>
                  <span>{label}</span>

                  {entry.featured && <small>Featured</small>}
                </header>

                <div className="cms-dynamic-card__body">
                  <h3>{entry.title}</h3>

                  <p>{entry.summary}</p>

                  {question && <blockquote>{question}</blockquote>}
                </div>

                <footer>
                  <span>{publishedDate || `Version ${entry.version}`}</span>

                  <strong>
                    Explore
                    <ArrowUpRight size={15} />
                  </strong>
                </footer>
              </Link>
            );
          })}

          {sortedEntries.length === 0 && (
            <div className="cms-collection-landing__empty">
              <Boxes size={25} strokeWidth={1.5} />

              <h3>No published {itemName.toLowerCase()}s yet.</h3>

              <p>
                Publish the first {itemName.toLowerCase()} through the private
                content system.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
