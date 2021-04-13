import { ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { theme } from '../theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to booking-app!</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
