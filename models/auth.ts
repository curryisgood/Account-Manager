const cookie = require('cookie');

export const auth = function (req: any, res: any, next: any) {
  if (!req?.headers?.cookie) {
    return res.status(401).json({ errormsg: 'NOTFOUND_ERROR' });
  }
  const parsed = cookie.parse(req.headers.cookie);
  if (!parsed?.email) {
    return res.status(401).json({ errormsg: 'EMAIL_ERROR' });
  }
  req.email = parsed.email;
  next();
};
