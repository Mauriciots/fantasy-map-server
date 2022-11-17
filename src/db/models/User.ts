import { DataTypes, Model, Optional, NonAttribute } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Review from './Review';

export interface IUserOutput {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  location: string;
  description: string;
}

export type IUserInput = Optional<IUserOutput, 'id'>;

class User extends Model<IUserOutput, IUserInput> implements IUserOutput {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare profilePicture: string;
  declare location: string;
  declare description: string;
  declare Reviews: NonAttribute<Review[]>;
}

const sequelize = getSequelize();

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
