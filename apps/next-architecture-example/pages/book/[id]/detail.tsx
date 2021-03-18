import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { AppLayout } from '../../../component/app/layout';
import { useBook } from '../../../hooks/useBook';

const BookDetail = () => {
  const router = useRouter();
  const id = Number(router.query['id']);

  const { book, loading } = useBook(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout title={`${book.title} | Detail`}>
      <h2>Book Detail</h2>
      <p>ID: {book.id}</p>
      <p>Name: {book.title}</p>
      <Link href={'/book/list'}>戻る</Link>
    </AppLayout>
  );
};

export default BookDetail;
