import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "media");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Media Not Found",
      };
}

export default async function MediaPage() {
  const [pageEntry, mediaEntries] = await Promise.all([
    getPublishedEntry("PAGE", "media"),

    getPublishedContent("MEDIA"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={mediaEntries}
      itemName="Media item"
    />
  );
}
