"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
const Place_1 = __importDefault(require("./Place"));
const User_1 = __importDefault(require("./User"));
const Category_1 = __importDefault(require("./Category"));
class List extends sequelize_1.Model {
}
const sequelize = (0, getsequelize_1.getSequelize)();
List.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: sequelize_1.DataTypes.TEXT,
    picture: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    tableName: 'lists',
    modelName: 'List',
});
Category_1.default.hasMany(List, { foreignKey: 'categoryId' });
List.belongsTo(Category_1.default, { foreignKey: 'categoryId' });
User_1.default.hasMany(List, { foreignKey: 'userId', as: 'lists' });
List.belongsTo(User_1.default, { foreignKey: 'userId' });
List.belongsToMany(Place_1.default, {
    through: 'list_place',
    foreignKey: 'listId',
    as: 'places',
});
Place_1.default.belongsToMany(List, { through: 'list_place', foreignKey: 'placeId' });
exports.default = List;
