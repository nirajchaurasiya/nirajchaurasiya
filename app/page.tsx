import type { Metadata } from "next";

import { notFound } from "next/navigation";

import CmsHomePage from "@/components/cms/CmsHomePage";

import {
  getFeaturedContent,
  getPublishedContent,
  getPublishedEntry,
} from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

import type { CmsContentEntry, CmsContentType } from "@/lib/cms/types";

async function getHomepageEntries(
  type: CmsContentType,
  limit: number,
): Promise<CmsContentEntry[]> {
  const featured = await getFeaturedContent(type);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const published = await getPublishedContent(type);

  const existingKeys = new Set(
    featured.map((entry) => `${entry.type}:${entry.slug}`),
  );

  const fallback = published.filter(
    (entry) => !existingKeys.has(`${entry.type}:${entry.slug}`),
  );

  return [...featured, ...fallback].slice(0, limit);
}

export async function generateMetadata(): Promise<Metadata> {
  const entry = await getPublishedEntry("PAGE", "home");

  return entry
    ? createCmsPageMetadata(entry)
    : {
        title: "Niraj Chaurasiya",
      };
}

export default async function HomePage() {
  const [entry, systems, research, frameworks, writing, media, nowEntry] =
    await Promise.all([
      getPublishedEntry("PAGE", "home"),

      getHomepageEntries("PROJECT", 3),

      getHomepageEntries("RESEARCH", 3),

      getHomepageEntries("FRAMEWORK", 3),

      getHomepageEntries("WRITING", 3),

      getHomepageEntries("MEDIA", 3),

      getPublishedEntry("PAGE", "now"),
    ]);

  if (!entry) {
    notFound();
  }

  return (
    <CmsHomePage
      entry={entry}
      systems={systems}
      research={research}
      frameworks={frameworks}
      writing={writing}
      media={media}
      nowEntry={nowEntry}
    />
  );
}
