import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

const exploreLinks: FooterLink[] = [
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
];

const systemLinks: FooterLink[] = [
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
];

const moreLinks: FooterLink[] = [
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
];

function getSocialLinks(): FooterLink[] {
  const links = [
    {
      label: "LinkedIn",
      href: process.env.LINKEDIN_URL,
    },
    {
      label: "GitHub",
      href: process.env.GITHUB_PROFILE_URL,
    },
    {
      label: "YouTube",
      href: process.env.YOUTUBE_URL,
    },
    {
      label: "X",
      href: process.env.X_PROFILE_URL,
    },
    {
      label: "Instagram",
      href: process.env.INSTAGRAM_URL,
    },
  ];

  return links.filter(
    (link): link is FooterLink =>
      typeof link.href === "string" && link.href.trim().length > 0,
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = getSocialLinks();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__introduction">
          <Link
            href="/"
            className="footer-brand"
            aria-label="Niraj Chaurasiya home"
          >
            <span className="footer-brand__mark" aria-hidden="true">
              NC
            </span>

            <span className="footer-brand__identity">
              <strong>Niraj Chaurasiya</strong>

              <small>Building systems under uncertainty</small>
            </span>
          </Link>

          <p>
            Exploring engineering, software, learning, and systems where
            outcomes are uncertain and evidence remains incomplete.
          </p>

          <Link href="/about" className="footer-text-link">
            About my direction
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="site-footer__column">
          <h2>Explore</h2>

          <nav aria-label="Footer exploration links">
            {exploreLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="site-footer__column">
          <h2>Systems</h2>

          <nav aria-label="External project links">
            {systemLinks.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}

                <span className="site-footer__external-mark" aria-hidden="true">
                  ↗
                </span>

                <span className="visually-hidden">opens in a new tab</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer__column site-footer__column--connect">
          <h2>More</h2>

          <nav aria-label="Additional website links">
            {moreLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {socialLinks.length > 0 && (
            <div className="site-footer__social-section">
              <h2>Connect</h2>

              <nav
                className="site-footer__socials"
                aria-label="Social profiles"
              >
                {socialLinks.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}

                    <span
                      aria-hidden="true"
                      className="site-footer__external-mark"
                    >
                      ↗
                    </span>

                    <span className="visually-hidden">opens in a new tab</span>
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {currentYear} Niraj Chaurasiya</p>

        <p>Building systems under uncertainty</p>
      </div>
    </footer>
  );
}
