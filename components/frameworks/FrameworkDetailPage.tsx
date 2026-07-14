import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  GitBranch,
  Layers3,
  Lightbulb,
  Network,
  Wrench,
} from "lucide-react";
import type {
  Framework,
  FrameworkRelationship,
} from "@/content/frameworks";
import FrameworkStatus from "./FrameworkStatus";

type FrameworkDetailPageProps = {
  framework: Framework;
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
  return (
    href.startsWith("http://") ||
    href.startsWith("https://")
  );
}

export default function FrameworkDetailPage({
  framework,
}: FrameworkDetailPageProps) {
  return (
    <article className="framework-detail-page">
      <header className="framework-detail-hero">
        <nav
          className="project-breadcrumbs"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>
          <ChevronRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <Link href="/frameworks">Frameworks</Link>
          <ChevronRight
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <span aria-current="page">
            {framework.shortName}
          </span>
        </nav>

        <div className="framework-detail-hero__layout">
          <div className="framework-detail-hero__main">
            <div className="framework-detail-hero__metadata">
              <FrameworkStatus status={framework.status} />
              <span>{framework.category}</span>
              <span>{framework.version}</span>
            </div>

            <p className="framework-detail-hero__short-name">
              {framework.shortName}
            </p>

            <h1>{framework.title}</h1>

            <blockquote>{framework.question}</blockquote>

            <p>{framework.description}</p>

            {framework.externalLinks.length > 0 && (
              <div className="framework-detail-hero__actions">
                {framework.externalLinks.map(
                  (link, index) => (
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
                  ),
                )}
              </div>
            )}
          </div>

          <aside className="framework-detail-facts">
            <div>
              <CalendarDays
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Created</small>
                <strong>
                  {formatDate(framework.createdAt)}
                </strong>
              </span>
            </div>

            <div>
              <GitBranch
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Current version</small>
                <strong>{framework.version}</strong>
              </span>
            </div>

            <div>
              <Layers3
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
              />

              <span>
                <small>Components</small>
                <strong>
                  {framework.components.length}
                </strong>
              </span>
            </div>
          </aside>
        </div>

        <div className="framework-purpose-banner">
          <Lightbulb
            size={20}
            strokeWidth={1.7}
            aria-hidden="true"
          />

          <div>
            <span>Purpose</span>
            <p>{framework.purpose}</p>
          </div>
        </div>
      </header>

      <section className="framework-detail-section framework-principle-section">
        <div className="framework-detail-section__label">
          <span>01</span>
          <p>Foundation</p>
        </div>

        <div>
          <p className="section-eyebrow">
            Central principle
          </p>

          <h2>{framework.centralPrinciple}</h2>
        </div>

        <aside>
          <Network
            size={22}
            strokeWidth={1.6}
            aria-hidden="true"
          />

          <span>Framework question</span>
          <blockquote>{framework.question}</blockquote>
        </aside>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>02</span>
          <p>Structure</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Components
            </p>

            <h2>How the framework is organized</h2>
          </div>

          <div className="framework-component-list">
            {framework.components.map(
              (component, index) => (
                <article
                  className="framework-component"
                  key={component.key}
                >
                  <div className="framework-component__key">
                    <span>{component.key}</span>
                    <small>
                      {String(index + 1).padStart(2, "0")}
                    </small>
                  </div>

                  <div className="framework-component__content">
                    <h3>{component.title}</h3>
                    <p>{component.description}</p>

                    {component.question && (
                      <blockquote>
                        {component.question}
                      </blockquote>
                    )}
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>03</span>
          <p>Principles</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Reasoning rules
            </p>

            <h2>Principles guiding its use</h2>
          </div>

          <div className="framework-principles-grid">
            {framework.principles.map(
              (principle, index) => (
                <article key={principle}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{principle}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>04</span>
          <p>Application</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Practical use
            </p>

            <h2>Where the framework can be applied</h2>
          </div>

          <div className="framework-application-layout">
            <article className="framework-application-list">
              <div>
                <Wrench
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                />

                <h3>Applications</h3>
              </div>

              {framework.applications.map(
                (application) => (
                  <p key={application}>
                    {application}
                  </p>
                ),
              )}
            </article>

            <div className="framework-example-list">
              {framework.examples.map(
                (example, index) => (
                  <article key={example.title}>
                    <span>
                      Example{" "}
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <h3>{example.title}</h3>

                    <p>
                      <strong>Context:</strong>{" "}
                      {example.context}
                    </p>

                    <p>
                      <strong>Application:</strong>{" "}
                      {example.application}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>05</span>
          <p>Boundaries</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Epistemic boundaries
            </p>

            <h2>What the framework does not solve</h2>
          </div>

          <div className="framework-boundary-grid">
            <FrameworkListCard
              icon={AlertTriangle}
              eyebrow="Limitations"
              title="Current limitations"
              items={framework.limitations}
            />

            <FrameworkListCard
              icon={CircleHelp}
              eyebrow="Open questions"
              title="What remains unresolved"
              items={framework.openQuestions}
            />
          </div>
        </div>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>06</span>
          <p>Evolution</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Version history
            </p>

            <h2>How the framework has changed</h2>
          </div>

          <div className="framework-version-list">
            {framework.versionHistory.map(
              (version) => (
                <article key={version.version}>
                  <div className="framework-version-list__metadata">
                    <strong>{version.version}</strong>
                    <span
                      className={`framework-version-state framework-version-state--${version.status.toLowerCase()}`}
                    >
                      {version.status}
                    </span>
                    <time dateTime={version.date}>
                      {formatDate(version.date)}
                    </time>
                  </div>

                  <div>
                    <h3>{version.summary}</h3>

                    <ul>
                      {version.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="framework-detail-section">
        <div className="framework-detail-section__label">
          <span>07</span>
          <p>Connections</p>
        </div>

        <div className="framework-detail-section__content">
          <div className="framework-detail-heading">
            <p className="section-eyebrow">
              Related work
            </p>

            <h2>The framework inside a larger system</h2>
          </div>

          <div className="framework-relationship-grid">
            <RelationshipGroup
              title="Projects"
              items={framework.relatedProjects}
            />

            <RelationshipGroup
              title="Research"
              items={framework.relatedResearch}
            />

            <RelationshipGroup
              title="Frameworks"
              items={framework.relatedFrameworks}
            />
          </div>
        </div>
      </section>

      <footer className="framework-detail-footer">
        <Link
          href="/frameworks"
          className="framework-back-link"
        >
          <ArrowLeft
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Return to frameworks
        </Link>

        <div>
          <span>Continue exploring</span>
          <h2>See where these models are being tested.</h2>
        </div>

        <Link
          href="/work"
          className="button button--primary"
        >
          Explore the work
          <ArrowRight
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </Link>
      </footer>
    </article>
  );
}

function FrameworkListCard({
  icon: Icon,
  eyebrow,
  title,
  items,
}: {
  icon: typeof CheckCircle2;
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="framework-list-card">
      <div className="framework-list-card__heading">
        <Icon
          size={21}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <div>
          <span>{eyebrow}</span>
          <h3>{title}</h3>
        </div>
      </div>

      <div className="framework-list-card__items">
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
  items: FrameworkRelationship[];
}) {
  return (
    <article className="framework-relationship-group">
      <h3>{title}</h3>

      {items.length > 0 ? (
        <div>
          {items.map((item) => {
            const content = (
              <>
                <span>
                  <strong>{item.title}</strong>

                  {item.description && (
                    <small>{item.description}</small>
                  )}
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