import { Router } from 'express';

import validate from './middlware/validate';
import authRoutes from './auth-routes';
import listRoutes from './list-routes';
import categoryRoutes from './category-routes';
import placeRoutes from './place-routes';
import fileRoutes from './file-routes';
import reviewRoutes from './review-routes';
import favoriteRoutes from './favorite-routes';
import userRoutes from './user-routes';

// **** Init **** //

const apiRouter = Router();

// **** Setup auth routes **** //

const authRouter = Router();

// Login user
authRouter.post(authRoutes.paths.login, validate('email', 'password'), authRoutes.login);

// Logout user
authRouter.get(authRoutes.paths.logout, authRoutes.logout);

// Add authRouter
apiRouter.use(authRoutes.paths.basePath, authRouter);

// **** Setup lists routes **** //

const listRouter = Router();
listRouter.get(listRoutes.paths.getPopular, listRoutes.getMostPopular);
listRouter.get(listRoutes.paths.getByQuery, listRoutes.getByQuery);
listRouter.get(listRoutes.paths.get, listRoutes.getById);
listRouter.post(listRoutes.paths.create, listRoutes.create);
listRouter.put(listRoutes.paths.update, listRoutes.update);
listRouter.delete(listRoutes.paths.delete, listRoutes.delete);

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
placesRouter.get(placeRoutes.paths.getById, placeRoutes.getById);
placesRouter.post(placeRoutes.paths.create, placeRoutes.create);
placesRouter.put(placeRoutes.paths.update, placeRoutes.update);
placesRouter.delete(placeRoutes.paths.delete, placeRoutes.delete);

// Add placesRouter
apiRouter.use(placeRoutes.paths.basePath, placesRouter);

// **** Setup files routes **** //

const filesRouter = Router();
filesRouter.post(fileRoutes.paths.upload, fileRoutes.upload);
filesRouter.put(fileRoutes.paths.replace, fileRoutes.replace);

// Add filesRouter
apiRouter.use(fileRoutes.paths.basePath, filesRouter);

// **** Setup reviews routes **** //

const reviewsRouter = Router();
reviewsRouter.get(reviewRoutes.paths.getByUser, reviewRoutes.getByUser);
reviewsRouter.post(reviewRoutes.paths.create, reviewRoutes.create);
reviewsRouter.put(reviewRoutes.paths.update, reviewRoutes.update);
reviewsRouter.delete(reviewRoutes.paths.delete, reviewRoutes.delete);

// Add reviewsRouter
apiRouter.use(reviewRoutes.paths.basePath, reviewsRouter);

// **** Setup favorites routes **** //

const favoritesRouter = Router();
favoritesRouter.put(favoriteRoutes.paths.toggle, favoriteRoutes.toggle);

// Add favoritesRouter
apiRouter.use(favoriteRoutes.paths.basePath, favoritesRouter);

// **** Setup users routes **** //

const usersRouter = Router();
usersRouter.get(userRoutes.paths.profile, userRoutes.getProfile);
usersRouter.post(userRoutes.paths.signup, userRoutes.signup);
usersRouter.put(userRoutes.paths.update, userRoutes.update);
usersRouter.delete(userRoutes.paths.delete, userRoutes.delete);

// Add usersRouter
apiRouter.use(userRoutes.paths.basePath, usersRouter);

export default apiRouter;
