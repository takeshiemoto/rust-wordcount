import { Box, Typography } from '@material-ui/core';
import React, { VFC } from 'react';

import { useBookingNewUseCase } from '../../useCases/useBookingNewUseCase';

const BookingNew: VFC = () => {
  const { submit, register } = useBookingNewUseCase();
  return (
    <Box px={4} pt={2}>
      <Typography variant={'h6'}>Booking New</Typography>
      <form onSubmit={submit}>
        <div>
          <label>
            Name:
            <input type="text" name={'name'} ref={register} />
          </label>
        </div>
        <div>
          <label>
            Date:
            <input type="date" name={'date'} ref={register} />
          </label>
        </div>
        <button type={'submit'}>予約</button>
      </form>
    </Box>
  );
};

export default BookingNew;
