import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useBookingNew } from '../adapter/repository/useBookingNew';
import { bookingNewController } from './controller/bookingNewController';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { FormType } from '../ui/domain/bookings/types';

export const useBookingNewUseCase = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormType>();
  const { createBooking, data, error } = useBookingNew();

  useEffect(() => {
    if (data) {
      router.push('/booking/list');
      return null;
    }
  }, [data, router]);

  useEffect(() => {
    if (error) {
      alert('Error!!');
    }
  }, [error, router]);

  const onValid: SubmitHandler<FormType> = async (formValue) => {
    await createBooking(bookingNewController(formValue));
  };

  const onInValid: SubmitErrorHandler<FormType> = () => {
    // todo バリデーションエラー
  };

  const submit = handleSubmit(onValid, onInValid);

  return {
    submit,
    register,
  };
};