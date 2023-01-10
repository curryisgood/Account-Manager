import { connection } from './connection';

interface IPostIncomeParams {
  date: string;
  category: string;
  price: number;
  memo: string;
  email: string;
}
export function incomePost(inputAccountData: IPostIncomeParams) {
  return new Promise((resolve, reject) => {
    const insertData = `INSERT INTO INCOME VALUES(?,?,?,?,?,?)`;
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
          resolve(rows);
        }
      }
    );
  });
}

export interface getIncome {
  date: string;
  email: string;
}

export function incomeGet(incData: getIncome) {
  //findValue({ date: incData.date });
  return new Promise((resolve, reject) => {
    const selectInc =
      'SELECT * FROM INCOME WHERE DATE_ LIKE ? AND EMAIL = ? ORDER BY DATE_ DESC';
    connection.query(
      selectInc,
      [incData.date + '%', incData.email],
      (err, rows) => {
        if (err) {
          console.log('income error');
          reject(err);
        } else {
          let thisMonthIncome = 0;
          for (let i = 0; i < rows.length; i++) {
            rows[i]['type'] = 'INCOME';
            const newDate = new Date(rows[i].DATE_);
            thisMonthIncome += rows[i].PRICE;
          }
          for (let i = 0; i < rows.length; i++) {
            rows[i]['thisMonth'] = thisMonthIncome;
          }
          resolve(rows);
        }
      }
    );
  });
}

export function lastMonthInc(sumData: getIncome) {
  // console.log('sumData: ', sumData);
  const lmSum =
    'select sum(PRICE) as total from income where email=? and  DATE_ LIKE ?;';
  return new Promise((resolve, reject) => {
    connection.query(
      lmSum,
      [sumData.email, sumData.date + '%'],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // console.log('rows: ', rows);
          // console.log(rows[0]?.total);

          if (rows[0]) {
            resolve(rows[0].total);
          } else {
            resolve(0);
          }
        }
      }
    );
  });
}
