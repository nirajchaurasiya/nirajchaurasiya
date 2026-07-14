import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/work/ProjectPage";
import {
  getProjectBySlug,
  projectCatalog,
} from "@/content/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projectCatalog.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Niraj Chaurasiya`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}