import type { Metadata } from "next";
import TimelinePage from "@/components/timeline/TimelinePage";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A chronological record of Niraj Chaurasiya's projects, research, frameworks, writing, media, and academic development.",
};

export default function Page() {
  return <TimelinePage />;
}