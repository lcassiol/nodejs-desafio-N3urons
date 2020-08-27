import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';

export default async function ensureSellerUser(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (!user.isSeller) {
    throw new AppError('Only Seller user can do this action');
  }

  return next();
}
