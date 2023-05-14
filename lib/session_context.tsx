import React from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const SessionContext = React.createContext(getSessionCookie());

export function setSessionCookie(session) {
    destroyCookie(null, 'session');
    setCookie(null, 'session', JSON.stringify(session), {
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/'
    });
  }

export function getSessionCookie(context = null) {
    const cookies = parseCookies(context);
    const sessionCookie = cookies.session;
    if (sessionCookie) {
      return JSON.parse(sessionCookie);
    } else {
      return null;
    }
  }