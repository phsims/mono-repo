import { AppProps } from 'next/app';
import Head from 'next/head';
import 'meal-planner/styles/styles.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to meal planner app</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
