import HttpStatusCodes from '@configurations/HttpStatusCodes';
import listService from '@services/list-service';
import { IReq, IRes } from '@declarations/types';
import IListRequest from 'src/types/IListRequest';

const paths = {
  basePath: '/lists',
  get: '/:id',
  getPopular: '/popular',
  getByQuery: '/search',
  create: '/',
  update: '/:id',
  delete: '/:id',
} as const;

/**
 * Get list by id.
 */
async function getById(req: IReq, res: IRes) {
  const id = req.params.id;
  const list = await listService.getById(parseInt(id, 10));

  if (!list) {
    return res.status(HttpStatusCodes.NOT_FOUND).json('List not found');
  }

  return res.status(HttpStatusCodes.OK).json(list);
}

/**
 * Get 6 most popular lists (considering reviews count).
 */
async function getMostPopular(req: IReq, res: IRes) {
  const lists = await listService.getPopular();
  return res.status(HttpStatusCodes.OK).json(lists);
}

/**
 * Get lists by query (search by title, description, category and place).
 */
async function getByQuery(req: IReq, res: IRes) {
  const query = req.query.query;
  const lists = await listService.getByQuery(query as string);
  return res.status(HttpStatusCodes.OK).json(lists);
}

async function create(req: IReq<IListRequest>, res: IRes) {
  const newId = await listService.createOrUpdate(req.body);
  return res.status(HttpStatusCodes.OK).json(newId);
}

async function update(req: IReq<IListRequest>, res: IRes) {
  const id = parseInt(req.params.id, 10);
  const newId = await listService.createOrUpdate(req.body, id);
  if (!newId) {
    return res.status(HttpStatusCodes.NOT_FOUND).json('List not found!');
  }
  return res.status(HttpStatusCodes.NO_CONTENT).send();
}

async function _delete(req: IReq, res: IRes) {
  const id = parseInt(req.params.id, 10);
  await listService.markAsDeleted(id);
  return res.status(HttpStatusCodes.NO_CONTENT).send();
}

export default {
  paths,
  getById,
  getMostPopular,
  getByQuery,
  create,
  update,
  delete: _delete,
} as const;
