import {
  ActionButton,
  Flex,
  Form,
  StatusLight,
  TextField,
  View,
} from '@adobe/react-spectrum';
import React, { VFC } from 'react';
import { Redirect } from 'react-router-dom';

import { useSignin } from '../hooks/useSignin';

export const Signin: VFC = () => {
  const { Controller, control, submit, errors, user, loading } = useSignin();

  return (
    <Flex
      minHeight={'100vh'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
    >
      {!loading && !!Object.keys(errors).length && (
        <View>
          <StatusLight variant={'negative'}>認証に失敗しました</StatusLight>
        </View>
      )}
      {!user ? (
        <Form onSubmit={submit}>
          <Controller
            control={control}
            name={'email'}
            render={({ onChange, value }) => (
              <TextField
                width={'size-4600'}
                label={'Email'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name={'password'}
            render={({ onChange, value }) => (
              <TextField
                width={'size-4600'}
                label={'Password'}
                type={'password'}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <ActionButton
            type={'submit'}
            marginTop={'size-350'}
            isDisabled={loading}
          >
            Sign In
          </ActionButton>
        </Form>
      ) : (
        <Redirect to={'/'} />
      )}
    </Flex>
  );
};
