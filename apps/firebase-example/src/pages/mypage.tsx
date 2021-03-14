import React, { VFC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../infra/firebase';
import { Layout } from '../components/layout';

export const Mypage: VFC = () => {
  const [user] = useAuthState(auth);
  return <Layout user={user}>ログイン済みだよ</Layout>;
};
