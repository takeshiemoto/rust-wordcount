import { Flex, Link, View } from '@adobe/react-spectrum';
import React, { ReactNode, VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Prop = {
  user: any; // todo 型
  children: ReactNode;
};

export const Layout: VFC<Prop> = ({ children, user }) => {
  return (
    <Flex minHeight={'100vh'}>
      {user ? (
        <View>{children}</View>
      ) : (
        <View>
          <Link>
            <RouterLink to={'/signin'}>Sign In</RouterLink>
          </Link>
        </View>
      )}
    </Flex>
  );
};
