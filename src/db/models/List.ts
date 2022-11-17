import { DataTypes, Model, Optional, NonAttribute } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Place from './Place';
import User from './User';
import Category from './Category';

export interface IListOutput {
  id: number;
  name: string;
  description: string;
  picture: string;
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IListInput = Optional<IListOutput, 'id'>;

class List extends Model<IListOutput, IListInput> implements IListOutput {
  declare id: number;
  declare name: string;
  declare description: string;
  declare picture: string;
  declare deleted: boolean;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | undefined;
  declare places: NonAttribute<Place[]>;
  declare User: NonAttribute<User>;
}

const sequelize = getSequelize();

List.init(
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
    description: DataTypes.TEXT,
    picture: {
      type: DataTypes.TEXT,
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
    tableName: 'lists',
    modelName: 'List',
  }
);

Category.hasMany(List, { foreignKey: 'categoryId' });
List.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(List, { foreignKey: 'userId', as: 'lists' });
List.belongsTo(User, { foreignKey: 'userId' });

List.belongsToMany(Place, {
  through: 'list_place',
  foreignKey: 'listId',
  as: 'places',
});
Place.belongsToMany(List, { through: 'list_place', foreignKey: 'placeId' });

export default List;
