import IListResponse from './IListResponse';
import IPlaceResponse from './IPlaceResponse';
import IReviewResponse from './IReviewResponse';

export default interface IUserResponse {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  description: string;
  lists: IListResponse[];
  reviews: IReviewResponse[];
  favoritePlaces: IPlaceResponse[];
}
