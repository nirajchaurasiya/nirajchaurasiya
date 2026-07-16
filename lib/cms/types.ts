export const cmsContentTypes = [
  "PAGE",
  "PROJECT",
  "RESEARCH",
  "FRAMEWORK",
  "WRITING",
  "BOOK",
  "MEDIA",
  "TIMELINE",
  "ARCHIVE",
] as const;

export type CmsContentType = (typeof cmsContentTypes)[number];

export type CmsJsonObject = Record<string, unknown>;

export type CmsRelationship = {
  id: string;
  kind: string;
  description: string | null;
  sortOrder: number;

  target: {
    id: string;
    type: CmsContentType;
    slug: string;
    title: string;
    publicPath: string | null;
  };
};

export type CmsContentEntry = {
  id: string;
  type: CmsContentType;
  slug: string;
  title: string;
  summary: string;
  publicPath: string | null;
  featured: boolean;
  version: number;
  publishedAt: string | null;
  updatedAt: string;
  data: CmsJsonObject;
  relationships: CmsRelationship[];
};

export type CmsContentResponse = {
  generatedAt: string;
  count: number;
  entries: CmsContentEntry[];
};
