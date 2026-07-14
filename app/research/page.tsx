import type { Metadata } from "next";
import { Suspense } from "react";
import ResearchPage from "@/components/research/ResearchPage";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research by Niraj Chaurasiya on behavioral evidence, learning, engineering systems, information systems, and uncertainty.",
};

export default function Page() {
  return (
    <Suspense fallback={<ResearchPageFallback />}>
      <ResearchPage />
    </Suspense>
  );
}

function ResearchPageFallback() {
  return (
    <div className="research-page">
      <section className="research-page-loading">
        <p>Loading the research map…</p>
      </section>
    </div>
  );
}