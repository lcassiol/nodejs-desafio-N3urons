import { Router } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

import ensureSellerUser from '../middlewares/ensureSellerUser';
import CreateClientService from '../services/CreateClientService';
import Client from '../models/Client';

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
  const clientRepository = getRepository(Client);

  const clients = await clientRepository.find();

  return response.json(clients);
});

export default clientsRouter;
