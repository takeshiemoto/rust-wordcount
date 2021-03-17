import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import { Book } from '../../../type/api/book';

const BookDetail = () => {
  const router = useRouter();
  const id = router.query['id'];

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: book, error } = useSWR<Book>(
    id ? `http://localhost:1323/books/${id}` : null,
    fetcher
  );

  if (!book && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Detail</h2>
      <p>ID: {book.id}</p>
      <p>Name: {book.title}</p>
      <Link href={'/book/list'}>戻る</Link>
    </div>
  );
};

export default BookDetail;
