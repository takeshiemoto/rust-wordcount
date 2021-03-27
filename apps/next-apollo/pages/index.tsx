import { gql, useQuery } from '@apollo/client';
import React from 'react';

const ALL_PHOTO_QUERY = gql`
  query {
    allPhotos {
      id
      name
      description
      created
      postedBy {
        name
      }
    }
  }
`;

export function Index() {
  const { loading, error, data } = useQuery(ALL_PHOTO_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error :(</div>;
  }

  return (
    <div>
      <h2>Hello world</h2>
      {JSON.stringify(data)}
    </div>
  );
}

export default Index;
