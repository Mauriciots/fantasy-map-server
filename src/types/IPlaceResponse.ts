export default interface IPlaceResponse {
  id: number;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  picture: string;
}
