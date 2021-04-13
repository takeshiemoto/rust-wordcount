import { Box, List, ListItem } from '@material-ui/core';
import React, { VFC } from 'react';

import { useBookingsUseCase } from '../../useCases/useBookingsUseCase';

export const BookingsContainer: VFC = () => {
  const { bookings, loading, error } = useBookingsUseCase();
  return (
    <Box>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {JSON.stringify(error)}</div>}
      <List>
        {bookings.map((booking) => (
          <ListItem key={booking.id}>{booking.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};
