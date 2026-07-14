import Link from "next/link";

const exploreLinks = [
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
    label: "Timeline",
    href: "/timeline",
  },
];

const systemLinks = [
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__introduction">
          <Link href="/" className="footer-brand">
            <span className="footer-brand__mark" aria-hidden="true">
              NC
            </span>

            <span>Niraj Chaurasiya</span>
          </Link>

          <p>
            Exploring engineering, software, learning and systems where
            outcomes are uncertain and evidence remains incomplete.
          </p>

          <Link href="/about" className="footer-text-link">
            More about my direction
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
                <span className="visually-hidden"> opens in a new tab</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer__column">
          <h2>Connect</h2>

          <nav aria-label="Contact and information links">
            <Link href="/now">Now</Link>
            <Link href="/media">Media</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {currentYear} Niraj Chaurasiya.</p>

        <p>Building systems under uncertainty.</p>
      </div>
    </footer>
  );
}