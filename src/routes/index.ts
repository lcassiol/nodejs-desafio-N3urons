import { Router, Request, Response } from 'express';

import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';
import clientsRouter from './clients.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/clientsRouter', clientsRouter);
routes.use('/products', productsRouter);

routes.get('', (request: Request, response: Response) => {
  return response.json({ message: 'hello world' });
});

export default routes;
