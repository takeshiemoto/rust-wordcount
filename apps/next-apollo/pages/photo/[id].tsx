import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Photo } from '../../type';

const GET_PHOTO = gql`
  query getPhoto($id: ID!) {
    photoById(id: $id) {
      id
      name
      description
    }
  }
`;

const UPDATE_PHOTO_NAME = gql`
  mutation updatePhotoName($id: ID!, $name: String!) {
    updatePhotoName(input: { id: $id, name: $name }) {
      id
      name
      description
    }
  }
`;

const PhotoDetail = () => {
  const query = useRouter().query as { id?: string };
  const [updatePhotoName] = useMutation(UPDATE_PHOTO_NAME);
  const { data, loading, error } = useQuery<{ photoById: Photo }>(GET_PHOTO, {
    skip: !query.id,
    variables: { id: query.id },
  });
  const [value, setValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setValue(data.photoById.name);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      {data && (
        <div>
          <p>
            Title{' '}
            <input value={value} onChange={(e) => setValue(e.target.value)} />{' '}
          </p>
          <p>{data.photoById.description}</p>
          <div>
            <button
              onClick={() =>
                updatePhotoName({
                  variables: { id: data.photoById.id, name: value },
                })
              }
            >
              Update
            </button>
          </div>
          <Link href={'/'}>Back</Link>
        </div>
      )}
    </div>
  );
};

export default PhotoDetail;
