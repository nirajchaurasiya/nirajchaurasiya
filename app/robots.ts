import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: ["/api/", "/preview/", "/draft/"],
      },
    ],

    sitemap: absoluteUrl("/sitemap.xml"),

    host: siteConfig.url,
  };
}
