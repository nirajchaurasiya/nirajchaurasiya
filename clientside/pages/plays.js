import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./garden-of-thoughts.module.css"; // Import custom CSS
import allplays from "./plays/allplays.json";
const GardenOfThoughts = () => {
  return (
    <div>
      <Head>
        {/* SEO meta tags */}
        <title>Plays | Dramas | Novels - Niraj Chaurasiya</title>
        <meta
          name="description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta
          name="keywords"
          content="full stack web developer, web applications, front-end, back-end"
        />
        <meta name="author" content="Niraj Chaurasiya" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph meta tags (for better sharing on social media) */}
        <meta
          property="og:title"
          content="Plays | Dramas | Novels  - Niraj Chaurasiya"
        />
        <meta
          property="og:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.nirajchaurasiya.com/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Plays | Dramas | Novels  - Niraj Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="twitter:url" content="https://www.nirajchaurasiya.com/" />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <br />
      {allplays.map((e) => {
        return (
          <div key={e.index} className={styles.playContainer}>
            <h1 className={styles.playTitle}>{e.title}</h1>
            <div className={styles.playContent}>
              <section className={styles.aboutSection}>
                <h2>About</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: e.about.description,
                  }}
                ></p>
              </section>
              <section className={styles.historySection}>
                <h2>History</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: e.history.description,
                  }}
                ></p>
                <br />
              </section>
              <section className={styles.historySection}>
                <h2>Conclusion</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: e.conclusion.description,
                  }}
                ></p>
              </section>
            </div>
            <div className={styles.important_notic}>
              <div>
                Note: To enhance your understanding of the archaic words used in
                this play, you can refer to the dedicated archaic words
                dictionary available on{" "}
                <button
                  onClick={() => {
                    window.open(
                      "https://personal-dictionary.onrender.com",
                      "_blank"
                    );
                  }}
                >
                  https://personal-dictionary.onrender.com
                </button>
                . This resource provides meanings for the archaic words used
                throughout the text.
              </div>
            </div>
            <div className={styles.backLink}>
              <Link href="/plays/humans-mind-a-garden">
                <button>Go to this Play</button>
              </Link>
            </div>
          </div>
        );
      })}
      <br />
      <br />

      <br />
      <br />

      <br />
      <br />
    </div>
  );
};

export default GardenOfThoughts;
