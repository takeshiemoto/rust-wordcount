import { useBookings } from '../adapter/repository/useBookings';
import { bookingPresenter } from './presenter/bookingPresenter';

export const useBookingsUseCase = () => {
  const { bookings, loading, error } = useBookings();
  return {
    bookings: bookings && bookings.map(bookingPresenter),
    loading,
    error,
  };
};
