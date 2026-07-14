import type { Metadata } from "next";
import FrameworksPage from "@/components/frameworks/FrameworksPage";

export const metadata: Metadata = {
  title: "Frameworks",
  description:
    "Explore SIGNAL, Evidence of Learning, and the Sufficient Understanding Framework by Niraj Chaurasiya.",
};

export default function Page() {
  return <FrameworksPage />;
}