import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';

import IOrderRepository from '../interfaces/IOrderRepository';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';

interface IRequest {
  order_id: number;
  card_number: number;
  card_validate: string;
}

@injectable()
class PayOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderStatusRepository')
    private orderStatusRepository: IOrderStatusRepository,
  ) {}

  public async execute({
    order_id,
    card_number,
    card_validate,
  }: IRequest): Promise<void> {
    const orderStatusWaiting = await this.orderStatusRepository.findByName(
      'Waiting Payment',
    );

    const orderExists = await this.orderRepository.findById(order_id);

    if (orderExists) {
      // #TODO
      //send message to rabbitmq to process payment
      const totalPrice = orderExists.total;
      const order_id = orderExists.id;
      //card_number
      //card_validate

      // ---------------------

      //change order_status to waiting payment
      orderExists.status_id = orderStatusWaiting.id;
      orderExists.status = orderStatusWaiting;
      await this.orderRepository.update(orderExists);
    }
  }
}

export default PayOrderService;
