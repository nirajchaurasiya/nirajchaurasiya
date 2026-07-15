import {
  ArrowUpRight,
  BookOpenText,
  Clock3,
} from "lucide-react";
import Link from "next/link";

import {
  getPublishedContent,
} from "@/lib/cms/client";

import {
  parseCmsContent,
  readDetailString,
} from "@/lib/cms/content-data";

function formatPublishedDate(
  value: string | null,
) {
  if (!value) {
    return "Publication date unavailable";
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

export default async function CmsWritingList() {
  const entries =
    await getPublishedContent(
      "WRITING",
    );

  const sortedEntries =
    [...entries].sort(
      (left, right) => {
        if (
          left.featured !==
          right.featured
        ) {
          return left.featured
            ? -1
            : 1;
        }

        const leftDate =
          left.publishedAt
            ? new Date(
                left.publishedAt,
              ).getTime()
            : 0;

        const rightDate =
          right.publishedAt
            ? new Date(
                right.publishedAt,
              ).getTime()
            : 0;

        return (
          rightDate -
          leftDate
        );
      },
    );

  return (
    <section className="cms-writing-section">
      <header className="cms-writing-section__header">
        <div>
          <span>
            From the knowledge system
          </span>

          <h2>
            Published writing
          </h2>

          <p>
            Essays, research notes, reflections,
            and building notes published through
            the private content system.
          </p>
        </div>

        <BookOpenText
          size={25}
          strokeWidth={1.5}
        />
      </header>

      <div className="cms-writing-grid">
        {sortedEntries.map(
          (entry) => {
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

            const href =
              entry.publicPath ||
              `/writing/${entry.slug}`;

            return (
              <Link
                href={href}
                className={
                  entry.featured
                    ? "cms-writing-card cms-writing-card--featured"
                    : "cms-writing-card"
                }
                key={entry.id}
              >
                <header>
                  <span>
                    {category}
                  </span>

                  {entry.featured && (
                    <small>
                      Featured
                    </small>
                  )}
                </header>

                <div className="cms-writing-card__content">
                  <h3>
                    {entry.title}
                  </h3>

                  <p>
                    {entry.summary}
                  </p>

                  {centralQuestion && (
                    <blockquote>
                      {centralQuestion}
                    </blockquote>
                  )}
                </div>

                <footer>
                  <span>
                    <Clock3
                      size={14}
                    />

                    {readingTime ||
                      formatPublishedDate(
                        entry.publishedAt,
                      )}
                  </span>

                  <strong>
                    Read
                    <ArrowUpRight
                      size={15}
                    />
                  </strong>
                </footer>
              </Link>
            );
          },
        )}

        {sortedEntries.length ===
          0 && (
          <div className="cms-writing-empty">
            <BookOpenText
              size={25}
              strokeWidth={1.5}
            />

            <h3>
              No CMS writing published yet.
            </h3>

            <p>
              Published writing entries will
              appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}