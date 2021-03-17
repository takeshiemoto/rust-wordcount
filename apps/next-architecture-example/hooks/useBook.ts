import useSWR from 'swr';

import { Book } from '../type/api/book';

export const useBook = (id?: number) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Book>(
    id ? `http://localhost:1323/books/${id}` : null,
    fetcher
  );
  
  return {
    book: data,
    loading: !data && !error,
    error
  }
}