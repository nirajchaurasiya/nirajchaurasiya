import React from "react";
import Link from "next/link";
import Head from "next/head";
export default function ErrorPage() {
  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>404 Page Not Found - Niraj Chaurasiya</title>
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
        <meta property="og:title" content="Niraj Chaurasiya - Home" />
        <meta
          property="og:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta
          property="og:url"
          content="https://www.nirajchaurasiya.netlify.app"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta
          name="twitter:url"
          content="https://www.nirajchaurasiya.netlify.app"
        />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <div className="error_page">
        <div className="error_page_mid">
          <p>404</p>
          <p>Page Not Found On This Server</p>
          <Link href="/">
            <button>Go To Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}
