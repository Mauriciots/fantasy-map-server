import { DataTypes } from 'sequelize';
import { getSequelize } from '../../sequelize';

const sequelize = getSequelize();

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
  }
);

export default Category;
