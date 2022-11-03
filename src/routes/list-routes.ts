import HttpStatusCodes from '@configurations/HttpStatusCodes';

import listService from '@services/list-service';
import { IReq, IRes } from '@declarations/types';

// **** Variables **** //

// Paths
const paths = {
  basePath: '/lists',
  get: '/:id',
} as const;

// **** Functions **** //

/**
 * Get all users.
 */
async function getById(req: IReq, res: IRes) {
  const id = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const list = await listService.getById(parseInt(id, 10));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return res.status(HttpStatusCodes.OK).json({ list });
}

export default {
  paths,
  getById,
} as const;
