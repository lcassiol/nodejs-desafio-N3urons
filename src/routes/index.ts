import { Router, Request, Response } from 'express';

import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.get('', (request: Request, response: Response) => {
  return response.json({ message: 'hello world' });
});

export default routes;
