import { fakeAuth } from './fakeAuth';

export const Public = () => {
  return <h3>Public</h3>;
};

export const Protected = () => {
  return <h3>Protected</h3>;
};

export const Login = () => {
  const login = () => fakeAuth.authenticate();
  return <div>Login</div>;
};
