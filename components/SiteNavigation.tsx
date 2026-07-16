"use client";

import { nowPageContent } from "@/content/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BookOpenText,
  BriefcaseBusiness,
  Clock3,
  FlaskConical,
  FolderClock,
  Home,
  Mail,
  Menu,
  Network,
  PenLine,
  PlaySquare,
  Search,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavigationItem = {
  label: string;
  mobileLabel?: string;
  href: string;
  icon: LucideIcon;
};

const primaryNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Work",
    href: "/work",
    icon: BriefcaseBusiness,
  },
  {
    label: "Research",
    href: "/research",
    icon: FlaskConical,
  },
  {
    label: "Frameworks",
    href: "/frameworks",
    icon: Network,
  },
  {
    label: "Writing",
    href: "/writing",
    icon: PenLine,
  },
  {
    label: "Conversation Across Times",
    mobileLabel: "Books",
    href: "/books",
    icon: BookOpenText,
  },
  {
    label: "About",
    href: "/about",
    icon: UserRound,
  },
];

const secondaryNavigation: NavigationItem[] = [
  {
    label: "Now",
    href: "/now",
    icon: Clock3,
  },
  {
    label: "Timeline",
    href: "/timeline",
    icon: FolderClock,
  },
  {
    label: "Media",
    href: "/media",
    icon: PlaySquare,
  },
  {
    label: "Archive",
    href: "/archive",
    icon: Archive,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

const mobilePrimaryNavigation: NavigationItem[] = [
  primaryNavigation[0],
  primaryNavigation[1],
  primaryNavigation[2],
  primaryNavigation[3],
];

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLink({
  item,
  pathname,
  onNavigate,
  className = "",
  useMobileLabel = false,
}: {
  item: NavigationItem;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
  useMobileLabel?: boolean;
}) {
  const active = isPathActive(pathname, item.href);
  const Icon = item.icon;

  const visibleLabel =
    useMobileLabel && item.mobileLabel ? item.mobileLabel : item.label;

  return (
    <Link
      href={item.href}
      className={`navigation-link ${
        active ? "navigation-link--active" : ""
      } ${className}`}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <Icon
        className="navigation-link__icon"
        size={19}
        strokeWidth={1.8}
        aria-hidden="true"
      />

      <span>{visibleLabel}</span>
    </Link>
  );
}

function Brand() {
  return (
    <Link href="/" className="site-brand" aria-label="Niraj Chaurasiya home">
      <span className="site-brand__mark" aria-hidden="true">
        NC
      </span>

      <span className="site-brand__text">
        <strong>Niraj Chaurasiya</strong>
        <span>Building systems under uncertainty</span>
      </span>
    </Link>
  );
}

export default function SiteNavigation() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = moreOpen ? "hidden" : "";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [moreOpen]);

  /*
   * Everything after Frameworks appears inside the mobile More menu:
   *
   * Writing
   * Books
   * About
   * Now
   * Timeline
   * Media
   * Archive
   * Contact
   */
  const moreRoutes: NavigationItem[] = [
    ...primaryNavigation.slice(4),
    ...secondaryNavigation,
  ];

  const moreRouteActive = moreRoutes.some((item) =>
    isPathActive(pathname, item.href),
  );

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <aside className="site-sidebar">
        <div className="site-sidebar__header">
          <Brand />
        </div>

        <div className="site-sidebar__scroll">
          <nav className="sidebar-navigation" aria-label="Primary navigation">
            <p className="navigation-group-label">Explore</p>

            <div className="navigation-group">
              {primaryNavigation.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </div>
          </nav>

          <nav
            className="sidebar-navigation sidebar-navigation--secondary"
            aria-label="Additional navigation"
          >
            <p className="navigation-group-label">More</p>

            <div className="navigation-group">
              {secondaryNavigation.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                />
              ))}
            </div>
          </nav>
        </div>

        <div className="site-sidebar__footer">
          <Link href="/now" className="current-focus-card">
            <span className="current-focus-card__indicator" />

            <span className="current-focus-card__content">
              <span className="current-focus-card__label">Current focus</span>
              <strong>{nowPageContent.focus[0].title}</strong>
            </span>
          </Link>

          <Link href="/search" className="sidebar-action">
            <Search size={19} strokeWidth={1.8} aria-hidden="true" />
            <span>Search the website</span>
          </Link>

          <ThemeToggle showLabel />
        </div>
      </aside>

      <header className="mobile-header">
        <Brand />

        <div className="mobile-header__actions">
          <Link
            href="/search"
            className="mobile-icon-button"
            aria-label="Search"
          >
            <Search size={20} strokeWidth={1.8} aria-hidden="true" />
          </Link>

          <ThemeToggle />
        </div>
      </header>

      <nav className="mobile-bottom-navigation" aria-label="Mobile navigation">
        {mobilePrimaryNavigation.map((item) => {
          const active = isPathActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.href}
              className={`mobile-navigation-item ${
                active ? "mobile-navigation-item--active" : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={1.8} aria-hidden="true" />

              <span>{item.mobileLabel ?? item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          className={`mobile-navigation-item ${
            moreOpen || moreRouteActive ? "mobile-navigation-item--active" : ""
          }`}
          onClick={() => setMoreOpen((current) => !current)}
          aria-expanded={moreOpen}
          aria-controls="mobile-more-menu"
          aria-label={
            moreOpen ? "Close more navigation" : "Open more navigation"
          }
        >
          {moreOpen ? (
            <X size={21} strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
          )}

          <span>More</span>
        </button>
      </nav>

      {moreOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close menu"
            onClick={() => setMoreOpen(false)}
          />

          <section
            id="mobile-more-menu"
            className="mobile-more-menu"
            aria-label="More navigation"
          >
            <div className="mobile-more-menu__header">
              <div>
                <p className="mobile-more-menu__eyebrow">Explore more</p>
                <h2>Navigate the website</h2>
              </div>

              <button
                type="button"
                className="mobile-more-menu__close"
                onClick={() => setMoreOpen(false)}
                aria-label="Close menu"
              >
                <X size={21} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="mobile-more-menu__links">
              {moreRoutes.map((item) => (
                <NavigationLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onNavigate={() => setMoreOpen(false)}
                  className="navigation-link--mobile-sheet"
                  useMobileLabel
                />
              ))}
            </div>

            <Link
              href="/now"
              className="mobile-focus-card"
              onClick={() => setMoreOpen(false)}
            >
              <BookOpenText size={20} strokeWidth={1.8} aria-hidden="true" />

              <span>
                <small>What I am doing now</small>
                <strong>View my current focus</strong>
              </span>
            </Link>
          </section>
        </>
      )}
    </>
  );
}
