import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Lightbulb,
  Scale,
  Search,
} from "lucide-react";
import type {
  ResearchItem,
  ResearchRelationship,
} from "@/content/research";
import ResearchStatus from "./ResearchStatus";

type ResearchArticlePageProps = {
  research: ResearchItem;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function ResearchArticlePage({
  research,
}: ResearchArticlePageProps) {
  return (
    <article className="research-article">
      <header className="research-article-hero">
        <nav className="project-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
          <Link href="/research">Research</Link>
          <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
          <span aria-current="page">{research.shortTitle}</span>
        </nav>

        <div className="research-article-hero__layout">
          <div className="research-article-hero__main">
            <div className="research-article-hero__metadata">
              <ResearchStatus status={research.status} />
              <span>{research.kind}</span>
            </div>

            <h1>{research.title}</h1>

            <blockquote>{research.question}</blockquote>

            <p>{research.abstract}</p>

            {research.externalLinks.length > 0 && (
              <div className="research-article-hero__actions">
                {research.externalLinks.map((link, index) => (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    key={link.href}
                    className={
                      index === 0
                        ? "button button--primary"
                        : "button button--secondary"
                    }
                  >
                    {link.label}
                    <ExternalLink
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          <aside className="research-article-facts">
            <div>
              <CalendarDays size={18} strokeWidth={1.7} aria-hidden="true" />

              <span>
                <small>
                  {research.publishedAt ? "Published" : "Updated"}
                </small>

                <strong>
                  {formatDate(
                    research.publishedAt ?? research.updatedAt,
                  )}
                </strong>
              </span>
            </div>

            <div>
              <GitBranch size={18} strokeWidth={1.7} aria-hidden="true" />

              <span>
                <small>Research areas</small>
                <strong>{research.areas.join(" · ")}</strong>
              </span>
            </div>

            <div>
              <Scale size={18} strokeWidth={1.7} aria-hidden="true" />

              <span>
                <small>Peer-review status</small>
                <strong>
                  {research.peerReviewed
                    ? "Peer reviewed"
                    : "Not formally peer reviewed"}
                </strong>
              </span>
            </div>
          </aside>
        </div>

        <div className="research-publication-note">
          <AlertTriangle size={19} strokeWidth={1.7} aria-hidden="true" />

          <div>
            <span>Publication note</span>
            <p>{research.publicationNote}</p>
          </div>
        </div>
      </header>

      <section className="research-article-section research-claim-section">
        <div className="research-article-section__label">
          <span>01</span>
          <p>Position</p>
        </div>

        <div>
          <p className="section-eyebrow">Central claim</p>
          <h2>{research.centralClaim}</h2>
        </div>

        <aside>
          <Lightbulb size={21} strokeWidth={1.6} aria-hidden="true" />
          <span>Motivation</span>
          <p>{research.motivation}</p>
        </aside>
      </section>

      <section className="research-article-section">
        <div className="research-article-section__label">
          <span>02</span>
          <p>Approach</p>
        </div>

        <div className="research-article-section__content">
          <div className="research-article-heading">
            <p className="section-eyebrow">Method and evidence</p>
            <h2>How the argument is currently supported</h2>
          </div>

          <div className="research-method-grid">
            <ResearchListCard
              icon={FlaskConical}
              eyebrow="Method"
              title="Current approach"
              items={research.methods}
            />

            <ResearchListCard
              icon={CheckCircle2}
              eyebrow="Evidence"
              title="Supporting observations"
              items={research.evidence}
            />
          </div>
        </div>
      </section>

      <section className="research-article-section">
        <div className="research-article-section__label">
          <span>03</span>
          <p>Argument</p>
        </div>

        <div className="research-article-section__content">
          <div className="research-article-heading">
            <p className="section-eyebrow">Current structure</p>
            <h2>The developing argument</h2>
          </div>

          <div className="research-written-sections">
            {research.sections.map((section, index) => (
              <section key={section.heading}>
                <div className="research-written-sections__number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{section.heading}</h3>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.points && (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="research-article-section">
        <div className="research-article-section__label">
          <span>04</span>
          <p>Boundaries</p>
        </div>

        <div className="research-article-section__content">
          <div className="research-article-heading">
            <p className="section-eyebrow">Epistemic boundaries</p>
            <h2>What this work does not yet establish</h2>
          </div>

          <div className="research-boundary-grid">
            <ResearchListCard
              icon={AlertTriangle}
              eyebrow="Limitations"
              title="Current limitations"
              items={research.limitations}
            />

            <ResearchListCard
              icon={CircleHelp}
              eyebrow="Open questions"
              title="What remains unresolved"
              items={research.openQuestions}
            />
          </div>
        </div>
      </section>

      <section className="research-article-section">
        <div className="research-article-section__label">
          <span>05</span>
          <p>Relationships</p>
        </div>

        <div className="research-article-section__content">
          <div className="research-article-heading">
            <p className="section-eyebrow">Connected work</p>
            <h2>Research inside a larger system</h2>
          </div>

          <div className="research-relationship-grid">
            <RelationshipGroup
              title="Projects"
              items={research.relatedProjects}
            />

            <RelationshipGroup
              title="Frameworks"
              items={research.relatedFrameworks}
            />

            <RelationshipGroup
              title="Related research"
              items={research.relatedResearch}
            />
          </div>
        </div>
      </section>

      {research.references.length > 0 && (
        <section className="research-article-section">
          <div className="research-article-section__label">
            <span>06</span>
            <p>Sources</p>
          </div>

          <div className="research-article-section__content">
            <div className="research-article-heading">
              <p className="section-eyebrow">References</p>
              <h2>Sources informing the work</h2>
            </div>

            <div className="research-reference-list">
              {research.references.map((reference) => (
                <article
                  key={`${reference.author}-${reference.title}`}
                >
                  <BookOpen
                    size={18}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>{reference.title}</strong>
                    <p>
                      {reference.author}
                      {reference.year ? ` · ${reference.year}` : ""}
                    </p>
                  </div>

                  {reference.href && (
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${reference.title}`}
                    >
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="research-article-footer">
        <Link href="/research" className="research-back-link">
          <ArrowLeft size={17} strokeWidth={1.8} aria-hidden="true" />
          Return to research
        </Link>

        <div>
          <span>Continue exploring</span>
          <h2>See how the research connects to the work.</h2>
        </div>

        <Link href="/work" className="button button--primary">
          Explore the work
          <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}

function ResearchListCard({
  icon: Icon,
  eyebrow,
  title,
  items,
}: {
  icon: typeof Search;
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="research-list-card">
      <div className="research-list-card__heading">
        <Icon size={21} strokeWidth={1.7} aria-hidden="true" />

        <div>
          <span>{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="research-list-card__items">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </article>
  );
}

function RelationshipGroup({
  title,
  items,
}: {
  title: string;
  items: ResearchRelationship[];
}) {
  return (
    <article className="research-relationship-group">
      <h3>{title}</h3>

      {items.length > 0 ? (
        <div>
          {items.map((item) => {
            const content = (
              <>
                <span>
                  <strong>{item.title}</strong>
                  {item.description && <small>{item.description}</small>}
                </span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </>
            );

            if (isExternal(item.href)) {
              return (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={item.href}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link href={item.href} key={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      ) : (
        <p>No connected public entries yet.</p>
      )}
    </article>
  );
}