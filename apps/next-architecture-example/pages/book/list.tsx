import Link from 'next/link';
import React, { VFC } from 'react';

import { AppLayout } from '../../component/app/layout';
import { useBooks } from '../../hooks/useBooks';

const BookList: VFC = () => {
  const { books, loading, remove } = useBooks();

  const handleDelete = async (id: number) => {
    try {
      await remove(id);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout title={'Book List'}>
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
    </AppLayout>
  );
};

export default BookList;
