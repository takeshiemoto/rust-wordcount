import { parse } from 'date-fns';

import { Booking } from '../../domains/booking/type';
import { FormType } from '../useBookingNewUseCase';

export const bookingNewController = ({ date, name }: FormType): Booking => {
  return {
    name,
    date: parse(date, 'yyyy-mm-dd', new Date()),
  };
};
