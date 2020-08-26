import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Order from '../models/Order';

interface IRequest {
  status_id: number;
  subsidiary_id: number;
  subtotal: number;
  total: number;
  user_id: string;
  client_id: string;
  discount: number;
}

class CreateOrderService {
  public async execute({
    status_id,
    subsidiary_id,
    subtotal,
    total,
    user_id,
    client_id,
    discount,
  }: IRequest): Promise<Order> {
    const orderRepository = getRepository(Order);

    //check if subsidiary exists
    //check if status exists
    //check cliente id
    //calc total, discount, subtotal

    const newOrder = orderRepository.create({
      client_id,
      total,
      discount,
      subtotal,
      subsidiary_id,
      status_id,
      user_id,
    });

    await orderRepository.save(newOrder);

    return newOrder;
  }
}

export default CreateOrderService;
