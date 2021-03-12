import React, { VFC } from 'react';
import { decrement, increment } from '../redux/counter.slice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

export const Counter: VFC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
