import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as placeService from '@services/place-service';

const paths = {
  basePath: '/places',
  getById: '/:id',
  create: '/',
  update: '/:id',
  delete: '/:id',
} as const;

/**
 * Get place by id.
 */
async function getById(req: IReq, res: IRes) {
  const id = parseInt(req.params.id, 10);
  const place = await placeService.getById(id);
  return res.status(HttpStatusCodes.OK).json(place);
}

/**
 * Create new place.
 */
async function create(req: IReq<placeService.IPlaceRequest>, res: IRes) {
  const newPlace = await placeService.create(req.body);
  return res.status(HttpStatusCodes.CREATED).json(newPlace);
}

/**
 * Update place.
 */
async function update(req: IReq<placeService.IPlaceRequest>, res: IRes) {
  const id = parseInt(req.params.id, 10);
  await placeService.update(id, req.body);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

/**
 * Delete place.
 */
async function _delete(req: IReq, res: IRes) {
  const id = parseInt(req.params.id, 10);
  await placeService.deletePlace(id);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

export default {
  paths,
  getById,
  create,
  update,
  delete: _delete,
} as const;
