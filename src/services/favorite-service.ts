import Favorite from 'src/db/models/Favorite';

// userId should be fetched from request header auth.
const userId = 1;

export async function toggleFavorite(placeId: number): Promise<void> {
  const dbFav = await Favorite.findOne({
    where: {
      userId,
      placeId,
    },
  });

  if (dbFav) {
    await dbFav.destroy();
  } else {
    await Favorite.create({
      userId,
      placeId,
    });
  }
}
