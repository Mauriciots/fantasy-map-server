"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const options = (0, command_line_args_1.default)([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
]);
if (options.env !== 'production') {
    const result2 = dotenv_1.default.config({
        path: path_1.default.join(__dirname, `../env/${String(options.env)}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
}
