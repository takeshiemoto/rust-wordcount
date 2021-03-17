import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

import { Book } from '../type/api/book';

export const useBooks = () => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Array<Book>>(
    'http://localhost:1323/books',
    fetcher
  );

  // useBookにremoveを定義しているがこちらは一覧から削除する
  // ユースケースを想定しているためidを引数で受け取る
  const remove = useCallback(async (id: number) => {
    try {
      await fetch(`http://localhost:1323/books/${id}`, {
        method: 'delete',
      });

      await mutate('http://localhost:1323/books');
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    books: data,
    loading: !data && !error,
    error,
    remove,
  };
};
