import { Box, Button, List, ListItem } from '@material-ui/core';
import Link from 'next/link';
import React, { VFC } from 'react';

import { useBookingsUseCase } from '../../useCases/useBookingsUseCase';

export const BookingsContainer: VFC = () => {
  const { bookings, loading, error } = useBookingsUseCase();
  return (
    <Box pt={4} px={4}>
      <Link href={'/booking/new'}>
        <Button variant={'outlined'}>New Booking</Button>
      </Link>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {JSON.stringify(error)}</div>}
      <List>
        {!loading &&
          bookings.map((booking) => (
            <ListItem key={booking.id}>{booking.name}</ListItem>
          ))}
      </List>
    </Box>
  );
};
