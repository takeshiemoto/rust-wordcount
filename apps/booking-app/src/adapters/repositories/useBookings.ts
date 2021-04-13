import { useCollectionData } from 'react-firebase-hooks/firestore';

import { BookingFields, db } from '../infrastructures/firebase';

export const useBookings = () => {
  const [bookings, loading, error] = useCollectionData<BookingFields>(
    db.collection('bookings'),
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
