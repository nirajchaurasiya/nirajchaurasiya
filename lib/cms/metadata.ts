import type { Metadata } from "next";

import { getCmsEntryHref } from "@/lib/cms/routes";
import type { CmsContentEntry } from "@/lib/cms/types";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

import { cmsBasePaths } from "@/lib/cms/routes";

function getCmsEntryPath(entry: CmsContentEntry) {
  if (entry.publicPath) {
    return entry.publicPath;
  }

  if (entry.type === "PAGE") {
    return entry.slug === "home" ? "/" : `/${entry.slug}`;
  }

  const basePath = cmsBasePaths[entry.type];

  return `${basePath}/${entry.slug}`;
}
export function createCmsMetadata(entry: CmsContentEntry): Metadata {
  const path = getCmsEntryPath(entry);

  const canonicalUrl = absoluteUrl(path);
  const canonical = getCmsEntryHref(entry);

  return {
    title: entry.title,

    description: entry.summary,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: entry.type === "WRITING" ? "article" : "website",

      url: canonicalUrl,

      siteName: siteConfig.name,

      title: entry.title,

      description: entry.summary,
    },

    twitter: {
      card: "summary_large_image",

      title: entry.title,

      description: entry.summary,
    },
  };
}

export function createCmsPageMetadata(entry: CmsContentEntry): Metadata {
  const canonical = getCmsEntryHref(entry);

  return {
    title: entry.title,
    description: entry.summary,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      title: entry.title,
      description: entry.summary,
      url: canonical,
    },

    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.summary,
    },
  };
}
