import 'firebase/auth';
import 'firebase/firestore';

import fb from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();

export const auth = firebase.auth();
export const db = firebase.firestore();

export const KEYS = {
  BOOKINGS: 'bookings',
} as const;

export type BookingFields = {
  id?: string;
  name: string;
  date: fb.firestore.Timestamp;
};
