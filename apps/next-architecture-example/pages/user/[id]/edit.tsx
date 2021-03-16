import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect, VFC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { object, string } from 'yup';

import { User } from '../../../type/api/User';

type FormType = {
  name: string;
};

const schema = object().shape({
  name: string(),
});

const UserEdit: VFC = () => {
  const router = useRouter();
  const id = router.query['id'];

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: user, error } = useSWR<User>(
    id ? `http://localhost:1323/users/${id}` : null,
    fetcher
  );

  const { register, setValue, handleSubmit } = useForm<FormType>({
    defaultValues: {
      name: user?.name,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
    }
  }, [setValue, user]);

  const onValid: SubmitHandler<FormType> = async ({ name }) => {
    try {
      const response = await fetch(`http://localhost:1323/users/${id}`, {
        body: JSON.stringify({ name }),
        method: 'put',
        headers: {
          'content-type': 'application/json',
        },
      });

      const responseBody: User = await response.json();
      console.log(responseBody);

      await router.push('/user/list');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Edit Page</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <input type="text" ref={register} name={'name'} />
        </div>
        <div>
          <button>保存</button>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
