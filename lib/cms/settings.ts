export type PublicSiteSettings = {
  publicSiteName: string;
  tagline: string;
  contactEmail: string;
  showEmailPublicly: boolean;
  publicSiteUrl: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImageUrl: string;

  socials: {
    github: string;
    linkedin: string;
    x: string;
    youtube: string;
    instagram: string;
  };
};

const ANALYTICS_INGEST_URL =
  process.env.ANALYTICS_INGEST_URL ??
  "http://localhost:3001/api/public/analytics";

function getAnalyticsBaseUrl() {
  try {
    return new URL(ANALYTICS_INGEST_URL).origin;
  } catch {
    return "http://localhost:3001";
  }
}

const ANALYTICS_BASE_URL = getAnalyticsBaseUrl();

export async function getPublicSiteSettings(): Promise<PublicSiteSettings | null> {
  try {
    const response = await fetch(`${ANALYTICS_BASE_URL}/api/public/settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch public settings:",
        response.status,
        response.statusText,
      );

      return null;
    }

    const result = (await response.json()) as {
      settings?: PublicSiteSettings;
    };

    return result.settings ?? null;
  } catch (error) {
    console.error("Failed to fetch public site settings:", error);

    return null;
  }
}
