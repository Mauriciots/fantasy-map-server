import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as favoriteService from '@services/favorite-service';

const paths = {
  basePath: '/favorites',
  toggle: '/:id',
} as const;

/**
 * Toggle favorite.
 */
async function toggle(req: IReq, res: IRes) {
  const id = parseInt(req.params.id, 10);
  const authData = req.app.locals.auth as { id: number };
  await favoriteService.toggleFavorite(authData.id, id);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

export default {
  paths,
  toggle,
} as const;
