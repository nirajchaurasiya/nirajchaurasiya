export default function Loading() {
  return (
    <main className="site-loading" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading page content</span>

      <header className="site-loading__hero">
        <div className="site-loading__line site-loading__line--eyebrow" />

        <div className="site-loading__line site-loading__line--title" />
        <div className="site-loading__line site-loading__line--title-short" />

        <div className="site-loading__line site-loading__line--summary" />
        <div className="site-loading__line site-loading__line--summary-short" />
      </header>

      <section className="site-loading__section">
        <div className="site-loading__line site-loading__line--section-title" />

        <div className="site-loading__grid">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div className="site-loading__card" key={index}>
              <div className="site-loading__line site-loading__line--small" />

              <div>
                <div className="site-loading__line site-loading__line--card-title" />
                <div className="site-loading__line site-loading__line--card-copy" />
                <div className="site-loading__line site-loading__line--card-copy-short" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
