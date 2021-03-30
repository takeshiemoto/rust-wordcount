import { gql, useMutation } from '@apollo/client';
import React, { useState, VFC } from 'react';
import { useRouter } from 'next/router';

const ADD_PHOTO = gql`
  mutation newPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
      id
      name
    }
  }
`;

const AddPhoto: VFC = () => {
  const [value, setValue] = useState<string>('');
  const [addPhoto] = useMutation(ADD_PHOTO);
  const router = useRouter();

  const submit = async () => {
    await addPhoto({
      variables: {
        input: { name: value, description: 'Mock' },
      },
    });
    await router.push('/');
  };
  return (
    <div>
      <p>Add Photo</p>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={submit}>Add</button>
    </div>
  );
};

export default AddPhoto;
