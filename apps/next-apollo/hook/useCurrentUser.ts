import { gql, useQuery } from '@apollo/client';

export const useCurrentUser = () => {
  const { data, loading } = useQuery(gql`
    query IsLoggedIn {
      isLoggedIn @client
    }
  `);

  return {
    user: data,
    loading,
  };
};
