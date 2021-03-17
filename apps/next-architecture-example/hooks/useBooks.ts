import useSWR, { mutate } from 'swr';

import { Book } from '../type/api/book';

export const useBooks = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Array<Book>>(
    'http://localhost:1323/books',
    fetcher
  );

  return {
    books: data,
    loading: !data && !error,
    error,
    mutate,
  };
};
