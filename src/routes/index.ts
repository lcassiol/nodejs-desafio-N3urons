import { Router, Request, Response } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import ordersRouter from './orders.routes';
import productsRouter from './products.routes';
import productCategoryRouter from './product.category.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);
routes.use('/users', usersRouter);
routes.use('/clientsRouter', clientsRouter);
routes.use('/orders', ordersRouter);
routes.use('/products', productsRouter);
routes.use('/products/categories', productCategoryRouter);

routes.get('', (request: Request, response: Response) => {
  return response.json({ message: 'hello world' });
});

export default routes;
