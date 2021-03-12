import React from 'react';

import { Route, Link } from 'react-router-dom';
import { Signin } from '../pages/signin';

export function App() {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
        </ul>
      </div>
      <Route path="/signin" exact component={Signin} />
    </>
  );
}

export default App;
