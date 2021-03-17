import Link from 'next/link';
import React, { VFC } from 'react';
import useSWR, { mutate } from 'swr';

import { Book } from '../../type/api/book';

const BookList: VFC = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: books, error } = useSWR<Array<Book>>(
    'http://localhost:1323/books',
    fetcher
  );

  if (!books && !error) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:1323/books/${id}`, {
        method: 'delete',
      });
      /**
       * refetchしてサーバとの整合性を保つ
       */
      await mutate('http://localhost:1323/books');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      <div>
        <Link href={`/book/add`} passHref>
          <button>追加</button>
        </Link>
      </div>
      <ul>
        {books.map((u) => (
          <li key={u.id}>
            <Link href={`/book/${u.id}/detail`}>{u.title}</Link>
            <Link href={`/book/${u.id}/edit`} passHref>
              <button>編集</button>
            </Link>
            <button onClick={() => handleDelete(u.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
