import { connection } from './connection';
import express from 'express';

interface inputAcData {
  date: Date;
  category: String;
  memo: String;
  price: number;
  email: String;
}

export function expensePost(inputAccountData: inputAcData) {
  return new Promise((resolve, reject) => {
    const insertData = `INSERT INTO EXPENSE VALUES(?,?,?,?,?,?)`;
    connection.query(
      insertData,
      [
        null,
        inputAccountData.date,
        inputAccountData.category,
        inputAccountData.memo,
        inputAccountData.price,
        inputAccountData.email,
      ],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          for (let i = 0; i < rows.length; i++) {
            console.log(rows[i]);
          }
          resolve(rows);
        }
      }
    );
  });
}

interface getExpense {
  date: string;
  email: string;
}
export function expenseGet(expData: getExpense) {
  return new Promise((resolve, reject) => {
    const selectExp =
      'SELECT * FROM EXPENSE WHERE DATE_ LIKE ? AND EMAIL = ? ORDER BY DATE_ DESC';
    connection.query(
      selectExp,
      [expData.date + '%', expData.email],
      (err, rows) => {
        if (err) {
          console.log('expense error');
          reject(err);
        } else {
          let thisMonthExpense = 0;
          for (let i = 0; i < rows.length; i++) {
            rows[i]['type'] = 'EXPENSE';
            const newDate = new Date(rows[i].DATE_);
            thisMonthExpense += rows[i].PRICE;
          }
          for (let i = 0; i < rows.length; i++) {
            rows[i]['thisMonth'] = thisMonthExpense;
          }
          resolve(rows);
        }
      }
    );
  });
}

export function lastMonthExp(sumData: getExpense) {
  console.log('sumData: ', sumData);
  const lmSum =
    'select sum(PRICE) as total from expense where email=? and  DATE_ LIKE ?;';
  return new Promise((resolve, reject) => {
    connection.query(
      lmSum,
      [sumData.email, sumData.date + '%'],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log('rows: ', rows);
          console.log(rows[0]?.total);

          if (rows[0]) {
            resolve(rows[0].total);
          } else {
            reject('invalid params');
          }
        }
      }
    );
  });
}
