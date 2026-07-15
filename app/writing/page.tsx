import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "writing");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Writing Not Found",
      };
}

export default async function WritingPage() {
  const [pageEntry, writingEntries] = await Promise.all([
    getPublishedEntry("PAGE", "writing"),

    getPublishedContent("WRITING"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={writingEntries}
      itemName="Article"
    />
  );
}
