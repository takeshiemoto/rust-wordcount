import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import { User } from '../../../type/api/User';

const UserDetail = () => {
  const router = useRouter();
  const id = router.query['id'];

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: user, error } = useSWR<User>(
    id ? `http://localhost:1323/users/${id}` : null,
    fetcher
  );

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Detail Page</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <Link href={'/user/list'}>戻る</Link>
    </div>
  );
};

export default UserDetail;
