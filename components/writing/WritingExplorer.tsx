"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  writingCategories,
  writingStatuses,
  type WritingCategory,
  type WritingItem,
  type WritingStatus as WritingStatusType,
} from "@/content/writing";
import WritingStatus from "./WritingStatus";

type CategoryFilter =
  | "All Categories"
  | WritingCategory;

type StatusFilter =
  | "All Statuses"
  | WritingStatusType;

type WritingExplorerProps = {
  writing: WritingItem[];
};

export default function WritingExplorer({
  writing,
}: WritingExplorerProps) {
  const [query, setQuery] = useState("");

  const [category, setCategory] =
    useState<CategoryFilter>("All Categories");

  const [status, setStatus] =
    useState<StatusFilter>("All Statuses");

  const visibleWriting = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLowerCase();

    return writing.filter((item) => {
      const matchesCategory =
        category === "All Categories" ||
        item.category === category;

      const matchesStatus =
        status === "All Statuses" ||
        item.status === status;

      const searchableText = [
        item.title,
        item.excerpt,
        item.opening,
        item.category,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesQuery
      );
    });
  }, [query, category, status, writing]);

  const filtersActive =
    query.length > 0 ||
    category !== "All Categories" ||
    status !== "All Statuses";

  function resetFilters() {
    setQuery("");
    setCategory("All Categories");
    setStatus("All Statuses");
  }

  return (
    <section className="writing-explorer">
      <div className="writing-filter-toolbar">
        <div className="writing-filter-toolbar__heading">
          <SlidersHorizontal
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <div>
            <strong>Explore the writing</strong>
            <span>
              {visibleWriting.length}{" "}
              {visibleWriting.length === 1
                ? "entry"
                : "entries"}
            </span>
          </div>
        </div>

        <label className="writing-search-field">
          <span className="visually-hidden">
            Search writing
          </span>

          <Search
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <input
            type="search"
            value={query}
            placeholder="Search titles, topics or tags"
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </label>

        <label className="writing-filter-field">
          <span>Category</span>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target
                  .value as CategoryFilter,
              )
            }
          >
            <option>All Categories</option>

            {writingCategories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="writing-filter-field">
          <span>Status</span>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as StatusFilter,
              )
            }
          >
            <option>All Statuses</option>

            {writingStatuses.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="writing-filter-reset"
          onClick={resetFilters}
          disabled={!filtersActive}
        >
          <RotateCcw
            size={15}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Reset
        </button>
      </div>

      <div className="writing-index-list">
        {visibleWriting.map((item, index) => (
          <Link
            href={`/writing/${item.slug}`}
            className="writing-index-item"
            key={item.slug}
          >
            <span className="writing-index-item__number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="writing-index-item__main">
              <div className="writing-index-item__metadata">
                <WritingStatus status={item.status} />
                <span>{item.category}</span>
                <span>
                  {item.readingMinutes} min read
                </span>
              </div>

              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>

              <div className="writing-index-item__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <blockquote>{item.opening}</blockquote>

            <ArrowUpRight
              className="writing-index-item__arrow"
              size={20}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </Link>
        ))}

        {visibleWriting.length === 0 && (
          <div className="writing-empty-state">
            <h2>No writing matches these filters.</h2>
            <p>
              Try another search or return to the
              complete writing archive.
            </p>

            <button
              type="button"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}