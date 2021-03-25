import { AppProps } from 'next/app';
import React from 'react';
import { Client,Provider } from 'urql'

const client = new Client({
  url: '/graphql'
})

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default CustomApp;
