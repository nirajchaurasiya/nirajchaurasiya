"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  frameworkCategories,
  frameworkStatuses,
  type Framework,
  type FrameworkCategory,
  type FrameworkStatus as FrameworkStatusType,
} from "@/content/frameworks";
import FrameworkStatus from "./FrameworkStatus";

type CategoryFilter = "All Categories" | FrameworkCategory;
type StatusFilter = "All Statuses" | FrameworkStatusType;

type FrameworkExplorerProps = {
  frameworks: Framework[];
};

export default function FrameworkExplorer({
  frameworks,
}: FrameworkExplorerProps) {
  const [category, setCategory] =
    useState<CategoryFilter>("All Categories");

  const [status, setStatus] =
    useState<StatusFilter>("All Statuses");

  const visibleFrameworks = useMemo(() => {
    return frameworks.filter((framework) => {
      const categoryMatches =
        category === "All Categories" ||
        framework.category === category;

      const statusMatches =
        status === "All Statuses" ||
        framework.status === status;

      return categoryMatches && statusMatches;
    });
  }, [category, status, frameworks]);

  const filtersActive =
    category !== "All Categories" ||
    status !== "All Statuses";

  function resetFilters() {
    setCategory("All Categories");
    setStatus("All Statuses");
  }

  return (
    <section className="framework-explorer">
      <div className="framework-filter-toolbar">
        <div className="framework-filter-toolbar__heading">
          <Filter size={18} strokeWidth={1.8} aria-hidden="true" />

          <div>
            <strong>Explore the frameworks</strong>
            <span>
              {visibleFrameworks.length}{" "}
              {visibleFrameworks.length === 1
                ? "framework"
                : "frameworks"}
            </span>
          </div>
        </div>

        <label className="framework-filter-field">
          <span>Category</span>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value as CategoryFilter,
              )
            }
          >
            <option>All Categories</option>

            {frameworkCategories.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="framework-filter-field">
          <span>Status</span>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as StatusFilter)
            }
          >
            <option>All Statuses</option>

            {frameworkStatuses.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="framework-filter-reset"
          onClick={resetFilters}
          disabled={!filtersActive}
        >
          <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="framework-index-grid">
        {visibleFrameworks.map((framework, index) => (
          <Link
            href={`/frameworks/${framework.slug}`}
            className="framework-index-card"
            key={framework.slug}
          >
            <div className="framework-index-card__top">
              <span className="framework-index-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <FrameworkStatus status={framework.status} />
            </div>

            <div className="framework-index-card__identity">
              <span className="framework-index-card__short-name">
                {framework.shortName}
              </span>

              <span>{framework.version}</span>
            </div>

            <p className="framework-index-card__category">
              {framework.category}
            </p>

            <h2>{framework.title}</h2>

            <blockquote>{framework.question}</blockquote>

            <p className="framework-index-card__summary">
              {framework.summary}
            </p>

            <div className="framework-index-card__footer">
              <span>
                {framework.components.length}{" "}
                {framework.components.length === 1
                  ? "component"
                  : "components"}
              </span>

              <ArrowUpRight
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>

      {visibleFrameworks.length === 0 && (
        <div className="framework-empty-state">
          <h2>No frameworks match these filters.</h2>
          <button type="button" onClick={resetFilters}>
            Show all frameworks
          </button>
        </div>
      )}
    </section>
  );
}