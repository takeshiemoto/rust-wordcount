import { Flex, ProgressCircle, View } from '@adobe/react-spectrum';
import React, { VFC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Layout } from '../components/layout';
import { auth } from '../infra/firebase';

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
