import { DataTypes, Model, NonAttribute, Optional } from 'sequelize';
import { getSequelize } from '../../sequelize';
import User from './User';
import Review from './Review';

export interface IPlaceOutput {
  id: number;
  name: string;
  address: string;
  description: string;
  picture: string;
  latitude: number;
  longitude: number;
  userId: number;
  user?: User;
  reviews?: Review[];
  deleted: boolean;
}

export type IPlaceInput = Optional<IPlaceOutput, 'id'>;

class Place extends Model<IPlaceOutput, IPlaceInput> implements IPlaceOutput {
  declare id: number;
  declare name: string;
  declare address: string;
  declare latitude: number;
  declare longitude: number;
  declare description: string;
  declare picture: string;
  declare userId: number;
  declare user: User;
  declare reviews: NonAttribute<Review[]>;
  declare deleted: boolean;
}

const sequelize = getSequelize();

Place.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Place',
    tableName: 'places',
  }
);

User.hasMany(Place, { foreignKey: 'userId' });
Place.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.belongsToMany(Place, { through: 'favorites' });
Place.belongsToMany(User, { through: 'favorites' });

export default Place;
