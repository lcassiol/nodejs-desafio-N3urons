import { container } from 'tsyringe';

import RabbitMQServer from './RabbitMQServer';
import ConfirmPaymentService from '../services/ConfirmPaymentService';

const consumer = async () => {
  const server = new RabbitMQServer('amqp://localhost:5672');
  await server.start();
  await server.consume('paymentConfirmed', async message => {
    const confirmPaymentService = container.resolve(ConfirmPaymentService);
    const orderId = Number(message.content.toString());
    await confirmPaymentService.execute(orderId);
    console.log('Payment Confirmed 💰💰💰');
  });
};
export default consumer;
