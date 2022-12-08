import List from '../db/models/List';
import Review from '../db/models/Review';
import { Place, User } from '../db/models/';
import IListResponse from '../types/IListResponse';
import IUserResponse from '../types/IUserResponse';
import IReviewResponse from '../types/IReviewResponse';
import IPlaceResponse from '../types/IPlaceResponse';

export const mapPlace = (place: Place): IPlaceResponse => ({
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

export const mapList = (list: List): IListResponse => ({
  id: list.id,
  name: list.name,
  description: list.description,
  picture: list.picture,
});

export const mapReview = (review: Review): IReviewResponse => ({
  id: review.id,
  content: review.content,
  stars: review.stars,
  place: mapPlace(review.Place),
});

export const mapUser = (dbUser: User): IUserResponse => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  profilePicture: dbUser.profilePicture,
  location: dbUser.location,
  description: dbUser.description,
  lists: dbUser.lists.map((l) => mapList(l)),
  reviews: dbUser.Reviews.map((r) => mapReview(r)),
  favoritePlaces: dbUser.favorites.map((f) => mapPlace(f.place)),
});
