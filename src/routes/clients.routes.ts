import { Router } from 'express';
import CreateClientService from '../services/CreateClientService';
import { getRepository } from 'typeorm';
import Client from '../models/Client';

const clientsRouter = Router();

clientsRouter.post('/', async (request, response) => {
  const { name, address, email, phone } = request.body;
  const createClientService = new CreateClientService();

  const newClient = await createClientService.execute({
    name,
    address,
    email,
    phone,
  });

  return response.json(newClient);
});

clientsRouter.get('/', async (request, response) => {
  const clientRepository = getRepository(Client);

  const clients = await clientRepository.find();

  return response.json(clients);
});

export default clientsRouter;
