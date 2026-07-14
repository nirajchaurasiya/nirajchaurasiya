import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name: siteConfig.name,

    short_name:
      siteConfig.shortName,

    description:
      siteConfig.description,

    start_url: "/",

    display: "standalone",

    background_color: "#f7f7f5",

    theme_color: "#171715",

    orientation: "portrait-primary",

    categories: [
      "education",
      "engineering",
      "research",
      "technology",
    ],

    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}