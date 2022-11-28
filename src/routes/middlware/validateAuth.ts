import { NextFunction } from 'express';
import { IReq, IRes } from '@declarations/types';
import HttpStatusCodes from '@configurations/HttpStatusCodes';
import EnvVars from '@configurations/EnvVars';
import jwtUtil from '@util/jwt-util';

async function validateAuth(req: IReq<any>, res: IRes, next: NextFunction) {
  // Extract token
  const { key: authCookieName } = EnvVars.cookieProps;
  const jwt = req.signedCookies[authCookieName];
  const tokenPayload = (await jwtUtil.decode(jwt)) as { exp: number; iat: number };

  // Verify token existance and expiration date
  const validToken = jwt && new Date(tokenPayload.exp * 1000) > new Date();

  if (!validToken) {
    res.clearCookie(authCookieName);
    return res.status(HttpStatusCodes.UNAUTHORIZED).json('User is not authenticated.');
  }

  req.app.locals.auth = tokenPayload;

  next();
}

export default validateAuth;
