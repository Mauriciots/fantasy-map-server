import { DataTypes } from 'sequelize';
import { getSequelize } from '@util/getsequelize';

const sequelize = getSequelize();

const Category = sequelize.define(
  'Category',
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
  },
  {
    tableName: 'categories',
  }
);

export default Category;
