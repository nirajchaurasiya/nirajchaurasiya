import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Niraj Chaurasiya — Building Systems Under Uncertainty",
  },
  description:
    "Mechanical engineering student, researcher and builder exploring engineering, software, learning and systems under uncertainty.",
};

export default function Page() {
  return <HomePage />;
}