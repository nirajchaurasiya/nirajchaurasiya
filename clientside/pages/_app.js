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
        <title>Niraj Chaurasiya - Home</title>
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
