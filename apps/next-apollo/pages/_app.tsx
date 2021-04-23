import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { AppProps } from 'next/app';
import React from 'react';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const resolvers = {};

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
});

/**
 * 実際には認証情報をCookie？かどこから取り出して認証状態を取得する
 * React Contextでやっても良さそう
 */

client.writeQuery({
  query: gql`
    query writeData {
      isLoggedIn
    }
  `,
  data: {
    isLoggedIn: false,
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default CustomApp;
