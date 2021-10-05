import { ReactNode, VFC } from 'react';
import { Redirect, RouteProps } from 'react-router';
import { Route } from 'react-router-dom';

import { fakeAuth } from './fakeAuth';

export const PrivateRoute: VFC<{ children: ReactNode } & RouteProps> = ({
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={() => {
        return fakeAuth.isAuthenticated ? children : <Redirect to={'/login'} />;
      }}
    />
  );
};
