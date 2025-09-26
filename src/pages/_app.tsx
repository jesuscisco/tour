import type { AppProps } from 'next/app';
import '../styles/layout.css'; // <- import global here

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}