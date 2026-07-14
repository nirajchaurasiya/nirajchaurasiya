"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  mediaStatuses,
  mediaTypes,
  type MediaItem,
  type MediaStatus,
  type MediaType,
} from "@/content/media";

type TypeFilter = "All Types" | MediaType;
type StatusFilter = "All Statuses" | MediaStatus;

export default function MediaExplorer({
  media,
}: {
  media: MediaItem[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] =
    useState<TypeFilter>("All Types");
  const [status, setStatus] =
    useState<StatusFilter>("All Statuses");

  const visibleMedia = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return media.filter((item) => {
      const matchesType =
        type === "All Types" || item.type === type;

      const matchesStatus =
        status === "All Statuses" ||
        item.status === status;

      const matchesQuery =
        normalized.length === 0 ||
        [
          item.title,
          item.summary,
          item.platform,
          item.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return matchesType && matchesStatus && matchesQuery;
    });
  }, [media, query, type, status]);

  return (
    <section className="media-explorer">
      <div className="media-toolbar">
        <label className="media-search">
          <Search size={17} strokeWidth={1.8} />
          <input
            type="search"
            value={query}
            placeholder="Search media"
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </label>

        <label>
          <span>Type</span>
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as TypeFilter)
            }
          >
            <option>All Types</option>
            {mediaTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
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
            {mediaStatuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="media-grid">
        {visibleMedia.map((item, index) => (
          <article className="media-card" key={item.slug}>
            <Link
              href={`/media/${item.slug}`}
              className="media-card__main"
            >
              <div className="media-card__top">
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{item.status}</strong>
              </div>

              <div className="media-card__visual">
                <span>{item.type}</span>
              </div>

              <p>{item.platform}</p>
              <h2>{item.title}</h2>
              <blockquote>{item.summary}</blockquote>

              <div className="media-card__footer">
                <span>
                  {item.episodeCount
                    ? `${item.episodeCount} episodes`
                    : item.type}
                </span>

                <ArrowUpRight size={18} strokeWidth={1.8} />
              </div>
            </Link>

            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="media-card__external"
              >
                Open on {item.platform.split("·")[0].trim()}
                <ExternalLink size={15} strokeWidth={1.8} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}