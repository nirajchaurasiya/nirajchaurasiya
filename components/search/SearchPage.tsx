"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Archive,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  FileText,
  FlaskConical,
  Network,
  PenLine,
  PlaySquare,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  searchTypes,
  type SearchEntry,
  type SearchType,
} from "@/content/search";

type SearchFilter = "All" | SearchType;

const typeIcons = {
  Page: FileText,
  Project: BriefcaseBusiness,
  Research: FlaskConical,
  Framework: Network,
  Writing: PenLine,
  Book: BookOpenText,
  Media: PlaySquare,
  Archive: Archive,
} satisfies Record<SearchType, typeof FileText>;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(entry: SearchEntry, query: string) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return 1;
  }

  const terms = normalizedQuery.split(" ");

  const title = normalizeText(entry.title);

  const description = normalizeText(entry.description);

  const keywords = normalizeText(entry.keywords.join(" "));

  let score = 0;

  if (title === normalizedQuery) {
    score += 120;
  }

  if (title.startsWith(normalizedQuery)) {
    score += 80;
  }

  if (title.includes(normalizedQuery)) {
    score += 55;
  }

  if (description.includes(normalizedQuery)) {
    score += 25;
  }

  if (keywords.includes(normalizedQuery)) {
    score += 20;
  }

  for (const term of terms) {
    if (title.includes(term)) {
      score += 15;
    }

    if (description.includes(term)) {
      score += 6;
    }

    if (keywords.includes(term)) {
      score += 5;
    }
  }

  return score;
}

type SearchPageProps = {
  entries: SearchEntry[];
};

export default function SearchPage({ entries }: SearchPageProps) {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);

  const [filter, setFilter] = useState<SearchFilter>("All");

  const results = useMemo(() => {
    return entries
      .map((entry) => ({
        ...entry,
        score: scoreEntry(entry, query),
      }))
      .filter((entry) => {
        const matchesQuery = query.trim().length === 0 || entry.score > 0;

        const matchesType = filter === "All" || entry.type === filter;

        return matchesQuery && matchesType;
      })
      .sort((a, b) => {
        if (query.trim()) {
          return b.score - a.score;
        }

        return (
          (b.date ?? "").localeCompare(a.date ?? "") ||
          a.title.localeCompare(b.title)
        );
      });
  }, [query, filter]);

  return (
    <div className="global-search-page">
      <section className="global-search-hero">
        <p className="section-eyebrow">Search the knowledge system</p>

        <h1>
          Find a project, question,
          <span>framework, or piece of writing.</span>
        </h1>

        <div className="global-search-input">
          <Search size={22} strokeWidth={1.7} aria-hidden="true" />

          <input
            type="search"
            autoFocus
            value={query}
            placeholder="Search learning, robotics, uncertainty..."
            aria-label="Search the website"
            onChange={(event) => setQuery(event.target.value)}
          />

          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          className="global-search-filters"
          role="group"
          aria-label="Filter search results"
        >
          <button
            type="button"
            className={
              filter === "All"
                ? "global-search-filter global-search-filter--active"
                : "global-search-filter"
            }
            onClick={() => setFilter("All")}
          >
            All
          </button>

          {searchTypes.map((type) => (
            <button
              type="button"
              key={type}
              className={
                filter === type
                  ? "global-search-filter global-search-filter--active"
                  : "global-search-filter"
              }
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="global-search-results">
        <div className="global-search-results__heading">
          <span>{query ? `Results for “${query}”` : "Explore everything"}</span>

          <strong>
            {results.length} {results.length === 1 ? "result" : "results"}
          </strong>
        </div>

        {results.length > 0 ? (
          <div className="global-search-list">
            {results.map((entry) => {
              const Icon = typeIcons[entry.type] ?? FileText;

              return (
                <Link
                  href={entry.href}
                  className="global-search-result"
                  key={entry.id}
                >
                  <div className="global-search-result__icon">
                    <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <div className="global-search-result__content">
                    <div className="global-search-result__metadata">
                      <span>{entry.type}</span>

                      {entry.status && <span>{entry.status}</span>}
                    </div>

                    <h2>{entry.title}</h2>
                    <p>{entry.description}</p>

                    {entry.keywords.length > 0 && (
                      <div className="global-search-result__keywords">
                        {entry.keywords.slice(0, 4).map((keyword) => (
                          <span key={keyword}>{keyword}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="global-search-empty">
            <Search size={28} strokeWidth={1.5} aria-hidden="true" />

            <h2>No matching entries found.</h2>

            <p>
              Try a broader term such as learning, systems, robotics, evidence,
              or uncertainty.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
