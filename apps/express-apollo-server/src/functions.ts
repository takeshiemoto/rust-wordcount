import fetch from 'node-fetch';
import { throwError } from 'rxjs';

export const requestGitHubToken = (credentials) =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });

export const requestGitHubUserAccount = (token: string) =>
  fetch(`https://api.github.com/user`, {
    headers: { Authorization: `token ${token}` },
  })
    .then((res) => res.json())
    .catch(throwError);

export const authorizeWithGithub = async (credential: {
  client_id: string;
  client_secret: string;
  code: string;
}) => {
  const { access_token } = await requestGitHubToken(credential);
  const githubUser = await requestGitHubUserAccount(access_token);
  return {
    ...githubUser,
    access_token,
  };
};
