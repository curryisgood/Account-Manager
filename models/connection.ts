import mysql from 'mysql';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test_db',
});
