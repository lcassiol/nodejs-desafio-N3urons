import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import Order from '../models/Order';

import IOrderRepository from '../interfaces/IOrderRepository';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';

@injectable()
class ConfirmPaymentService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderStatusRepository')
    private orderStatusRepository: IOrderStatusRepository,
  ) {}

  public async execute(order_id: number): Promise<Order> {
    console.log('chamou aqui');

    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      throw new AppError('You can only change your orders.');
    }

    const findOrderStatus = await this.orderStatusRepository.findByName(
      'Finished',
    );

    if (!findOrderStatus) {
      throw new AppError('Invalid order status.');
    }

    const updatedOrder = Object.assign(order, {
      status_id: findOrderStatus.id,
      status: findOrderStatus,
    });

    await this.orderRepository.update(updatedOrder);

    return updatedOrder;
  }
}

export default ConfirmPaymentService;
