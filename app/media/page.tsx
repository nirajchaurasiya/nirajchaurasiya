import type { Metadata } from "next";
import MediaPage from "@/components/media/MediaPage";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Videos, talks, presentations, playlists, and public media by Niraj Chaurasiya.",
};

export default function Page() {
  return <MediaPage />;
}