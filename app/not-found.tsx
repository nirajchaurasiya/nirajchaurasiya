import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__code">
        404
      </div>

      <div className="not-found-page__content">
        <p className="section-eyebrow">
          Page not found
        </p>

        <h1>
          This route does not belong
          <span>to the current system.</span>
        </h1>

        <p>
          The page may have moved, been archived,
          or never existed. Search the knowledge
          system or return to the homepage.
        </p>

        <div>
          <Link
            href="/"
            className="button button--primary"
          >
            <Home
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            Return home
          </Link>

          <Link
            href="/search"
            className="button button--secondary"
          >
            <Search
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            Search the website
          </Link>
        </div>
      </div>

      <Link
        href="/"
        className="not-found-page__back"
      >
        <ArrowLeft
          size={16}
          strokeWidth={1.8}
          aria-hidden="true"
        />

        nirajchaurasiya.com
      </Link>
    </main>
  );
}