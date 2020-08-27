import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import IOrderRepository from '../interfaces/IOrderRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class GetOrdersByUserService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Order[]> {
    const orders = await this.orderRepository.findByUserId(user_id);

    return orders;
  }
}

export default GetOrdersByUserService;
