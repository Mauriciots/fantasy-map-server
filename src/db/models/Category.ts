import { DataTypes, Optional, Model } from 'sequelize';
import { getSequelize } from '../../sequelize';

export interface ICategoryOutput {
  id: number;
  name: string;
}

export type ICategoryInput = Optional<ICategoryOutput, 'id'>;

class Category extends Model<ICategoryOutput, ICategoryInput> implements ICategoryOutput {
  declare id: number;
  declare name: string;
}

const sequelize = getSequelize();

Category.init(
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
  },
  {
    sequelize,
    tableName: 'categories',
    modelName: 'Category',
  }
);

export default Category;
