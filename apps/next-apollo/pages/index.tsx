import { gql, NetworkStatus, useApolloClient, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import { useRequireAuth } from '../hook/useRequireAuth';
import { Photo } from '../type';

const GET_PHOTOS = gql`
  query {
    allPhotos {
      id
      name
      description
      created
    }
  }
`;

export function Index() {
  useRequireAuth();

  const client = useApolloClient();

  const { loading, error, data, refetch, networkStatus } = useQuery<{
    allPhotos: Photo[];
  }>(GET_PHOTOS, {
    notifyOnNetworkStatusChange: true,
  });

  const handleLogout = () => {
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
  };

  if (networkStatus === NetworkStatus.refetch) {
    return <div>Re Fetching...</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error :(</div>;
  }
  return (
    <div>
      <h2>Photo Gallery</h2>
      <Link href={'/mypage'}>Mypage</Link>
      <Link href={'/add'}>New</Link>
      <ul>
        {data.allPhotos.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button onClick={() => refetch()}>ReFetch</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Index;
