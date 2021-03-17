import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect, VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { useBook } from '../../../hooks/useBook';
import { Book } from '../../../type/api/book';

type FormType = {
  title: string;
};

const schema = object().shape({
  title: string(),
});

const BookEdit: VFC = () => {
  const router = useRouter();
  const id = Number(router.query['id']);

  const { book, loading, edit } = useBook(id);

  const { register, setValue, handleSubmit } = useForm<FormType>({
    defaultValues: {
      title: book?.title,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (book) {
      setValue('title', book.title);
    }
  }, [setValue, book]);

  const onValid: SubmitHandler<FormType> = async ({ title }) => {
    try {
      await edit({ title });
      await router.push('/book/list');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Edit</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input type="text" ref={register} name={'title'} />
        </div>
        <div>
          <button>保存</button>
        </div>
      </form>
    </div>
  );
};

export default BookEdit;
