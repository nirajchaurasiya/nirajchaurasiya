import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsStandalonePage from "@/components/cms/CmsStandalonePage";

import { getPublishedEntry } from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const entry = await getPublishedEntry("PAGE", "now");

  return entry
    ? createCmsPageMetadata(entry)
    : {
        title: "Now Not Found",
      };
}

export default async function NowPage() {
  const entry = await getPublishedEntry("PAGE", "now");

  if (!entry) {
    notFound();
  }

  return <CmsStandalonePage entry={entry} />;
}
