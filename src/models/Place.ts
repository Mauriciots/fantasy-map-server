import { DataTypes, Deferrable } from 'sequelize';
import { getSequelize } from '../sequelize';
import Category from './Category';
import User from './User_';

const sequelize = getSequelize();

const Place = sequelize.define(
  'Place',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: 'id',
        deferrable: new Deferrable.INITIALLY_DEFERRED(),
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: new Deferrable.INITIALLY_DEFERRED(),
      },
    },
  },
  {
    tableName: 'places',
  }
);

export default Place;
