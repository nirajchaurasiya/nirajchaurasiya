import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  GitBranch,
  Layers3,
  Milestone,
} from "lucide-react";
import type { Project } from "@/content/projects";
import ProjectStatus from "./ProjectStatus";

type ProjectPageProps = {
  project: Project;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <article className="project-page">
      <header className="project-hero">
        <nav className="project-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
          <Link href="/work">Work</Link>
          <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
          <span aria-current="page">{project.title}</span>
        </nav>

        <div className="project-hero__layout">
          <div className="project-hero__main">
            <div className="project-hero__metadata">
              <ProjectStatus status={project.status} />
              <span>{project.type}</span>
            </div>

            <h1>{project.title}</h1>
            <p>{project.description}</p>

            {project.externalLinks.length > 0 && (
              <div className="project-hero__links">
                {project.externalLinks.map((link, index) => (
                  <a
                    href={link.href}
                    key={`${link.type}-${link.href}`}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      index === 0
                        ? "button button--primary"
                        : "button button--secondary"
                    }
                  >
                    <span>{link.label}</span>
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

          <aside className="project-hero__facts">
            <div className="project-fact">
              <CalendarDays size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>
                <small>Started</small>
                <strong>{formatDate(project.startDate)}</strong>
              </span>
            </div>

            <div className="project-fact">
              <GitBranch size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>
                <small>Last updated</small>
                <strong>{formatDate(project.updatedAt)}</strong>
              </span>
            </div>

            <div className="project-fact">
              <Layers3 size={18} strokeWidth={1.7} aria-hidden="true" />
              <span>
                <small>Categories</small>
                <strong>{project.categories.join(" · ")}</strong>
              </span>
            </div>
          </aside>
        </div>

        <div className="project-current-direction">
          <span>Current direction</span>
          <p>{project.currentDirection}</p>
        </div>
      </header>

      <section className="project-overview project-section">
        <div className="project-section-label">
          <span>01</span>
          <p>Foundation</p>
        </div>

        <div className="project-overview__content">
          <article>
            <p className="section-eyebrow">The problem</p>
            <h2>{project.problem}</h2>
          </article>

          <article>
            <p className="section-eyebrow">Why it matters</p>
            <p>{project.whyItMatters}</p>
          </article>
        </div>

        <aside className="project-central-question">
          <CircleHelp size={22} strokeWidth={1.6} aria-hidden="true" />
          <span>Central question</span>
          <blockquote>{project.centralQuestion}</blockquote>
        </aside>
      </section>

      <section className="project-section">
        <div className="project-section-label">
          <span>02</span>
          <p>Current system</p>
        </div>

        <div className="project-section-heading">
          <p className="section-eyebrow">How it currently works</p>
          <h2>The present model</h2>
        </div>

        <div className="project-system-grid">
          {project.currentSystem.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section project-questions-section">
        <div className="project-section-label">
          <span>03</span>
          <p>Inquiry</p>
        </div>

        <div className="project-section-heading">
          <p className="section-eyebrow">Open investigation</p>
          <h2>Questions guiding the work</h2>
        </div>

        <div className="project-question-list">
          {project.keyQuestions.map((question, index) => (
            <article key={question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{question}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="project-section">
        <div className="project-section-label">
          <span>04</span>
          <p>Epistemic state</p>
        </div>

        <div className="project-section-heading">
          <p className="section-eyebrow">Current understanding</p>
          <h2>What appears known—and what does not</h2>
        </div>

        <div className="project-knowledge-grid">
          <article className="project-knowledge-card project-knowledge-card--understood">
            <div className="project-knowledge-card__header">
              <CheckCircle2 size={21} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <span>Current understanding</span>
                <h3>What I presently understand</h3>
              </div>
            </div>

            <div className="project-knowledge-card__list">
              {project.understandings.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>

          <article className="project-knowledge-card project-knowledge-card--uncertain">
            <div className="project-knowledge-card__header">
              <AlertCircle size={21} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <span>Latent uncertainty</span>
                <h3>What remains unresolved</h3>
              </div>
            </div>

            <div className="project-knowledge-card__list">
              {project.uncertainties.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="project-section">
        <div className="project-section-label">
          <span>05</span>
          <p>Progress</p>
        </div>

        <div className="project-section-heading">
          <p className="section-eyebrow">Development history</p>
          <h2>Project timeline</h2>
        </div>

        <div className="project-timeline">
          {project.milestones
            .slice()
            .reverse()
            .map((milestone) => (
              <article
                className="project-timeline-item"
                key={`${milestone.date}-${milestone.title}`}
              >
                <div className="project-timeline-item__marker">
                  <Milestone size={17} strokeWidth={1.7} aria-hidden="true" />
                </div>

                <time dateTime={milestone.date}>
                  {formatDate(milestone.date)}
                </time>

                <div>
                  <div className="project-timeline-item__title">
                    <h3>{milestone.title}</h3>

                    {milestone.version && (
                      <span>{milestone.version}</span>
                    )}
                  </div>

                  <p>{milestone.description}</p>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section className="project-section project-relationships-section">
        <div className="project-section-label">
          <span>06</span>
          <p>Connections</p>
        </div>

        <div className="project-section-heading">
          <p className="section-eyebrow">Related work</p>
          <h2>This project does not exist alone</h2>
        </div>

        <div className="project-relationship-grid">
          <RelationshipGroup
            title="Research"
            items={project.relatedResearch}
          />

          <RelationshipGroup
            title="Frameworks"
            items={project.relatedFrameworks}
          />

          <RelationshipGroup
            title="Media"
            items={project.relatedMedia}
          />
        </div>
      </section>

      <footer className="project-page-footer">
        <div>
          <span>Continue exploring</span>
          <h2>See the complete body of work.</h2>
        </div>

        <Link href="/work" className="button button--primary">
          <span>Return to all work</span>
          <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}

function RelationshipGroup({
  title,
  items,
}: {
  title: string;
  items: Project["relatedResearch"];
}) {
  return (
    <article className="project-relationship-group">
      <h3>{title}</h3>

      {items.length > 0 ? (
        <div>
          {items.map((item) => {
            const external = isExternalLink(item.href);

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

            if (external) {
              return (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  key={`${title}-${item.href}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link href={item.href} key={`${title}-${item.href}`}>
                {content}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="project-relationship-group__empty">
          No public entries yet.
        </p>
      )}
    </article>
  );
}