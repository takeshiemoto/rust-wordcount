import Link from 'next/link';
import React, { VFC } from 'react';
import useSWR from 'swr';

import { User } from '../../type/api/User';

const UserList: VFC = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: users, error } = useSWR<Array<User>>(
    'http://localhost:1323/users',
    fetcher
  );

  if (!users && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User List Page</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/user/${u.id}/detail`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
