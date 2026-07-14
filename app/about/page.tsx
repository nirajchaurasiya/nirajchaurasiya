import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Niraj Chaurasiya—mechanical engineering student, software builder, researcher, and technical communicator working across systems and uncertainty.",
};

export default function Page() {
  return <AboutPage />;
}