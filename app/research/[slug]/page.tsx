import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";

import CmsKnowledgeEntry from "@/components/cms/CmsKnowledgeEntry";

import {
  getPublishedEntry,
} from "@/lib/cms/client";
import {
  createCmsMetadata,
} from "@/lib/cms/metadata";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const entry =
    await getPublishedEntry(
      "RESEARCH",
      slug,
    );

  return entry
    ? createCmsMetadata(entry)
    : {
        title:
          "Research Not Found",
      };
}

export default async function ResearchPage({
  params,
}: PageProps) {
  const { slug } =
    await params;

  const entry =
    await getPublishedEntry(
      "RESEARCH",
      slug,
    );

  if (!entry) {
    notFound();
  }

  return (
    <CmsKnowledgeEntry
      entry={entry}
    />
  );
}