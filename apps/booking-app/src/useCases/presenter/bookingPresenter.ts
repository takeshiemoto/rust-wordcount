import { BookingFields } from '../../adapters/infrastructures/firebase';
import { Booking } from '../../domains/booking/type';

/**
 * ルール違反
 * BookingFieldsの型定義の置き場所は？
 * この型はDBの返り値
 */

export const bookingPresenter = ({
  date,
  id,
  name,
}: BookingFields): Booking => {
  return {
    id,
    name,
    date: date.toDate(),
  };
};
