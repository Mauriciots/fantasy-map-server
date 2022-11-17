import { DataTypes, Model, Optional, NonAttribute } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Place from './Place';
import User from './User';

export interface IReviewOutput {
  id: number;
  content: string;
  stars: number;
  userId: number;
  user?: User;
  placeId: number;
  Place?: Place;
}

export type IReviewInput = Optional<IReviewOutput, 'id'>;

class Review extends Model<IReviewOutput, IReviewInput> implements IReviewOutput {
  declare id: number;
  declare content: string;
  declare stars: number;
  declare userId: number;
  declare user: NonAttribute<User>;
  declare placeId: number;
  declare Place: NonAttribute<Place>;
}

const sequelize = getSequelize();

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    content: DataTypes.TEXT,
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: 'Review',
    tableName: 'reviews',
  }
);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Place.hasMany(Review, { foreignKey: 'placeId', as: 'reviews' });
Review.belongsTo(Place, { foreignKey: 'placeId' });

export default Review;
