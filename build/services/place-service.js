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
exports.markAsDeleted = exports.update = exports.create = exports.getAllByUserId = exports.getById = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const Place_1 = __importDefault(require("../db/models/Place"));
const Review_1 = __importDefault(require("../db/models/Review"));
const Favorite_1 = __importDefault(require("../db/models/Favorite"));
const userSelectedAsFavorite = (userId, favorites) => favorites.some((f) => f.userId === userId);
const mapUser = (dbUser) => ({
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    profilePicture: dbUser.profilePicture,
    location: dbUser.location,
    description: dbUser.description,
});
const mapReview = (dbReview) => {
    return {
        id: dbReview.id,
        content: dbReview.content,
        stars: dbReview.stars,
        user: mapUser(dbReview.user),
    };
};
const mapPlace = (userId, dbPlace) => {
    return {
        id: dbPlace.id,
        name: dbPlace.name,
        address: dbPlace.address,
        location: {
            lat: dbPlace.latitude,
            lng: dbPlace.longitude,
        },
        description: dbPlace.description,
        picture: dbPlace.picture,
        user: mapUser(dbPlace.user),
        favorite: userSelectedAsFavorite(userId, dbPlace.favorites),
        reviews: dbPlace.reviews ? dbPlace.reviews.map((r) => mapReview(r)) : [],
    };
};
function getById(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const place = yield Place_1.default.findByPk(id, {
            include: [
                {
                    model: User_1.default,
                    as: 'user',
                },
                {
                    model: Review_1.default,
                    as: 'reviews',
                    include: [
                        {
                            model: User_1.default,
                            as: 'user',
                        },
                    ],
                },
                {
                    model: Favorite_1.default,
                    as: 'favorites',
                },
            ],
        });
        if (!place || place.deleted) {
            return null;
        }
        return mapPlace(userId, place);
    });
}
exports.getById = getById;
function getAllByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const places = yield Place_1.default.findAll({
            include: [
                {
                    model: User_1.default,
                    as: 'user',
                },
                {
                    model: Review_1.default,
                    as: 'reviews',
                    include: [
                        {
                            model: User_1.default,
                            as: 'user',
                        },
                    ],
                },
                {
                    model: Favorite_1.default,
                    as: 'favorites',
                },
            ],
            where: {
                userId,
            },
        });
        return places.map((p) => mapPlace(userId, p));
    });
}
exports.getAllByUserId = getAllByUserId;
function create(userId, newPlace) {
    return __awaiter(this, void 0, void 0, function* () {
        const place = yield Place_1.default.create({
            name: newPlace.name,
            address: newPlace.address,
            latitude: newPlace.location.lat,
            longitude: newPlace.location.lng,
            description: newPlace.description,
            picture: newPlace.picture,
            userId,
            deleted: false,
        });
        return place.id;
    });
}
exports.create = create;
function update(userId, id, place) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Place_1.default.update({
            name: place.name,
            address: place.address,
            latitude: place.location.lat,
            longitude: place.location.lng,
            description: place.description,
            picture: place.picture,
        }, {
            where: { id, userId },
        });
    });
}
exports.update = update;
function markAsDeleted(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Place_1.default.update({
            deleted: true,
        }, {
            where: { id, userId },
        });
    });
}
exports.markAsDeleted = markAsDeleted;
