import Order from '../models/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export default interface IOrderRepository {
  findById(id: number): Promise<Order | undefined>;
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: ICreateOrderDTO): Promise<Order>;
  findByUserId(user_id: string): Promise<Order[]>;
}
