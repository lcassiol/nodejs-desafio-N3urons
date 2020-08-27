import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Client from '../models/Client';
import User from '../models/User';

interface IRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  user_id?: string;
}

class CreateUserService {
  public async execute({
    name,
    address,
    email,
    phone,
    user_id,
  }: IRequest): Promise<Client> {
    const clientRepository = getRepository(Client);
    const userRepository = getRepository(User);

    const newClient = clientRepository.create({
      name,
      address,
      email,
      phone,
    });

    await clientRepository.save(newClient);

    if (user_id) {
      const user = await userRepository.findOne({
        where: {
          id: user_id,
        },
      });

      user.client_id = newClient.id;

      await clientRepository.save(user);
    }

    return newClient;
  }
}

export default CreateUserService;
