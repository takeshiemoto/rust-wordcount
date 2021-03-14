import React from 'react';

import { Route } from 'react-router-dom';
import { Signin } from '../pages/signin';
import { Mypage } from '../pages/mypage';
import { Provider, defaultTheme } from '@adobe/react-spectrum';

import '../assets/styles.scss';
import { Root } from '../pages/root';

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
