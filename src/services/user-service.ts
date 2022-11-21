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

function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
  return bcrypt.hash(plainPassword, saltRounds);
}
