import HttpStatusCodes from '@configurations/HttpStatusCodes';
import listService from '@services/list-service';
import { IReq, IRes } from '@declarations/types';

const paths = {
  basePath: '/lists',
  get: '/:id',
} as const;

/**
 * Get list by id.
 */
async function getById(req: IReq, res: IRes) {
  const id = req.params.id;
  const list = await listService.getById(parseInt(id, 10));
  return res.status(HttpStatusCodes.OK).json(list);
}

export default {
  paths,
  getById,
} as const;
