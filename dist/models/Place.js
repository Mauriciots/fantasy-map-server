"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
const Category_1 = __importDefault(require("./Category"));
const User_1 = __importDefault(require("./User_"));
const sequelize = (0, getsequelize_1.getSequelize)();
const Place = sequelize.define('Place', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
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
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    picture: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Category_1.default,
            key: 'id',
            deferrable: new sequelize_1.Deferrable.INITIALLY_DEFERRED(),
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id',
            deferrable: new sequelize_1.Deferrable.INITIALLY_DEFERRED(),
        },
    },
}, {
    tableName: 'places',
});
exports.default = Place;
