import React from 'react';

import { useRequireAuth } from '../hook/useRequireAuth';

const Mypage = () => {
  useRequireAuth();

  return <div>MyPage</div>;
};

export default Mypage;
