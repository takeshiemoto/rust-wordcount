import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to booking-app!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
