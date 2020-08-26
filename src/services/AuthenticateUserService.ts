import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
  login: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ login, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { login },
    });

    if (!user) {
      throw new AppError('Incorrect login/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect login/password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}

export default AuthenticateUserService;
