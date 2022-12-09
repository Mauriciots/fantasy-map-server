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
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
const auth_service_1 = __importDefault(require("@services/auth-service"));
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
const paths = {
    basePath: '/auth',
    login: '/login',
    logout: '/logout',
};
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const jwt = yield auth_service_1.default.getJwt(email, password);
        const { key, options } = EnvVars_1.default.cookieProps;
        res.cookie(key, jwt, options);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
function logout(_, res) {
    const { key, options } = EnvVars_1.default.cookieProps;
    res.clearCookie(key, options);
    return res.status(HttpStatusCodes_1.default.OK).end();
}
exports.default = {
    paths,
    login,
    logout,
};
