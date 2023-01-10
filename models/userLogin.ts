import { connection } from './connection';
import express from 'express';

interface Login {
  email: string;
  password: string;
}

export function userLogin(loginNewData: Login): Promise<any> {
  return new Promise((reslove, reject) => {
    const search = 'SELECT * FROM USER WHERE EMAIL= ? AND PASSWORD=?';
    connection.query(
      search,
      [loginNewData.email, loginNewData.password],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        if (rows.length === 1) {
          const json = {
            email: rows[0].EMAIL,
          };
          reslove(json);
        } else {
          reject(new Error('internal sercer error'));
        }
      }
    );
  });
}
