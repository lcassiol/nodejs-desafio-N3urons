import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateClientService from '../services/CreateClientService';
import ListClientService from '../services/ListClientService';

export default class ClientController {
  public async store(request: Request, response: Response): Promise<Response> {
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
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listClientService = container.resolve(ListClientService);
    const clients = await listClientService.execute();

    return response.json(clients);
  }
}
