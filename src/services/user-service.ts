import bcrypt from 'bcrypt';
import User from 'src/db/models/User';
import List from 'src/db/models/List';
import Review from 'src/db/models/Review';
import Place from 'src/db/models/Place';
import IUserResponse from 'src/types/IUserResponse';
import { mapUser } from '@util/mappers';
import ISignupRequest from 'src/types/ISignupRequest';
import IProfileRequest from 'src/types/IProfileRequest';
import Favorite from 'src/db/models/Favorite';
import ISigninRequest from 'src/types/ISigninRequest';
import ISigninResponse from 'src/types/ISigninResponse';
import jwtUtil from '@util/jwt-util';

// userId should be fetched from request header auth.
const userId = 1;

export async function getProfile(): Promise<IUserResponse | null> {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: List,
        as: 'lists',
      },
      {
        model: Review,
        include: [
          {
            model: Place,
          },
        ],
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
      },
    ],
  });

  if (!user) {
    return null;
  }

  return mapUser(user);
}

export async function signup(userData: ISignupRequest): Promise<void> {
  await User.create({
    name: userData.name,
    email: userData.email,
    password: await hashPassword(userData.password),
    profilePicture: userData.profilePicture,
    location: '',
    description: '',
  });
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

export async function update(userData: IProfileRequest): Promise<void> {
  await User.update(
    {
      name: userData.name,
      password: await hashPassword(userData.password),
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

export async function getUserFromToken(jwt: string): Promise<any> {
  const tokenPayload = await jwtUtil.decode(jwt);
  const userData = tokenPayload as ISigninResponse;

  const { exp } = tokenPayload as { exp: number; iat: number };

  if (new Date(exp * 1000) <= new Date()) {
    return null;
  }

  return {
    id: userData.id,
    email: userData.email,
    name: userData.name,
  };
}

function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  return bcrypt.hash(plainPassword, saltRounds);
}

function validatePassword(plainPassword: string, hashPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, hashPassword);
}
