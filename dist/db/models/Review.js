"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const getsequelize_1 = require("@util/getsequelize");
const Place_1 = __importDefault(require("./Place"));
const User_1 = __importDefault(require("./User"));
class Review extends sequelize_1.Model {
}
const sequelize = (0, getsequelize_1.getSequelize)();
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    content: sequelize_1.DataTypes.TEXT,
    stars: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
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
    modelName: 'Review',
    tableName: 'reviews',
});
User_1.default.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User_1.default, { foreignKey: 'userId', as: 'user' });
Place_1.default.hasMany(Review, { foreignKey: 'placeId', as: 'reviews' });
Review.belongsTo(Place_1.default, { foreignKey: 'placeId' });
exports.default = Review;
