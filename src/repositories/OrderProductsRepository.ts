import { getRepository, Repository } from 'typeorm';
import IOrderProductsRepository from '../interfaces/IOrderProductsRepository';
import OrderProducts from '../models/OrderProducts';
import ICreateOrderProductsDTO from '../dtos/ICreateOrderProductsDTO';

class OrderProductsRepository implements IOrderProductsRepository {
  private ormRepository: Repository<OrderProducts>;

  constructor() {
    this.ormRepository = getRepository(OrderProducts);
  }

  public async create({
    order_id,
    product_id,
    quantity,
    total,
  }: ICreateOrderProductsDTO): Promise<OrderProducts> {
    const orderProducts = this.ormRepository.create({
      order_id,
      product_id,
      quantity,
      total,
    });

    await this.ormRepository.save(orderProducts);

    return orderProducts;
  }

  public async bulkInsert(
    data: ICreateOrderProductsDTO[],
  ): Promise<OrderProducts[]> {
    const orderProducts = this.ormRepository.create(data);

    await this.ormRepository.save(orderProducts);

    return orderProducts;
  }
}

export default OrderProductsRepository;
