import { parse } from 'date-fns';

import { Booking } from '../../domain/booking/type';
import { FormType } from '../../ui/domain/bookings/types';

export const bookingNewController = ({ date, name }: FormType): Booking => {
  return {
    name,
    date: parse(date, 'yyyy-mm-dd', new Date()),
  };
};
