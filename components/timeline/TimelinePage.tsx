import {
  CalendarRange,
  GitCommitHorizontal,
  Layers3,
} from "lucide-react";
import {
  timelineCatalog,
  timelineYears,
} from "@/content/timeline";
import TimelineExplorer from "./TimelineExplorer";

export default function TimelinePage() {
  const latestEvent = timelineCatalog[0];

  return (
    <div className="timeline-page">
      <section className="timeline-hero">
        <div>
          <p className="section-eyebrow">
            Projects · Research · Frameworks · Media
          </p>

          <h1>
            The work is not a collection
            <span>of disconnected final outcomes.</span>
          </h1>

          <p>
            This timeline preserves launches, revisions,
            publications, experiments, presentations,
            and changes in understanding.
          </p>
        </div>

        <aside>
          <article>
            <GitCommitHorizontal size={19} strokeWidth={1.7} />
            <strong>{timelineCatalog.length}</strong>
            <span>Recorded events</span>
          </article>

          <article>
            <CalendarRange size={19} strokeWidth={1.7} />
            <strong>{timelineYears.length}</strong>
            <span>Years represented</span>
          </article>

          <article>
            <Layers3 size={19} strokeWidth={1.7} />
            <strong>{latestEvent?.title}</strong>
            <span>Latest recorded development</span>
          </article>
        </aside>
      </section>

      <section className="timeline-position">
        <p className="section-eyebrow">Why preserve history?</p>

        <div>
          <h2>
            A current system hides the assumptions,
            mistakes, and revisions that produced it.
          </h2>

          <p>
            The timeline keeps those transitions visible.
            It shows that frameworks were revised, ranking
            assumptions were removed, prototypes failed,
            and questions changed.
          </p>
        </div>
      </section>

      <TimelineExplorer events={timelineCatalog} />
    </div>
  );
}