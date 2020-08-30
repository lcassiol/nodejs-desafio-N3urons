import { Message, Replies } from 'amqplib';

export default interface IQueueServer {
  start(uri: string): Promise<void>;
  publishInQueue(queue: string, message: string): Promise<boolean>;
  consume(
    queue: string,
    callback: (message: Message) => void,
  ): Promise<Replies.Consume>;
}
