import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useBookingNewRepository } from '../adapter/repository/useBookingNewRepository';
import { FormType } from '../ui/domain/bookings/types';
import { bookingNewController } from './controller/bookingNewController';

export const useBookingNewUseCase = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<FormType>();
  const { createBooking, data, error } = useBookingNewRepository();

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
