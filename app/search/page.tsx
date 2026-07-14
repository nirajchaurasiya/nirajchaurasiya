import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPage from "@/components/search/SearchPage";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Niraj Chaurasiya's projects, research, frameworks, writing, media, and archive.",

  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <SearchLoadingState />
      }
    >
      <SearchPage />
    </Suspense>
  );
}

function SearchLoadingState() {
  return (
    <div className="global-search-loading">
      <p>Loading the knowledge system…</p>
    </div>
  );
}