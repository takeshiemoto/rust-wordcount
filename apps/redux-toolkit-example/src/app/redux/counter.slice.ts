import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const COUNTER_FEATURE_KEY = 'counter';

export const counterSlice = createSlice({
  name: COUNTER_FEATURE_KEY,
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export const counterReducer = counterSlice.reducer;

export const counterActions = counterSlice.actions;
