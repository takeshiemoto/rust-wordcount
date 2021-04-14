import './styles.css';

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme({ palette: { type: 'dark' } });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

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
        <AppBar color={'inherit'} position={'static'}>
          <Toolbar>
            <Link href={'/'} passHref>
              <Button color={'default'}>Nextjs Booking App</Button>
            </Link>
            <Link href={'/booking/list'} passHref>
              <Button color={'default'}>Booking List</Button>
            </Link>
            <Link href={'/booking/new'} passHref>
              <Button color={'default'}>New Booking</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
