import { Link, Route } from 'react-router-dom';

export function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Hello world</Link>
        </li>
        <li>
          <Link to="/page-2">Form2</Link>
        </li>
      </ul>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{' '}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
    </div>
  );
}

export default App;
