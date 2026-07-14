"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  projectCategories,
  projectStatuses,
  type Project,
  type ProjectCategory,
  type ProjectStatus as ProjectStatusType,
} from "@/content/projects";
import ProjectStatus from "./ProjectStatus";

type WorkFilter =
  | "All"
  | ProjectCategory
  | ProjectStatusType;

type WorkExplorerProps = {
  projects: Project[];
};

const filters: WorkFilter[] = [
  "All",
  ...projectCategories,
  ...projectStatuses,
];

export default function WorkExplorer({ projects }: WorkExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.status === activeFilter ||
        project.categories.includes(activeFilter as ProjectCategory),
    );
  }, [activeFilter, projects]);

  return (
    <section className="work-explorer">
      <div className="work-filter-toolbar">
        <div className="work-filter-toolbar__heading">
          <SlidersHorizontal size={17} strokeWidth={1.8} aria-hidden="true" />

          <div>
            <span>Filter the work</span>
            <small>
              {visibleProjects.length}{" "}
              {visibleProjects.length === 1 ? "project" : "projects"}
            </small>
          </div>
        </div>

        <div className="work-filter-list" role="group" aria-label="Work filters">
          {filters.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <button
                type="button"
                key={filter}
                className={`work-filter ${
                  selected ? "work-filter--active" : ""
                }`}
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <div className="work-project-grid">
          {visibleProjects.map((project, index) => (
            <Link
              href={`/work/${project.slug}`}
              className="work-project-card"
              key={project.slug}
            >
              <div className="work-project-card__top">
                <span className="work-project-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <ProjectStatus status={project.status} />
              </div>

              <div className="work-project-card__mark" aria-hidden="true">
                {project.shortName}
              </div>

              <div className="work-project-card__content">
                <p className="work-project-card__type">{project.type}</p>
                <h2>{project.title}</h2>
                <p className="work-project-card__summary">{project.summary}</p>
              </div>

              <div className="work-project-card__categories">
                {project.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>

              <div className="work-project-card__direction">
                <div>
                  <span>Current direction</span>
                  <p>{project.currentDirection}</p>
                </div>

                <ArrowUpRight
                  size={20}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="work-empty-state">
          <Layers3 size={28} strokeWidth={1.5} aria-hidden="true" />
          <h2>No projects match this filter.</h2>
          <button type="button" onClick={() => setActiveFilter("All")}>
            Show all work
          </button>
        </div>
      )}
    </section>
  );
}