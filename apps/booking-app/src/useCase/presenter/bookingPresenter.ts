import { Booking } from '../../domain/booking/type';
import { BookingUI } from '../../ui/domain/bookings/types';

export const bookingPresenter = ({ date, id, name }: Booking): BookingUI => {
  return {
    id,
    name,
    date: date.toString(),
  };
};
