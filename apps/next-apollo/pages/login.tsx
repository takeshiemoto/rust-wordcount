import { gql, useApolloClient } from '@apollo/client';
import React from 'react';

import { useNoAuth } from '../hook/useNoAuth';

const Login = () => {
  useNoAuth();

  const client = useApolloClient();

  const handleLogin = () => {
    client.writeQuery({
      query: gql`
        query writeData {
          isLoggedIn
        }
      `,
      data: {
        isLoggedIn: true,
      },
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
