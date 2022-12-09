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
exports.remove = exports.update = exports.create = exports.getByUser = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const Review_1 = __importDefault(require("../db/models/Review"));
function getByUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findByPk(userId, {
            include: [Review_1.default],
        });
        if (!user) {
            return null;
        }
        return user.Reviews;
    });
}
exports.getByUser = getByUser;
function create(userId, review) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbReview = yield Review_1.default.create({
            content: review.content,
            stars: review.stars,
            userId,
            placeId: review.placeId,
        });
        return dbReview.id;
    });
}
exports.create = create;
function update(userId, id, review) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Review_1.default.update({
            content: review.content,
            stars: review.stars,
        }, {
            where: { id, userId },
        });
    });
}
exports.update = update;
function remove(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Review_1.default.destroy({
            where: { id, userId },
        });
    });
}
exports.remove = remove;
