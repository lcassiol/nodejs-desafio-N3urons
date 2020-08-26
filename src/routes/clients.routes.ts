import { Router } from 'express';
import CreateClientService from '../services/CreateClientService';

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

export default clientsRouter;
