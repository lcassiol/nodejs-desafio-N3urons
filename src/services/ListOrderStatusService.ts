import { injectable, inject } from 'tsyringe';

import OrderStatus from '../models/OrderStatus';
import IOrderStatusRepository from '../interfaces/IOrderStatusRepository';

@injectable()
class ListOrderStatusService {
  constructor(
    @inject('OrderStatusRepository')
    private orderStatusRepository: IOrderStatusRepository,
  ) {}

  public async execute(): Promise<OrderStatus[]> {
    const orderStatus = await this.orderStatusRepository.list();

    return orderStatus;
  }
}

export default ListOrderStatusService;
