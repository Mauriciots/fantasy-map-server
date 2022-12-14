import bcrypt from 'bcrypt';
import User from '../db/models/User';
import List from '../db/models/List';
import Review from '../db/models/Review';
import Place from '../db/models/Place';
import IUserResponse from '../types/IUserResponse';
import { mapUser } from '@util/mappers';
import ISignupRequest from '../types/ISignupRequest';
import IProfileRequest from '../types/IProfileRequest';
import Favorite from '../db/models/Favorite';
import ISigninRequest from '../types/ISigninRequest';
import ISigninResponse from '../types/ISigninResponse';
import jwtUtil from '@util/jwt-util';

export async function getProfile(userId: number): Promise<IUserResponse | null> {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: List,
        as: 'lists',
        where: {
          deleted: false,
        },
        required: false,
      },
      {
        model: Review,
        include: [
          {
            model: Place,
          },
        ],
        required: false,
      },
      {
        model: Favorite,
        as: 'favorites',
        include: [
          {
            model: Place,
            as: 'place',
          },
        ],
        required: false,
      },
    ],
  });

  if (!user) {
    return null;
  }

  return mapUser(user);
}

export async function signup(userData: ISignupRequest): Promise<ISigninResponse> {
  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: await hashPassword(userData.password),
    profilePicture: userData.profilePicture,
    location: '',
    description: '',
  });

  const payload = { id: user.id, email: user.email, name: user.name };
  const token = await jwtUtil.sign(payload);
  return { ...payload, token };
}

export async function signin(authData: ISigninRequest): Promise<ISigninResponse | null> {
  if (!authData.username || !authData.password) {
    return null;
  }

  const user = await User.findOne({
    where: {
      email: authData.username,
    },
  });

  if (user && validatePassword(authData.password, user.password)) {
    const payload = { id: user.id, email: user.email, name: user.name };
    const token = await jwtUtil.sign(payload);
    return { ...payload, token };
  }
  return { id: 0, token: '', email: '', name: '' };
}

export async function update(userId: number, userData: IProfileRequest): Promise<void> {
  await User.update(
    {
      name: userData.name,
      // password: await hashPassword(userData.password),
      profilePicture: userData.profilePicture,
      location: userData.location,
      description: userData.description,
    },
    {
      where: {
        id: userId,
      },
    }
  );
}

function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  return bcrypt.hash(plainPassword, saltRounds);
}

function validatePassword(plainPassword: string, hashPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, hashPassword);
}
