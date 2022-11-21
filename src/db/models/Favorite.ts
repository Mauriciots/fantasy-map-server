import { DataTypes, Optional, Model, NonAttribute } from 'sequelize';
import User from './User';
import Place from './Place';
import { getSequelize } from '../../sequelize';

export interface IReviewOutput {
  id: number;
  userId: number;
  placeId: number;
}

export type IReviewInput = Optional<IReviewOutput, 'id'>;

class Favorite extends Model<IReviewOutput, IReviewInput> implements IReviewOutput {
  declare id: number;
  declare userId: number;
  declare placeId: number;
  declare place: NonAttribute<Place>;
}

const sequelize = getSequelize();

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'favorites',
    modelName: 'Favorite',
  }
);

User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Place.hasMany(Favorite, { foreignKey: 'placeId', as: 'favorites' });
Favorite.belongsTo(Place, { foreignKey: 'placeId', as: 'place' });

export default Favorite;
