import express from 'express';
import { allGet } from './models/all';
import { auth } from './models/auth';
import { connection } from './models/connection';
import { cookieUse } from './models/cookie';
import { expenseGet, expensePost, lastMonthExp } from './models/expense';
import { incomeGet, incomePost, lastMonthInc } from './models/income';
import { userChk } from './models/isUserExist';
import { userLogin } from './models/userLogin';
const app = express();
const port = 3000;
import { userSignup } from './models/userSignup';
connection.connect((err) => {
  if (err) {
    throw err;
  }
});

app.use(express.static('./bundle'));
app.use(express.json());
const path = require('path');

// 페이지 이동
app.get('/signin', (req, res) => {
  const getCookieOne = cookieUse(req, res);
  console.log();
  if (!userChk(getCookieOne.email)) {
    res.sendFile(path.join(__dirname, 'public/signin.html'));
  } else {
    res.redirect('/');
  }
});
app.get('/summary', (req, res) => {
  const getCookieOne = cookieUse(req, res);
  if (!userChk(getCookieOne.email)) {
    res.redirect('/signin');
  } else {
    res.sendFile(path.join(__dirname, 'public/summary.html'));
  }
});
app.get('/', (req, res) => {
  const getCookieOne = cookieUse(req, res);
  if (!userChk(getCookieOne.email)) {
    res.redirect('/signin');
  } else {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signup.html'));
});

// 회원가입
app.post('/api/signup', async (req: express.Request, res: express.Response) => {
  const data = req.body;
  const userData = await userSignup(data);
  res.send(userData);
});
// 로그인
app.post('/api/login', async (req: express.Request, res: express.Response) => {
  console.log('login start');
  const loginData = req.body;
  const LoginRes = await userLogin(loginData);

  res.setHeader('Set-Cookie', `email=${LoginRes.email}; Path=/; Max-Age=${60 * 60};`);
  res.send(LoginRes);
});
// 지출
app.post('/api/expense', auth, (req: express.Request, res: express.Response) => {
  expensePost(req.body)
    .then((rows) => {
      res.send();
    })
    .catch((error) => {
      res.status(400);
    });
});
app.get('/api/expense', auth, async (req: express.Request, res: express.Response) => {
  try {
    let saveDate = Date();
    let saveEmail = '';
    const rows1: any = await expenseGet(cookieUse(req, res) as any);
    if (!rows1) {
      throw new Error('noData');
    }
    const lengthChk = rows1.length;

    saveDate = lengthChk != 0 ? rows1[0]['DATE_'] : req.query.date;
    saveEmail = lengthChk != 0 ? rows1[0]['EMAIL'] : cookieUse(req, res).email;
    const lastMonthISO = subtractMonths(1, new Date(saveDate)).toISOString();
    const lastMonthSplit = lastMonthISO.split('-');
    const lastMonth = lastMonthSplit[0] + '-' + lastMonthSplit[1];
    const lastTotal = (await lastMonthExp({
      date: lastMonth,
      email: saveEmail,
    }))
      ? await lastMonthExp({
          date: lastMonth,
          email: saveEmail,
        })
      : 0;
    rows1.map((row: any) => (row.lastTotal = lastTotal));

    res.json(rows1);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'noData') {
        res.status(200);
        res.json({});
      }
    }
    console.log('error: ', error);
    res.status(400);
    res.end();
  }
});
// 수입
app.post('/api/income', auth, (req: express.Request, res: express.Response) => {
  incomePost(req.body)
    .then((rows) => {
      res.send();
    })
    .catch((error) => {
      console.log('error: ', error);
      res.status(400);
      res.end();
    });
});

app.get('/api/income', auth, async (req: express.Request, res: express.Response) => {
  try {
    let saveDate = Date();
    let saveEmail = '';

    const rows1: any = await incomeGet(cookieUse(req, res) as any);
    const lengthChk = rows1.length;
    saveDate = lengthChk != 0 ? rows1[0]['DATE_'] : req.query.date;
    saveEmail = lengthChk != 0 ? rows1[0]['EMAIL'] : cookieUse(req, res).email;
    const lastMonthISO = subtractMonths(1, new Date(saveDate)).toISOString();
    const lastMonthSplit = lastMonthISO.split('-');
    const lastMonth = lastMonthSplit[0] + '-' + lastMonthSplit[1];
    const lastTotal = (await lastMonthInc({
      date: lastMonth,
      email: saveEmail,
    }))
      ? await lastMonthInc({
          date: lastMonth,
          email: saveEmail,
        })
      : 0;
    rows1.map((row: any) => (row.lastTotal = lastTotal));

    res.json(rows1);
  } catch (error) {
    console.log('error: ', error);
    res.status(400);
    res.end();
  }
});

// all
app.get('/api/all', auth, (req: express.Request, res: express.Response) => {
  allGet(cookieUse(req, res) as any)
    .then((rows) => {
      return rows;
    })
    .then((rows: any) => {
      for (let i = 0; i < rows.length; i++) {}
      rows.sort(function (a: any, b: any) {
        return b.DATE_.getDate() - a.DATE_.getDate();
      });
      res.send(rows);
    })
    .catch((error) => {
      console.log('error: ', error);
      res.status(400);
      res.end();
    });
});

function subtractMonths(numOfMonths: number, date = new Date()) {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.send();
});
console.log(port);
app.listen(port);
