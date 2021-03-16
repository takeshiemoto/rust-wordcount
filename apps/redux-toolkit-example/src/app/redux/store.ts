import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { COUNTER_FEATURE_KEY, counterReducer } from './counter.slice';
import { USER_FEATURE_KEY, userReducer } from './user.slice';

export const store = configureStore({
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
    [COUNTER_FEATURE_KEY]: counterReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
