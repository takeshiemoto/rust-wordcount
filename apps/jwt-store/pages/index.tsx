import { Button, View } from '@adobe/react-spectrum';
import React from 'react';

export function Index() {
  return (
    <View minHeight={'100vh'} padding={'size-500'}>
      <Button variant={'cta'}>Get JWT</Button>
    </View>
  );
}

export default Index;
