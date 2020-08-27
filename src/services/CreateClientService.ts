import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Client from '../models/Client';
import User from '../models/User';

interface IRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  user_id: string;
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

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (user.client_id) {
      throw new AppError('This user already have client associated');
    }

    const clientAlreadyExist = await clientRepository.findOne({
      where: {
        email,
      },
    });

    if (clientAlreadyExist) {
      throw new AppError('This email is already in use');
    }

    const newClient = clientRepository.create({
      name,
      address,
      email,
      phone,
    });

    console.log(newClient);

    await clientRepository.save(newClient);

    if (!user.isSeller) {
      user.client_id = newClient.id;

      await userRepository.save(user);
    }

    return newClient;
  }
}

export default CreateUserService;
