import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as userServices from '@services/user-service';
import IProfileRequest from 'src/types/IProfileRequest';
import ISignupRequest from 'src/types/ISignupRequest';

const paths = {
  basePath: '/users',
  profile: '/profile',
  signup: '/signup',
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

export default {
  paths,
  getProfile,
  signup,
  update,
  delete: _delete,
};
