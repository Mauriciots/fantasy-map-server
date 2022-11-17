import IPlaceResponse from './IPlaceResponse';

export default interface IReviewResponse {
  id: number;
  content: string | null;
  stars: number;
  place: IPlaceResponse;
}
