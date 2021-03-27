import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
