import { BrowserRouter, Link, Route } from 'react-router-dom';

import { Login, Public } from './pages';

export function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
      <Route path="/public" component={Public} />
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default App;
