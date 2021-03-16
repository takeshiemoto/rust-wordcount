import React, { VFC } from 'react';

import { decrement, increment, selectCount } from '../redux/counter.slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

type Prop = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};
export const Component: VFC<Prop> = ({ count, onIncrement, onDecrement }) => (
  <div>
    <div>count: {count}</div>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

export const Counter: VFC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <Component
      count={count}
      onIncrement={() => dispatch(increment())}
      onDecrement={() => dispatch(decrement())}
    />
  );
};
