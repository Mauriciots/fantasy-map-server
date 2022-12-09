"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Place_1 = __importDefault(require("./Place"));
const getsequelize_1 = require("@util/getsequelize");
class Favorite extends sequelize_1.Model {
}
const sequelize = (0, getsequelize_1.getSequelize)();
Favorite.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    placeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'favorites',
    modelName: 'Favorite',
});
User_1.default.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Favorite.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
Place_1.default.hasMany(Favorite, { foreignKey: 'placeId', as: 'favorites' });
Favorite.belongsTo(Place_1.default, { foreignKey: 'placeId', as: 'place' });
exports.default = Favorite;
