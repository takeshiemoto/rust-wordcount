import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { AppProps } from 'next/app';
import React, { useEffect, VFC } from 'react';

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const resolvers = {};

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
});

export const AppInit: VFC<{ client: ApolloClient<NormalizedCacheObject> }> = ({
  client,
}) => {
  /**
   * 1. ユーザー情報を取得する
   * 2. 存在しない場合はリダイレクトしてもよいかも
   */
  useEffect(() => {
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
  }, [client]);

  return null;
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <AppInit client={client} />
    </ApolloProvider>
  );
}

export default CustomApp;
