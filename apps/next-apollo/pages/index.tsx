import { gql, NetworkStatus, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

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
  const { loading, error, data, refetch, networkStatus } = useQuery<{
    allPhotos: Photo[];
  }>(GET_PHOTOS, {
    notifyOnNetworkStatusChange: true,
  });

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
      <ul>
        {data.allPhotos.map((p) => (
          <li key={p.id}>
            <Link href={`/photo/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => refetch()}>ReFetch</button>
    </div>
  );
}

export default Index;
