// import type { Metadata } from "next";
import "./globals.css";
import SiteNavigation from "@/components/SiteNavigation";
import Footer from "@/components/Footer";
// import { siteConfig } from "@/content/site";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Script from "next/script";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,

    template: "%s | Niraj Chaurasiya",
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  authors: [
    {
      name: "Niraj Chaurasiya",
    },
  ],

  creator: "Niraj Chaurasiya",

  publisher: "Niraj Chaurasiya",

  category: "technology",

  keywords: [
    "Niraj Chaurasiya",
    "Mechanical Engineering",
    "Systems Thinking",
    "Robotics",
    "Software Engineering",
    "Learning Science",
    "Research",
    "TechShortsApp",
    "TechXEng",
    "GlobalBriz",
    "Building systems under uncertainty",
  ],

  openGraph: {
    type: "website",

    locale: siteConfig.locale,

    url: siteConfig.url,

    siteName: siteConfig.name,

    title: siteConfig.title,

    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.title,

    description: siteConfig.description,
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};
const themeInitializationScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("niraj-theme") || "system";
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var resolvedTheme =
        storedTheme === "system"
          ? systemDark
            ? "dark"
            : "light"
          : storedTheme;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.dataset.themePreference = storedTheme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
      document.documentElement.dataset.themePreference = "system";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="theme-initialization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: themeInitializationScript,
          }}
        />
      </head>

      <body>
        <SiteNavigation />

        <div className="site-frame">
          <main id="main-content" className="site-main">
            {children}
          </main>

          <Footer />
          <AnalyticsTracker />
        </div>
      </body>
    </html>
  );
}
