import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';

interface IRequest {
  user_id: string;
}

class GetOrdersByUserService {
  public async execute({ user_id }: IRequest): Promise<Order[]> {
    const clientRepository = getRepository(Order);

    const orders = await clientRepository.find({
      where: {
        user_id: user_id,
      },
    });

    return orders;
  }
}

export default GetOrdersByUserService;
