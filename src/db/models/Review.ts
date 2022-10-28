import { DataTypes, Deferrable } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Place from './Place';
import User from './User';

const sequelize = getSequelize();

const Review = sequelize.define(
  'Review',
  {
    content: DataTypes.TEXT,
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: new Deferrable.INITIALLY_DEFERRED(),
      },
    },
    placeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Place,
        key: 'id',
        deferrable: new Deferrable.INITIALLY_DEFERRED(),
      },
    },
  },
  {
    tableName: 'reviews',
  }
);

User.hasMany(Review);
Review.belongsTo(User);

Place.hasMany(Review);
Review.belongsTo(Place);

export default Review;
