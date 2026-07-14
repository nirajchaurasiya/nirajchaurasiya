import {
  Mic2,
  PlaySquare,
  Presentation,
} from "lucide-react";
import { mediaCatalog } from "@/content/media";
import MediaExplorer from "./MediaExplorer";

export default function MediaPage() {
  const published = mediaCatalog.filter(
    (item) =>
      item.status === "Published" ||
      item.status === "Ongoing",
  ).length;

  const videos = mediaCatalog.filter((item) =>
    ["Video Series", "Short Series", "Playlist"].includes(
      item.type,
    ),
  ).length;

  return (
    <div className="media-page">
      <section className="media-hero">
        <div>
          <p className="section-eyebrow">
            Videos · Talks · Presentations
          </p>

          <h1>
            Ideas become public
            <span>through more than written pages.</span>
          </h1>

          <p>
            This library collects engineering videos,
            short-form learning series, talks,
            presentations, and developing public
            explanations.
          </p>
        </div>

        <aside>
          <article>
            <PlaySquare size={19} strokeWidth={1.7} />
            <strong>{videos}</strong>
            <span>Video collections</span>
          </article>

          <article>
            <Presentation size={19} strokeWidth={1.7} />
            <strong>{published}</strong>
            <span>Published or ongoing</span>
          </article>

          <article>
            <Mic2 size={19} strokeWidth={1.7} />
            <strong>{mediaCatalog.length}</strong>
            <span>Total media entries</span>
          </article>
        </aside>
      </section>

      <MediaExplorer media={mediaCatalog} />
    </div>
  );
}