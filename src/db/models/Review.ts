import { DataTypes, Model, Optional } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Place from './Place';
import User from './User';

export interface IReviewOutput {
  id: number;
  content: string;
  stars: number;
}

export type IReviewInput = Optional<IReviewOutput, 'id'>;

class Review extends Model<IReviewOutput, IReviewInput> implements IReviewOutput {
  declare id: number;
  declare content: string;
  declare stars: number;
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
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
  }
);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Place.hasMany(Review, { foreignKey: 'placeId', as: 'reviews' });
Review.belongsTo(Place, { foreignKey: 'placeId' });

export default Review;
