import { injectable, inject } from 'tsyringe';

import Product from '../models/Product';
import IProductRepository from '../interfaces/IProductRepository';

@injectable()
class GetProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.list();
    return products;
  }
}

export default GetProductsService;
