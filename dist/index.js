"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start");
const jet_logger_1 = __importDefault(require("jet-logger"));
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
const server_1 = __importDefault(require("./server"));
const getsequelize_1 = require("@util/getsequelize");
const msg = 'Express server started on port: ' + EnvVars_1.default.port.toString();
const sequelize = (0, getsequelize_1.getSequelize)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        jet_logger_1.default.info('Connection has been established successfully.');
        server_1.default.listen(EnvVars_1.default.port, () => jet_logger_1.default.info(msg));
    }
    catch (error) {
        jet_logger_1.default.err(error);
    }
}))();
