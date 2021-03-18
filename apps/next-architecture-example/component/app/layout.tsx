import Head from 'next/head';
import React, { FC } from 'react';

import { AppNav } from './nav';

type Props = { title: string };

export const AppLayout: FC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <AppNav />
    {children}
  </div>
);
