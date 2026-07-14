import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  BrainCircuit,
  Compass,
  GraduationCap,
  Layers3,
  Map,
  Network,
  Orbit,
} from "lucide-react";
import { aboutPageContent } from "@/content/profile";

export default function AboutPage() {
  const {
    hero,
    identity,
    roles,
    thinkingThemes,
    academicPath,
    journey,
    principles,
    direction,
  } = aboutPageContent;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__main">
          <p className="section-eyebrow">
            {hero.eyebrow}
          </p>

          <h1>
            {hero.title}
            <span>{hero.titleContinuation}</span>
          </h1>

          <p>{hero.description}</p>

          <div className="about-hero__actions">
            <Link
              href="/work"
              className="button button--primary"
            >
              Explore my work
              <ArrowRight
                size={17}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/now"
              className="button button--secondary"
            >
              What I am doing now
            </Link>
          </div>
        </div>

        <aside className="about-hero__facts">
          <article>
            <GraduationCap
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <div>
              <span>Current path</span>
              <strong>
                Mechanical Engineering
              </strong>
              <small>
                Arkansas State University
              </small>
            </div>
          </article>

          <article>
            <Network
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <div>
              <span>Working across</span>
              <strong>
                Engineering and software
              </strong>
              <small>
                Research, systems, and communication
              </small>
            </div>
          </article>

          <article>
            <Compass
              size={19}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <div>
              <span>Long-term direction</span>
              <strong>
                Robotics and autonomous systems
              </strong>
              <small>
                Building meaningful systems for Nepal
              </small>
            </div>
          </article>
        </aside>
      </section>

      <section className="about-identity about-section">
        <div className="about-section__label">
          <span>01</span>
          <p>Who I am</p>
        </div>

        <div className="about-identity__content">
          <h2>{identity.title}</h2>

          <div>
            {identity.paragraphs.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__label">
          <span>02</span>
          <p>Work</p>
        </div>

        <div className="about-section__content">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              Different media, connected questions
            </p>

            <h2>
              How the work takes form
            </h2>
          </div>

          <div className="about-role-grid">
            {roles.map((role, index) => (
              <Link
                href={role.href}
                className="about-role-card"
                key={role.title}
              >
                <div>
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {role.shortName}
                  </strong>
                </div>

                <h3>{role.title}</h3>
                <p>{role.description}</p>

                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__label">
          <span>03</span>
          <p>Thinking</p>
        </div>

        <div className="about-section__content">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              Recurring intellectual themes
            </p>

            <h2>How I tend to think</h2>
          </div>

          <div className="about-thinking-grid">
            {thinkingThemes.map(
              (theme, index) => (
                <article key={theme.title}>
                  <div>
                    <BrainCircuit
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />

                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                  </div>

                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__label">
          <span>04</span>
          <p>Academic path</p>
        </div>

        <div className="about-section__content">
          <div className="about-academic-layout">
            <article className="about-academic-main">
              <GraduationCap
                size={24}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              <p className="section-eyebrow">
                Current education
              </p>

              <h2>
                {academicPath.program}
              </h2>

              <h3>
                {academicPath.institution}
              </h3>

              <p>{academicPath.description}</p>

              <span>
                Expected graduation:{" "}
                {academicPath.expectedGraduation}
              </span>
            </article>

            <div className="about-academic-areas">
              {academicPath.areas.map(
                (area, index) => (
                  <article key={area}>
                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>
                    <p>{area}</p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__label">
          <span>05</span>
          <p>Journey</p>
        </div>

        <div className="about-section__content">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              Developing direction
            </p>

            <h2>
              The path is becoming clearer through the work
            </h2>
          </div>

          <div className="about-journey-list">
            {journey.map((item) => (
              <article key={item.period}>
                <time>{item.period}</time>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__label">
          <span>06</span>
          <p>Principles</p>
        </div>

        <div className="about-section__content">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              Working principles
            </p>

            <h2>
              Ideas that currently guide the work
            </h2>
          </div>

          <div className="about-principles-grid">
            {principles.map(
              (principle, index) => (
                <article key={principle.title}>
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="about-direction">
        <div className="about-direction__icon">
          <Map
            size={28}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <div>
          <p className="section-eyebrow">
            Long-term direction
          </p>

          <h2>{direction.title}</h2>

          {direction.paragraphs.map(
            (paragraph) => (
              <p key={paragraph}>
                {paragraph}
              </p>
            ),
          )}

          <Link
            href="/work"
            className="text-arrow-link"
          >
            See the systems taking shape

            <ArrowRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </Link>
        </div>

        <Orbit
          className="about-direction__orbit"
          size={120}
          strokeWidth={0.7}
          aria-hidden="true"
        />
      </section>
    </div>
  );
}