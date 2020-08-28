import ICreateOrderProductsDTO from '../dtos/ICreateOrderProductsDTO';
import OrderProducts from '../models/OrderProducts';

export default interface IOrderProductsRepository {
  create(data: ICreateOrderProductsDTO): Promise<OrderProducts>;
  bulkInsert(data: ICreateOrderProductsDTO[]): Promise<OrderProducts[]>;
}
