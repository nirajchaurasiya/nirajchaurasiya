import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  CircleHelp,
  Clock3,
  Construction,
  FlaskConical,
  Layers3,
  Lightbulb,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  nowPageContent,
  type FocusType,
} from "@/content/profile";

const focusIcons = {
  Building: Construction,
  Researching: FlaskConical,
  Preparing: CalendarDays,
  Learning: BookOpenText,
} satisfies Record<
  FocusType,
  typeof Construction
>;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

export default function NowPage() {
  const {
    updatedAt,
    hero,
    focus,
    currentQuestions,
    reading,
    rhythm,
    currentUncertainty,
    commitments,
    latestOutput,
    frameworkVersions,
  } = nowPageContent;

  return (
    <div className="now-page">
      <section className="now-hero">
        <div className="now-hero__main">
          <p className="section-eyebrow">
            {hero.eyebrow}
          </p>

          <h1>
            {hero.title}
            <span>{hero.titleContinuation}</span>
          </h1>

          <p>{hero.description}</p>
        </div>

        <aside className="now-hero__update">
          <RefreshCw
            size={21}
            strokeWidth={1.7}
            aria-hidden="true"
          />

          <span>Last updated</span>

          <strong>
            {formatDate(updatedAt)}
          </strong>

          <p>
            This page changes as the work and
            priorities change.
          </p>
        </aside>
      </section>

      <section className="now-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Active focus
          </p>

          <h2>
            The systems receiving attention now
          </h2>
        </div>

        <div className="now-focus-grid">
          {focus.map((item, index) => {
            const Icon = focusIcons[item.type];

            return (
              <Link
                href={item.href}
                className="now-focus-card"
                key={`${item.type}-${item.title}`}
              >
                <div className="now-focus-card__top">
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <Icon
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </div>

                <p>{item.type}</p>
                <h3>{item.title}</h3>

                <span className="now-focus-card__status">
                  {item.status}
                </span>

                <div className="now-focus-card__description">
                  {item.description}
                </div>

                <ArrowUpRight
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="now-section now-questions-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Current questions
          </p>

          <h2>
            Questions guiding the present work
          </h2>
        </div>

        <div className="now-question-list">
          {currentQuestions.map(
            (question, index) => (
              <article key={question}>
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <CircleHelp
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <h3>{question}</h3>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="now-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Working rhythm
          </p>

          <h2>
            A loose structure for protecting deep work
          </h2>
        </div>

        <div className="now-rhythm-grid">
          {rhythm.map((item) => (
            <article key={item.period}>
              <div>
                <Clock3
                  size={18}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <span>{item.period}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="now-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Currently reading
          </p>

          <h2>
            Books shaping the questions
          </h2>
        </div>

        <div className="now-reading-list">
          {reading.map((book, index) => (
            <article key={book.title}>
              <span>
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <BookOpenText
                size={21}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>

              <blockquote>
                {book.purpose}
              </blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="now-section now-uncertainty-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Current uncertainty
          </p>

          <h2>
            The unresolved problem at the center
          </h2>
        </div>

        <article className="now-uncertainty-card">
          <div>
            <Search
              size={25}
              strokeWidth={1.6}
              aria-hidden="true"
            />

            <span>Still investigating</span>
          </div>

          <h3>
            {currentUncertainty.title}
          </h3>

          <p>
            {currentUncertainty.description}
          </p>
        </article>
      </section>

      <section className="now-section">
        <div className="now-section-heading">
          <p className="section-eyebrow">
            Active commitments
          </p>

          <h2>
            Work that should not disappear beneath new ideas
          </h2>
        </div>

        <div className="now-commitment-list">
          {commitments.map(
            (commitment, index) => (
              <Link
                href={commitment.href}
                key={commitment.title}
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <div>
                  <h3>
                    {commitment.title}
                  </h3>

                  <p>
                    {commitment.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="now-section now-current-state">
        <div className="now-latest-output">
          <div>
            <Lightbulb
              size={21}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <span>Latest public output</span>
          </div>

          {latestOutput ? (
            <>
              <p>{latestOutput.type}</p>
              <h3>{latestOutput.title}</h3>
              <blockquote>
                {latestOutput.description}
              </blockquote>

              <Link
                href={latestOutput.href}
                className="text-arrow-link"
              >
                Read the latest piece

                <ArrowRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </>
          ) : (
            <p>No published output yet.</p>
          )}
        </div>

        <div className="now-framework-state">
          <div>
            <Layers3
              size={21}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <span>
              Current framework versions
            </span>
          </div>

          <div className="now-framework-state__list">
            {frameworkVersions.map(
              (framework) => (
                <Link
                  href={framework.href}
                  key={framework.title}
                >
                  <strong>
                    {framework.title}
                  </strong>

                  <span>
                    {framework.version}
                  </span>

                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <footer className="now-page-footer">
        <div>
          <span>
            Building systems under uncertainty
          </span>

          <h2>
            The direction is stable. The path remains revisable.
          </h2>
        </div>

        <Link
          href="/timeline"
          className="button button--primary"
        >
          Explore the timeline

          <ArrowRight
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      </footer>
    </div>
  );
}