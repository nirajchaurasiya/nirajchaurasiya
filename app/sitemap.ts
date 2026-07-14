import type { MetadataRoute } from "next";
import { archiveCatalog } from "@/content/archive";
import { frameworkCatalog } from "@/content/frameworks";
import { mediaCatalog } from "@/content/media";
import { projectCatalog } from "@/content/projects";
import { publicWritingCatalog } from "@/content/writing";
import { researchCatalog } from "@/content/research";
import { siteConfig } from "@/content/site";

const staticRoutes = [
  "",
  "/work",
  "/research",
  "/frameworks",
  "/writing",
  "/about",
  "/now",
  "/timeline",
  "/media",
  "/archive",
  "/contact",
];

function toDate(
  value: string | undefined,
) {
  if (!value) {
    return new Date();
  }

  return new Date(`${value}T00:00:00Z`);
}

export default function sitemap():
  MetadataRoute.Sitemap {
  const staticEntries:
    MetadataRoute.Sitemap =
    staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,

      lastModified: new Date(),

      changeFrequency:
        route === "/now"
          ? "weekly"
          : route === ""
            ? "weekly"
            : "monthly",

      priority:
        route === ""
          ? 1
          : [
                "/work",
                "/research",
                "/frameworks",
              ].includes(route)
            ? 0.9
            : 0.7,
    }));

  const projectEntries:
    MetadataRoute.Sitemap =
    projectCatalog.map((project) => ({
      url:
        `${siteConfig.url}/work/${project.slug}`,

      lastModified:
        toDate(project.updatedAt),

      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const researchEntries:
    MetadataRoute.Sitemap =
    researchCatalog.map((research) => ({
      url:
        `${siteConfig.url}/research/${research.slug}`,

      lastModified:
        toDate(research.updatedAt),

      changeFrequency:
        research.status === "In Progress" ||
        research.status === "Developing"
          ? "weekly"
          : "monthly",

      priority: 0.8,
    }));

  const frameworkEntries:
    MetadataRoute.Sitemap =
    frameworkCatalog.map((framework) => ({
      url:
        `${siteConfig.url}/frameworks/${framework.slug}`,

      lastModified:
        toDate(framework.updatedAt),

      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const writingEntries:
    MetadataRoute.Sitemap =
    publicWritingCatalog.map((writing) => ({
      url:
        `${siteConfig.url}/writing/${writing.slug}`,

      lastModified:
        toDate(writing.updatedAt),

      changeFrequency: "yearly",
      priority: 0.7,
    }));

  const mediaEntries:
    MetadataRoute.Sitemap =
    mediaCatalog.map((media) => ({
      url:
        `${siteConfig.url}/media/${media.slug}`,

      lastModified:
        toDate(media.updatedAt),

      changeFrequency:
        media.status === "Ongoing" ||
        media.status === "Developing"
          ? "weekly"
          : "yearly",

      priority: 0.6,
    }));

  const archiveEntries:
    MetadataRoute.Sitemap =
    archiveCatalog.map((archive) => ({
      url:
        `${siteConfig.url}/archive/${archive.slug}`,

      lastModified:
        toDate(archive.archivedAt),

      changeFrequency: "never",
      priority: 0.3,
    }));

  return [
    ...staticEntries,
    ...projectEntries,
    ...researchEntries,
    ...frameworkEntries,
    ...writingEntries,
    ...mediaEntries,
    ...archiveEntries,
  ];
}