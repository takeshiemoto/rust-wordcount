import { Flex, Header, Link, View } from '@adobe/react-spectrum';
import React, { ReactNode, VFC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Prop = {
  user: any; // todo 型
  children: ReactNode;
};

export const Layout: VFC<Prop> = ({ children, user }) => {
  return (
    <View minHeight={'100vh'} padding={8}>
      <Header>
        <Link>
          <RouterLink to={'/'}>App</RouterLink>
        </Link>
        {user ? (
          <Link>
              <RouterLink to={'/mypage'}>MyPage</RouterLink>
            </Link>
        ) : (
          <Link>
            <RouterLink to={'/signin'}>Sign In</RouterLink>
          </Link>
        )}
      </Header>
      <View>{children}</View>
    </View>
  );
};
