import { getRepository, Repository } from 'typeorm';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';

import OrderStatus from '../models/OrderStatus';

class OrderStatusRepository implements IOrderStatusRepository {
  private ormRepository: Repository<OrderStatus>;

  constructor() {
    this.ormRepository = getRepository(OrderStatus);
  }

  public async list(): Promise<OrderStatus[]> {
    const orderStatus = await this.ormRepository.find();

    return orderStatus;
  }

  public async findById(id: number): Promise<OrderStatus | undefined> {
    const status = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return status;
  }

  public async findByName(name: string): Promise<OrderStatus | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return order;
  }
}

export default OrderStatusRepository;
