import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "archive");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Archive Not Found",
      };
}

export default async function ArchivePage() {
  const [pageEntry, archiveEntries] = await Promise.all([
    getPublishedEntry("PAGE", "archive"),

    getPublishedContent("ARCHIVE"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={archiveEntries}
      itemName="Archive entry"
    />
  );
}
