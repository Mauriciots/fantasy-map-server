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
const getsequelize_1 = require("@util/getsequelize");
const List_1 = __importDefault(require("../db/models/List"));
const Place_1 = __importDefault(require("../db/models/Place"));
const Review_1 = __importDefault(require("../db/models/Review"));
const User_1 = __importDefault(require("../db/models/User"));
const sequelize_1 = require("sequelize");
const mapPlace = (place) => ({
    id: place.id,
    name: place.name,
    address: place.address,
    description: place.description,
    picture: place.picture,
    location: {
        lat: place.latitude,
        lng: place.longitude,
    },
    averageStars: place.reviews.length ? Math.round(place.reviews.reduce((sum, r) => sum + r.stars, 0) / place.reviews.length) : null,
});
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = yield List_1.default.findByPk(id, {
            include: {
                model: Place_1.default,
                as: 'places',
                where: {
                    deleted: false,
                },
                include: [
                    {
                        model: Review_1.default,
                        as: 'reviews',
                    },
                ],
                required: false,
            },
        });
        if (!list || list.deleted) {
            return null;
        }
        return {
            id: list.id,
            name: list.name,
            description: list.description,
            places: list.places.map(mapPlace),
            picture: list.picture,
            categoryId: list.categoryId,
            userId: list.userId,
        };
    });
}
function getPopular() {
    return __awaiter(this, void 0, void 0, function* () {
        const sequelize = (0, getsequelize_1.getSequelize)();
        const lists = yield sequelize.query(`
    SELECT "lists".*, "users"."id" as "user.id", "users"."name" as "user.name",
    "users"."email" as "user.email", "users"."profilePicture" as "user.profilePicture",
    "users"."location" as "user.location", "users"."description" as "user.description"
    FROM "lists" LEFT JOIN "list_place" ON "lists"."id" = "list_place"."listId"
    LEFT JOIN "places" ON "places"."id" = "list_place"."placeId"
    LEFT JOIN "reviews" ON "places"."id" = "reviews"."placeId"
    LEFT JOIN "users" ON "lists"."userId" = "users"."id"
    WHERE "lists"."deleted" IS FALSE
    GROUP BY "lists"."id", "users"."id"
    ORDER BY COUNT(distinct reviews.id) DESC, "updatedAt" DESC, name ASC
    LIMIT 6;
  `, { type: sequelize_1.QueryTypes.SELECT, nest: true });
        return lists.map((l) => ({
            id: l.id,
            name: l.name,
            description: l.description,
            picture: l.picture,
            user: l.user,
        }));
    });
}
function getByQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const lists = yield List_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ name: { [sequelize_1.Op.iLike]: `%${query}%` } }, { description: { [sequelize_1.Op.iLike]: `%${query}%` } }],
                deleted: false,
            },
            include: {
                model: User_1.default,
            },
        });
        return lists.map((list) => ({
            id: list.id,
            name: list.name,
            description: list.description,
            picture: list.picture,
            user: {
                id: list.User.id,
                name: list.User.name,
                email: list.User.email,
                profilePicture: list.User.profilePicture,
                location: list.User.location,
                description: list.User.description,
            },
        }));
    });
}
function getByCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const lists = yield List_1.default.findAll({
            where: {
                categoryId,
                deleted: false,
            },
            include: {
                model: User_1.default,
            },
        });
        return lists.map((list) => ({
            id: list.id,
            name: list.name,
            description: list.description,
            picture: list.picture,
            categoryId: list.categoryId,
            user: {
                id: list.User.id,
                name: list.User.name,
                email: list.User.email,
                profilePicture: list.User.profilePicture,
                location: list.User.location,
                description: list.User.description,
            },
        }));
    });
}
function createOrUpdate(userId, listData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            const values = {
                name: listData.name,
                description: listData.description,
                picture: listData.picture,
                categoryId: listData.categoryId,
                userId,
                deleted: false,
            };
            const list = yield List_1.default.create(values, {
                include: {
                    model: Place_1.default,
                    as: 'places',
                },
            });
            list.setPlaces(listData.placeIds);
            return list.id;
        }
        const list = yield List_1.default.findByPk(id);
        if (!list || list.userId !== userId) {
            return null;
        }
        list.name = listData.name;
        list.description = listData.description;
        list.picture = listData.picture;
        list.categoryId = listData.categoryId;
        list.setPlaces(listData.placeIds);
        list.save();
        return id;
    });
}
function markAsDeleted(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield List_1.default.update({
            deleted: true,
        }, {
            where: { id, userId },
        });
    });
}
exports.default = {
    getById,
    getPopular,
    getByQuery,
    getByCategory,
    createOrUpdate,
    markAsDeleted,
};
