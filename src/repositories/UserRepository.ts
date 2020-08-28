import { getRepository, Repository } from 'typeorm';
import IUserRepository from '../interfaces/IUserRepository';

import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ login, password }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      login,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: ICreateUserDTO): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { login },
    });
    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });
    return findUser;
  }
}

export default UserRepository;
