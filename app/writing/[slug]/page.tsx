import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WritingArticlePage from "@/components/writing/WritingArticlePage";
import {
  getPublicWritingBySlug,
  publicWritingCatalog,
} from "@/content/writing";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return publicWritingCatalog.map((writing) => ({
    slug: writing.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const writing =
    getPublicWritingBySlug(slug);

  if (!writing) {
    return {
      title: "Writing Not Found",
    };
  }

  return {
    title: writing.title,
    description: writing.excerpt,

    openGraph: {
      title: writing.title,
      description: writing.excerpt,
      type: "article",

      publishedTime:
        writing.publishedAt,

      modifiedTime:
        writing.updatedAt,
    },
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;

  const writing =
    getPublicWritingBySlug(slug);

  if (!writing) {
    notFound();
  }

  return (
    <WritingArticlePage writing={writing} />
  );
}