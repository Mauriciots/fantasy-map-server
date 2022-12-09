"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
const User_1 = __importDefault(require("./User"));
class Place extends sequelize_1.Model {
}
const sequelize = (0, getsequelize_1.getSequelize)();
Place.init({
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
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    picture: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'Place',
    tableName: 'places',
});
User_1.default.hasMany(Place, { foreignKey: 'userId' });
Place.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
exports.default = Place;
