import EnvVars from '@configurations/EnvVars';
import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as userServices from '@services/user-service';
import IProfileRequest from 'src/types/IProfileRequest';
import ISigninRequest from 'src/types/ISigninRequest';
import ISignupRequest from 'src/types/ISignupRequest';

const paths = {
  basePath: '/users',
  profile: '/profile',
  signup: '/signup',
  signout: '/signout',
  signin: '/signin',
  jwt: '/jwt',
  update: '/profile',
  delete: '/profile',
} as const;

async function getProfile(req: IReq, res: IRes) {
  const user = await userServices.getProfile();
  return res.status(HttpStatusCodes.OK).json(user);
}

async function signup(req: IReq<ISignupRequest>, res: IRes) {
  await userServices.signup(req.body);
  return res.status(HttpStatusCodes.OK).send();
}

async function update(req: IReq<IProfileRequest>, res: IRes) {
  await userServices.update(req.body);
  return res.status(HttpStatusCodes.NO_CONTENT).send();
}

function _delete(req: IReq, res: IRes) {
  return res.status(HttpStatusCodes.NO_CONTENT).send();
}

async function signin(req: IReq<ISigninRequest>, res: IRes) {
  const result = await userServices.signin(req.body);

  if (!result) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json('Please provided username and password');
  }

  if (!result.id) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json('Invalid user');
  }

  const { key, options } = EnvVars.cookieProps;
  res.cookie(key, result.token, options);

  return res.status(HttpStatusCodes.OK).json({
    id: result.id,
    name: result.name,
    email: result.email,
  });
}

function signout(req: IReq, res: IRes) {
  const { key } = EnvVars.cookieProps;
  res.clearCookie(key);
  return res.status(HttpStatusCodes.NO_CONTENT).send();
}

async function getUserFromToken(req: IReq, res: IRes) {
  // Extract the token
  const { key } = EnvVars.cookieProps;
  const jwt = req.signedCookies[key];
  if (!jwt) {
    res.clearCookie(key);
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userData = await userServices.getUserFromToken(jwt);

  if (!userData) {
    res.clearCookie(key);
    return res.status(HttpStatusCodes.UNAUTHORIZED);
  }

  return res.status(HttpStatusCodes.OK).json(userData);
}

export default {
  paths,
  getProfile,
  getUserFromToken,
  signin,
  signout,
  signup,
  update,
  delete: _delete,
};
