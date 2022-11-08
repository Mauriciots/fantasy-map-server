import List from 'src/db/models/List';
import Place from 'src/db/models/Place';
import Review from 'src/db/models/Review';

type PlaceWithAverageStars =
  | Omit<Place, 'reviews'>
  | {
      averageStars: number | null;
      location: {
        lat: number;
        lng: number;
      };
    };

type ListWithAverageStars = Omit<List, 'places'> | { places: PlaceWithAverageStars[] };

async function getById(id: number): Promise<ListWithAverageStars | null> {
  const mapPlace = (place: Place): PlaceWithAverageStars => ({
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

  const list = await List.findByPk<List>(id, {
    include: {
      model: Place,
      as: 'places',
      include: [
        {
          model: Review,
          as: 'reviews',
        },
      ],
    },
  });

  if (!list) {
    return null;
  }

  return {
    id: list.id,
    name: list.name,
    description: list.description,
    places: list.places.map(mapPlace),
    picture: list.picture,
  };
}

export default {
  getById,
} as const;
