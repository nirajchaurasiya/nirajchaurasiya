import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResearchArticlePage from "@/components/research/ResearchArticlePage";
import {
  getResearchBySlug,
  researchCatalog,
} from "@/content/research";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return researchCatalog.map((research) => ({
    slug: research.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const research = getResearchBySlug(slug);

  if (!research) {
    return {
      title: "Research Not Found",
    };
  }

  return {
    title: research.title,
    description: research.abstract,
    openGraph: {
      title: `${research.title} | Niraj Chaurasiya`,
      description: research.abstract,
      type: "article",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const research = getResearchBySlug(slug);

  if (!research) {
    notFound();
  }

  return <ResearchArticlePage research={research} />;
}