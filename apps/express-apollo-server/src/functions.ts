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
  fetch(`https://api.github.com/user?access_token=${token}`);
