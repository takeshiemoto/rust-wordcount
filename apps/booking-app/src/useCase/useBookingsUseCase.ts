import { useBookingsRepository } from '../adapter/repository/booking/useBookingsRepository';
import { bookingPresenter } from './presenter/bookingPresenter';

export const useBookingsUseCase = () => {
  const { bookings, loading, error } = useBookingsRepository();
  return {
    bookings: bookings && bookings.map(bookingPresenter),
    loading,
    error,
  };
};
