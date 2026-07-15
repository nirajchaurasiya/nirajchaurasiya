import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "research");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Research Not Found",
      };
}

export default async function ResearchPage() {
  const [pageEntry, researchEntries] = await Promise.all([
    getPublishedEntry("PAGE", "research"),

    getPublishedContent("RESEARCH"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={researchEntries}
      itemName="Research"
    />
  );
}
