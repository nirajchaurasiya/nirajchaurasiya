// ... (existing code)

import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../styles/globals.css";
import "../styles/index.css";
import "../styles/about.css";
import "../styles/projects.css";
import "../styles/404.css";

export default function MyApp({ Component, pageProps }) {
  const loadingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      try {
        loadingRef.current.continuousStart();
      } catch (err) {}
    };

    const handleRouteChangeComplete = () => {
      try {
        loadingRef.current.complete();
      } catch (err) {}
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);

      try {
        loadingRef.current.complete();
      } catch (err) {}
    };
  }, []);

  return (
    <>
      <Head>
        <title>Niraj Chaurasiya - Home</title>
        <link
          rel="shortcut icon"
          href="/assests/logo.jpg"
          type="image/x-icon"
        />
      </Head>
      <LoadingBar color="var(--nav-text-color)" height={3} ref={loadingRef} />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
