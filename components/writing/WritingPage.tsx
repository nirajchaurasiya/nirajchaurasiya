import {
  BookOpenText,
  PenLine,
  Tags,
} from "lucide-react";
import { writingCatalog } from "@/content/writing";
import WritingExplorer from "./WritingExplorer";
import {
  publicWritingCatalog,
} from "@/content/writing";
import CmsWritingList from "./CmsWritingList";
export default function WritingPage() {
  const publishedCount = writingCatalog.filter(
    (item) => item.status === "Published",
  ).length;

  const totalReadingMinutes =
    writingCatalog.reduce(
      (total, item) =>
        total + item.readingMinutes,
      0,
    );

  const totalTags = new Set(
    writingCatalog.flatMap((item) => item.tags),
  ).size;

  return (
    <div className="writing-page">
      <section className="writing-page-hero">
        <div className="writing-page-hero__main">
          <p className="section-eyebrow">
            Essays · Reflections · Building logs
          </p>

          <h1>
            Writing is where
            <span>unfinished thinking becomes visible.</span>
          </h1>

          <p>
            These essays, reflections, explanations,
            and building notes document how my ideas
            develop before they become finished systems
            or formal research.
          </p>
        </div>

        <div className="writing-page-hero__stats">
          <article>
            <PenLine
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <strong>{publishedCount}</strong>
            <span>Published pieces</span>
          </article>

          <article>
            <BookOpenText
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <strong>{totalReadingMinutes}</strong>
            <span>Total reading minutes</span>
          </article>

          <article>
            <Tags
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <strong>{totalTags}</strong>
            <span>Connected topics</span>
          </article>
        </div>
      </section>

      <CmsWritingList />
      <section className="writing-position">
        <p className="section-eyebrow">
          Writing position
        </p>

        <div>
          <h2>
            Not everything I write is a research paper,
            and the website should not pretend otherwise.
          </h2>

          <p>
            Writing can contain developing ideas,
            personal interpretations, reflections, and
            technical explanations. Each item is labeled
            by category and publication status so that an
            essay is not confused with peer-reviewed
            evidence.
          </p>
        </div>
      </section>

      <WritingExplorer writing={publicWritingCatalog} />
    </div>
  );
}