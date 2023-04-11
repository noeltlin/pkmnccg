import '@/styles/global.css'
import type { AppProps } from 'next/app'
import AppWrapper from '@/user_context';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AppWrapper>
  <Component {...pageProps} />
  </AppWrapper>
  );
}
