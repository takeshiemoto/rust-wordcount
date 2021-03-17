import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';

import { Book } from '../type/api/book';

export const useBook = (id?: number) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Book>(
    id ? `http://localhost:1323/books/${id}` : null,
    fetcher
  );

  // 引数のidがundefinedの場合はuseSWRが実行されない
  // そのためcreateのみを利用する場合でもFetchが発生しない
  const create = useCallback(async ({ title }: { title: string }) => {
    const response = await fetch(`http://localhost:1323/books`, {
      body: JSON.stringify({ title }),
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    });
    const responseBody: Book = await response.json();
    return responseBody;
  }, []);

  const edit = useCallback(
    async ({ title }: { title: string }) => {
      try {
        const response = await fetch(`http://localhost:1323/books/${id}`, {
          body: JSON.stringify({ title }),
          method: 'put',
          headers: {
            'content-type': 'application/json',
          },
        });
        const responseBody: Book = await response.json();
        return responseBody;
      } catch (error) {
        throw new Error('Error??');
      }
    },
    [id]
  );

  const remove = useCallback(async () => {
    try {
      await fetch(`http://localhost:1323/books/${id}`, {
        method: 'delete',
      });

      await mutate('http://localhost:1323/books/');
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  return {
    book: data,
    loading: !data && !error,
    error,
    create,
    edit,
    remove,
  };
};
