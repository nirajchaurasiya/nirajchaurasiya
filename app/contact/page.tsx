import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Niraj Chaurasiya about research, engineering, software, speaking, collaboration, or current projects.",
};

export default function Page() {
  return <ContactPage />;
}