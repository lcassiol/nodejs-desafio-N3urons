import { injectable, inject } from 'tsyringe';

import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import OrderStatus from '../models/OrderStatus';
import IOrderRepository from '../interfaces/IOrderRepository';

interface IRequest {
  user_id: string;
  order_id: number;
  status_id: number;
}

@injectable()
class ChangeOrderStatusService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({
    user_id,
    order_id,
    status_id,
  }: IRequest): Promise<Order> {
    const orderStatusRepository = getRepository(OrderStatus);

    const orders = await this.orderRepository.findByUserId(user_id);

    const findOrder = orders.find(order => order.id === order_id);

    if (!findOrder) {
      throw new AppError('You can only change your orders.');
    }

    const findOrderStatus = await orderStatusRepository.findOne({
      where: {
        id: status_id,
      },
    });

    if (!findOrderStatus) {
      throw new AppError('Invalid order status.');
    }

    const updatedOrder = Object.assign(findOrder, {
      status_id: findOrderStatus.id,
      status: findOrderStatus,
    });

    await this.orderRepository.update(updatedOrder);

    return updatedOrder;
  }
}

export default ChangeOrderStatusService;
