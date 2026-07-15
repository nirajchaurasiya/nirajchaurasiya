import "server-only";

import {
  cmsContentTypes,
  type CmsContentEntry,
  type CmsContentResponse,
  type CmsContentType,
} from "@/lib/cms/types";

const CMS_CONTENT_TAG = "cms-content";

function getCmsConfiguration() {
  const apiUrl =
    process.env.CMS_CONTENT_API_URL?.trim();

  const apiKey =
    process.env.CMS_CONTENT_API_KEY?.trim();

  if (!apiUrl) {
    throw new Error(
      "CMS_CONTENT_API_URL is not configured.",
    );
  }

  if (!apiKey) {
    throw new Error(
      "CMS_CONTENT_API_KEY is not configured.",
    );
  }

  return {
    apiUrl,
    apiKey,
  };
}

function createCmsTags(
  type?: CmsContentType,
  slug?: string,
) {
  const tags = [
    CMS_CONTENT_TAG,
  ];

  if (type) {
    tags.push(
      `cms-type:${type}`,
    );
  }

  if (type && slug) {
    tags.push(
      `cms-entry:${type}:${slug}`,
    );
  }

  return tags;
}

function normalizeSlug(
  value: string,
) {
  return value
    .trim()
    .toLowerCase();
}

function validateContentResponse(
  value: unknown,
): asserts value is CmsContentResponse {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    throw new Error(
      "The CMS returned an invalid response.",
    );
  }

  const entries =
    Reflect.get(value, "entries");

  if (!Array.isArray(entries)) {
    throw new Error(
      "The CMS response does not contain an entries array.",
    );
  }
}

async function requestCmsContent({
  type,
  slug,
}: {
  type?: CmsContentType;
  slug?: string;
} = {}): Promise<CmsContentResponse> {
  const {
    apiUrl,
    apiKey,
  } = getCmsConfiguration();

  const url =
    new URL(apiUrl);

  if (type) {
    url.searchParams.set(
      "type",
      type,
    );
  }

  if (slug) {
    url.searchParams.set(
      "slug",
      normalizeSlug(slug),
    );
  }

  const response = await fetch(
    url,
    {
      method: "GET",

      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },

      next: {
        revalidate: 60 * 60,

        tags:
          createCmsTags(
            type,
            slug,
          ),
      },
    },
  );

  if (!response.ok) {
    const body =
      await response
        .text()
        .catch(() => "");

    throw new Error(
      [
        "The public CMS request failed.",
        `Status: ${response.status}`,
        body
          ? `Response: ${body.slice(0, 500)}`
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    );
  }

  const body: unknown =
    await response.json();

  validateContentResponse(body);

  return body;
}

export async function getPublishedContent(
  type?: CmsContentType,
): Promise<CmsContentEntry[]> {
  if (
    type &&
    !cmsContentTypes.includes(
      type as (typeof cmsContentTypes)[number],
    )
  ) {
    throw new Error(
      `Unsupported CMS content type: ${type}`,
    );
  }

  const response =
    await requestCmsContent({
      type,
    });

  return response.entries;
}

export async function getPublishedEntry(
  type: CmsContentType,
  slug: string,
): Promise<CmsContentEntry | null> {
  const normalizedSlug =
    normalizeSlug(slug);

  const response =
    await requestCmsContent({
      type,
      slug: normalizedSlug,
    });

  return (
    response.entries.find(
      (entry) =>
        entry.type === type &&
        entry.slug === normalizedSlug,
    ) ?? null
  );
}

export async function getFeaturedContent(
  type?: CmsContentType,
): Promise<CmsContentEntry[]> {
  const entries =
    await getPublishedContent(type);

  return entries.filter(
    (entry) => entry.featured,
  );
}