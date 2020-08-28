import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';
import User from '../models/User';
import IUserRepository from '../interfaces/IUserRepository';

interface IRequest {
  login: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ login, password }: IRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByLogin(login);

    if (userAlreadyExists) {
      throw new AppError('Login unavailable!');
    }

    const passwordHash = await hash(password, 8);
    const newUser = await this.userRepository.create({
      login,
      password: passwordHash,
    });

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
