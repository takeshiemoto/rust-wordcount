import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Booking } from '../../domain/booking/type';
import { BookingFields, db, KEYS } from '../infrastructur/firebase';

export const useBookingsRepository = (): {
  bookings: Booking[];
  loading: boolean;
  error: Error;
} => {
  const [bookings, loading, error] = useCollectionData<BookingFields>(
    db.collection(KEYS.BOOKINGS),
    {
      idField: 'id',
    }
  );
  /** RepositoryはDBの特殊な型からEntity型への変換を許容する */
  return {
    bookings:
      bookings &&
      bookings.map(({ date, id, name }) => ({
        id,
        name,
        date: date.toDate(),
      })),
    loading,
    error,
  };
};
