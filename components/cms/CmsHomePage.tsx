import Link from "next/link";

import { ArrowRight, ArrowUpRight, CircleDot } from "lucide-react";

import { parseCmsContent, readDetailString } from "@/lib/cms/content-data";

import { cmsBasePaths } from "@/lib/cms/routes";

import type { CmsContentEntry } from "@/lib/cms/types";

type CmsHomePageProps = {
  entry: CmsContentEntry;

  systems: CmsContentEntry[];

  research: CmsContentEntry[];

  frameworks: CmsContentEntry[];

  writing: CmsContentEntry[];

  media: CmsContentEntry[];

  nowEntry: CmsContentEntry | null;
};

type CmsSection = ReturnType<typeof parseCmsContent>["sections"][number];

function findSection(sections: CmsSection[], id: string) {
  return sections.find((section) => section.id === id);
}

function getEntryHref(entry: CmsContentEntry) {
  if (entry.publicPath) {
    return entry.publicPath;
  }

  const basePath = cmsBasePaths[entry.type];

  return `${basePath}/${entry.slug}`;
}

function CollectionCard({
  entry,
  index,
}: {
  entry: CmsContentEntry;

  index: number;
}) {
  return (
    <Link href={getEntryHref(entry)} className="cms-home-card">
      <header>
        <span>{String(index + 1).padStart(2, "0")}</span>

        <ArrowUpRight size={16} aria-hidden="true" />
      </header>

      <div>
        <h3>{entry.title}</h3>

        {entry.summary && <p>{entry.summary}</p>}
      </div>
    </Link>
  );
}

function CollectionSection({
  section,
  entries,
  collectionHref,
  collectionLabel,
}: {
  section: CmsSection | undefined;

  entries: CmsContentEntry[];

  collectionHref: string;

  collectionLabel: string;
}) {
  if (!section || entries.length === 0) {
    return null;
  }

  return (
    <section className="cms-home-section" id={section.id}>
      <header className="cms-home-section__header">
        <div>
          <span>{collectionLabel}</span>

          <h2>{section.heading}</h2>

          {section.body && <p>{section.body}</p>}
        </div>

        <Link href={collectionHref} className="cms-home-section__link">
          View all
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </header>

      <div className="cms-home-grid">
        {entries.map((collectionEntry, index) => (
          <CollectionCard
            entry={collectionEntry}
            index={index}
            key={`${collectionEntry.type}-${collectionEntry.slug}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function CmsHomePage({
  entry,
  systems,
  research,
  frameworks,
  writing,
  media,
  nowEntry,
}: CmsHomePageProps) {
  const content = parseCmsContent(entry.data);

  const heroTitle =
    readDetailString(content.details, "heroTitle") || entry.title;

  const primaryCtaLabel =
    readDetailString(content.details, "primaryCtaLabel") || "Explore the work";

  const primaryCtaHref =
    readDetailString(content.details, "primaryCtaHref") || "/work";

  const secondaryCtaLabel =
    readDetailString(content.details, "secondaryCtaLabel") || "Current focus";

  const secondaryCtaHref =
    readDetailString(content.details, "secondaryCtaHref") || "/now";

  const currentLabel = readDetailString(content.details, "currentLabel");

  const currentText = readDetailString(content.details, "currentText");

  const questionsSection = findSection(content.sections, "questions");

  const currentSection = findSection(content.sections, "current");

  const contactSection = findSection(content.sections, "contact");

  return (
    <main className="cms-home">
      <section className="cms-home-hero">
        <div className="cms-home-hero__content">
          <span className="cms-home-eyebrow">
            {content.hero.eyebrow || "Engineer · Researcher · Builder"}
          </span>

          <h1>{heroTitle}</h1>

          <p className="cms-home-hero__summary">
            {content.hero.description || entry.summary}
          </p>

          <div className="cms-home-hero__actions">
            <Link
              href={primaryCtaHref}
              className="cms-home-button cms-home-button--primary"
            >
              {primaryCtaLabel}

              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <Link
              href={secondaryCtaHref}
              className="cms-home-button cms-home-button--secondary"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {(currentLabel || currentText) && (
          <aside className="cms-home-current-direction">
            <span>
              <CircleDot size={13} aria-hidden="true" />

              {currentLabel || "Current direction"}
            </span>

            {currentText && <p>{currentText}</p>}
          </aside>
        )}
      </section>

      {questionsSection && (
        <section className="cms-home-questions">
          <header>
            <span>Current questions</span>

            <h2>{questionsSection.heading}</h2>

            {questionsSection.body && <p>{questionsSection.body}</p>}
          </header>

          {questionsSection.points.length > 0 && (
            <ol>
              {questionsSection.points.map((question, index) => (
                <li key={`${question}-${index}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <p>{question}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      <CollectionSection
        section={findSection(content.sections, "systems")}
        entries={systems}
        collectionHref="/work"
        collectionLabel="Systems"
      />

      <CollectionSection
        section={findSection(content.sections, "research")}
        entries={research}
        collectionHref="/research"
        collectionLabel="Research"
      />

      <CollectionSection
        section={findSection(content.sections, "frameworks")}
        entries={frameworks}
        collectionHref="/frameworks"
        collectionLabel="Frameworks"
      />

      <CollectionSection
        section={findSection(content.sections, "writing")}
        entries={writing}
        collectionHref="/writing"
        collectionLabel="Writing"
      />

      <CollectionSection
        section={findSection(content.sections, "media")}
        entries={media}
        collectionHref="/media"
        collectionLabel="Media"
      />

      {currentSection && (
        <section className="cms-home-callout">
          <div>
            <span>Now</span>

            <h2>{currentSection.heading}</h2>

            <p>{nowEntry?.summary || currentSection.body}</p>
          </div>

          <Link href="/now">
            Open current focus
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>
      )}

      {contactSection && (
        <section className="cms-home-contact">
          <span>Contact</span>

          <div>
            <h2>{contactSection.heading}</h2>

            <p>{contactSection.body}</p>
          </div>

          <Link href="/contact">
            Start a conversation
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>
      )}
    </main>
  );
}
