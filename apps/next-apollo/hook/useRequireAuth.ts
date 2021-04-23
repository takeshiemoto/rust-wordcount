import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRequireAuth = () => {
  const router = useRouter();
  const { data, loading } = useQuery<{ isLoggedIn: boolean }>(
    gql`
      query IsLoggedIn {
        isLoggedIn @client
      }
    `
  );

  useEffect(() => {
    if (loading) return; // 確認中
    if (!data.isLoggedIn) {
      router.push('/login');
    }
  }, [data, loading, router]);
};
