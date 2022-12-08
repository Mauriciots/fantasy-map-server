"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFile = exports.saveFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
function saveFile(userId, filePath, fileName) {
    const basePath = path_1.default.resolve('./src/public/uploads');
    const newFileName = `${(0, uuid_1.v4)()}-${fileName}`;
    const newPath = `${basePath}/${userId}/${newFileName}`;
    if (!fs_1.default.existsSync(`${basePath}/${userId}`)) {
        fs_1.default.mkdirSync(`${basePath}/${userId}`);
    }
    fs_1.default.renameSync(filePath, newPath);
    return `/uploads/${userId}/${newFileName}`;
}
exports.saveFile = saveFile;
function replaceFile(userId, filePath, fileName) {
    const basePath = path_1.default.resolve('./src/public/uploads');
    const newPath = `${basePath}/${userId}/${fileName}`;
    fs_1.default.renameSync(filePath, newPath);
}
exports.replaceFile = replaceFile;
