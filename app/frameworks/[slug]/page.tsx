import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FrameworkDetailPage from "@/components/frameworks/FrameworkDetailPage";
import {
  frameworkCatalog,
  getFrameworkBySlug,
} from "@/content/frameworks";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return frameworkCatalog.map((framework) => ({
    slug: framework.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);

  if (!framework) {
    return {
      title: "Framework Not Found",
    };
  }

  return {
    title: framework.title,
    description: framework.summary,
    openGraph: {
      title: `${framework.title} | Niraj Chaurasiya`,
      description: framework.summary,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;
  const framework = getFrameworkBySlug(slug);

  if (!framework) {
    notFound();
  }

  return (
    <FrameworkDetailPage framework={framework} />
  );
}