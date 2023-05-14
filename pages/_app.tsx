import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import { SessionContext, getSessionCookie } from '@/lib/session_context';

import '@/styles/global.css';

export default function App({
  Component,
  pageProps: { AppProps, ...pageProps },
sessionCookie  }) {

  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    const sessionCookie = getSessionCookie();
    if (sessionCookie !== session) {
      setSession(sessionCookie);
    }
  }, []);

  return (
    <SessionContext.Provider value={sessionCookie}>
      <Component { ...pageProps } />
    </SessionContext.Provider>
  );
}