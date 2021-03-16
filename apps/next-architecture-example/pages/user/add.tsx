import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';

type FormType = {
  name: string;
};

const schema = object().shape({
  name: string(),
});

const UserAdd: VFC = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const onValid: SubmitHandler<FormType> = async ({ name }) => {
    try {
      await fetch(`http://localhost:1323/users`, {
        body: JSON.stringify({ name }),
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      });
      router.push('/user/list');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Add Page</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <input type="text" name={'name'} ref={register} />
        <button>追加</button>
      </form>
    </div>
  );
};

export default UserAdd;
