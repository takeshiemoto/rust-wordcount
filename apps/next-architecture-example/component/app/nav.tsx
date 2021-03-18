import Link from 'next/link';
import React, { VFC } from 'react';

export const AppNav: VFC = () => (
  <ul>
    <li>
      <Link href={'/'}>HOME</Link>
    </li>
    <li>
      <Link href={'/book/list'}>BOOK LIST</Link>
    </li>
    {/* TODO ログイン状態を受け取って表示を切り分ける */}
    <li>
      <Link href={'/signin'}>SING IN</Link>
    </li>
    <li>
      <Link href={'/mypage/profile'}>MYPAGE</Link>
    </li>
  </ul>
);
