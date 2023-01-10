import { connection } from './connection';

interface allData {
  email: string;
  date: string;
}

export async function allGet(allData: allData) {
  let allsave: any = [];
  try {
    await selectExpData(allData, allsave);
    return await selectIncData(allData, allsave);
  } catch (err) {
    throw err;
  }
}

function selectExpData(allData: allData, allsave: string[]) {
  const selexp =
    'select * from income where email=? and DATE_ LIKE ?order by date_ desc;';
  return new Promise((resolve, reject) => {
    connection.query(
      selexp,
      [allData.email, allData.date + '%'],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        for (let i = 0; i < rows.length; i++) {
          rows[i]['type'] = 'INCOME';
          allsave.push(rows[i]);
        }
        resolve(allsave);
      }
    );
  });
}

function selectIncData(allData: allData, allsave: string[]) {
  return new Promise((resolve, reject) => {
    const selinc =
      'select * from expense where email=? and DATE_ LIKE ? order by date_ desc;';
    connection.query(
      selinc,
      [allData.email, allData.date + '%'],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          for (let i = 0; i < rows.length; i++) {
            rows[i]['type'] = 'EXPENSE';
            allsave.push(rows[i]);
          }
          resolve(allsave);
        }
      }
    );
  });
}
