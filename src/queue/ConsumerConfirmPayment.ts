import { container } from 'tsyringe';

import RabbitMQConfig from '../config/rabbitmq';
import RabbitMQServer from './RabbitMQServer';
import ConfirmPaymentService from '../services/ConfirmPaymentService';

const consumer = async () => {
  const server = new RabbitMQServer(RabbitMQConfig.url);
  await server.start();
  await server.consume(RabbitMQConfig.consumeQueue, async message => {
    const confirmPaymentService = container.resolve(ConfirmPaymentService);
    const orderId = Number(message.content.toString());
    await confirmPaymentService.execute(orderId);
    console.log('Payment Confirmed 💰💰💰');
  });
};
export default consumer;
