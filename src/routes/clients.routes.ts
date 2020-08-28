import { Router } from 'express';
import { container } from 'tsyringe';

import ensureSellerUser from '../middlewares/ensureSellerUser';
import CreateClientService from '../services/CreateClientService';
import ListClientService from '../services/ListClientService';

const clientsRouter = Router();

clientsRouter.post('/', async (request, response) => {
  const { id } = request.user;
  const { name, address, email, phone } = request.body;
  const createClientService = container.resolve(CreateClientService);

  const newClient = await createClientService.execute({
    name,
    address,
    email,
    phone,
    user_id: id,
  });

  return response.json(newClient);
});

clientsRouter.get('/', ensureSellerUser, async (request, response) => {
  const listClientService = container.resolve(ListClientService);
  const clients = await listClientService.execute();

  return response.json(clients);
});

export default clientsRouter;
