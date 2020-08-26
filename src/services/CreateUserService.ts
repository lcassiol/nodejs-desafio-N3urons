import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface IRequest {
  name: string;
  login: string;
  password: string;
}

class CreateUserService {
  public async execute({ login, name, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);
    const passwordHash = await hash(password, 8);
    const newUser = userRepository.create({
      name,
      login,
      password: passwordHash,
    });

    console.log(newUser);

    await userRepository.save(newUser);

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
