import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CmsContactPage from "@/components/cms/CmsContactPage";

import { getPublishedEntry } from "@/lib/cms/client";

import { createCmsPageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const entry = await getPublishedEntry("PAGE", "contact");

  return entry
    ? createCmsPageMetadata(entry)
    : {
        title: "Contact Not Found",
      };
}

export default async function ContactPage() {
  const entry = await getPublishedEntry("PAGE", "contact");

  if (!entry) {
    notFound();
  }

  return <CmsContactPage entry={entry} />;
}
