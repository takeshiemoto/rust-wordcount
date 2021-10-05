export const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true;
  },
  signOut() {
    this.isAuthenticated = false;
  },
};
