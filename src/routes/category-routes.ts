import HttpStatusCodes from '@configurations/HttpStatusCodes';
import categoryService from '@services/category-service';
import { IReq, IRes } from '@declarations/types';

const paths = {
  basePath: '/categories',
  get: '/',
} as const;

/**
 * Get all categories.
 */
async function getAll(_req: IReq, res: IRes): Promise<IRes> {
  const categories = await categoryService.getAll();
  return res.status(HttpStatusCodes.OK).json(categories);
}

export default {
  paths,
  getAll,
} as const;
