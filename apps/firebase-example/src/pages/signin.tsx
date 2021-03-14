import React, { VFC } from 'react';
import { auth } from '../infra/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ActionButton, Flex, View } from '@adobe/react-spectrum';
import { Redirect } from 'react-router-dom';

export const Signin: VFC = () => {
  const [user, loading, error] = useAuthState(auth);

  const signin = () => {
    auth.signInWithEmailAndPassword(
      'private.takeshiemoto@gmail.com',
      'wal24debby'
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
      {!user ? (
        <View>
          <ActionButton onPress={signin}>Signin</ActionButton>
        </View>
      ) : (
        <Redirect to={'/'} />
      )}
    </Flex>
  );
};
