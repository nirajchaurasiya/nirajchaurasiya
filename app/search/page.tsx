import type { Metadata } from "next";

import SearchPage from "@/components/search/SearchPage";

import { searchCatalog } from "@/content/search";

import { createCmsBookSearchEntries } from "@/lib/cms/book-search";
import { getPublishedContent } from "@/lib/cms/client";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search projects, research, frameworks, writing, books, media, archive entries, and public pages.",
};

export default async function Page() {
  const books = await getPublishedContent("BOOK");

  const entries = [...searchCatalog, ...createCmsBookSearchEntries(books)];

  return <SearchPage entries={entries} />;
}
