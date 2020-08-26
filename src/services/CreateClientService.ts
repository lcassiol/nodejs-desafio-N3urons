import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Client from '../models/Client';

interface IRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
}

class CreateUserService {
  public async execute({
    name,
    address,
    email,
    phone,
  }: IRequest): Promise<Client> {
    const clientRepository = getRepository(Client);

    const newClient = clientRepository.create({
      name,
      address,
      email,
      phone,
    });

    await clientRepository.save(newClient);

    return newClient;
  }
}

export default CreateUserService;
