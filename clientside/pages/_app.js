import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
// import MidNavbar from '../components/midnavbar/MidNavbar'
import '../styles/globals.css'
import '../styles/index.css'
import '../styles/about.css'
import '../styles/projects.css'
import '../styles/404.css'
import Head from 'next/head'
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/router';
export default function MyApp({ Component, pageProps }) {
  const loadingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {

    const handleRouteChange = (url, { shallow }) => {

      //Start the progress bar because the route is changed !
      try {
        loadingRef.current.continuousStart();
      }
      catch (err) {

      }

    }

    const handleRouteComplete = (url, obj) => {

      //Make the progress bar 100% because our route load is completed !
      try {
        loadingRef.current.complete();
      }
      catch (err) {

      }
    }

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {

      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteComplete);

      //Complete the progress if component unmounted !
      try {
        loadingRef.current.complete();
      }
      catch (err) {

      }

    }


  }, []);
  return (<>
    <Head>
      <title>Niraj Chaurasiya - Home</title>
      <link rel="shortcut icon" href="/assests/logo.jpg" type="image/x-icon" />
    </Head>
    <LoadingBar color='var(--nav-text-color)' height={3} ref={loadingRef} />
    <Navbar />
    {/* <MidNavbar /> */}
    <Component {...pageProps} />
    <Footer />
  </>)
}
