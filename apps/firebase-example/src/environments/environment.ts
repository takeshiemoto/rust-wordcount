// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  FIREBASE_APP_ID: process.env.NX_FIREBASE_APP_ID,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NX_FIREBASE_STORAGE_BUCKET,
  FIREBASE_PROJECT_ID: process.env.NX_FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN: process.env.NX_FIREBASE_AUTH_DOMAIN,
  FIREBASE_API_KEY: process.env.NX_FIREBASE_API_KEY,
};
