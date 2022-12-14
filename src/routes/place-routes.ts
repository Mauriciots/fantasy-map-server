import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as placeService from '@services/place-service';

const paths = {
  basePath: '/places',
  getById: '/:id',
  getAllByUserId: '/',
  create: '/',
  update: '/:id',
  delete: '/:id',
} as const;

/**
 * Get place by id.
 */
async function getById(req: IReq, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const id = parseInt(req.params.id, 10);
  const place = await placeService.getById(authData.id, id);

  if (!place) {
    return res.status(HttpStatusCodes.NOT_FOUND).json('Place not found');
  }

  return res.status(HttpStatusCodes.OK).json(place);
}

async function getAllByUserId(req: IReq, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const places = await placeService.getAllByUserId(authData.id);
  return res.status(HttpStatusCodes.OK).json(places);
}

/**
 * Create new place.
 */
async function create(req: IReq<placeService.IPlaceRequest>, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const newPlace = await placeService.create(authData.id, req.body);
  return res.status(HttpStatusCodes.CREATED).json(newPlace);
}

/**
 * Update place.
 */
async function update(req: IReq<placeService.IPlaceRequest>, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const id = parseInt(req.params.id, 10);
  await placeService.update(authData.id, id, req.body);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

/**
 * Delete place.
 */
async function _delete(req: IReq, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const id = parseInt(req.params.id, 10);
  await placeService.markAsDeleted(authData.id, id);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

export default {
  paths,
  getById,
  getAllByUserId,
  create,
  update,
  delete: _delete,
} as const;
