import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Client from '../models/Client';
import User from '../models/User';
import IClientRepository from '../interfaces/IClientRepository';

interface IRequest {
  name: string;
  address: string;
  email: string;
  phone: string;
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute({
    name,
    address,
    email,
    phone,
    user_id,
  }: IRequest): Promise<Client> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (user.client_id) {
      throw new AppError('This user already have client associated');
    }

    const clientAlreadyExist = await this.clientRepository.findByEmail(email);

    if (clientAlreadyExist) {
      throw new AppError('This email is already in use');
    }

    const newClient = await this.clientRepository.create({
      name,
      address,
      email,
      phone,
    });

    if (!user.isSeller) {
      user.client_id = newClient.id;

      await userRepository.save(user);
    }

    return newClient;
  }
}

export default CreateUserService;
