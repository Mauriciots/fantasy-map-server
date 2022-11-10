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
function create(req: IReq, res: IRes) {
  return res.status(HttpStatusCodes.CREATED).json();
}

/**
 * Update place.
 */
function update(req: IReq, res: IRes) {
  return res.status(HttpStatusCodes.OK).json();
}

/**
 * Delete place.
 */
function _delete(req: IReq, res: IRes) {
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

export default {
  paths,
  getById,
  create,
  update,
  delete: _delete,
} as const;
