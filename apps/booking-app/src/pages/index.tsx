import { Button } from '@material-ui/core';
import React from 'react';

export function Index() {
  return (
    <div>
      <p>{process.env.FIREBASE_APP_ID}</p>
      <Button color={'secondary'} variant={'outlined'}>
        Hello world
      </Button>
    </div>
  );
}

export default Index;
