import './styles.css';

import { defaultTheme, Provider, SSRProvider } from '@adobe/react-spectrum';
import { AppProps } from 'next/app';
import React from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Provider theme={defaultTheme}>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}

export default CustomApp;
