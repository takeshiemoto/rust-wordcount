import '../assets/styles.scss';

import { defaultTheme, Provider } from '@adobe/react-spectrum';
import React from 'react';
import { Route } from 'react-router-dom';

import { Mypage } from '../pages/mypage';
import { Root } from '../pages/root';
import { Signin } from '../pages/signin';

export function App() {
  return (
    <Provider theme={defaultTheme}>
      <Route path="/" exact component={Root} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/mypage" exact component={Mypage} />
    </Provider>
  );
}

export default App;
