import { AppBar, Button, Toolbar } from '@material-ui/core';
import Link from 'next/link';
import React, { VFC } from 'react';

export const Container: VFC = () => (
  <AppBar color={'inherit'} position={'static'}>
    <Toolbar>
      <Link href={'/'} passHref>
        <Button color={'default'}>Nextjs Booking App</Button>
      </Link>
      <Link href={'/booking/list'} passHref>
        <Button color={'default'}>Booking List</Button>
      </Link>
      <Link href={'/booking/new'} passHref>
        <Button color={'default'}>New Booking</Button>
      </Link>
    </Toolbar>
  </AppBar>
);
