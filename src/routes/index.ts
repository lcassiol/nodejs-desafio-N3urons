import { Router, Request, Response } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureSellerUser from '../middlewares/ensureSellerUser';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import ordersRouter from './orders.routes';
import productsRouter from './products.routes';
import productCategoryRouter from './product.category.routes';
import stockRouter from './stock.routes';
import paymentRouter from './payment.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use(ensureAuthenticated);

routes.use('/orders', ordersRouter);
routes.use('/products', productsRouter);
routes.use('/products/categories', productCategoryRouter);
routes.use('/clients', clientsRouter);
routes.use('/payment', paymentRouter);

routes.use(ensureSellerUser);
routes.use('/products/stock', stockRouter);

routes.get('', (request: Request, response: Response) => {
  return response.json({ message: 'hello world' });
});

export default routes;
