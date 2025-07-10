import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-W891NTYQT6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-W891NTYQT6');
</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

      </Html>
    );
  }
}

export default MyDocument;
