"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  timelineEventTypes,
  timelineYears,
  type TimelineEvent,
  type TimelineEventType,
} from "@/content/timeline";

type TimelineExplorerProps = {
  events: TimelineEvent[];
};

type TypeFilter = "All Types" | TimelineEventType;
type YearFilter = "All Years" | string;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function TimelineExplorer({
  events,
}: TimelineExplorerProps) {
  const [query, setQuery] = useState("");
  const [type, setType] =
    useState<TypeFilter>("All Types");
  const [year, setYear] =
    useState<YearFilter>("All Years");

  const visibleEvents = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return events.filter((event) => {
      const eventYear = new Date(
        `${event.date}T00:00:00Z`,
      )
        .getUTCFullYear()
        .toString();

      const matchesType =
        type === "All Types" || event.type === type;

      const matchesYear =
        year === "All Years" || eventYear === year;

      const matchesQuery =
        normalized.length === 0 ||
        [
          event.title,
          event.description,
          event.label,
          event.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return matchesType && matchesYear && matchesQuery;
    });
  }, [events, query, type, year]);

  const groupedEvents = useMemo(() => {
    return visibleEvents.reduce<
      Record<string, TimelineEvent[]>
    >((groups, event) => {
      const eventYear = new Date(
        `${event.date}T00:00:00Z`,
      )
        .getUTCFullYear()
        .toString();

      groups[eventYear] ??= [];
      groups[eventYear].push(event);

      return groups;
    }, {});
  }, [visibleEvents]);

  const filtersActive =
    query.length > 0 ||
    type !== "All Types" ||
    year !== "All Years";

  function resetFilters() {
    setQuery("");
    setType("All Types");
    setYear("All Years");
  }

  return (
    <section className="timeline-explorer">
      <div className="timeline-toolbar">
        <div className="timeline-toolbar__heading">
          <Filter size={18} strokeWidth={1.8} />

          <div>
            <strong>Explore the timeline</strong>
            <span>{visibleEvents.length} events</span>
          </div>
        </div>

        <label className="timeline-search">
          <Search size={17} strokeWidth={1.8} />
          <input
            type="search"
            value={query}
            placeholder="Search the timeline"
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </label>

        <label className="timeline-select">
          <span>Type</span>
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as TypeFilter)
            }
          >
            <option>All Types</option>
            {timelineEventTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="timeline-select">
          <span>Year</span>
          <select
            value={year}
            onChange={(event) =>
              setYear(event.target.value)
            }
          >
            <option>All Years</option>
            {timelineYears.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="timeline-reset"
          disabled={!filtersActive}
          onClick={resetFilters}
        >
          <RotateCcw size={15} strokeWidth={1.8} />
          Reset
        </button>
      </div>

      <div className="timeline-years">
        {Object.entries(groupedEvents)
          .sort(
            ([yearA], [yearB]) =>
              Number(yearB) - Number(yearA),
          )
          .map(([groupYear, yearEvents]) => (
            <section
              className="timeline-year"
              key={groupYear}
            >
              <aside>
                <span>{groupYear}</span>
                <small>{yearEvents.length} events</small>
              </aside>

              <div className="timeline-event-list">
                {yearEvents.map((event) => {
                  const content = (
                    <>
                      <div className="timeline-event__date">
                        <time dateTime={event.date}>
                          {formatDate(event.date)}
                        </time>
                        <span>{event.type}</span>
                      </div>

                      <div className="timeline-event__content">
                        {event.label && (
                          <small>{event.label}</small>
                        )}

                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                      </div>

                      {event.href && (
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.8}
                        />
                      )}
                    </>
                  );

                  if (event.href) {
                    return (
                      <Link
                        href={event.href}
                        className="timeline-event"
                        key={event.id}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <article
                      className="timeline-event"
                      key={event.id}
                    >
                      {content}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
      </div>

      {visibleEvents.length === 0 && (
        <div className="timeline-empty">
          <h2>No timeline events match.</h2>
          <button type="button" onClick={resetFilters}>
            Reset filters
          </button>
        </div>
      )}
    </section>
  );
}