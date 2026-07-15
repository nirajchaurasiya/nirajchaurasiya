import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsTimeline from "@/components/cms/CmsTimeline";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "timeline");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Timeline Not Found",
      };
}

export default async function TimelinePage() {
  const [pageEntry, timelineEntries] = await Promise.all([
    getPublishedEntry("PAGE", "timeline"),

    getPublishedContent("TIMELINE"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return <CmsTimeline pageEntry={pageEntry} entries={timelineEntries} />;
}
