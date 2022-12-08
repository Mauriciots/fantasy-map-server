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
const EnvVars_1 = __importDefault(require("@configurations/EnvVars"));
const jwt_util_1 = __importDefault(require("@util/jwt-util"));
function validateAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { key: authCookieName } = EnvVars_1.default.cookieProps;
        const jwt = req.signedCookies[authCookieName];
        const tokenPayload = (yield jwt_util_1.default.decode(jwt));
        const validToken = jwt && new Date(tokenPayload.exp * 1000) > new Date();
        if (!validToken) {
            res.clearCookie(authCookieName);
            return res.status(HttpStatusCodes_1.default.UNAUTHORIZED).json('User is not authenticated.');
        }
        req.app.locals.auth = tokenPayload;
        next();
    });
}
exports.default = validateAuth;
