import type { SearchEntry } from "@/content/search";

import { parseCmsBook } from "@/lib/cms/book-data";
import { getCmsEntryHref } from "@/lib/cms/routes";
import type { CmsContentEntry } from "@/lib/cms/types";

export function createCmsBookSearchEntries(
  entries: CmsContentEntry[],
): SearchEntry[] {
  return entries.map((entry) => {
    const book = parseCmsBook(entry);

    const latestReflection = book.reflections.at(-1);

    return {
      id: `book-${entry.id}`,

      type: "Book",

      title: entry.title,

      description: book.currentReflection || entry.summary,

      href: getCmsEntryHref(entry),

      keywords: [
        book.author,
        book.status,
        book.centralQuestion,
        book.whyEntered,
        book.currentReflection,
        ...book.threads,
        ...book.openQuestions,
        ...book.tags,

        ...book.sections.flatMap((section) => [
          section.heading,
          section.body,
          ...section.points,
        ]),

        ...book.reflections.flatMap((reflection) => [
          reflection.title,
          reflection.body,
        ]),

        ...entry.relationships.map((relationship) => relationship.target.title),
      ].filter(Boolean),

      date:
        latestReflection?.date ||
        book.completedAt ||
        book.startedAt ||
        entry.publishedAt ||
        entry.updatedAt,

      status: book.status,
    };
  });
}
