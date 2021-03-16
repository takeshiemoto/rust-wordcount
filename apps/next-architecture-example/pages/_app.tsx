import './styles.css';

import { AppProps } from 'next/app';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default CustomApp;
