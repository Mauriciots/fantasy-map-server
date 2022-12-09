"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = exports.mapReview = exports.mapList = exports.mapPlace = void 0;
const mapPlace = (place) => ({
    id: place.id,
    name: place.name,
    address: place.address,
    location: {
        lat: place.latitude,
        lng: place.longitude,
    },
    description: place.description,
    picture: place.picture,
});
exports.mapPlace = mapPlace;
const mapList = (list) => ({
    id: list.id,
    name: list.name,
    description: list.description,
    picture: list.picture,
});
exports.mapList = mapList;
const mapReview = (review) => ({
    id: review.id,
    content: review.content,
    stars: review.stars,
    place: (0, exports.mapPlace)(review.Place),
});
exports.mapReview = mapReview;
const mapUser = (dbUser) => ({
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    profilePicture: dbUser.profilePicture,
    location: dbUser.location,
    description: dbUser.description,
    lists: dbUser.lists.map((l) => (0, exports.mapList)(l)),
    reviews: dbUser.Reviews.map((r) => (0, exports.mapReview)(r)),
    favoritePlaces: dbUser.favorites.map((f) => (0, exports.mapPlace)(f.place)),
});
exports.mapUser = mapUser;
