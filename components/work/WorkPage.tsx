import { ArrowDown, GitBranch, Layers3, Orbit } from "lucide-react";
import { projectCatalog } from "@/content/projects";
import WorkExplorer from "./WorkExplorer";
import CmsCollectionSection from "@/components/cms/CmsCollectionSection";
export default function WorkPage() {
  const activeProjectCount = projectCatalog.filter(
    (project) => project.status === "Active" || project.status === "Developing",
  ).length;

  const disciplineCount = new Set(
    projectCatalog.flatMap((project) => project.disciplines),
  ).size;

  return (
    <div className="work-page">
      <section className="work-page-hero">
        <div className="work-page-hero__main">
          <p className="section-eyebrow">
            Platforms · Research systems · Engineering
          </p>

          <h1>
            Work is where
            <span>questions become systems.</span>
          </h1>

          <p>
            These projects are not isolated products. Each one is an environment
            for investigating evidence, learning, engineering, information, and
            decision-making under uncertainty.
          </p>

          <a href="#work-projects" className="work-page-hero__action">
            Explore the systems
            <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>

        <div className="work-page-hero__stats">
          <article>
            <Layers3 size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{projectCatalog.length}</strong>
            <span>Documented projects</span>
          </article>

          <article>
            <Orbit size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{activeProjectCount}</strong>
            <span>Actively developing</span>
          </article>

          <article>
            <GitBranch size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{disciplineCount}</strong>
            <span>Connected disciplines</span>
          </article>
        </div>
      </section>
      <CmsCollectionSection
        type="PROJECT"
        eyebrow="Published systems"
        title="Projects from the CMS"
        description="Software, engineering, research-driven products, and systems currently being explored or built."
      />
      <section className="work-page-introduction">
        <p className="section-eyebrow">How to read this page</p>

        <div>
          <h2>Each project records more than its final output.</h2>

          <p>
            Project pages include the underlying problem, current system,
            research questions, milestones, what I currently understand, and
            what remains uncertain. The goal is to preserve the reasoning
            process rather than showing only polished outcomes.
          </p>
        </div>
      </section>

      <div id="work-projects">
        <WorkExplorer projects={projectCatalog} />
      </div>
    </div>
  );
}
