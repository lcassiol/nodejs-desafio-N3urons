import OrderStatus from '../models/OrderStatus';

export default interface IOrderStatusRepository {
  findById(id: number): Promise<OrderStatus | undefined>;
  findByName(name: string): Promise<OrderStatus | undefined>;
}
