import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { object, string } from 'yup';

import { auth } from '../infra/firebase';

type FormType = {
  email: string;
  password: string;
};

const schema = object().shape({
  email: string().required(),
  password: string().required(),
});

const defaultValues: FormType = {
  email: '',
  password: '',
};

export const useSignin = () => {
  const router = useHistory();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push('/mypage');
    }
  }, [router, user]);

  const {
    handleSubmit,
    errors,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const onValid: SubmitHandler<FormType> = useCallback(
    ({ email, password }) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user) {
            router.push('/mypage');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('email', {
            message: '認証に失敗しました',
          });
          setError('password', {
            message: '認証に失敗しました',
          });
        });
    },
    [router, setError]
  );

  const onInValid: SubmitErrorHandler<FormType> = useCallback(
    ({ email, password }) => {
      console.log(email, password);
    },
    []
  );

  const submit = handleSubmit(onValid, onInValid);

  return {
    submit,
    errors,
    control,
    isSubmitting,
    user,
    loading,
    Controller,
  };
};
