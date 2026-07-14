import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  CircleDot,
  Clock3,
  FlaskConical,
  Network,
  PlaySquare,
} from "lucide-react";
import {
  homePageContent,
  type ThinkingItem,
} from "@/content/site-content";
import SectionHeading from "./SectionHeading";

const thinkingTypeIcons = {
  Research: FlaskConical,
  Writing: BookOpenText,
  "Project update": BriefcaseBusiness,
  Video: PlaySquare,
} satisfies Record<ThinkingItem["type"], typeof FlaskConical>;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function HomePage() {
  const {
    hero,
    currentFocus,
    centralQuestion,
    featuredWork,
    frameworks,
    latestThinking,
    workMap,
  } = homePageContent;

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__main">
          <p className="section-eyebrow">{hero.eyebrow}</p>

          <h1>
            {hero.title}
            <span>{hero.titleContinuation}</span>
          </h1>

          <p className="home-hero__description">{hero.description}</p>

          <div className="home-hero__actions">
            <Link href={hero.primaryAction.href} className="button button--primary">
              <span>{hero.primaryAction.label}</span>
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            <Link
              href={hero.secondaryAction.href}
              className="button button--secondary"
            >
              <span>{hero.secondaryAction.label}</span>
            </Link>
          </div>
        </div>

        <aside className="home-hero__context">
          <div className="home-hero__context-header">
            <span className="live-indicator" aria-hidden="true" />
            <p>Current direction</p>
          </div>

          <blockquote>
            “Visible signals are not reality itself. The question is what they
            allow us to reasonably infer.”
          </blockquote>

          <Link href="/now" className="text-arrow-link">
            <span>See what I am doing now</span>
            <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="home-section current-focus-section">
        <SectionHeading
          eyebrow={currentFocus.eyebrow}
          title={currentFocus.title}
          description={currentFocus.introduction}
          action={{
            label: "View the Now page",
            href: "/now",
          }}
        />

        <div className="current-focus-grid">
          {currentFocus.items.map((item, index) => (
            <Link href={item.href} className="focus-card" key={item.title}>
              <div className="focus-card__top">
                <span className="focus-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="content-label">{item.category}</span>
              </div>

              <div className="focus-card__body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <ArrowUpRight
                className="focus-card__arrow"
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

        <div className="current-uncertainty">
          <div className="current-uncertainty__icon" aria-hidden="true">
            ?
          </div>

          <div>
            <p>Current uncertainty</p>
            <strong>{currentFocus.uncertainty}</strong>
          </div>

          <time dateTime={currentFocus.updatedAt}>
            Updated {formatDate(currentFocus.updatedAt)}
          </time>
        </div>
      </section>

      <section className="home-section central-question-section">
        <div className="central-question-introduction">
          <p className="section-eyebrow">{centralQuestion.eyebrow}</p>
          <h2>{centralQuestion.question}</h2>
          <p>{centralQuestion.description}</p>
        </div>

        <div className="central-question-connections">
          {centralQuestion.connections.map((connection) => (
            <Link
              href={connection.href}
              className="question-connection"
              key={connection.system}
            >
              <div className="question-connection__header">
                <span>{connection.label}</span>
                <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <h3>{connection.system}</h3>
              <p>{connection.explanation}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="Selected systems"
          title="Featured work"
          description="The primary systems through which I explore engineering, evidence, software and uncertainty."
          action={{
            label: "View all work",
            href: "/work",
          }}
        />

        <div className="featured-work-list">
          {featuredWork.map((work) => (
            <Link href={work.href} className="featured-work-card" key={work.slug}>
              <div className="featured-work-card__index">{work.index}</div>

              <div className="featured-work-card__identity">
                <div className="featured-work-card__heading">
                  <h3>{work.title}</h3>

                  <span
                    className={`status-badge status-badge--${work.status.toLowerCase()}`}
                  >
                    <CircleDot size={12} strokeWidth={2.1} aria-hidden="true" />
                    {work.status}
                  </span>
                </div>

                <p className="featured-work-card__type">{work.type}</p>
              </div>

              <p className="featured-work-card__summary">{work.summary}</p>

              <div className="featured-work-card__update">
                <span>Latest direction</span>
                <p>{work.latestUpdate}</p>
              </div>

              <ArrowUpRight
                className="featured-work-card__arrow"
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section frameworks-section">
        <SectionHeading
          eyebrow="Reusable reasoning models"
          title="Frameworks"
          description="These frameworks turn recurring questions in my work into tools that can be examined, applied and revised."
          action={{
            label: "Explore all frameworks",
            href: "/frameworks",
          }}
        />

        <div className="framework-grid">
          {frameworks.map((framework) => (
            <Link
              href={framework.href}
              className="framework-card"
              key={framework.shortName}
            >
              <div className="framework-card__top">
                <span className="framework-card__short-name">
                  {framework.shortName}
                </span>

                <span className="framework-card__version">
                  {framework.version}
                </span>
              </div>

              <h3>{framework.name}</h3>

              <blockquote>{framework.question}</blockquote>

              <p>{framework.description}</p>

              <span className="framework-card__link">
                Explore framework
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <SectionHeading
          eyebrow="Research, writing and progress"
          title="Latest thinking"
          description="Recent outputs from the same connected body of work."
          action={{
            label: "Explore the timeline",
            href: "/timeline",
          }}
        />

        <div className="latest-thinking-list">
          {latestThinking.map((item) => {
            const Icon = thinkingTypeIcons[item.type];

            return (
              <Link
                href={item.href}
                className="thinking-item"
                key={`${item.type}-${item.title}`}
              >
                <div className="thinking-item__icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <div className="thinking-item__content">
                  <div className="thinking-item__metadata">
                    <span>{item.type}</span>

                    <time dateTime={item.date}>
                      <Clock3 size={13} strokeWidth={1.8} aria-hidden="true" />
                      {formatDate(item.date)}
                    </time>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <ArrowUpRight
                  className="thinking-item__arrow"
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="home-section work-map-section">
        <SectionHeading
          eyebrow="One body of work"
          title="How the pieces connect"
          description="The website is organized by stable categories, but the projects, frameworks and research remain connected through shared questions."
        />

        <div className="work-map-grid">
          {workMap.map((group, index) => (
            <article className="work-map-group" key={group.label}>
              <div className="work-map-group__header">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Network size={18} strokeWidth={1.7} aria-hidden="true" />
              </div>

              <h3>{group.label}</h3>
              <p>{group.description}</p>

              <div className="work-map-group__links">
                {group.items.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <span>{item.name}</span>
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}