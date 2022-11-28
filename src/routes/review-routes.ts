import HttpStatusCodes from '@configurations/HttpStatusCodes';
import { IReq, IRes } from '@declarations/types';
import * as reviewService from '@services/review-service';

const paths = {
  basePath: '/reviews',
  getByUser: '/',
  create: '/',
  update: '/:id',
  delete: '/:id',
} as const;

/**
 * Get user's reviews.
 */
async function getByUser(req: IReq, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const reviews = await reviewService.getByUser(authData.id);

  if (!reviews) {
    return res.status(HttpStatusCodes.NOT_FOUND).json('User not found');
  }

  return res.status(HttpStatusCodes.OK).json(reviews);
}

/*
 * Create review
 */
async function create(req: IReq<reviewService.IReviewRequest>, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const newReviewId = await reviewService.create(authData.id, req.body);
  return res.status(HttpStatusCodes.OK).json(newReviewId);
}

/**
 * Update review.
 */
async function update(req: IReq<reviewService.IReviewRequest>, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const id = parseInt(req.params.id, 10);
  await reviewService.update(authData.id, id, req.body);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

/**
 * Delete review.
 */
async function _delete(req: IReq, res: IRes) {
  const authData = req.app.locals.auth as { id: number };
  const id = parseInt(req.params.id, 10);
  await reviewService.remove(authData.id, id);
  return res.status(HttpStatusCodes.NO_CONTENT).json();
}

export default {
  paths,
  getByUser,
  create,
  update,
  delete: _delete,
} as const;
