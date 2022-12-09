"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonfile_1 = __importDefault(require("jsonfile"));
const dbFileName = 'database.json';
function openDb() {
    return jsonfile_1.default.readFile(__dirname + '/' + dbFileName);
}
function saveDb(db) {
    return jsonfile_1.default.writeFile((__dirname + '/' + dbFileName), db);
}
exports.default = {
    openDb,
    saveDb,
};
