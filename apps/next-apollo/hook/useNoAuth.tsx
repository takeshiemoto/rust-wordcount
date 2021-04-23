import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useNoAuth = () => {
  const router = useRouter();

  const { data, loading } = useQuery(gql`
    query IsLoggedIn {
      isLoggedIn @client
    }
  `);

  useEffect(() => {
    if (loading) return;
    if (data.isLoggedIn) {
      router.push('/');
    }
  }, [data, loading, router]);
};
