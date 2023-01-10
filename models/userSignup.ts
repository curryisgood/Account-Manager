import { connection } from './connection';

export async function userSignup(dataChk: createUserData) {
  try {
    await FindUser({ email: dataChk.email });
    return await createUser(dataChk);
  } catch (err) {
    throw err;
  }
}

function FindUser(dataChk: { email: string }) {
  const searchEmail = 'SELECT * FROM USER WHERE EMAIL= ?';
  return new Promise((resolve, reject) => {
    connection.query(searchEmail, [dataChk.email], (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows.length >= 1) {
        reject(new Error('이미 존재하는 이메일'));
      } else {
        resolve(true);
      }
    });
  });
}

interface createUserData {
  email: string;
  password: string;
  nickname: string;
}

function createUser(dataChk: createUserData) {
  return new Promise((resolve, reject) => {
    const insert = 'INSERT INTO USER VALUES(?,?,?,?)';
    connection.query(
      insert,
      [null, dataChk.email, dataChk.password, dataChk.nickname],
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
