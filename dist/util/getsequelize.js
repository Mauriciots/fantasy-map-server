"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelize = void 0;
const sequelize_1 = require("sequelize");
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
let sequelizeInstance = null;
const getSequelize = () => {
    if (!sequelizeInstance) {
        console.log('Creating new sequelize instance');
        sequelizeInstance = new sequelize_1.Sequelize(EnvVars_1.default.dbName, EnvVars_1.default.dbUser, EnvVars_1.default.dbPassword, {
            dialect: EnvVars_1.default.dbDialect,
            host: EnvVars_1.default.dbHost,
        });
    }
    return sequelizeInstance;
};
exports.getSequelize = getSequelize;
