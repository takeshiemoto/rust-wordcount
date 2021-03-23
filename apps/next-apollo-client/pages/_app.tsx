import { AppProps } from 'next/app';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default CustomApp;
