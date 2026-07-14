export const siteConfig = {
  name: "Niraj Chaurasiya",
  shortName: "NC",

  title:
    "Niraj Chaurasiya — Building Systems Under Uncertainty",

  description:
    "Mechanical engineering student, researcher, and builder exploring engineering, software, learning, and systems under uncertainty.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://nirajchaurasiya.com",

  tagline: "Building systems under uncertainty",

  language: "en-US",

  location: "United States",

  keywords: [
    "Niraj Chaurasiya",
    "Mechanical Engineering",
    "Systems Thinking",
    "Robotics",
    "Software Engineering",
    "Learning Science",
    "Evidence of Learning",
    "TechShortsApp",
    "TechXEng",
    "GlobalBriz",
    "SIGNAL Framework",
    "Sufficient Understanding Framework",
    "Building Systems Under Uncertainty",
  ],

  navigation: {
    primary: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Work",
        href: "/work",
      },
      {
        label: "Research",
        href: "/research",
      },
      {
        label: "Frameworks",
        href: "/frameworks",
      },
      {
        label: "Writing",
        href: "/writing",
      },
      {
        label: "About",
        href: "/about",
      },
    ],

    secondary: [
      {
        label: "Now",
        href: "/now",
      },
      {
        label: "Timeline",
        href: "/timeline",
      },
      {
        label: "Media",
        href: "/media",
      },
      {
        label: "Archive",
        href: "/archive",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },

  projects: [
    {
      label: "TechShortsApp",
      href: "https://techshortsapp.com",
    },
    {
      label: "TechXEng",
      href: "https://techxeng.com",
    },
    {
      label: "GlobalBriz",
      href: "https://globalbriz.com",
    },
  ],
};