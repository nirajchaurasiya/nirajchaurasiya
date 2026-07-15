import { Boxes, GitBranch, Network } from "lucide-react";
import { frameworkCatalog } from "@/content/frameworks";
import FrameworkExplorer from "./FrameworkExplorer";
import CmsCollectionSection from "@/components/cms/CmsCollectionSection";
export default function FrameworksPage() {
  const totalComponents = frameworkCatalog.reduce(
    (total, framework) => total + framework.components.length,
    0,
  );

  const connectedProjects = new Set(
    frameworkCatalog.flatMap((framework) =>
      framework.relatedProjects.map((project) => project.href),
    ),
  ).size;

  return (
    <div className="frameworks-page">
      <section className="frameworks-page-hero">
        <div className="frameworks-page-hero__main">
          <p className="section-eyebrow">Systems · Learning · Decisions</p>

          <h1>
            Frameworks turn
            <span>recurring questions into tools.</span>
          </h1>

          <p>
            These are not finished laws or universal theories. They are
            structured models developed from recurring problems in my research,
            engineering, learning, and system design.
          </p>
        </div>

        <div className="frameworks-page-hero__stats">
          <article>
            <Network size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{frameworkCatalog.length}</strong>
            <span>Active frameworks</span>
          </article>

          <article>
            <Boxes size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{totalComponents}</strong>
            <span>Defined components</span>
          </article>

          <article>
            <GitBranch size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{connectedProjects}</strong>
            <span>Connected projects</span>
          </article>
        </div>
      </section>
      <CmsCollectionSection
        type="FRAMEWORK"
        eyebrow="Reasoning systems"
        title="Frameworks from the CMS"
        description="Reusable models for examining evidence, systems, sufficient understanding, and action under uncertainty."
      />
      <section className="frameworks-position">
        <p className="section-eyebrow">How these should be interpreted</p>

        <div>
          <h2>
            A framework organizes reasoning. It does not remove the need for
            evidence, judgment, or revision.
          </h2>

          <p>
            Each framework page shows its current version, components,
            applications, limitations, open questions, and revision history. The
            goal is to make the models inspectable rather than presenting
            acronyms as finished truth.
          </p>
        </div>
      </section>

      <FrameworkExplorer frameworks={frameworkCatalog} />
    </div>
  );
}
