/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getSequelize } from 'src/sequelize';
import List, { IListOutput } from 'src/db/models/List';
import Place from 'src/db/models/Place';
import Review from 'src/db/models/Review';
import User, { IUserOutput } from 'src/db/models/User';
import { QueryTypes, Op } from 'sequelize';

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

type ListWithUser = Omit<IListOutput, 'createdAt' | 'updatedAt' | 'userId'> | { user: Omit<IUserOutput, 'password' | 'hash'> };

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

async function getById(id: number): Promise<ListWithAverageStars | null> {
  const list = await List.findByPk<List>(id, {
    include: {
      model: Place,
      as: 'places',
      where: {
        deleted: false,
      },
      include: [
        {
          model: Review,
          as: 'reviews',
        },
      ],
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
  };
}

async function getPopular(): Promise<ListWithUser[]> {
  const sequelize = getSequelize();
  const lists = await sequelize.query(
    `
    SELECT "lists".*, "users"."id" as "user.id", "users"."name" as "user.name",
    "users"."email" as "user.email", "users"."profilePicture" as "user.profilePicture",
    "users"."location" as "user.location", "users"."description" as "user.description"
    FROM "lists" INNER JOIN "list_place" ON "lists"."id" = "list_place"."listId"
    INNER JOIN "places" ON "places"."id" = "list_place"."placeId"
    INNER JOIN "reviews" ON "places"."id" = "reviews"."placeId"
    INNER JOIN "users" ON "places"."userId" = "users"."id"
    WHERE "lists"."deleted" IS FALSE
    GROUP BY "lists"."id", "users"."id"
    ORDER BY COUNT(distinct reviews.id) DESC, "updatedAt" DESC, name ASC
    LIMIT 6;
  `,
    { type: QueryTypes.SELECT, nest: true }
  );
  return lists.map((l: any) => ({
    id: l.id,
    name: l.name,
    description: l.description,
    picture: l.picture,
    user: l.user,
  }));
}

async function getByQuery(query: string): Promise<ListWithUser[]> {
  const lists = await List.findAll<List>({
    where: {
      [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }, { description: { [Op.iLike]: `%${query}%` } }],
      deleted: false,
    },
    include: {
      model: User,
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
}

export default {
  getById,
  getPopular,
  getByQuery,
} as const;
