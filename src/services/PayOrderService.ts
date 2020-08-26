import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';
import OrderStatus from '../models/OrderStatus';

interface IRequest {
  order_id: number;
  card_number: number;
  card_validate: string;
}

class PayOrderService {
  public async execute({
    order_id,
    card_number,
    card_validate,
  }: IRequest): Promise<void> {
    const orderRepository = getRepository(Order);
    const orderStatusRepository = getRepository(OrderStatus);

    const orderStatusWaiting = await orderStatusRepository.findOne({
      where: {
        name: 'Waiting Payment',
      },
    });

    const orderExists = await orderRepository.findOne({
      where: {
        id: order_id,
      },
    });

    if (orderExists) {
      //send message to rabbitmq to process payment
      const totalPrice = orderExists.total;
      const order_id = orderExists.id;
      //card_number
      //card_validate

      // ---------------------

      //change order_status to waiting payment
      orderExists.status_id = orderStatusWaiting.id;
      await orderRepository.save(orderExists);
    }
  }
}

export default PayOrderService;
