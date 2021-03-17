import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { useBook } from '../../hooks/useBook';

type FormType = {
  title: string;
};

const schema = object().shape({
  title: string(),
});

const BookAdd: VFC = () => {
  const router = useRouter();
  const { create } = useBook();

  const { register, handleSubmit } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const onValid: SubmitHandler<FormType> = async ({ title }) => {
    try {
      await create({ title });
      await router.push('/book/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Book Add</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <input type="text" name={'title'} ref={register} />
        <button>追加</button>
      </form>
    </div>
  );
};

export default BookAdd;
