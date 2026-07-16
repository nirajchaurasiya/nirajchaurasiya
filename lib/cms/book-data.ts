import {
  parseCmsContent,
  readDetailString,
  readDetailStringArray,
} from "@/lib/cms/content-data";
import type { CmsContentEntry } from "@/lib/cms/types";

export type CmsBookReflection = {
  id: string;
  date: string;
  title: string;
  body: string;
};

export type ParsedCmsBook = {
  entry: CmsContentEntry;

  author: string;
  status: string;

  startedAt: string;
  completedAt: string;

  centralQuestion: string;
  whyEntered: string;
  currentReflection: string;

  threads: string[];
  openQuestions: string[];

  reflections: CmsBookReflection[];

  sections: ReturnType<typeof parseCmsContent>["sections"];

  tags: string[];

  eyebrow: string;
  description: string;
};

function readRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readReflections(value: unknown): CmsBookReflection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      const reflection = readRecord(item);

      const date = readString(reflection.date);

      const title = readString(reflection.title);

      const body = readString(reflection.body);

      if (!date && !title && !body) {
        return null;
      }

      return {
        id: readString(reflection.id) || `reflection-${index + 1}`,

        date,
        title,
        body,
      };
    })
    .filter(
      (reflection): reflection is CmsBookReflection => reflection !== null,
    );
}

export function splitCmsParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function parseCmsBook(entry: CmsContentEntry): ParsedCmsBook {
  const content = parseCmsContent(entry.data);

  const details = content.details;

  return {
    entry,

    author: readDetailString(details, "author") || "Author unavailable",

    status: readDetailString(details, "status") || "In conversation",

    startedAt: readDetailString(details, "startedAt"),

    completedAt: readDetailString(details, "completedAt"),

    centralQuestion:
      readDetailString(details, "centralQuestion") || entry.summary,

    whyEntered:
      readDetailString(details, "whyEntered") ||
      content.hero.description ||
      entry.summary,

    currentReflection:
      readDetailString(details, "currentReflection") ||
      content.hero.description ||
      entry.summary,

    threads: readDetailStringArray(details, "threads"),

    openQuestions: readDetailStringArray(details, "openQuestions"),

    reflections: readReflections(details.reflections),

    sections: content.sections,

    tags: content.tags,

    eyebrow: content.hero.eyebrow,

    description: content.hero.description,
  };
}
