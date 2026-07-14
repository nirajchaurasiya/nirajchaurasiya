import type { Metadata } from "next";
import "./globals.css";
import SiteNavigation from "@/components/SiteNavigation";
import Footer from "@/components/Footer";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase:
    new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template:
      `%s | ${siteConfig.name}`,
  },

  description:
    siteConfig.description,

  applicationName:
    siteConfig.name,

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator:
    siteConfig.name,

  publisher:
    siteConfig.name,

  keywords:
    siteConfig.keywords,

  category:
    "Technology",

  openGraph: {
    type: "website",
    locale: siteConfig.language,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description:
      siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview":
        "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },

  verification: {
    google:
      process.env
        .NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
        <script
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
        </div>
      </body>
    </html>
  );
}