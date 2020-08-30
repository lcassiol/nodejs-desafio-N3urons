import { Connection, Channel, connect, Message, Replies } from 'amqplib';
import IQueueServer from '../../interfaces/IQueueServer';

export default class RabbitMQServer implements IQueueServer {
  private conn: Connection;
  private channel: Channel;

  public async start(uri: string): Promise<void> {
    this.conn = await connect(uri);
    this.channel = await this.conn.createChannel();
  }

  public async publishInQueue(
    queue: string,
    message: string,
  ): Promise<boolean> {
    this.channel.assertQueue(queue);
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  public async consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<Replies.Consume> {
    return this.channel.consume(queue, message => {
      callback(message);
      this.channel.ack(message);
    });
  }
}
