import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsCollectionLanding from "@/components/cms/CmsCollectionLanding";

import { getPublishedContent, getPublishedEntry } from "@/lib/cms/client";
import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const pageEntry = await getPublishedEntry("PAGE", "work");

  return pageEntry
    ? createCmsPageMetadata(pageEntry)
    : {
        title: "Work Not Found",
      };
}

export default async function WorkPage() {
  const [pageEntry, projects] = await Promise.all([
    getPublishedEntry("PAGE", "work"),

    getPublishedContent("PROJECT"),
  ]);

  if (!pageEntry) {
    notFound();
  }

  return (
    <CmsCollectionLanding
      pageEntry={pageEntry}
      entries={projects}
      itemName="Project"
    />
  );
}
