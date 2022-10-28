import { DataTypes, Deferrable } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Category from './Category';
import User from './User';

const sequelize = getSequelize();

const Place = sequelize.define(
  'Place',
  {
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

Category.hasMany(Place);
Place.belongsTo(Category);

User.hasMany(Place);
Place.belongsTo(User);

User.belongsToMany(Place, { through: 'place_user' });
Place.belongsToMany(User, { through: 'place_user' });

User.belongsToMany(Place, { through: 'favorites' });
Place.belongsToMany(User, { through: 'favorites' });

export default Place;
