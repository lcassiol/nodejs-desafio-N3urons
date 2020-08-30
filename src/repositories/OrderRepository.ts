import { getRepository, Repository } from 'typeorm';
import IOrderRepository from '../interfaces/IOrderRepository';

import Order from '../models/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    client_id,
    user_id,
    total,
    status_id,
    discount,
    subsidiary_id,
    subtotal,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      client_id,
      total,
      user_id,
      discount,
      subsidiary_id,
      subtotal,
      status_id,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async update(order: ICreateOrderDTO): Promise<Order> {
    const updatedOrder = await this.ormRepository.save(order);

    return updatedOrder;
  }

  public async findByUserId(user_id: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['order_products'],
    });

    return orders;
  }

  public async findById(id: number): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['client'],
    });

    return order;
  }
}

export default OrderRepository;
