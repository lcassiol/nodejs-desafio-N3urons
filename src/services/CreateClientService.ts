import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Client from '../models/Client';

import IClientRepository from '../interfaces/IClientRepository';
import IUserRepository from '../interfaces/IUserRepository';

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

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    address,
    email,
    phone,
    user_id,
  }: IRequest): Promise<Client> {
    const user = await this.userRepository.findById(user_id);

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

      await this.userRepository.update(user);
    }

    return newClient;
  }
}

export default CreateUserService;
