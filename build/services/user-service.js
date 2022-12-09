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
exports.update = exports.signin = exports.signup = exports.getProfile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../db/models/User"));
const List_1 = __importDefault(require("../db/models/List"));
const Review_1 = __importDefault(require("../db/models/Review"));
const Place_1 = __importDefault(require("../db/models/Place"));
const mappers_1 = require("@util/mappers");
const Favorite_1 = __importDefault(require("../db/models/Favorite"));
const jwt_util_1 = __importDefault(require("@util/jwt-util"));
function getProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findByPk(userId, {
            include: [
                {
                    model: List_1.default,
                    as: 'lists',
                },
                {
                    model: Review_1.default,
                    include: [
                        {
                            model: Place_1.default,
                        },
                    ],
                },
                {
                    model: Favorite_1.default,
                    as: 'favorites',
                    include: [
                        {
                            model: Place_1.default,
                            as: 'place',
                        },
                    ],
                },
            ],
        });
        if (!user) {
            return null;
        }
        return (0, mappers_1.mapUser)(user);
    });
}
exports.getProfile = getProfile;
function signup(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.create({
            name: userData.name,
            email: userData.email,
            password: yield hashPassword(userData.password),
            profilePicture: userData.profilePicture,
            location: '',
            description: '',
        });
        const payload = { id: user.id, email: user.email, name: user.name };
        const token = yield jwt_util_1.default.sign(payload);
        return Object.assign(Object.assign({}, payload), { token });
    });
}
exports.signup = signup;
function signin(authData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!authData.username || !authData.password) {
            return null;
        }
        const user = yield User_1.default.findOne({
            where: {
                email: authData.username,
            },
        });
        if (user && validatePassword(authData.password, user.password)) {
            const payload = { id: user.id, email: user.email, name: user.name };
            const token = yield jwt_util_1.default.sign(payload);
            return Object.assign(Object.assign({}, payload), { token });
        }
        return { id: 0, token: '', email: '', name: '' };
    });
}
exports.signin = signin;
function update(userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield User_1.default.update({
            name: userData.name,
            profilePicture: userData.profilePicture,
            location: userData.location,
            description: userData.description,
        }, {
            where: {
                id: userId,
            },
        });
    });
}
exports.update = update;
function hashPassword(plainPassword) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    return bcrypt_1.default.hash(plainPassword, saltRounds);
}
function validatePassword(plainPassword, hashPassword) {
    return bcrypt_1.default.compareSync(plainPassword, hashPassword);
}
