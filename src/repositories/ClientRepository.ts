import { getRepository, Repository } from 'typeorm';

import Client from '../models/Client';

import IClientRepository from '../interfaces/IClientRepository';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async list(): Promise<Client[]> {
    const clients = await this.ormRepository.find();

    return clients;
  }

  public async create({
    name,
    email,
    address,
    phone,
  }: ICreateClientDTO): Promise<Client> {
    const newClient = this.ormRepository.create({
      name,
      address,
      email,
      phone,
    });

    await this.ormRepository.save(newClient);

    return newClient;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { email },
    });
    return client;
  }
}

export default ClientRepository;
