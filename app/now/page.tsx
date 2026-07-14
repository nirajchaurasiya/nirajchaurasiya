import type { Metadata } from "next";
import NowPage from "@/components/now/NowPage";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Niraj Chaurasiya is currently building, researching, reading, preparing, and questioning.",
};

export default function Page() {
  return <NowPage />;
}