import {
  ArrowUpRight,
  Boxes,
} from "lucide-react";
import Link from "next/link";

import {
  getPublishedContent,
} from "@/lib/cms/client";
import {
  parseCmsContent,
  readFirstDetailString,
} from "@/lib/cms/content-data";
import {
  getCmsEntryHref,
} from "@/lib/cms/routes";
import type {
  CmsContentType,
} from "@/lib/cms/types";

type CollectionType =
  | "PROJECT"
  | "RESEARCH"
  | "FRAMEWORK";

type CmsCollectionSectionProps = {
  type: CollectionType;
  eyebrow: string;
  title: string;
  description: string;
};

function formatType(
  value: CmsContentType,
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

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
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
}

export default async function CmsCollectionSection({
  type,
  eyebrow,
  title,
  description,
}: CmsCollectionSectionProps) {
  const entries =
    await getPublishedContent(type);

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

        return rightDate - leftDate;
      },
    );

  return (
    <section className="cms-collection">
      <header className="cms-collection__header">
        <div>
          <span>{eyebrow}</span>

          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        <Boxes
          size={25}
          strokeWidth={1.5}
        />
      </header>

      <div className="cms-collection__grid">
        {sortedEntries.map(
          (entry) => {
            const content =
              parseCmsContent(
                entry.data,
              );

            const label =
              readFirstDetailString(
                content.details,
                [
                  "status",
                  "category",
                  "kind",
                  "stage",
                  "version",
                ],
              ) ||
              formatType(entry.type);

            const question =
              readFirstDetailString(
                content.details,
                [
                  "centralQuestion",
                  "question",
                ],
              );

            return (
              <Link
                href={getCmsEntryHref(
                  entry,
                )}
                className={
                  entry.featured
                    ? "cms-collection-card cms-collection-card--featured"
                    : "cms-collection-card"
                }
                key={entry.id}
              >
                <header>
                  <span>{label}</span>

                  {entry.featured && (
                    <small>
                      Featured
                    </small>
                  )}
                </header>

                <div>
                  <h3>
                    {entry.title}
                  </h3>

                  <p>
                    {entry.summary}
                  </p>

                  {question && (
                    <blockquote>
                      {question}
                    </blockquote>
                  )}
                </div>

                <footer>
                  <span>
                    {formatDate(
                      entry.publishedAt,
                    ) ||
                      `Version ${entry.version}`}
                  </span>

                  <strong>
                    Explore

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
          <div className="cms-collection__empty">
            <Boxes
              size={25}
              strokeWidth={1.5}
            />

            <h3>
              No published entries yet.
            </h3>

            <p>
              Published{" "}
              {formatType(
                type,
              ).toLowerCase()}{" "}
              entries will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}