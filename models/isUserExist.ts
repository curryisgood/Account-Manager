import express from 'express';
import { connection } from './connection';
import { cookieUse } from './cookie';

interface userInfo {
  email: string;
}

export function userChk(email?: string) {
  if (!email) {
    return false;
  }
  const DBChk = 'select * from user where email = ?';
  return new Promise((resolve, reject) => {
    connection.query(DBChk, email, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows.length >= 1) {
          resolve(true);
        }
        resolve(false);
      }
    });
  });
}
