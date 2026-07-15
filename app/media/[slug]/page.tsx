import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsKnowledgeEntry from "@/components/cms/CmsKnowledgeEntry";

import { getPublishedEntry } from "@/lib/cms/client";

import { createCmsMetadata } from "@/lib/cms/metadata";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const entry = await getPublishedEntry("MEDIA", slug);

  return entry
    ? createCmsMetadata(entry)
    : {
        title: "Media Not Found",
      };
}

export default async function MediaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const entry = await getPublishedEntry("MEDIA", slug);

  if (!entry) {
    notFound();
  }

  return <CmsKnowledgeEntry entry={entry} />;
}
