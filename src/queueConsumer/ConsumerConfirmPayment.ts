import { container } from 'tsyringe';

import MessageQueueConfig from '../config/queue';
import ConfirmPaymentService from '../services/ConfirmPaymentService';
import RabbitMQServer from '../utils/RabbitMQ/RabbitMQServer';

const consumer = async () => {
  const server = container.resolve(RabbitMQServer);
  await server.start(MessageQueueConfig.url);
  await server.consume(MessageQueueConfig.consumeQueue, async message => {
    const confirmPaymentService = container.resolve(ConfirmPaymentService);
    const orderId = Number(message.content.toString());
    await confirmPaymentService.execute(orderId);
    console.log('Payment Confirmed 💰💰💰');
  });
};
export default consumer;
