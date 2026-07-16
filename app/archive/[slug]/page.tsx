import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsKnowledgeEntry from "@/components/cms/CmsKnowledgeEntry";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsMetadata } from "@/lib/cms/metadata";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const entries = await getPublishedContent("ARCHIVE");

  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const entry = await getPublishedEntry("ARCHIVE", slug);

  return entry
    ? createCmsMetadata(entry)
    : {
        title: "Archive Entry Not Found",
      };
}

export default async function ArchiveEntryPage({ params }: PageProps) {
  const { slug } = await params;

  const entry = await getPublishedEntry("ARCHIVE", slug);

  if (!entry) {
    notFound();
  }

  return <CmsKnowledgeEntry entry={entry} />;
}
