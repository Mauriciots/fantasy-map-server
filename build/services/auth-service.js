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
exports.errors = void 0;
const user_repo_1 = __importDefault(require("@repos/user-repo"));
const jwt_util_1 = __importDefault(require("@util/jwt-util"));
const pwd_util_1 = __importDefault(require("@util/pwd-util"));
const HttpStatusCodes_1 = __importDefault(require("@configurations/HttpStatusCodes"));
const classes_1 = require("@declarations/classes");
exports.errors = {
    unauth: 'Unauthorized',
    emailNotFound: (email) => `User with email "${email}" not found`,
};
function getJwt(email, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_repo_1.default.getOne(email);
        if (!user) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, exports.errors.emailNotFound(email));
        }
        const hash = ((_a = user.pwdHash) !== null && _a !== void 0 ? _a : '');
        const pwdPassed = yield pwd_util_1.default.compare(password, hash);
        if (!pwdPassed) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, exports.errors.unauth);
        }
        return jwt_util_1.default.sign({
            id: user.id,
            email: user.name,
            name: user.name,
            role: user.role,
        });
    });
}
exports.default = {
    getJwt,
};
