import type {
  CmsJsonObject,
} from "@/lib/cms/types";

export type CmsContentSection = {
  id: string;
  heading: string;
  body: string;
  points: string[];
};

export type ParsedCmsContent = {
  hero: {
    eyebrow: string;
    description: string;
  };

  details: Record<
    string,
    unknown
  >;

  sections: CmsContentSection[];

  tags: string[];
};

function readRecord(
  value: unknown,
): Record<string, unknown> {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  ) {
    return value as Record<
      string,
      unknown
    >;
  }

  return {};
}

function readString(
  value: unknown,
) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function readStringArray(
  value: unknown,
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string",
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

export function readDetailString(
  details: Record<
    string,
    unknown
  >,
  key: string,
) {
  return readString(
    details[key],
  );
}

export function readDetailStringArray(
  details: Record<string, unknown>,
  key: string,
) {
  const value = details[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string",
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

export function readFirstDetailString(
  details: Record<string, unknown>,
  keys: string[],
) {
  for (const key of keys) {
    const value = readDetailString(
      details,
      key,
    );

    if (value) {
      return value;
    }
  }

  return "";
}

export function parseCmsContent(
  data: CmsJsonObject,
): ParsedCmsContent {
  const hero =
    readRecord(data.hero);

  const details =
    readRecord(data.details);

  const rawSections =
    Array.isArray(data.sections)
      ? data.sections
      : [];

  const sections =
    rawSections
      .map(
        (
          rawSection,
          index,
        ): CmsContentSection => {
          const section =
            readRecord(rawSection);

          return {
            id:
              readString(
                section.id,
              ) ||
              `section-${index + 1}`,

            heading:
              readString(
                section.heading,
              ),

            body:
              readString(
                section.body,
              ),

            points:
              readStringArray(
                section.points,
              ),
          };
        },
      )
      .filter(
        (section) =>
          section.heading ||
          section.body ||
          section.points.length > 0,
      );

  return {
    hero: {
      eyebrow:
        readString(
          hero.eyebrow,
        ),

      description:
        readString(
          hero.description,
        ),
    },

    details,

    sections,

    tags:
      readStringArray(
        data.tags,
      ),
  };
}