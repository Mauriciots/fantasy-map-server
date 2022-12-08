import Favorite from '../db/models/Favorite';

export async function toggleFavorite(userId: number, placeId: number): Promise<void> {
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
