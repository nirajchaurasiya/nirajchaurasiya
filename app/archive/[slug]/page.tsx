import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveDetailPage from "@/components/archive/ArchiveDetailPage";
import {
  archiveCatalog,
  getArchiveBySlug,
} from "@/content/archive";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return archiveCatalog.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);

  if (!item) {
    return {
      title: "Archive Entry Not Found",
    };
  }

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);

  if (!item) {
    notFound();
  }

  return <ArchiveDetailPage item={item} />;
}