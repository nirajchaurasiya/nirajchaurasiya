import type { Metadata } from "next";
import WritingPage from "@/components/writing/WritingPage";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays, reflections, research notes, technical explanations, and building logs by Niraj Chaurasiya.",
};

export default function Page() {
  return <WritingPage />;
}