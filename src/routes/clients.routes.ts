import { Router } from 'express';

import ensureSellerUser from '../middlewares/ensureSellerUser';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.get('/', ensureSellerUser, clientsController.index);
clientsRouter.post('/', clientsController.store);

export default clientsRouter;
