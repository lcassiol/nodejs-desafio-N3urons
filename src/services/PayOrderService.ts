import { injectable, inject } from 'tsyringe';

import MessageQueueConfig from '../config/queue';

import IOrderRepository from '../interfaces/IOrderRepository';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';
import IQueueServer from '../interfaces/IQueueServer';

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

    @inject('QueueServer')
    private queueServer: IQueueServer,
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
      const message = {
        totalPrice,
        order_id,
        card_number,
        card_validate,
      };

      await this.queueServer.start(MessageQueueConfig.url);
      await this.queueServer.publishInQueue(
        MessageQueueConfig.producerQueue,
        JSON.stringify(message),
      );

      // ---------------------

      //change order_status to waiting payment
      orderExists.status_id = orderStatusWaiting.id;
      orderExists.status = orderStatusWaiting;
      await this.orderRepository.update(orderExists);
    }
  }
}

export default PayOrderService;
