import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import User from '../models/User';

interface IRequest {
  login: string;
  password: string;
}

class CreateUserService {
  public async execute({ login, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({
      where: {
        login,
      },
    });

    if (userAlreadyExists) {
      throw new AppError('Login unavailable!');
    }

    const passwordHash = await hash(password, 8);
    const newUser = userRepository.create({
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
