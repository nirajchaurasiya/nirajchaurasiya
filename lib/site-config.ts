function normalizeSiteUrl(value: string) {
  const trimmed = value.trim();

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.replace(/\/+$/, "");
}

const configuredSiteUrl = process.env.SITE_URL ?? "https://nirajchaurasiya.com";

export const siteConfig = {
  name: "Niraj Chaurasiya",

  shortName: "Niraj",

  url: normalizeSiteUrl(configuredSiteUrl),

  title: "Niraj Chaurasiya — Engineer, Researcher, and Builder",

  description:
    "Mechanical engineering student, researcher, and builder exploring engineering, software, learning, robotics, and systems under uncertainty.",

  locale: "en_US",
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${siteConfig.url}${normalizedPath}`;
}
