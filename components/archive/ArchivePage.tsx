import Link from "next/link";
import {
  Archive,
  ArrowUpRight,
  History,
  RotateCcw,
} from "lucide-react";
import { archiveCatalog } from "@/content/archive";

export default function ArchivePage() {
  return (
    <div className="archive-page">
      <section className="archive-hero">
        <div>
          <p className="section-eyebrow">
            Deprecated · Replaced · Learned from
          </p>

          <h1>
            Old versions remain
            <span>part of the evidence.</span>
          </h1>

          <p>
            The archive preserves retired assumptions,
            earlier framework versions, discontinued
            prototypes, and experiments that changed the
            direction of the work.
          </p>
        </div>

        <aside>
          <Archive size={26} strokeWidth={1.5} />
          <span>Archived entries</span>
          <strong>{archiveCatalog.length}</strong>
          <p>
            These entries are historical records, not
            current recommendations.
          </p>
        </aside>
      </section>

      <section className="archive-position">
        <History size={25} strokeWidth={1.5} />

        <div>
          <h2>
            Hiding failed assumptions would make the
            current systems appear more inevitable than
            they were.
          </h2>

          <p>
            Each archive entry explains what the earlier
            version was, why it changed, what replaced it,
            and what the failure or revision taught.
          </p>
        </div>
      </section>

      <div className="archive-grid">
        {archiveCatalog.map((item, index) => (
          <Link
            href={`/archive/${item.slug}`}
            className="archive-card"
            key={item.slug}
          >
            <div>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{item.type}</strong>
            </div>

            <RotateCcw size={21} strokeWidth={1.6} />

            <p>{item.originalPeriod}</p>
            <h2>{item.title}</h2>
            <blockquote>{item.summary}</blockquote>

            <div className="archive-card__reason">
              <span>Why it changed</span>
              <p>{item.reason}</p>
            </div>

            <ArrowUpRight
              className="archive-card__arrow"
              size={18}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}