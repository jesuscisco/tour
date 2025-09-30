import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const v = process.env.NEXT_PUBLIC_ASSET_VERSION || '';
  const ver = v ? `?v=${encodeURIComponent(v)}` : '';
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={`${base}/favicon.ico${ver}`} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" />
          <link rel="stylesheet" href={`${base}/styles/theme.css${ver}`} />
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