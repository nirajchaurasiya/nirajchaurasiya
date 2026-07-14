import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  CircleX,
  History,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import type { ArchiveItem } from "@/content/archive";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function ArchiveDetailPage({
  item,
}: {
  item: ArchiveItem;
}) {
  return (
    <article className="archive-detail-page">
      <header className="archive-detail-hero">
        <nav className="project-breadcrumbs">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/archive">Archive</Link>
          <ChevronRight size={14} />
          <span>{item.title}</span>
        </nav>

        <div className="archive-detail-hero__layout">
          <div>
            <div className="archive-detail-metadata">
              <span>{item.type}</span>
              <span>Historical record</span>
            </div>

            <h1>{item.title}</h1>
            <p>{item.summary}</p>
          </div>

          <aside>
            <div>
              <CalendarDays size={18} />
              <span>
                <small>Archived</small>
                <strong>
                  {formatDate(item.archivedAt)}
                </strong>
              </span>
            </div>

            <div>
              <History size={18} />
              <span>
                <small>Original period</small>
                <strong>{item.originalPeriod}</strong>
              </span>
            </div>
          </aside>
        </div>

        <div className="archive-reason">
          <CircleX size={20} />
          <div>
            <span>Why it was archived</span>
            <p>{item.reason}</p>
          </div>
        </div>
      </header>

      <section className="archive-detail-grid">
        <ArchiveList
          icon={History}
          title="What it was"
          items={item.whatItWas}
        />

        <ArchiveList
          icon={RefreshCw}
          title="What changed"
          items={item.whatChanged}
        />

        <ArchiveList
          icon={Lightbulb}
          title="What it taught"
          items={item.lessons}
        />
      </section>

      {item.replacedBy && (
        <section className="archive-replacement">
          <span>Replaced by</span>
          <h2>{item.replacedBy.title}</h2>

          <Link
            href={item.replacedBy.href}
            className="button button--primary"
          >
            View the current system
            <ArrowRight size={17} />
          </Link>
        </section>
      )}

      <footer className="archive-detail-footer">
        <Link href="/archive">
          <ArrowLeft size={17} />
          Return to archive
        </Link>
      </footer>
    </article>
  );
}

function ArchiveList({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof History;
  title: string;
  items: string[];
}) {
  return (
    <article>
      <div>
        <Icon size={20} />
        <h2>{title}</h2>
      </div>

      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </article>
  );
}