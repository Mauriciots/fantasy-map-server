import { Router } from 'express';
import validateAuth from './middlware/validateAuth';
import listRoutes from './list-routes';
import categoryRoutes from './category-routes';
import placeRoutes from './place-routes';
import fileRoutes from './file-routes';
import reviewRoutes from './review-routes';
import favoriteRoutes from './favorite-routes';
import userRoutes from './user-routes';

// **** Init **** //

const apiRouter = Router();

// **** Setup lists routes **** //

const listRouter = Router();
listRouter.get(listRoutes.paths.getPopular, listRoutes.getMostPopular);
listRouter.get(listRoutes.paths.getByQuery, listRoutes.getByQuery);
listRouter.get(listRoutes.paths.getByCategory, listRoutes.getByCategory);
listRouter.get(listRoutes.paths.get, validateAuth, listRoutes.getById);
listRouter.post(listRoutes.paths.create, validateAuth, listRoutes.create);
listRouter.put(listRoutes.paths.update, validateAuth, listRoutes.update);
listRouter.delete(listRoutes.paths.delete, validateAuth, listRoutes.delete);

// Add listRouter
apiRouter.use(listRoutes.paths.basePath, listRouter);

// **** Setup categories routes **** //

const categoryRouter = Router();

// Get all
categoryRouter.get(categoryRoutes.paths.get, categoryRoutes.getAll);

// Add categoryRouter
apiRouter.use(categoryRoutes.paths.basePath, categoryRouter);

// **** Setup places routes **** //

const placesRouter = Router();
placesRouter.get(placeRoutes.paths.getById, validateAuth, placeRoutes.getById);
placesRouter.get(placeRoutes.paths.getAllByUserId, validateAuth, placeRoutes.getAllByUserId);
placesRouter.post(placeRoutes.paths.create, validateAuth, placeRoutes.create);
placesRouter.put(placeRoutes.paths.update, validateAuth, placeRoutes.update);
placesRouter.delete(placeRoutes.paths.delete, validateAuth, placeRoutes.delete);

// Add placesRouter
apiRouter.use(placeRoutes.paths.basePath, placesRouter);

// **** Setup files routes **** //

const filesRouter = Router();
filesRouter.post(fileRoutes.paths.upload, validateAuth, fileRoutes.upload);

// Add filesRouter
apiRouter.use(fileRoutes.paths.basePath, filesRouter);

// **** Setup reviews routes **** //

const reviewsRouter = Router();
reviewsRouter.get(reviewRoutes.paths.getByUser, validateAuth, reviewRoutes.getByUser);
reviewsRouter.post(reviewRoutes.paths.create, validateAuth, reviewRoutes.create);
reviewsRouter.put(reviewRoutes.paths.update, validateAuth, reviewRoutes.update);
reviewsRouter.delete(reviewRoutes.paths.delete, validateAuth, reviewRoutes.delete);

// Add reviewsRouter
apiRouter.use(reviewRoutes.paths.basePath, reviewsRouter);

// **** Setup favorites routes **** //

const favoritesRouter = Router();
favoritesRouter.put(favoriteRoutes.paths.toggle, validateAuth, favoriteRoutes.toggle);

// Add favoritesRouter
apiRouter.use(favoriteRoutes.paths.basePath, favoritesRouter);

// **** Setup users routes **** //

const usersRouter = Router();
usersRouter.get(userRoutes.paths.profile, validateAuth, userRoutes.getProfile);
usersRouter.get(userRoutes.paths.jwt, validateAuth, userRoutes.getUserFromToken);
usersRouter.post(userRoutes.paths.signup, userRoutes.signup);
usersRouter.post(userRoutes.paths.signout, userRoutes.signout);
usersRouter.post(userRoutes.paths.signin, userRoutes.signin);
usersRouter.put(userRoutes.paths.update, validateAuth, userRoutes.update);
usersRouter.delete(userRoutes.paths.delete, userRoutes.delete);

// Add usersRouter
apiRouter.use(userRoutes.paths.basePath, usersRouter);

export default apiRouter;
