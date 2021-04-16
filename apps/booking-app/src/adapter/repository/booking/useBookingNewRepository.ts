import { useCallback, useState } from 'react';

import { Booking } from '../../../domain/booking/type';
import { db, KEYS } from '../../infrastructur/firebase';

export const useBookingNewRepository = () => {
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
