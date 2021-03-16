import Link from 'next/link';
import React, { VFC } from 'react';
import useSWR, { mutate } from 'swr';

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

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:1323/users/${id}`, {
        method: 'delete',
      });
      /**
       * refetchしてサーバとの整合性を保つ
       */
      await mutate('http://localhost:1323/users');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User List Page</h2>
      <div>
        <Link href={`/user/add`} passHref>
          <button>追加</button>
        </Link>
      </div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link href={`/user/${u.id}/detail`}>{u.name}</Link>
            <Link href={`/user/${u.id}/edit`} passHref>
              <button>編集</button>
            </Link>
            <button onClick={() => handleDelete(u.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
