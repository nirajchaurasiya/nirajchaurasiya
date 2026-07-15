import type { CmsContentEntry, CmsContentType } from "@/lib/cms/types";

export const cmsBasePaths: Record<CmsContentType, string> = {
  PAGE: "",
  PROJECT: "/work",
  RESEARCH: "/research",
  FRAMEWORK: "/frameworks",
  WRITING: "/writing",
  MEDIA: "/media",
  TIMELINE: "/timeline",
  ARCHIVE: "/archive",
};

export function getCmsEntryHref(
  entry: Pick<CmsContentEntry, "type" | "slug" | "publicPath">,
) {
  if (entry.publicPath?.startsWith("/")) {
    return entry.publicPath;
  }

  const basePath = cmsBasePaths[entry.type];

  return `${basePath}/${entry.slug}`;
}
