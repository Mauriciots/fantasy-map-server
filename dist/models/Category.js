"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
const sequelize = (0, getsequelize_1.getSequelize)();
const Category = sequelize.define('Category', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categories',
});
exports.default = Category;
