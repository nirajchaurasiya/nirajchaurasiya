import {
  BookOpenText,
  CircleHelp,
  FileSearch,
  GitBranch,
} from "lucide-react";
import { researchCatalog } from "@/content/research";
import ResearchExplorer from "./ResearchExplorer";

export default function ResearchPage() {
  const activeResearch = researchCatalog.filter((item) =>
    ["In Progress", "Developing", "Exploratory"].includes(item.status),
  ).length;

  const publishedResearch = researchCatalog.filter(
    (item) => item.status === "Published",
  ).length;

  const connectedProjects = new Set(
    researchCatalog.flatMap((item) =>
      item.relatedProjects.map((project) => project.href),
    ),
  ).size;

  return (
    <div className="research-page">
      <section className="research-page-hero">
        <div className="research-page-hero__main">
          <p className="section-eyebrow">
            Evidence · Learning · Systems · Uncertainty
          </p>

          <h1>
            Research begins
            <span>where confidence becomes questionable.</span>
          </h1>

          <p>
            My research examines situations where the thing that matters
            cannot be observed directly, yet decisions still need to be made
            from incomplete evidence.
          </p>
        </div>

        <div className="research-page-hero__stats">
          <article>
            <BookOpenText size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{publishedResearch}</strong>
            <span>Public research essays</span>
          </article>

          <article>
            <FileSearch size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{activeResearch}</strong>
            <span>Active investigations</span>
          </article>

          <article>
            <GitBranch size={19} strokeWidth={1.7} aria-hidden="true" />
            <strong>{connectedProjects}</strong>
            <span>Connected projects</span>
          </article>
        </div>
      </section>

      <section className="research-position">
        <div>
          <p className="section-eyebrow">Research position</p>

          <CircleHelp size={25} strokeWidth={1.5} aria-hidden="true" />
        </div>

        <div>
          <h2>
            I do not want the website to make unfinished thinking look more
            certain than it is.
          </h2>

          <p>
            Each research page identifies its current status, publication
            type, methods, evidence, limitations, and unresolved questions.
            Publicly published work is not labeled as peer reviewed unless it
            has actually undergone that process.
          </p>
        </div>
      </section>

      <ResearchExplorer research={researchCatalog} />
    </div>
  );
}