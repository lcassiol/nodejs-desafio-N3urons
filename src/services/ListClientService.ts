import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Client from '../models/Client';

import IClientRepository from '../interfaces/IClientRepository';
import IUserRepository from '../interfaces/IUserRepository';

@injectable()
class ListClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const clients = await this.clientRepository.list();

    return clients;
  }
}

export default ListClientService;
