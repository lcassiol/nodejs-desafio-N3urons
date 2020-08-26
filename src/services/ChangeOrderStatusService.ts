import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';

interface IRequest {
  user_id: string;
  order_id: number;
  status_id: number;
}

class ChangeOrderStatusService {
  public async execute({
    user_id,
    order_id,
    status_id,
  }: IRequest): Promise<Order> {
    const clientRepository = getRepository(Order);

    const orders = await clientRepository.find({
      where: {
        user_id: user_id,
      },
    });

    const findOrder = orders.find(order => order.id === order_id);

    if (!findOrder) {
      throw new AppError('You can only change your orders.');
    }

    findOrder.status_id = status_id;

    await clientRepository.save(findOrder);

    return findOrder;
  }
}

export default ChangeOrderStatusService;
