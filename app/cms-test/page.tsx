import type {
  Metadata,
} from "next";
import { notFound } from "next/navigation";

import {
  getPublishedEntry,
} from "@/lib/cms/client";

export const metadata:
  Metadata = {
    title: "CMS Connection Test",
    robots: {
      index: false,
      follow: false,
    },
  };

export default async function CmsTestPage() {
  const entry =
    await getPublishedEntry(
      "WRITING",
      "publication-lifecycle-test",
    );

  if (!entry) {
    notFound();
  }

  return (
    <main
      style={{
        width: "min(900px, calc(100% - 32px))",
        margin: "0 auto",
        padding: "120px 0",
      }}
    >
      <p>
        CMS connection test
      </p>

      <h1>{entry.title}</h1>

      <p>{entry.summary}</p>

      <dl>
        <div>
          <dt>Type</dt>
          <dd>{entry.type}</dd>
        </div>

        <div>
          <dt>Slug</dt>
          <dd>{entry.slug}</dd>
        </div>

        <div>
          <dt>Version</dt>
          <dd>v{entry.version}</dd>
        </div>

        <div>
          <dt>Published</dt>
          <dd>
            {entry.publishedAt
              ? new Date(
                  entry.publishedAt,
                ).toLocaleString(
                  "en-US",
                )
              : "Unknown"}
          </dd>
        </div>
      </dl>

      <section>
        <h2>Published data</h2>

        <pre
          style={{
            maxWidth: "100%",
            padding: "24px",
            overflowX: "auto",
            borderRadius: "16px",
            background: "#111",
            color: "#fff",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(
            entry.data,
            null,
            2,
          )}
        </pre>
      </section>

      <section>
        <h2>Relationships</h2>

        <pre
          style={{
            maxWidth: "100%",
            padding: "24px",
            overflowX: "auto",
            borderRadius: "16px",
            background: "#111",
            color: "#fff",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(
            entry.relationships,
            null,
            2,
          )}
        </pre>
      </section>
    </main>
  );
}