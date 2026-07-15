import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "frameworks");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Frameworks Not Found",
      };
}

export default async function FrameworksPage() {
  const [pageEntry, frameworks] = await Promise.all([
    getPublishedEntry("PAGE", "frameworks"),

    getPublishedContent("FRAMEWORK"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={frameworks}
      itemName="Framework"
    />
  );
}
