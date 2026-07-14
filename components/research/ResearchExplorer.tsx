"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  queryToResearchArea,
  researchAreas,
  researchStatuses,
  type ResearchArea,
  type ResearchItem,
  type ResearchStatus as ResearchStatusType,
} from "@/content/research";
import ResearchStatus from "./ResearchStatus";

type AreaFilter = "All Areas" | ResearchArea;
type StatusFilter = "All Statuses" | ResearchStatusType;

type ResearchExplorerProps = {
  research: ResearchItem[];
};

export default function ResearchExplorer({
  research,
}: ResearchExplorerProps) {
  const searchParams = useSearchParams();

  const [areaFilter, setAreaFilter] = useState<AreaFilter>("All Areas");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All Statuses");

  useEffect(() => {
    const requestedArea = queryToResearchArea(searchParams.get("area"));

    if (requestedArea) {
      setAreaFilter(requestedArea);
    }
  }, [searchParams]);

  const filteredResearch = useMemo(() => {
    return research.filter((item) => {
      const matchesArea =
        areaFilter === "All Areas" || item.areas.includes(areaFilter);

      const matchesStatus =
        statusFilter === "All Statuses" || item.status === statusFilter;

      return matchesArea && matchesStatus;
    });
  }, [areaFilter, statusFilter, research]);

  const filtersActive =
    areaFilter !== "All Areas" || statusFilter !== "All Statuses";

  function resetFilters() {
    setAreaFilter("All Areas");
    setStatusFilter("All Statuses");
  }

  return (
    <section className="research-explorer">
      <div className="research-filters">
        <div className="research-filters__heading">
          <Filter size={18} strokeWidth={1.8} aria-hidden="true" />

          <div>
            <strong>Explore the research</strong>
            <span>
              {filteredResearch.length}{" "}
              {filteredResearch.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </div>

        <label className="research-filter-field">
          <span>Research area</span>

          <select
            value={areaFilter}
            onChange={(event) =>
              setAreaFilter(event.target.value as AreaFilter)
            }
          >
            <option>All Areas</option>

            {researchAreas.map((area) => (
              <option value={area} key={area}>
                {area}
              </option>
            ))}
          </select>
        </label>

        <label className="research-filter-field">
          <span>Status</span>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
          >
            <option>All Statuses</option>

            {researchStatuses.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="research-filter-reset"
          onClick={resetFilters}
          disabled={!filtersActive}
        >
          <RotateCcw size={15} strokeWidth={1.8} aria-hidden="true" />
          Reset
        </button>
      </div>

      <div className="research-list">
        {filteredResearch.map((item, index) => (
          <Link
            href={`/research/${item.slug}`}
            className="research-list-item"
            key={item.slug}
          >
            <div className="research-list-item__number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="research-list-item__main">
              <div className="research-list-item__metadata">
                <ResearchStatus status={item.status} />
                <span>{item.kind}</span>
              </div>

              <h2>{item.title}</h2>
              <p className="research-list-item__question">{item.question}</p>

              <div className="research-list-item__areas">
                {item.areas.map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </div>

            <p className="research-list-item__abstract">{item.abstract}</p>

            <div className="research-list-item__review">
              <span>Review status</span>

              <strong>
                {item.peerReviewed
                  ? "Peer reviewed"
                  : "Not formally peer reviewed"}
              </strong>
            </div>

            <ArrowUpRight
              className="research-list-item__arrow"
              size={20}
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </Link>
        ))}

        {filteredResearch.length === 0 && (
          <div className="research-empty-state">
            <h2>No research matches these filters.</h2>
            <p>
              Reset the filters to return to the complete research map.
            </p>

            <button type="button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}