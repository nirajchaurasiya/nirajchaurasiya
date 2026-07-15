import type { MetadataRoute } from "next";

import { getPublishedContent } from "@/lib/cms/client";

import { cmsBasePaths } from "@/lib/cms/routes";

import type { CmsContentEntry } from "@/lib/cms/types";

import { absoluteUrl } from "@/lib/site-config";

export const revalidate = 3600;

const fallbackRoutes = [
  "/",
  "/work",
  "/research",
  "/frameworks",
  "/writing",
  "/about",
  "/media",
  "/timeline",
  "/now",
  "/archive",
  "/contact",
] as const;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readEntryField(entry: CmsContentEntry, field: string) {
  const record = entry as unknown as Record<string, unknown>;

  return record[field];
}

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  const withoutQuery = path.split("?")[0] ?? "/";

  const withoutHash = withoutQuery.split("#")[0] ?? "/";

  const withLeadingSlash = withoutHash.startsWith("/")
    ? withoutHash
    : `/${withoutHash}`;

  if (withLeadingSlash !== "/") {
    return withLeadingSlash.replace(/\/+$/, "");
  }

  return "/";
}

function getEntryPath(entry: CmsContentEntry): string | null {
  const publicPath = readString(readEntryField(entry, "publicPath"));

  if (publicPath) {
    return normalizePath(publicPath);
  }

  if (entry.type === "PAGE") {
    return entry.slug === "home" ? "/" : normalizePath(`/${entry.slug}`);
  }

  /*
   * Timeline records currently render
   * inside /timeline and do not have
   * individual detail routes.
   */
  if (entry.type === "TIMELINE") {
    return null;
  }

  const basePath = cmsBasePaths[entry.type];

  if (!basePath || !entry.slug) {
    return null;
  }

  return normalizePath(`${basePath}/${entry.slug}`);
}

function getLastModified(entry: CmsContentEntry): Date {
  const possibleDates = [
    readEntryField(entry, "publishedAt"),

    readEntryField(entry, "updatedAt"),

    readEntryField(entry, "createdAt"),
  ];

  for (const value of possibleDates) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return value;
    }

    if (typeof value === "string" || typeof value === "number") {
      const parsed = new Date(value);

      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  }

  return new Date();
}

function getPriority(entry: CmsContentEntry, path: string) {
  if (path === "/") {
    return 1;
  }

  if (entry.type === "PAGE") {
    return 0.85;
  }

  if (entry.featured) {
    return 0.8;
  }

  return 0.7;
}

function getChangeFrequency(
  entry: CmsContentEntry,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (entry.type === "PAGE" && entry.slug === "now") {
    return "weekly";
  }

  if (entry.type === "WRITING" || entry.type === "MEDIA") {
    return "monthly";
  }

  if (entry.type === "PROJECT" || entry.type === "RESEARCH") {
    return "monthly";
  }

  return "yearly";
}

function createFallbackSitemap(): MetadataRoute.Sitemap {
  const timestamp = new Date();

  return fallbackRoutes.map((path) => ({
    url: absoluteUrl(path),

    lastModified: timestamp,

    changeFrequency: path === "/now" ? "weekly" : "monthly",

    priority: path === "/" ? 1 : 0.8,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const entries = await getPublishedContent();

    const records = new Map<string, MetadataRoute.Sitemap[number]>();

    /*
     * Keep essential routes available
     * even if a PAGE entry is missing.
     */
    for (const path of fallbackRoutes) {
      records.set(path, {
        url: absoluteUrl(path),

        lastModified: new Date(),

        changeFrequency: path === "/now" ? "weekly" : "monthly",

        priority: path === "/" ? 1 : 0.8,
      });
    }

    for (const entry of entries) {
      const path = getEntryPath(entry);

      if (!path) {
        continue;
      }

      records.set(path, {
        url: absoluteUrl(path),

        lastModified: getLastModified(entry),

        changeFrequency: getChangeFrequency(entry),

        priority: getPriority(entry, path),
      });
    }

    return Array.from(records.values()).sort((first, second) => {
      if (first.url === absoluteUrl("/")) {
        return -1;
      }

      if (second.url === absoluteUrl("/")) {
        return 1;
      }

      return first.url.localeCompare(second.url);
    });
  } catch (error) {
    console.error("Failed to build CMS sitemap:", error);

    return createFallbackSitemap();
  }
}
