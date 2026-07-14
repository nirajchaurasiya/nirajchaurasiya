import type { Metadata } from "next";
import ArchivePage from "@/components/archive/ArchivePage";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Deprecated versions, retired assumptions, old prototypes, and historical experiments from Niraj Chaurasiya's work.",
};

export default function Page() {
  return <ArchivePage />;
}