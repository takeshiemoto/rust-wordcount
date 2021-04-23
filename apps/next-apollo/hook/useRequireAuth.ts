import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCurrentUser } from './useCurrentUser';

export const useRequireAuth = () => {
  const router = useRouter();
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (loading) return; // 確認中
    if (!user.isLoggedIn) {
      router.push('/login');
    }
  }, [user, loading, router]);
};
