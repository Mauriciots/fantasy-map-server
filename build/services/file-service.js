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
exports.saveFile = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
const supabase_js_1 = require("@supabase/supabase-js");
function saveFile(userId, filePath, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const supabase = (0, supabase_js_1.createClient)(EnvVars_1.default.sbProjectUrl, EnvVars_1.default.sbApiKey);
        const newFileName = `${(0, uuid_1.v4)()}-${fileName}`;
        const fileBuffer = fs_1.default.readFileSync(filePath);
        const { data, error } = yield supabase.storage.from('uploads').upload(`${userId}/${newFileName}`, fileBuffer, {
            cacheControl: '3600',
            upsert: false,
        });
        if (!data && error) {
            throw error.message;
        }
        return `${EnvVars_1.default.sbUploadsBucket}${data.path}`;
    });
}
exports.saveFile = saveFile;
