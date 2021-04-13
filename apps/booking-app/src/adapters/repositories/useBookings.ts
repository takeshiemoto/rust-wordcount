import { useCollectionData } from 'react-firebase-hooks/firestore';

import { BookingFields, db, KEYS } from '../infrastructures/firebase';

export const useBookings = () => {
  const [bookings, loading, error] = useCollectionData<BookingFields>(
    db.collection(KEYS.BOOKINGS),
    {
      idField: 'id',
    }
  );
  return {
    bookings,
    loading,
    error,
  };
};
