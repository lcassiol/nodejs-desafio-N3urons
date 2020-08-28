import Product from '../models/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  list(): Promise<Product[]>;
  findById(id: number): Promise<Product | undefined>;
  findByIds(id: number[]): Promise<Product[]>;
}
