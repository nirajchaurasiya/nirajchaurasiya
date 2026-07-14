import type { Metadata } from "next";
import WorkPage from "@/components/work/WorkPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Niraj Chaurasiya's software platforms, engineering systems, research projects, and experiments.",
};

export default function Page() {
  return <WorkPage />;
}