import User from 'src/db/models/User';
import Place from 'src/db/models/Place';
import Review from 'src/db/models/Review';

interface IUSerResponse {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
  location: string;
  description: string;
}

interface IReviewResponse {
  id: number;
  content: string;
  stars: number;
  user: IUSerResponse;
}

interface IPlaceResponse {
  id: number;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  picture: string;
  user: IUSerResponse;
  favorite: boolean;
  reviews: IReviewResponse[];
}

export interface IPlaceRequest {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  picture: string;
  listId: number;
}

const userSelectedAsFavorite = () => false;

const mapUser = (dbUser: User): IUSerResponse => ({
  id: dbUser.id,
  name: dbUser.name,
  email: dbUser.email,
  profilePicture: dbUser.profilePicture,
  location: dbUser.location,
  description: dbUser.description,
});

const mapReview = (dbReview: Review): IReviewResponse => {
  return {
    id: dbReview.id,
    content: dbReview.content,
    stars: dbReview.stars,
    user: mapUser(dbReview.user),
  };
};

const mapPlace = (dbPlace: Place): IPlaceResponse => {
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
    favorite: userSelectedAsFavorite(),
    reviews: dbPlace.reviews ? dbPlace.reviews.map((r) => mapReview(r)) : [],
  };
};

export async function getById(id: number): Promise<IPlaceResponse | null> {
  const place = await Place.findByPk<Place>(id, {
    include: [
      {
        model: User,
        as: 'user',
      },
      {
        model: Review,
        as: 'reviews',
        include: [
          {
            model: User,
            as: 'user',
          },
        ],
      },
    ],
  });

  if (!place) {
    return null;
  }

  return mapPlace(place);
}

export async function create(newPlace: IPlaceRequest): Promise<number> {
  const place = await Place.create({
    name: newPlace.name,
    address: newPlace.address,
    latitude: newPlace.location.lat,
    longitude: newPlace.location.lng,
    description: newPlace.description,
    picture: newPlace.picture,
    userId: 1,
  });

  return place.id;
}

export async function update(id: number, place: IPlaceRequest): Promise<void> {
  await Place.update(
    {
      name: place.name,
      address: place.address,
      latitude: place.location.lat,
      longitude: place.location.lng,
      description: place.description,
      picture: place.picture,
    },
    {
      where: { id },
    }
  );
}

export async function deletePlace(id: number): Promise<void> {
  // await Place.
}
