import { useCallback, useState } from 'react';

import { Booking } from '../../domains/booking/type';
import { db, KEYS } from '../infrastructures/firebase';

export const useBookingNew = () => {
  const [state, setState] = useState<{
    data?: { id: string };
    loading: boolean;
    error?: Error;
  }>({
    loading: false,
    error: undefined,
  });

  const createBooking = useCallback(async (booking: Booking) => {
    setState({ loading: true });
    try {
      const docRef = await db.collection(KEYS.BOOKINGS).add(booking);
      setState({ loading: false, data: { id: docRef.id } });
    } catch (error) {
      setState({ loading: false, error });
    }
  }, []);

  return {
    createBooking,
    ...state,
  };
};
