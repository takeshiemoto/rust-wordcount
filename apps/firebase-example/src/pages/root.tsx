import React, { VFC } from 'react';
import { Layout } from '../components/layout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../infra/firebase';
import { Flex, ProgressCircle, View } from '@adobe/react-spectrum';

export const Root: VFC = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <Flex minHeight={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <View>
          <ProgressCircle aria-label={'loading'} isIndeterminate />
        </View>
      </Flex>
    );
  }
  return <Layout user={user}>ようこそ</Layout>;
};
