import React, { VFC } from 'react';
import { auth } from '../infra/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Signin: VFC = () => {
  const [user, loading, error] = useAuthState(auth);

  const signin = () => {
    auth.signInWithEmailAndPassword('', '');
  };

  const signout = () => {
    auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Hello {user.uid}</p>
          <button onClick={signout}>ログアウト</button>
        </div>
      ) : (
        <button onClick={signin}>Signin</button>
      )}
    </div>
  );
};
