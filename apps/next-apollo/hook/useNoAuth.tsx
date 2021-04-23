import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCurrentUser } from './useCurrentUser';

export const useNoAuth = () => {
  const router = useRouter();

  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (loading) return;
    if (user.isLoggedIn) {
      router.push('/');
    }
  }, [user, loading, router]);
};
