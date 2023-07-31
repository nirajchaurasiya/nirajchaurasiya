import React, { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Shadow from "../components/shadow/Shadow";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/about.css";
import "../styles/projects.css";
import "../styles/404.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  const loadingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const detect_key = document.getElementById("");
    let currentLoadingRef = loadingRef.current; // Copy the ref to a variable

    const handleRouteChangeStart = () => {
      try {
        currentLoadingRef.continuousStart(); // Use the variable inside the effect
      } catch (err) {}
    };

    const handleRouteChangeComplete = () => {
      try {
        currentLoadingRef.complete(); // Use the variable inside the effect
      } catch (err) {}
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);

      try {
        currentLoadingRef.complete(); // Use the variable inside the cleanup function
      } catch (err) {}
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* SEO meta tags */}
        <title>Home - Niraj Chaurasiya</title>
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
        <meta property="og:image" content="/path/to/your/og-image.jpg" />
        <meta
          property="og:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags (for better sharing on Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Niraj Chaurasiya - Home" />
        <meta
          name="twitter:description"
          content="I am a full stack web developer, with a deep passion for creating dynamic and functional web applications. With expertise in both front-end and back-end development, I am able to bring a holistic approach to building websites that not only look great but also provide a seamless user experience."
        />
        <meta name="twitter:image" content="/path/to/your/twitter-image.jpg" />
        <meta
          name="twitter:url"
          content="https://www.nirajchaurasiya.netlify.app/"
        />

        {/* Other meta tags */}
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <LoadingBar color="var(--nav-text-color)" height={3} ref={loadingRef} />
      <Navbar />
      <Shadow />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
