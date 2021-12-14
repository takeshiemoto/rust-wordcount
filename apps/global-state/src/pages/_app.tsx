import { AppProps } from 'next/app';
import Head from 'next/head';

import { MyInfoProvider } from '../providers/MyInfo';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to global-state!</title>
      </Head>
      <MyInfoProvider>
        <Component {...pageProps} />
      </MyInfoProvider>
    </>
  );
}

export default CustomApp;
