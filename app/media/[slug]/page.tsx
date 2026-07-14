import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MediaDetailPage from "@/components/media/MediaDetailPage";
import {
  getMediaBySlug,
  mediaCatalog,
} from "@/content/media";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return mediaCatalog.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const media = getMediaBySlug(slug);

  if (!media) {
    return {
      title: "Media Not Found",
    };
  }

  return {
    title: media.title,
    description: media.summary,
  };
}

export default async function Page({
  params,
}: PageProps) {
  const { slug } = await params;
  const media = getMediaBySlug(slug);

  if (!media) {
    notFound();
  }

  return <MediaDetailPage media={media} />;
}