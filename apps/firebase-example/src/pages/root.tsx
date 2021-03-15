import {
  ActionButton,
  Flex,
  Heading,
  ProgressCircle,
  View,
} from '@adobe/react-spectrum';
import React, { VFC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Layout } from '../components/layout';
import { auth } from '../infra/firebase';

export const Root: VFC = () => {
  const [user] = useAuthState(auth);
  return (
    <Layout user={user}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        direction={'column'}
      >
        <Heading level={3}>Hello</Heading>
        <View>
          {user && (
            <ActionButton onPress={() => auth.signOut()}>
              ログアウト
            </ActionButton>
          )}
        </View>
      </Flex>
    </Layout>
  );
};
