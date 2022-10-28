import { DataTypes, Deferrable } from 'sequelize';
import { getSequelize } from '../../sequelize';
import Place from './Place';
import User from './User';

const sequelize = getSequelize();

const List = sequelize.define(
  'List',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
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
    tableName: 'lists',
  }
);

User.hasMany(List);
List.belongsTo(User);

List.belongsToMany(Place, { through: 'list_place' });
Place.belongsToMany(List, { through: 'list_place' });

export default List;
