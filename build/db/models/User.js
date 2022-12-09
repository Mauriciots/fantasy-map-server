"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
class User extends sequelize_1.Model {
}
const sequelize = (0, getsequelize_1.getSequelize)();
User.init({
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});
exports.default = User;
