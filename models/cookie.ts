import { connection } from './connection';
import express from 'express';

export function cookieUse(req: express.Request, res: express.Response) {
  const getCookie = req.headers.cookie;
  const splitCookie = getCookie?.split('=')[1];

  const namecookie = {
    email: splitCookie,
    date: req.query.date,
  };

  return namecookie;
}
